'use client';

/**
 * Chat API Hook
 * Manages chat state and API communication
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { nanoid } from 'nanoid';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  metadata?: any;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sessionId: string;
}

export function useChatApi() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    sessionId: '',
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  // Initialize session ID
  useEffect(() => {
    const storedSessionId = localStorage.getItem('chat_session_id');
    const sessionId = storedSessionId || nanoid();

    if (!storedSessionId) {
      localStorage.setItem('chat_session_id', sessionId);
    }

    setState((prev) => ({ ...prev, sessionId }));

    // Load conversation history
    loadHistory(sessionId);
  }, []);

  /**
   * Load conversation history
   */
  const loadHistory = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/chat/history?sessionId=${sessionId}`);

      if (!response.ok) {
        return; // No history yet
      }

      const data = await response.json();

      if (data.messages && data.messages.length > 0) {
        setState((prev) => ({
          ...prev,
          messages: data.messages.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.createdAt),
          })),
        }));
      }
    } catch (error) {
      console.error('Failed to load history:', error);
    }
  };

  /**
   * Send a message
   */
  const sendMessage = useCallback(
    async (content: string, metadata?: any) => {
      if (!content.trim() || state.isLoading) {
        return;
      }

      // Add user message immediately
      const userMessage: ChatMessage = {
        id: nanoid(),
        role: 'user',
        content: content.trim(),
        timestamp: new Date(),
        metadata,
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }));

      // Create abort controller for this request
      abortControllerRef.current = new AbortController();

      try {
        const response = await fetch('/api/chat/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: state.sessionId,
            message: content.trim(),
            metadata,
          }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        let assistantMessage: ChatMessage = {
          id: nanoid(),
          role: 'assistant',
          content: '',
          timestamp: new Date(),
        };

        // Add empty assistant message
        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
        }));

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();

            if (done) {
              break;
            }

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                try {
                  const data = JSON.parse(line.slice(6));

                  if (data.type === 'token') {
                    // Append token to message
                    assistantMessage.content += data.content;

                    setState((prev) => ({
                      ...prev,
                      messages: prev.messages.map((msg) =>
                        msg.id === assistantMessage.id
                          ? { ...msg, content: assistantMessage.content }
                          : msg
                      ),
                    }));
                  } else if (data.type === 'done') {
                    // Message complete
                    assistantMessage.id = data.messageId || assistantMessage.id;
                  } else if (data.type === 'error') {
                    throw new Error(data.error);
                  }
                } catch (e) {
                  console.error('Failed to parse SSE data:', e);
                }
              }
            }
          }
        }

        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.log('Request aborted');
          return;
        }

        console.error('Send message error:', error);

        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message || 'Failed to send message',
        }));

        // Add error message
        const errorMessage: ChatMessage = {
          id: nanoid(),
          role: 'assistant',
          content:
            "I'm sorry, I encountered an error. Please try again or contact support if the problem persists.",
          timestamp: new Date(),
        };

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, errorMessage],
        }));
      }
    },
    [state.sessionId, state.isLoading]
  );

  /**
   * Clear conversation
   */
  const clearConversation = useCallback(() => {
    // Create new session
    const newSessionId = nanoid();
    localStorage.setItem('chat_session_id', newSessionId);

    setState({
      messages: [],
      isLoading: false,
      error: null,
      sessionId: newSessionId,
    });
  }, []);

  /**
   * Abort ongoing request
   */
  const abortRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }

    setState((prev) => ({
      ...prev,
      isLoading: false,
    }));
  }, []);

  /**
   * Submit lead information
   */
  const submitLead = useCallback(
    async (leadData: {
      name: string;
      email: string;
      phone?: string;
      company?: string;
      serviceType: string;
      budget?: string;
      timeline?: string;
      description?: string;
    }) => {
      try {
        const response = await fetch('/api/chat/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sessionId: state.sessionId,
            ...leadData,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to submit lead');
        }

        const result = await response.json();
        return result;
      } catch (error: any) {
        console.error('Lead submission error:', error);
        throw error;
      }
    },
    [state.sessionId]
  );

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    sessionId: state.sessionId,
    sendMessage,
    clearConversation,
    abortRequest,
    submitLead,
  };
}

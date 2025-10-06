'use client';

/**
 * Chat Window Component
 * Main conversation interface with glassmorphic design
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minimize2, Sparkles } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import QuickActions from './QuickActionsNew';
import { useChatApi } from '@/hooks/useChatApi';

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  const { messages, isLoading, sendMessage, sessionId } = useChatApi();
  const [isMinimized, setIsMinimized] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);

  // Hide quick actions after first message
  useEffect(() => {
    if (messages.length > 1) {
      setShowQuickActions(false);
    }
  }, [messages.length]);

  const handleQuickAction = (message: string) => {
    sendMessage(message);
    setShowQuickActions(false);
  };

  return (
    <motion.div
      className="flex flex-col w-full h-full md:w-[400px] md:h-[600px] rounded-2xl shadow-2xl overflow-hidden"
      layout
    >
      {/* Glassmorphic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl" />
      <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl" />

      {/* Border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-sm" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AiPlace Assistant
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Minimize"
            >
              <Minimize2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Body */}
        {!isMinimized && (
          <motion.div
            className="flex-1 flex flex-col overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Welcome to AiPlace!
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
                    I'm here to help you with our services. How can I assist you today?
                  </p>
                </div>
              ) : (
                <MessageList messages={messages} isLoading={isLoading} />
              )}
            </div>

            {/* Quick Actions */}
            {showQuickActions && messages.length === 0 && (
              <div className="px-6 pb-4">
                <QuickActions onActionClick={handleQuickAction} />
              </div>
            )}

            {/* Input */}
            <div className="border-t border-white/20 backdrop-blur-sm">
              <MessageInput
                onSendMessage={sendMessage}
                disabled={isLoading}
                placeholder="Type your message..."
              />
            </div>
          </motion.div>
        )}

        {/* Session ID (for debugging) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="px-4 py-2 text-xs text-gray-500 border-t border-white/20">
            Session: {sessionId?.slice(0, 8)}...
          </div>
        )}
      </div>
    </motion.div>
  );
}

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Minimize2, History, Settings } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickActions from './QuickActions';
import LeadForm from './LeadForm';
import ChatHistory from './ChatHistory';
import type { Message, LeadFormData } from './types';

interface ChatWindowProps {
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onClose: () => void;
  showLeadForm: boolean;
  onToggleLeadForm: (show: boolean) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  isTyping,
  onSendMessage,
  onClose,
  showLeadForm,
  onToggleLeadForm
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        setShowHistory(!showHistory);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, showHistory]);

  const handleLeadFormSubmit = (data: LeadFormData) => {
    console.log('Lead form submitted:', data);
    onToggleLeadForm(false);
    // Send confirmation message
    onSendMessage(`Thank you, ${data.name}! We'll contact you at ${data.email} shortly.`);
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'services':
        onSendMessage('What services do you offer?');
        break;
      case 'booking':
        onToggleLeadForm(true);
        break;
      case 'estimate':
        onSendMessage('I would like to get a project estimate');
        break;
    }
  };

  return (
    <div className="flex gap-2">
      {/* Chat History Sidebar */}
      {showHistory && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="hidden md:block"
        >
          <ChatHistory onSelectConversation={(id) => console.log('Selected:', id)} />
        </motion.div>
      )}

      {/* Main Chat Window */}
      <motion.div
        className={`
          ${isFullscreen ? 'fixed inset-4 md:inset-8' : 'w-[calc(100vw-2rem)] md:w-96 h-[calc(100vh-8rem)] md:h-[600px]'}
          rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl
          bg-gradient-to-br from-white/95 via-white/90 to-white/95
          dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95
          border border-white/20 dark:border-gray-700/30
        `}
        layout
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Assistant</h3>
              <p className="text-white/80 text-xs">Online · Typically replies instantly</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle history"
              title="History (Ctrl+H)"
            >
              <History className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors hidden md:block"
              aria-label="Toggle fullscreen"
            >
              <Minimize2 className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100%-180px)] md:h-[calc(100%-200px)]"
          style={{ scrollBehavior: 'smooth' }}
          role="log"
          aria-live="polite"
          aria-label="Chat messages"
        >
          {/* Quick Actions - Show at start */}
          {messages.length <= 1 && (
            <QuickActions onAction={handleQuickAction} />
          )}

          {/* Messages */}
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLatest={index === messages.length - 1}
            />
          ))}

          {/* Typing Indicator */}
          {isTyping && <TypingIndicator />}

          {/* Lead Form */}
          {showLeadForm && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <LeadForm
                onSubmit={handleLeadFormSubmit}
                onCancel={() => onToggleLeadForm(false)}
              />
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 dark:border-gray-700/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <ChatInput onSendMessage={onSendMessage} />
        </div>

        {/* Branding */}
        <div className="text-center py-2 text-xs text-gray-500 dark:text-gray-400 bg-white/30 dark:bg-gray-900/30">
          Powered by <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">AiPlace</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatWindow;

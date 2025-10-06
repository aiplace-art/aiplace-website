import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Minimize2 } from 'lucide-react';
import ChatWindow from './ChatWindow';
import type { ChatState, Message } from './types';
import { useTranslation } from '@/lib/i18n/hooks';

interface ChatWidgetProps {
  onSendMessage?: (message: string) => Promise<string>;
  enableSounds?: boolean;
  position?: 'bottom-right' | 'bottom-left';
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  onSendMessage,
  enableSounds = false,
  position = 'bottom-right'
}) => {
  const { t } = useTranslation();
  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    messages: [],
    isTyping: false,
    showLeadForm: false,
    currentConversation: null,
    history: []
  });

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Initialize with welcome message
    if (chatState.messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        content: t('chat.welcome'),
        sender: 'assistant',
        timestamp: new Date()
      };
      setChatState(prev => ({ ...prev, messages: [welcomeMessage] }));
    }
  }, [t]);

  const toggleChat = () => {
    setChatState(prev => ({ ...prev, isOpen: !prev.isOpen }));
    if (!chatState.isOpen) {
      setUnreadCount(0);
    }
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isTyping: true
    }));

    // Play send sound
    if (enableSounds) {
      playSound('send');
    }

    try => {
      // Call the onSendMessage callback or use default response
      const response = onSendMessage
        ? await onSendMessage(content)
        : await getDefaultResponse(content);

      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date()
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, assistantMessage],
        isTyping: false
      }));

      // Play receive sound
      if (enableSounds) {
        playSound('receive');
      }

      // Update unread count if chat is closed
      if (!chatState.isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setChatState(prev => ({ ...prev, isTyping: false }));
    }
  };

  const getDefaultResponse = async (message: string): Promise<string> => {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('service') || lowerMessage.includes('help')) {
      return t('chat.responses.service');
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return t('chat.responses.price');
    }
    if (lowerMessage.includes('contact') || lowerMessage.includes('book')) {
      return t('chat.responses.contact');
    }

    return t('chat.responses.default');
  };

  const playSound = (type: 'send' | 'receive' | 'notification') => {
    // Implement sound playing logic here
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Ignore sound errors
    });
  };

  const positionClasses = position === 'bottom-right'
    ? 'right-4 md:right-6'
    : 'left-4 md:left-6';

  return (
    <div className={`fixed bottom-4 md:bottom-6 ${positionClasses} z-50`}>
      <AnimatePresence>
        {chatState.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <ChatWindow
              messages={chatState.messages}
              isTyping={chatState.isTyping}
              onSendMessage={handleSendMessage}
              onClose={toggleChat}
              showLeadForm={chatState.showLeadForm}
              onToggleLeadForm={(show) => setChatState(prev => ({ ...prev, showLeadForm: show }))}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Bubble */}
      <motion.button
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
        aria-label={chatState.isOpen ? t('common.ariaLabels.closeChat') : t('common.ariaLabels.openChat')}
      >
        {/* Gradient Background with Glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-xl backdrop-blur-sm border border-white/20">
          <motion.div
            animate={{ rotate: chatState.isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {chatState.isOpen ? (
              <X className="w-6 h-6 md:w-7 md:h-7 text-white" />
            ) : (
              <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-white" />
            )}
          </motion.div>

          {/* Unread Badge */}
          <AnimatePresence>
            {!chatState.isOpen && unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white border-2 border-white"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse Animation */}
          {!chatState.isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          )}
        </div>
      </motion.button>
    </div>
  );
};

export default ChatWidget;

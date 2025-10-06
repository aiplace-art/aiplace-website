import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Search, Trash2, Clock, MessageCircle, X } from 'lucide-react';
import type { ChatHistoryItem } from './types';

interface ChatHistoryProps {
  onSelectConversation: (id: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ onSelectConversation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Mock history data
  const historyItems: ChatHistoryItem[] = [
    {
      id: '1',
      title: 'AI Automation Services',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      preview: 'I need help with automating my business processes...',
      messages: []
    },
    {
      id: '2',
      title: 'Web Development Quote',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      preview: 'Can you provide an estimate for a full-stack web application?',
      messages: []
    },
    {
      id: '3',
      title: 'Mobile App Development',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      preview: 'Looking to build a React Native mobile app...',
      messages: []
    },
    {
      id: '4',
      title: 'AI Integration Support',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      preview: 'How can I integrate AI into my existing platform?',
      messages: []
    },
    {
      id: '5',
      title: 'Consultation Booking',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      preview: 'I would like to schedule a consultation call...',
      messages: []
    }
  ];

  const filteredHistory = historyItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    return date.toLocaleDateString();
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    console.log('Delete conversation:', id);
    // Implement delete logic
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-80 h-[600px] rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl bg-gradient-to-br from-white/95 via-white/90 to-white/95 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/95 border border-white/20 dark:border-gray-700/30 flex flex-col"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-4">
        <div className="flex items-center gap-2 mb-3">
          <History className="w-5 h-5 text-white" />
          <h3 className="text-white font-semibold">Chat History</h3>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <AnimatePresence>
          {filteredHistory.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500"
            >
              <MessageCircle className="w-12 h-12 mb-2 opacity-50" />
              <p className="text-sm">No conversations found</p>
            </motion.div>
          ) : (
            filteredHistory.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onSelectConversation(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="w-full text-left p-3 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate text-sm mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {item.title}
                    </h4>

                    {/* Preview */}
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {item.preview}
                    </p>

                    {/* Timestamp */}
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{formatRelativeTime(item.timestamp)}</span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <AnimatePresence>
                    {hoveredId === item.id && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={(e) => handleDelete(e, item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        aria-label="Delete conversation"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
          <span>{filteredHistory.length} conversation{filteredHistory.length !== 1 ? 's' : ''}</span>
          <button className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            Clear all
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHistory;

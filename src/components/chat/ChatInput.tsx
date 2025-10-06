import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Paperclip, Mic, Smile, X } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  maxLength?: number;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  placeholder = "Type your message...",
  maxLength = 2000
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  // Focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic here
    if (!isRecording) {
      console.log('Start recording...');
    } else {
      console.log('Stop recording...');
    }
  };

  const charCount = message.length;
  const isNearLimit = charCount > maxLength * 0.8;
  const isOverLimit = charCount > maxLength;

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className={`
        relative rounded-xl transition-all duration-200
        ${isFocused
          ? 'ring-2 ring-indigo-500 dark:ring-indigo-400 bg-white dark:bg-gray-800'
          : 'ring-1 ring-gray-200 dark:ring-gray-700 bg-gray-50 dark:bg-gray-800/50'
        }
      `}>
        {/* Recording Indicator */}
        {isRecording && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-10 left-0 right-0 bg-red-500 text-white px-4 py-2 rounded-lg flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-2 h-2 bg-white rounded-full"
              />
              <span className="text-sm font-medium">Recording...</span>
            </div>
            <button
              type="button"
              onClick={toggleRecording}
              className="p-1 hover:bg-red-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        <div className="flex items-end gap-2 p-2">
          {/* Action Buttons - Left */}
          <div className="flex gap-1 pb-2">
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              title="Attach file"
              aria-label="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors hidden md:block"
              title="Add emoji"
              aria-label="Add emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
          </div>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder={placeholder}
              className="w-full resize-none bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base py-2 max-h-[120px]"
              rows={1}
              maxLength={maxLength}
              aria-label="Message input"
            />

            {/* Character Counter */}
            {isNearLimit && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`absolute -top-6 right-0 text-xs ${
                  isOverLimit
                    ? 'text-red-500'
                    : 'text-yellow-600 dark:text-yellow-500'
                }`}
              >
                {charCount}/{maxLength}
              </motion.div>
            )}
          </div>

          {/* Action Buttons - Right */}
          <div className="flex gap-1 pb-2">
            {/* Voice Input */}
            <motion.button
              type="button"
              onClick={toggleRecording}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-2 rounded-lg transition-colors ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title="Voice input"
              aria-label="Voice input"
            >
              <Mic className="w-5 h-5" />
            </motion.button>

            {/* Send Button */}
            <motion.button
              type="submit"
              disabled={!message.trim() || isOverLimit}
              whileHover={{ scale: message.trim() && !isOverLimit ? 1.05 : 1 }}
              whileTap={{ scale: message.trim() && !isOverLimit ? 0.95 : 1 }}
              className={`p-2 rounded-lg transition-all ${
                message.trim() && !isOverLimit
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              }`}
              aria-label="Send message"
              title="Send (Enter)"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Keyboard Hint */}
        {isFocused && !message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute -bottom-6 left-0 text-xs text-gray-400 dark:text-gray-500"
          >
            Press Enter to send, Shift+Enter for new line
          </motion.div>
        )}
      </div>
    </form>
  );
};

export default ChatInput;

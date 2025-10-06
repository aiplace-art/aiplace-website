import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const TypingIndicator: React.FC = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -8 }
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-start gap-3"
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
          <Bot className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Typing Animation */}
      <div className="flex flex-col items-start">
        <motion.div
          className="rounded-2xl rounded-tl-none px-6 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg backdrop-blur-sm"
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="flex items-center gap-1.5">
            <motion.div
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={{ ...dotTransition, delay: 0 }}
              className="w-2 h-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full"
            />
            <motion.div
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={{ ...dotTransition, delay: 0.2 }}
              className="w-2 h-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full"
            />
            <motion.div
              variants={dotVariants}
              initial="initial"
              animate="animate"
              transition={{ ...dotTransition, delay: 0.4 }}
              className="w-2 h-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* "AI is typing..." label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-1 px-1 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"
        >
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            AI is typing
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            ...
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, DollarSign, Zap, MessageSquare, Phone } from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAction }) => {
  const actions = [
    {
      id: 'services',
      label: 'Our Services',
      icon: Sparkles,
      gradient: 'from-indigo-500 to-purple-500',
      description: 'Explore AI solutions'
    },
    {
      id: 'booking',
      label: 'Book Consultation',
      icon: Calendar,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Schedule a call'
    },
    {
      id: 'estimate',
      label: 'Get Estimate',
      icon: DollarSign,
      gradient: 'from-pink-500 to-orange-500',
      description: 'Free project quote'
    },
    {
      id: 'portfolio',
      label: 'View Portfolio',
      icon: Zap,
      gradient: 'from-orange-500 to-yellow-500',
      description: 'See our work'
    },
    {
      id: 'support',
      label: 'Support',
      icon: MessageSquare,
      gradient: 'from-green-500 to-teal-500',
      description: 'Get help now'
    },
    {
      id: 'contact',
      label: 'Contact Us',
      icon: Phone,
      gradient: 'from-teal-500 to-cyan-500',
      description: 'Reach our team'
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {/* Header */}
      <motion.div variants={item} className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
          How can I help you today?
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Choose a quick action or type your question below
        </p>
      </motion.div>

      {/* Action Grid */}
      <motion.div
        variants={container}
        className="grid grid-cols-2 gap-3"
      >
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.id}
              variants={item}
              onClick={() => onAction(action.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-xl p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient Background on Hover */}
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative flex flex-col items-center gap-2 text-center">
                {/* Icon */}
                <motion.div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </motion.div>

                {/* Label */}
                <div>
                  <div className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-0.5">
                    {action.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {action.description}
                  </div>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  className="absolute -right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: -5 }}
                  whileHover={{ x: 0 }}
                >
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Additional Info */}
      <motion.div
        variants={item}
        className="text-center pt-2"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Available 24/7 · Average response time: <span className="font-semibold text-indigo-600 dark:text-indigo-400">Instant</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default QuickActions;

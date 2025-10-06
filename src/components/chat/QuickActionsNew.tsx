'use client';

/**
 * Quick Actions Component
 * Pre-defined action buttons for quick navigation
 */

import { motion } from 'framer-motion';
import { Globe, Brain, Calendar, DollarSign, Briefcase, Coins } from 'lucide-react';
import { QUICK_ACTIONS } from '@/backend/config/ai-assistant.config';

interface QuickActionsProps {
  onActionClick: (message: string) => void;
}

const iconMap: Record<string, any> = {
  Globe,
  Brain,
  Calendar,
  DollarSign,
  Briefcase,
  Coins,
};

export default function QuickActions({ onActionClick }: QuickActionsProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 px-2">
        Quick actions
      </p>

      <div className="grid grid-cols-2 gap-2">
        {QUICK_ACTIONS.map((action, index) => {
          const Icon = iconMap[action.icon];

          return (
            <motion.button
              key={action.id}
              onClick={() => onActionClick(action.message)}
              className="flex items-center gap-2 px-3 py-2.5 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all text-left group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center group-hover:from-blue-500/30 group-hover:to-purple-600/30 transition-all">
                {Icon && <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
              </div>

              <span className="flex-1 text-xs font-medium text-gray-900 dark:text-white">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

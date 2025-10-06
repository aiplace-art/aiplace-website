'use client';

/**
 * Admin Dashboard - Conversations
 * View and manage all conversations
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  CheckCircle,
  Clock,
  TrendingUp,
  Users,
  Filter,
  Search,
  Download,
} from 'lucide-react';

interface Conversation {
  id: string;
  sessionId: string;
  status: string;
  leadScore: number;
  leadQualified: boolean;
  messageCount: number;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  total: number;
  active: number;
  qualified: number;
  converted: number;
  avgMessages: number;
  avgScore: number;
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const statsRes = await fetch('/api/chat/lead');
      if (statsRes.ok) {
        const data = await statsRes.json();
        setStats(data.stats);
      }

      // In a real implementation, this would fetch actual conversation data
      // For now, showing mock data structure

      setLoading(false);
    } catch (error) {
      console.error('Failed to load data:', error);
      setLoading(false);
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
    change,
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    change?: string;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            {change}
          </span>
        )}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
        {value}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Conversations Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor and manage AI assistant conversations
          </p>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Conversations"
              value={stats.total}
              icon={MessageSquare}
              color="from-blue-500 to-blue-600"
              change="+12%"
            />
            <StatCard
              title="Active Chats"
              value={stats.active}
              icon={Clock}
              color="from-green-500 to-green-600"
            />
            <StatCard
              title="Qualified Leads"
              value={stats.qualified}
              icon={CheckCircle}
              color="from-purple-500 to-purple-600"
              change="+8%"
            />
            <StatCard
              title="Conversion Rate"
              value={`${Math.round((stats.converted / stats.total) * 100)}%`}
              icon={TrendingUp}
              color="from-pink-500 to-pink-600"
              change="+5%"
            />
          </div>
        )}

        {/* Additional Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Average Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Messages per conversation
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stats.avgMessages.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Lead score
                  </span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {stats.avgScore.toFixed(0)}/100
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Data
                </button>
                <button className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors">
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'active'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => setFilter('qualified')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'qualified'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                }`}
              >
                Qualified
              </button>
            </div>
          </div>
        </div>

        {/* Conversations List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Conversations
            </h2>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                Loading conversations...
              </p>
            </div>
          ) : conversations.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {conversations.map((conv) => (
                <div
                  key={conv.id}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  {/* Conversation item content */}
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-mono text-gray-500 dark:text-gray-400">
                        {conv.sessionId}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            conv.leadQualified
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          Score: {conv.leadScore}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {conv.messageCount} messages
                        </span>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No conversations yet. The chat widget is ready to receive messages!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState } from "react";

export function ActivityStreamCard() {
  const [filter, setFilter] = useState<'all' | 'loans' | 'receipts' | 'staking'>('all');

  // Mock activity data - in real app, this would come from blockchain events
  const activities = [
    {
      id: 1,
      type: 'loan_repaid',
      title: 'Loan Repayment',
      description: 'Successfully repaid ₹45,000 loan',
      timestamp: '2 hours ago',
      icon: '💳',
      color: 'text-green-400',
      category: 'loans'
    },
    {
      id: 2,
      type: 'receipt_uploaded',
      title: 'Receipt Minted',
      description: 'New Wheat NFT receipt created (100 quintals)',
      timestamp: '1 day ago',
      icon: '📄',
      color: 'text-blue-400',
      category: 'receipts'
    },
    {
      id: 3,
      type: 'staking_reward',
      title: 'Staking Rewards',
      description: 'Earned ₹125.50 from Rice staking',
      timestamp: '2 days ago',
      icon: '🌱',
      color: 'text-purple-400',
      category: 'staking'
    },
    {
      id: 4,
      type: 'loan_taken',
      title: 'Loan Approved',
      description: 'Borrowed ₹90,000 against Soybean receipt',
      timestamp: '5 days ago',
      icon: '💰',
      color: 'text-orange-400',
      category: 'loans'
    },
    {
      id: 5,
      type: 'receipt_staked',
      title: 'Receipt Staked',
      description: 'Staked Wheat receipt for 18.5% APY',
      timestamp: '1 week ago',
      icon: '🔒',
      color: 'text-cyan-400',
      category: 'staking'
    }
  ];

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.category === filter);

  const filterOptions = [
    { key: 'all', label: 'All', icon: '📋' },
    { key: 'loans', label: 'Loans', icon: '💰' },
    { key: 'receipts', label: 'Receipts', icon: '📄' },
    { key: 'staking', label: 'Staking', icon: '🌱' }
  ];

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-gray-500/10 to-slate-500/10 border border-gray-500/20 rounded-3xl p-6 relative overflow-hidden h-full">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gray-500/20 to-slate-400/20 rounded-full blur-2xl animate-pulse"></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-500/20 rounded-full p-3">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Activity Stream</h3>
              <p className="text-gray-300 text-sm">Recent transactions</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto">
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setFilter(option.key as typeof filter)}
              className={`
                flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                ${filter === option.key 
                  ? 'bg-accent-green/20 text-accent-green border border-accent-green/30' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }
              `}
              suppressHydrationWarning={true}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>

        {/* Activity Feed */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {filteredActivities.map((activity) => (
            <div 
              key={activity.id}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start space-x-3">
                <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {activity.title}
                    </h4>
                    <span className="text-xs text-gray-400 ml-2">
                      {activity.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <button 
          className="mt-4 w-full backdrop-blur-sm bg-white/10 border border-white/20 text-white px-4 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105 text-sm"
          suppressHydrationWarning={true}
        >
          <span className="mr-2">📋</span>
          View All Transactions
        </button>
      </div>
    </div>
  );
}
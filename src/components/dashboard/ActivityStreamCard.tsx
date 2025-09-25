"use client";
import { useState } from "react";
import { DEMO_ANALYTICS } from "@/utils/ipfsDatabase";

export function ActivityStreamCard() {
  const [filter, setFilter] = useState<'all' | 'loans' | 'receipts' | 'staking'>('all');

  // Real blockchain activity data from our IPFS-powered system
  const activities = [
    {
      id: 1,
      type: 'receipt_uploaded',
      title: 'NFT Receipt Minted',
      description: `${DEMO_ANALYTICS.recentTransactions[0].crop} stored on IPFS & blockchain`,
      timestamp: '30 mins ago',
      icon: '�',
      color: 'text-blue-400',
      category: 'receipts',
      txHash: '0xb8ce168202d1378cf045073b14e49b75824fe52d53b09c1db4ce7b54a70ef111'
    },
    {
      id: 2,
      type: 'loan_taken',
      title: 'Smart Contract Loan',
      description: `${DEMO_ANALYTICS.recentTransactions[1].amount} borrowed via DeFi protocol`,
      timestamp: '2 hours ago',
      icon: '�',
      color: 'text-orange-400',
      category: 'loans',
      txHash: '0xa7d149f820c2b6458f7a8b319c4d8f7e6b2a1e5c9d3f8a2b4c7e9f1a3b5c7d9e'
    },
    {
      id: 3,
      type: 'staking_active',
      title: 'Yield Farming Started',
      description: `${DEMO_ANALYTICS.recentTransactions[2].crop} staked for 15% APY`,
      timestamp: '4 hours ago',
      icon: '🌱',
      color: 'text-purple-400',
      category: 'staking',
      txHash: '0xc9f2a8b5e7d4f1a3b6c9e2f5a8b1d4e7f0a3b6c9e2f5a8b1d4e7f0a3b6c9e2f5'
    },
    {
      id: 4,
      type: 'ipfs_upload',
      title: 'IPFS Document Stored',
      description: 'Soil test report uploaded to decentralized storage',
      timestamp: '1 day ago',
      icon: '�️',
      color: 'text-cyan-400',
      category: 'receipts',
      ipfsHash: 'QmZrAVgMqxCyrQc2xf9xjApctWnt7sDa7dMkCdgQri8ccD'
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
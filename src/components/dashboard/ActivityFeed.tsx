"use client";

import { useState } from "react";

interface Activity {
  id: string;
  type: 'deposit' | 'loan' | 'repayment';
  description: string;
  amount?: number;
  timestamp: string;
}

export function ActivityFeed() {
  // Mock data - in a real app, this would come from blockchain transactions
  const [activities] = useState<Activity[]>([
    {
      id: "1",
      type: 'deposit',
      description: "Deposited Wheat Receipt #123",
      timestamp: "2025-09-20T10:30:00Z"
    },
    {
      id: "2",
      type: 'loan',
      description: "Loan of ₹1,50,000 taken",
      amount: 150000,
      timestamp: "2025-09-15T14:45:00Z"
    },
    {
      id: "3",
      type: 'deposit',
      description: "Deposited Rice Receipt #124",
      timestamp: "2025-09-10T09:15:00Z"
    },
    {
      id: "4",
      type: 'repayment',
      description: "Loan Repaid",
      amount: 105000,
      timestamp: "2025-09-05T16:20:00Z"
    },
    {
      id: "5",
      type: 'deposit',
      description: "Deposited Soybean Receipt #125",
      timestamp: "2025-08-25T11:30:00Z"
    }
  ]);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'deposit':
        return (
          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'loan':
        return (
          <div className="w-8 h-8 bg-accent-green/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
        );
      case 'repayment':
        return (
          <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Yesterday";
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
      <h2 className="text-2xl font-semibold text-white mb-6">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-white/5 rounded-lg transition-colors duration-200">
            {getActivityIcon(activity.type)}
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">
                {activity.description}
              </p>
              {activity.amount && (
                <p className="text-sm text-accent-green">
                  ₹{activity.amount.toLocaleString()}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {formatTimestamp(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-400 text-sm">No recent activity</p>
        </div>
      )}
    </div>
  );
}
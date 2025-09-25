"use client";

export function QuickStatsCard() {
  // Mock data - in real app, this would come from blockchain/API
  const stats = {
    totalAssetValue: 425000,
    monthlyEarnings: 12450,
    portfolioGrowth: 15.8,
    activeDays: 45
  };

  const quickMetrics = [
    {
      label: "Total Asset Value",
      value: `₹${stats.totalAssetValue.toLocaleString()}`,
      change: `+₹${stats.monthlyEarnings.toLocaleString()} this month`,
      icon: "💎",
      color: "from-emerald-500 to-green-400",
      positive: true
    },
    {
      label: "Portfolio Growth",
      value: `${stats.portfolioGrowth}%`,
      change: "Last 30 days",
      icon: "📈",
      color: "from-blue-500 to-cyan-400",
      positive: true
    },
    {
      label: "Platform Usage",
      value: `${stats.activeDays} days`,
      change: "Active member",
      icon: "⭐",
      color: "from-purple-500 to-pink-400",
      positive: true
    }
  ];

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden h-full">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-green-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-500/15 to-emerald-400/15 rounded-full blur-xl animate-pulse animation-delay-300"></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-emerald-500/20 rounded-full p-3">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Quick Stats</h3>
            <p className="text-emerald-300 text-sm">Your performance overview</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex-1 space-y-4">
          {quickMetrics.map((metric, index) => (
            <div 
              key={index}
              className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`bg-gradient-to-r ${metric.color} rounded-full p-2 text-sm group-hover:scale-110 transition-transform duration-300`}>
                    {metric.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">{metric.label}</div>
                    <div className="text-lg font-bold text-white">{metric.value}</div>
                  </div>
                </div>
              </div>
              
              <div className={`text-xs mt-2 ${metric.positive ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Insights */}
        <div className="mt-4 backdrop-blur-sm bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Platform Rank</div>
              <div className="text-xs text-emerald-300">Top 5% of farmers</div>
            </div>
            <div className="text-2xl">🏆</div>
          </div>
        </div>

        {/* Quick Action */}
        <button 
          className="mt-4 w-full bg-gradient-to-r from-emerald-500/20 to-green-400/20 border border-emerald-400/30 text-emerald-300 px-4 py-3 rounded-full font-semibold hover:from-emerald-500/30 hover:to-green-400/30 transition-all duration-300 hover:scale-105 text-sm"
          suppressHydrationWarning={true}
        >
          <span className="mr-2">📋</span>
          View Detailed Report
        </button>
      </div>
    </div>
  );
}
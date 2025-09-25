"use client";
import { useState, useEffect } from "react";

export function KisanSanchayCard() {
  const [totalStaked, setTotalStaked] = useState(0);
  const [totalRewards, setTotalRewards] = useState(234.56);
  const [stakingAPY, setStakingAPY] = useState(18.5);
  const [rewardsTimer, setRewardsTimer] = useState(0);

  // Mock staked receipts data
  const stakedReceipts = [
    { id: 1, crop: "Wheat", quantity: 50, stakingValue: 75000, dailyRewards: 15.2, stakedDays: 12 },
    { id: 2, crop: "Rice", quantity: 30, stakingValue: 45000, dailyRewards: 9.8, stakedDays: 8 },
  ];

  const totalStakedValue = stakedReceipts.reduce((sum, receipt) => sum + receipt.stakingValue, 0);
  const dailyRewardsRate = stakedReceipts.reduce((sum, receipt) => sum + receipt.dailyRewards, 0);

  // Real-time rewards counter
  useEffect(() => {
    if (totalStakedValue > 0) {
      const timer = setInterval(() => {
        setTotalRewards(prev => prev + (dailyRewardsRate / (24 * 60 * 60))); // Per second increment
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [totalStakedValue, dailyRewardsRate]);

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-3xl p-6 relative overflow-hidden h-full">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-500/15 to-purple-400/15 rounded-full blur-xl animate-pulse animation-delay-200"></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-purple-500/20 rounded-full p-3">
            <span className="text-2xl">🌱</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Kisan Sanchay</h3>
            <p className="text-purple-300 text-sm">Earn rewards on idle receipts</p>
          </div>
        </div>

        {totalStakedValue > 0 ? (
          <>
            {/* Staking Stats */}
            <div className="flex-1">
              {/* Total Staked */}
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-400 mb-1">Total Staked Value</div>
                <div className="text-2xl font-bold text-white">₹{totalStakedValue.toLocaleString()}</div>
                <div className="text-xs text-purple-300 mt-1">{stakedReceipts.length} receipts staked</div>
              </div>

              {/* Real-time Rewards */}
              <div className="backdrop-blur-sm bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm text-gray-400">Total Rewards Earned</div>
                  <div className="flex items-center text-xs text-purple-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-1 animate-pulse"></div>
                    Live
                  </div>
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                  ₹{totalRewards.toFixed(2)}
                </div>
                <div className="text-xs text-purple-300 mt-1">+₹{dailyRewardsRate.toFixed(1)}/day</div>
              </div>

              {/* APY Display */}
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-400 mb-1">Current APY</div>
                <div className="text-xl font-bold text-green-400">{stakingAPY}%</div>
                <div className="text-xs text-gray-400 mt-1">Updated daily</div>
              </div>

              {/* Staked Receipts List */}
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
                <div className="text-sm text-gray-400 mb-3">Your Staked Receipts:</div>
                <div className="space-y-2">
                  {stakedReceipts.map((receipt) => (
                    <div key={receipt.id} className="flex justify-between text-xs">
                      <span className="text-gray-300">{receipt.crop} ({receipt.quantity}q)</span>
                      <span className="text-purple-300">₹{receipt.dailyRewards.toFixed(1)}/day</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button 
                className="w-full bg-gradient-to-r from-purple-500 to-pink-400 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-400 hover:to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                suppressHydrationWarning={true}
              >
                <span className="mr-2">💰</span>
                Claim Rewards
              </button>
              
              <button 
                className="w-full backdrop-blur-sm bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
                suppressHydrationWarning={true}
              >
                <span className="mr-2">📤</span>
                Unstake Receipts
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Empty State */}
            <div className="flex-1 flex flex-col justify-center text-center">
              <div className="text-6xl mb-4 opacity-50">🌱</div>
              <h4 className="text-lg font-semibold text-white mb-3">Start Earning Passive Income</h4>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Stake your available crop receipt NFTs to earn up to {stakingAPY}% APY while waiting for better market prices.
              </p>
              
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
                <div className="text-xs text-gray-400 mb-2">Benefits of Staking:</div>
                <div className="space-y-1 text-xs text-gray-300">
                  <div>• Earn daily rewards in KISAN tokens</div>
                  <div>• Maintain ownership of your receipts</div>
                  <div>• Unstake anytime without penalties</div>
                  <div>• Contribute to platform liquidity</div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <button 
              className="w-full bg-gradient-to-r from-purple-500/50 to-pink-400/50 border border-purple-400/50 text-purple-200 px-6 py-3 rounded-full font-semibold hover:from-purple-500 hover:to-pink-400 hover:text-white transition-all duration-300 hover:scale-105"
              suppressHydrationWarning={true}
            >
              <span className="mr-2">🚀</span>
              Explore Staking Options
            </button>
          </>
        )}
      </div>
    </div>
  );
}
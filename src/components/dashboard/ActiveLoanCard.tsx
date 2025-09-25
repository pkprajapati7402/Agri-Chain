"use client";
import { useState, useEffect } from "react";

export function ActiveLoanCard() {
  const [timeLeft, setTimeLeft] = useState("");
  
  // Mock active loan data - in real app, this would come from blockchain
  const hasActiveLoan = true;
  const loanData = {
    principalAmount: 90000,
    interestAccrued: 750,
    totalToRepay: 90750,
    dueDate: "2025-10-15",
    collateralCrop: "Soybean",
    collateralQuantity: 50,
    interestRate: 12,
    loanStartDate: "2025-09-15",
    dailyInterest: 25
  };

  useEffect(() => {
    if (!hasActiveLoan) return;
    
    const updateTimeLeft = () => {
      const now = new Date().getTime();
      const dueDate = new Date(loanData.dueDate).getTime();
      const distance = dueDate - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        setTimeLeft(`${days} days ${hours} hours`);
      } else {
        setTimeLeft("Overdue");
      }
    };

    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, [hasActiveLoan, loanData.dueDate]);

  if (!hasActiveLoan) {
    return (
      <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-3xl p-8">
        <div className="text-center">
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Unlock Your Crop's Value?</h3>
          <p className="text-gray-300 mb-6">
            No active loans. Your crop receipts are ready to be leveraged for instant liquidity.
          </p>
          <button className="bg-gradient-to-r from-accent-green to-green-400 text-primary-dark px-8 py-4 rounded-full font-semibold hover:from-green-400 hover:to-accent-green transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent-green/25">
            Explore Loan Options
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = ((loanData.principalAmount + loanData.interestAccrued) / loanData.totalToRepay) * 100;

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-3xl p-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:30px_30px] animate-pulse"></div>
      
      {/* Urgent indicator if due soon */}
      {timeLeft.includes("days") && parseInt(timeLeft) < 7 && (
        <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/40 rounded-full px-3 py-1 text-red-300 text-xs font-medium animate-pulse">
          ⚠️ Due Soon
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500/20 rounded-full p-3">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">My Active Loan</h3>
              <p className="text-orange-300">Loan ID: #KK{Date.now().toString().slice(-6)}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">Time Remaining</div>
            <div className={`text-lg font-bold ${timeLeft === "Overdue" ? "text-red-400" : "text-orange-300"}`}>
              {timeLeft}
            </div>
          </div>
        </div>

        {/* Main Loan Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Principal Amount */}
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Principal Borrowed</div>
            <div className="text-2xl font-bold text-white">₹{loanData.principalAmount.toLocaleString()}</div>
            <div className="text-xs text-green-400 mt-1">@ {loanData.interestRate}% annual</div>
          </div>

          {/* Interest Accrued */}
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Interest Accrued</div>
            <div className="text-2xl font-bold text-orange-300">₹{loanData.interestAccrued.toLocaleString()}</div>
            <div className="text-xs text-orange-400 mt-1">+₹{loanData.dailyInterest}/day</div>
          </div>

          {/* Total to Repay */}
          <div className="backdrop-blur-sm bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl p-6">
            <div className="text-sm text-gray-400 mb-2">Total to Repay</div>
            <div className="text-2xl font-bold text-white">₹{loanData.totalToRepay.toLocaleString()}</div>
            <div className="text-xs text-orange-300 mt-1">Final amount due</div>
          </div>
        </div>

        {/* Collateral Information */}
        <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Collateral Details</h4>
            <div className="flex items-center space-x-2 text-sm text-yellow-400">
              <span>🔒</span>
              <span>Secured & Locked</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Crop Type</div>
              <div className="text-white font-medium">{loanData.collateralCrop}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Quantity Locked</div>
              <div className="text-white font-medium">{loanData.collateralQuantity} quintals</div>
            </div>
          </div>
        </div>

        {/* Repayment Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Repayment Progress</span>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-400 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            className="flex-1 bg-gradient-to-r from-accent-green to-green-400 text-primary-dark px-8 py-4 rounded-full font-bold text-lg hover:from-green-400 hover:to-accent-green transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent-green/25"
            suppressHydrationWarning={true}
          >
            <span className="mr-2">💳</span>
            Repay Loan Now
          </button>
          
          <button 
            className="backdrop-blur-sm bg-white/10 border border-white/20 text-white px-6 py-4 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
            suppressHydrationWarning={true}
          >
            View Details
          </button>
          
          <button 
            className="backdrop-blur-sm bg-blue-500/20 border border-blue-500/30 text-blue-300 px-6 py-4 rounded-full font-semibold hover:bg-blue-500/30 transition-all duration-300 hover:scale-105"
            suppressHydrationWarning={true}
          >
            Payment History
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";
import React from "react";

interface LoanPowerCardProps {
  onTakeLoan: () => void;
}

export function LoanPowerCard({ onTakeLoan }: LoanPowerCardProps) {
  // Mock data for available receipts - in real app, this would come from blockchain
  const availableReceipts = [
    { id: 1, crop: "Wheat", quantity: 100, loanEligible: 150000, status: "AVAILABLE" },
    { id: 2, crop: "Rice", quantity: 80, loanEligible: 120000, status: "AVAILABLE" },
    // Soybean is locked as collateral, so not included in available
  ];

  const totalLoanPower = availableReceipts
    .filter(receipt => receipt.status === "AVAILABLE")
    .reduce((sum, receipt) => sum + receipt.loanEligible, 0);

  const hasAvailableReceipts = availableReceipts.length > 0;

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-6 relative overflow-hidden h-full">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-cyan-500/15 to-blue-400/15 rounded-full blur-xl"></div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-blue-500/20 rounded-full p-3">
            <span className="text-2xl">⚡</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Loan Power</h3>
            <p className="text-blue-300 text-sm">Available borrowing capacity</p>
          </div>
        </div>

        {/* Main Amount Display */}
        <div className="flex-1 flex flex-col justify-center mb-6">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Available to Borrow</div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-4">
              ₹{totalLoanPower.toLocaleString()}
            </div>
            
            {hasAvailableReceipts ? (
              <div className="text-xs text-gray-400 mb-4">
                Based on {availableReceipts.length} unlocked receipt{availableReceipts.length > 1 ? 's' : ''}
              </div>
            ) : (
              <div className="text-xs text-red-400 mb-4">
                No available receipts for borrowing
              </div>
            )}
          </div>

          {/* Receipt Breakdown */}
          {hasAvailableReceipts && (
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
              <div className="text-xs text-gray-400 mb-3">Breakdown by Crop:</div>
              <div className="space-y-2">
                {availableReceipts.map((receipt) => (
                  <div key={receipt.id} className="flex justify-between text-sm">
                    <span className="text-gray-300">{receipt.crop} ({receipt.quantity}q)</span>
                    <span className="text-blue-300 font-medium">₹{receipt.loanEligible.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <button 
          onClick={onTakeLoan}
          disabled={!hasAvailableReceipts}
          className={`
            w-full px-6 py-4 rounded-full font-semibold transition-all duration-300 
            ${hasAvailableReceipts 
              ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white hover:from-cyan-400 hover:to-blue-500 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }
          `}
          suppressHydrationWarning={true}
        >
          {hasAvailableReceipts ? (
            <>
              <span className="mr-2">💸</span>
              Take a New Loan
            </>
          ) : (
            <>
              <span className="mr-2">🔒</span>
              No Available Receipts
            </>
          )}
        </button>

        {/* Info Note */}
        <div className="mt-4 text-xs text-center text-gray-500">
          {hasAvailableReceipts ? (
            "Instant approval • Competitive rates • Secure on blockchain"
          ) : (
            "Upload crop receipts to unlock borrowing power"
          )}
        </div>
      </div>
    </div>
  );
}
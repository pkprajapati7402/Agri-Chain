"use client";

import { useState } from "react";
import { Modal } from "./Modal";

interface BorrowLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  maxAmount: number;
}

export function BorrowLoanModal({ isOpen, onClose, maxAmount }: BorrowLoanModalProps) {
  const [loanAmount, setLoanAmount] = useState(maxAmount * 0.3); // Default to 30%
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestRate = 5; // 5% APR
  const totalRepayment = loanAmount * (1 + interestRate / 100);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanAmount(Number(e.target.value));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate loan processing - in a real app, this would interact with smart contract
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert(`Loan of ₹${loanAmount.toLocaleString()} successfully processed!`);
      onClose();
    } catch (error) {
      console.error("Error processing loan:", error);
      alert("Failed to process loan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Borrow Loan">
      <div className="space-y-6">
        {/* Loan Amount Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Select Loan Amount
          </label>
          
          {/* Amount Display */}
          <div className="text-center mb-4">
            <p className="text-3xl font-bold text-accent-green">
              ₹{loanAmount.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {((loanAmount / maxAmount) * 100).toFixed(1)}% of available limit
            </p>
          </div>

          {/* Slider */}
          <div className="px-2">
            <input
              type="range"
              min={maxAmount * 0.1} // Minimum 10%
              max={maxAmount}
              step={1000}
              value={loanAmount}
              onChange={handleSliderChange}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-accent-green"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>₹{(maxAmount * 0.1).toLocaleString()}</span>
              <span>₹{maxAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Loan Details */}
        <div className="bg-white/5 rounded-lg p-4 space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Loan Amount:</span>
            <span className="text-white font-semibold">
              ₹{loanAmount.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Interest Rate (APR):</span>
            <span className="text-white font-semibold">{interestRate}%</span>
          </div>
          
          <div className="flex justify-between border-t border-white/10 pt-3">
            <span className="text-gray-400">Total Repayment:</span>
            <span className="text-accent-green font-bold text-lg">
              ₹{totalRepayment.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Terms */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-2">Loan Terms:</h4>
          <ul className="text-sm text-blue-300 space-y-1">
            <li>• Instant approval and disbursement</li>
            <li>• No prepayment penalty</li>
            <li>• Your crops remain safely stored</li>
            <li>• Receipt NFT will be locked as collateral</li>
          </ul>
        </div>

        {/* Quick Amount Buttons */}
        <div>
          <p className="text-sm text-gray-400 mb-3">Quick select:</p>
          <div className="grid grid-cols-4 gap-2">
            {[0.25, 0.4, 0.6, 0.8].map((percentage) => {
              const amount = maxAmount * percentage;
              return (
                <button
                  key={percentage}
                  onClick={() => setLoanAmount(amount)}
                  className={`px-3 py-2 text-xs rounded-lg transition-colors duration-200 ${
                    Math.abs(loanAmount - amount) < 1000
                      ? 'bg-accent-green text-black font-semibold'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {(percentage * 100)}%
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || loanAmount < maxAmount * 0.1}
            className="flex-1 px-4 py-3 bg-accent-green text-black font-semibold rounded-lg hover:bg-green-400 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Confirm Loan"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
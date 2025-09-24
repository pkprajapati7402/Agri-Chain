"use client";

import { useState } from "react";
import { Modal } from "./Modal";

interface Loan {
  amount: number;
  totalRepayment: number;
  dueDate: string;
  isActive: boolean;
}

interface RepayLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  loan: Loan;
}

export function RepayLoanModal({ isOpen, onClose, loan }: RepayLoanModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRepayment = async () => {
    setIsSubmitting(true);

    // Simulate repayment processing - in a real app, this would interact with smart contract
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      alert(`Loan of ₹${loan.totalRepayment.toLocaleString()} successfully repaid!`);
      onClose();
    } catch (error) {
      console.error("Error processing repayment:", error);
      alert("Failed to process repayment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Repay Loan">
      <div className="space-y-6">
        {/* Loan Summary */}
        <div className="bg-white/5 rounded-lg p-4 space-y-3">
          <h3 className="text-lg font-semibold text-white mb-4">
            Loan Summary
          </h3>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Original Amount:</span>
            <span className="text-white font-semibold">
              ₹{loan.amount.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Interest:</span>
            <span className="text-white font-semibold">
              ₹{(loan.totalRepayment - loan.amount).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between border-t border-white/10 pt-3">
            <span className="text-gray-400">Total Amount to Pay:</span>
            <span className="text-red-400 font-bold text-xl">
              ₹{loan.totalRepayment.toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-400">Due Date:</span>
            <span className="text-white font-semibold">
              {loan.dueDate}
            </span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-blue-400 font-semibold mb-3">Payment Method</h4>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input
                type="radio"
                name="paymentMethod"
                value="wallet"
                defaultChecked
                className="text-accent-green focus:ring-accent-green"
              />
              <span className="text-blue-300">Pay with Connected Wallet</span>
            </label>
            <p className="text-xs text-blue-300/80 ml-6">
              Payment will be deducted from your connected Aptos wallet
            </p>
          </div>
        </div>

        {/* What Happens After Repayment */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-2">After Repayment:</h4>
          <ul className="text-sm text-green-300 space-y-1">
            <li>• Your receipt NFT will be unlocked</li>
            <li>• Full ownership of crops restored</li>
            <li>• Can withdraw crops from warehouse</li>
            <li>• Eligible for new loans immediately</li>
          </ul>
        </div>

        {/* Confirmation */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <svg className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="text-sm text-yellow-300">
              <p className="font-medium">Important:</p>
              <p className="text-yellow-300/80">
                This action cannot be undone. Please ensure you have sufficient balance in your wallet.
              </p>
            </div>
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
            onClick={handleRepayment}
            disabled={isSubmitting}
            className="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : `Repay ₹${loan.totalRepayment.toLocaleString()}`}
          </button>
        </div>
      </div>
    </Modal>
  );
}
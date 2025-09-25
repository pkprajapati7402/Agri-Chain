"use client";

import { useState, useEffect } from "react";
import { BlockchainIntegration } from "@/utils/ipfsDatabase";

interface RepayLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (txHash: string) => void;
}

export function RepayLoanModal({ isOpen, onClose, onComplete }: RepayLoanModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  
  const loanDetails = {
    loanId: "LOAN#001",
    principal: 150000,
    interest: 15000,
    totalAmount: 165000,
    farmerName: "Rajesh Kumar",
    cropType: "Rice - 2500kg",
    loanDate: "2025-08-15",
    dueDate: "2025-11-15",
    interestRate: "10% APR"
  };

  const repaymentSteps = [
    {
      id: 1,
      title: "Calculating Final Amount",
      description: "Computing principal + interest + any fees",
      icon: "🧮",
      duration: 800
    },
    {
      id: 2,
      title: "Verifying Wallet Balance",
      description: "Checking sufficient funds for repayment",
      icon: "💳",
      duration: 600
    },
    {
      id: 3,
      title: "Executing Payment",
      description: "Transferring funds to lending pool",
      icon: "💸",
      duration: 1200
    },
    {
      id: 4,
      title: "Updating Loan Status",
      description: "Marking loan as fully repaid on blockchain",
      icon: "📋",
      duration: 900
    },
    {
      id: 5,
      title: "Unlocking NFT Receipt",
      description: "Returning receipt NFT to farmer's wallet",
      icon: "🔓",
      duration: 700
    },
    {
      id: 6,
      title: "Transaction Complete",
      description: "Loan successfully repaid and receipt returned",
      icon: "✅",
      duration: 500
    }
  ];

  const startRepayment = async () => {
    setIsProcessing(true);
    setCurrentStep(0);
    setCompletedSteps([]);

    // Simulate each step
    for (let i = 0; i < repaymentSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, repaymentSteps[i].duration));
      
      setCompletedSteps(prev => {
        const newCompleted = [...prev];
        newCompleted[i] = true;
        return newCompleted;
      });
    }

    // Execute actual blockchain transaction
    const txHash = await BlockchainIntegration.repayLoan(loanDetails.loanId, loanDetails.totalAmount);
    
    setIsProcessing(false);
    onComplete(txHash);
  };

  const resetModal = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsProcessing(false);
  };

  useEffect(() => {
    if (!isOpen) {
      resetModal();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Repay DeFi Loan</h3>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Loan Details */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-400 mb-3">Loan Details</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">Loan ID:</span>
              <span className="text-white font-mono">{loanDetails.loanId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Farmer:</span>
              <span className="text-white">{loanDetails.farmerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Collateral:</span>
              <span className="text-white">{loanDetails.cropType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Principal:</span>
              <span className="text-white">₹{loanDetails.principal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Interest ({loanDetails.interestRate}):</span>
              <span className="text-white">₹{loanDetails.interest.toLocaleString()}</span>
            </div>
            <hr className="border-gray-600 my-2" />
            <div className="flex justify-between font-semibold">
              <span className="text-gray-300">Total Amount:</span>
              <span className="text-accent-green">₹{loanDetails.totalAmount.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Repayment Process */}
        <div className="space-y-3 mb-6">
          <div className="text-sm text-gray-400 mb-3">Repayment Process</div>
          {repaymentSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                index === currentStep && isProcessing
                  ? 'bg-accent-green/20 border border-accent-green/30'
                  : completedSteps[index]
                  ? 'bg-green-500/20 border border-green-500/30'
                  : 'bg-gray-800/30 border border-gray-700'
              }`}
            >
              <div className="text-xl">
                {completedSteps[index] ? '✅' : 
                 index === currentStep && isProcessing ? 
                 <div className="animate-spin">⏳</div> : step.icon}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  completedSteps[index] ? 'text-green-400' : 'text-white'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-400">{step.description}</div>
              </div>
              {index === currentStep && isProcessing && (
                <div className="w-4 h-4 border-2 border-accent-green border-t-transparent rounded-full animate-spin"></div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={startRepayment}
            disabled={isProcessing}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-accent-green to-green-400 text-primary-dark font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : `Repay ₹${loanDetails.totalAmount.toLocaleString()}`}
          </button>
        </div>

        {/* Warning */}
        <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <div className="text-yellow-400 text-xs">
            ⚠️ This will permanently repay your loan and unlock your NFT receipt. Make sure you have sufficient funds.
          </div>
        </div>
      </div>
    </div>
  );
}
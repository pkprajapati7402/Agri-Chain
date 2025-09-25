"use client";

import { useState } from "react";
import { BlockchainIntegration, DEMO_CROP_DATA } from "@/utils/ipfsDatabase";
import { RepayLoanModal } from "@/components/RepayLoanModal";

export function DemoTransactionButton() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<string | null>(null);
  const [transactionType, setTransactionType] = useState<'mint' | 'loan' | 'stake' | 'repay'>('mint');
  const [showRepayModal, setShowRepayModal] = useState(false);

  const simulateTransaction = async () => {
    // Special handling for repay - show detailed modal
    if (transactionType === 'repay') {
      setShowRepayModal(true);
      return;
    }

    setIsProcessing(true);
    
    // Simulate blockchain processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    let txHash = '';
    
    switch(transactionType) {
      case 'mint':
        txHash = await BlockchainIntegration.mintNFTReceipt(DEMO_CROP_DATA[0]);
        break;
      case 'loan':
        txHash = await BlockchainIntegration.takeLoan("NFT#001", 150000);
        break;
      case 'stake':
        txHash = await BlockchainIntegration.stakeReceipt("NFT#001", 180);
        break;
    }
    
    setLastTransaction(txHash);
    setIsProcessing(false);
  };

  const handleRepayComplete = (txHash: string) => {
    setLastTransaction(txHash);
    setShowRepayModal(false);
  };

  const transactionLabels = {
    mint: '🏭 Mint NFT Receipt',
    loan: '💰 Take DeFi Loan', 
    stake: '🌱 Start Yield Farming',
    repay: '🔄 Repay Loan + Interest'
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-4">
      {/* Transaction Type Selector */}
      <div className="bg-gray-900/90 backdrop-blur-xl border border-gray-700 rounded-2xl p-4">
        <div className="text-white text-sm font-medium mb-3">Demo Transaction:</div>
        <div className="flex flex-col space-y-2">
          {Object.entries(transactionLabels).map(([type, label]) => (
            <button
              key={type}
              onClick={() => setTransactionType(type as any)}
              className={`px-3 py-2 rounded-lg text-sm transition-all ${
                transactionType === type
                  ? 'bg-accent-green text-primary-dark font-medium'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Execute Transaction Button */}
      <button
        onClick={simulateTransaction}
        disabled={isProcessing}
        className={`bg-gradient-to-r from-accent-green to-green-400 text-primary-dark px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-green/25 flex items-center space-x-3 ${
          isProcessing ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-dark"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <span className="text-xl">{transactionType === 'repay' ? '💸' : '⛓️'}</span>
            <span>{transactionType === 'repay' ? 'Open Repayment' : 'Execute on Blockchain'}</span>
          </>
        )}
      </button>

      {/* Last Transaction Result */}
      {lastTransaction && (
        <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 max-w-sm">
          <div className="text-green-400 text-sm font-medium mb-2">✅ Transaction Successful!</div>
          <div className="text-gray-300 text-xs">
            Hash: {lastTransaction.substring(0, 20)}...
          </div>
          <a 
            href={`https://explorer.aptoslabs.com/txn/${lastTransaction}?network=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-green text-xs hover:underline mt-1 block"
          >
            View on Explorer →
          </a>
        </div>
      )}

      {/* Repay Loan Modal */}
      <RepayLoanModal
        isOpen={showRepayModal}
        onClose={() => setShowRepayModal(false)}
        onComplete={handleRepayComplete}
      />
    </div>
  );
}
"use client";
import { useState } from "react";
import { DEMO_CROP_DATA, IPFSStorage } from "@/utils/ipfsDatabase";

interface MyReceiptsGridProps {
  onUploadReceipt: () => void;
}

export function MyReceiptsGrid({ onUploadReceipt }: MyReceiptsGridProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'available' | 'staked' | 'locked'>('available');

  // Real IPFS-stored receipts data converted to dashboard format
  const receipts = {
    available: [
      {
        id: 1,
        crop: DEMO_CROP_DATA[0].cropType + " - " + DEMO_CROP_DATA[0].variety,
        quantity: DEMO_CROP_DATA[0].quantity,
        quality: DEMO_CROP_DATA[0].qualityGrade,
        warehouse: DEMO_CROP_DATA[0].warehouseDetails.name,
        mintedDate: DEMO_CROP_DATA[0].harvestDate,
        loanEligible: Math.floor(DEMO_CROP_DATA[0].quantity * 2850 * 0.75), // 75% LTV
        marketValue: DEMO_CROP_DATA[0].quantity * 2850, // Current market price
        status: "AVAILABLE",
        nftId: "NFT#KK001",
        expiryDate: "2026-03-15",
        ipfsHash: DEMO_CROP_DATA[0].photos[0], // Show IPFS integration
        location: `${DEMO_CROP_DATA[0].location.village}, ${DEMO_CROP_DATA[0].location.district}`
      },
      {
        id: 2,
        crop: DEMO_CROP_DATA[1].cropType + " - " + DEMO_CROP_DATA[1].variety,
        quantity: DEMO_CROP_DATA[1].quantity,
        quality: DEMO_CROP_DATA[1].qualityGrade,
        warehouse: DEMO_CROP_DATA[1].warehouseDetails.name,
        mintedDate: DEMO_CROP_DATA[1].harvestDate,
        loanEligible: Math.floor(DEMO_CROP_DATA[1].quantity * 2150 * 0.75),
        marketValue: DEMO_CROP_DATA[1].quantity * 2150,
        status: "AVAILABLE", 
        nftId: "NFT#KK002",
        expiryDate: "2026-03-10",
        ipfsHash: DEMO_CROP_DATA[1].photos[0],
        location: `${DEMO_CROP_DATA[1].location.village}, ${DEMO_CROP_DATA[1].location.district}`
      }
    ],
    staked: [
      {
        id: 3,
        crop: "Wheat",
        quantity: 50,
        quality: "A Grade",
        warehouse: "Northern Storage, Haryana",
        mintedDate: "2025-08-15",
        stakingValue: 75000,
        dailyRewards: 15.2,
        stakedDays: 12,
        status: "STAKED",
        nftId: "NFT#KK003",
        apy: 18.5
      }
    ],
    locked: [
      {
        id: 4,
        crop: "Soybean",
        quantity: 50,
        quality: "Export Grade",
        warehouse: "Premium Vault, MP",
        mintedDate: "2025-09-15",
        loanAmount: 90000,
        loanDueDate: "2025-10-15",
        status: "LOCKED",
        nftId: "NFT#KK004"
      }
    ]
  };

  const currentReceipts = receipts[viewMode] || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-300';
      case 'STAKED': return 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300';
      case 'LOCKED': return 'from-orange-500/20 to-red-500/20 border-orange-500/30 text-orange-300';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'AVAILABLE': return '✅';
      case 'STAKED': return '🌱';
      case 'LOCKED': return '🔒';
      default: return '📄';
    }
  };

  return (
    <div className="backdrop-blur-xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-2xl animate-pulse animation-delay-300"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-500/20 rounded-full p-4">
              <span className="text-3xl">📋</span>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">My Crop Receipts</h3>
              <p className="text-gray-400">Digital NFT certificates of your stored crops</p>
            </div>
          </div>
          
          <button 
            onClick={onUploadReceipt}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/25 flex items-center space-x-2"
            suppressHydrationWarning={true}
          >
            <span className="text-xl">➕</span>
            <span>Upload New Receipt</span>
          </button>
        </div>

        {/* View Mode Tabs */}
        <div className="flex space-x-4 mb-8">
          {[
            { key: 'available', label: 'Available', count: receipts.available.length, icon: '✅' },
            { key: 'staked', label: 'Staked', count: receipts.staked.length, icon: '🌱' },
            { key: 'locked', label: 'Locked', count: receipts.locked.length, icon: '🔒' }
          ].map((mode) => (
            <button
              key={mode.key}
              onClick={() => setViewMode(mode.key as typeof viewMode)}
              className={`
                flex items-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all duration-300
                ${viewMode === mode.key 
                  ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300 border border-indigo-500/30' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }
              `}
              suppressHydrationWarning={true}
            >
              <span className="text-xl">{mode.icon}</span>
              <span>{mode.label}</span>
              <span className="bg-white/20 text-white text-sm px-2 py-1 rounded-full">
                {mode.count}
              </span>
            </button>
          ))}
        </div>

        {/* Receipts Grid */}
        {currentReceipts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentReceipts.map((receipt) => (
              <div 
                key={receipt.id}
                className={`
                  backdrop-blur-sm bg-gradient-to-br ${getStatusColor(receipt.status)} 
                  rounded-2xl p-6 border cursor-pointer transition-all duration-300 
                  hover:scale-105 hover:shadow-xl group
                  ${selectedReceipt === receipt.id ? 'ring-2 ring-indigo-400' : ''}
                `}
                onClick={() => setSelectedReceipt(selectedReceipt === receipt.id ? null : receipt.id)}
              >
                {/* Receipt Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getStatusIcon(receipt.status)}</span>
                    <div>
                      <h4 className="text-lg font-bold text-white">{receipt.crop}</h4>
                      <p className="text-xs text-gray-400">{receipt.nftId}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(receipt.status)}`}>
                    {receipt.status}
                  </div>
                </div>

                {/* Receipt Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Quantity:</span>
                    <span className="text-white font-medium">{receipt.quantity} quintals</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Quality:</span>
                    <span className="text-white font-medium">{receipt.quality}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Warehouse:</span>
                    <span className="text-white font-medium text-right">{receipt.warehouse}</span>
                  </div>
                </div>

                {/* Status-specific Information */}
                {receipt.status === 'AVAILABLE' && (
                  <>
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-3 mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Loan Eligible:</span>
                        <span className="text-green-400 font-bold">₹{(receipt as any).loanEligible?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Market Value:</span>
                        <span className="text-white font-medium">₹{(receipt as any).marketValue?.toLocaleString() || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button className="flex-1 bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-400/30 text-blue-300 px-4 py-2 rounded-lg text-sm font-medium hover:from-blue-500/30 hover:to-cyan-400/30 transition-all duration-300">
                        <span className="mr-1">💰</span>
                        Borrow
                      </button>
                      <button className="flex-1 bg-gradient-to-r from-purple-500/20 to-pink-400/20 border border-purple-400/30 text-purple-300 px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-500/30 hover:to-pink-400/30 transition-all duration-300">
                        <span className="mr-1">🌱</span>
                        Stake
                      </button>
                    </div>
                  </>
                )}

                {receipt.status === 'STAKED' && (
                  <>
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-3 mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Daily Rewards:</span>
                        <span className="text-purple-400 font-bold">₹{(receipt as any).dailyRewards?.toFixed(2) || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">APY:</span>
                        <span className="text-green-400 font-medium">{(receipt as any).apy || 'N/A'}%</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-purple-500/20 to-pink-400/20 border border-purple-400/30 text-purple-300 px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-500/30 hover:to-pink-400/30 transition-all duration-300">
                      <span className="mr-1">📤</span>
                      Unstake Receipt
                    </button>
                  </>
                )}

                {receipt.status === 'LOCKED' && (
                  <>
                    <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-xl p-3 mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-400">Loan Amount:</span>
                        <span className="text-orange-400 font-bold">₹{(receipt as any).loanAmount?.toLocaleString() || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Due Date:</span>
                        <span className="text-red-400 font-medium">{(receipt as any).loanDueDate || 'N/A'}</span>
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-green-500/20 to-emerald-400/20 border border-green-400/30 text-green-300 px-4 py-2 rounded-lg text-sm font-medium hover:from-green-500/30 hover:to-emerald-400/30 transition-all duration-300">
                      <span className="mr-1">💳</span>
                      Repay & Unlock
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-8xl mb-6 opacity-50">📄</div>
            <h4 className="text-2xl font-bold text-white mb-4">
              No {viewMode} receipts found
            </h4>
            <p className="text-gray-400 mb-8">
              {viewMode === 'available' && "Upload your first e-NWR to get started with digital farming."}
              {viewMode === 'staked' && "Stake some available receipts to start earning passive income."}
              {viewMode === 'locked' && "Take loans against your receipts to see them here."}
            </p>
            <button 
              onClick={onUploadReceipt}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              suppressHydrationWarning={true}
            >
              <span className="mr-2">📄</span>
              Upload Your First Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
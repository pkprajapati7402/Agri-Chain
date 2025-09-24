"use client";

import { useState } from "react";
import { ReceiptCard } from "@/components/ReceiptCard";
import { DepositReceiptModal } from "@/components/modals/DepositReceiptModal";

export interface Receipt {
  id: string;
  commodity: string;
  quantity: number;
  value: number;
  status: 'AVAILABLE' | 'LOCKED';
  depositDate: string;
}

export function MyReceipts() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  
  // Mock data - in a real app, this would come from blockchain
  const [receipts] = useState<Receipt[]>([
    {
      id: "1",
      commodity: "Wheat",
      quantity: 100,
      value: 250000,
      status: 'AVAILABLE',
      depositDate: "2025-09-01"
    },
    {
      id: "2",
      commodity: "Rice",
      quantity: 75,
      value: 200000,
      status: 'AVAILABLE',
      depositDate: "2025-09-10"
    },
    {
      id: "3",
      commodity: "Soybean",
      quantity: 50,
      value: 150000,
      status: 'LOCKED',
      depositDate: "2025-08-25"
    }
  ]);

  return (
    <>
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">
            My Stored Crop Receipts
          </h2>
          <button
            onClick={() => setShowDepositModal(true)}
            className="bg-accent-green hover:bg-green-400 text-black font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/25 text-sm"
          >
            + Deposit New Receipt
          </button>
        </div>

        {receipts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {receipts.map((receipt) => (
              <ReceiptCard key={receipt.id} receipt={receipt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-300 mb-2">
              No receipts deposited yet
            </h3>
            <p className="text-gray-400 mb-4">
              Upload your first warehouse receipt to get started
            </p>
            <button
              onClick={() => setShowDepositModal(true)}
              className="bg-accent-green hover:bg-green-400 text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300"
            >
              Deposit Your First Receipt
            </button>
          </div>
        )}

        {/* Summary Stats */}
        {receipts.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-accent-green">
                  {receipts.length}
                </p>
                <p className="text-gray-400 text-sm">Total Receipts</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-green">
                  ₹{receipts.reduce((sum, r) => sum + r.value, 0).toLocaleString()}
                </p>
                <p className="text-gray-400 text-sm">Total Value</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-green">
                  {receipts.filter(r => r.status === 'AVAILABLE').length}
                </p>
                <p className="text-gray-400 text-sm">Available</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <DepositReceiptModal 
        isOpen={showDepositModal} 
        onClose={() => setShowDepositModal(false)} 
      />
    </>
  );
}
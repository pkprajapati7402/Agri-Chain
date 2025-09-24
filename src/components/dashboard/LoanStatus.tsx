"use client";

import { useState } from "react";
import { BorrowLoanModal } from "@/components/modals/BorrowLoanModal";
import { RepayLoanModal } from "@/components/modals/RepayLoanModal";

interface Loan {
  amount: number;
  totalRepayment: number;
  dueDate: string;
  isActive: boolean;
}

export function LoanStatus() {
  const [showBorrowModal, setShowBorrowModal] = useState(false);
  const [showRepayModal, setShowRepayModal] = useState(false);
  
  // Mock data - in a real app, this would come from blockchain
  const [loan] = useState<Loan>({
    amount: 150000,
    totalRepayment: 165000,
    dueDate: "2025-12-24",
    isActive: false, // Set to true to show active loan state
  });

  const maxLoanAmount = 300000; // Mock maximum loan amount

  return (
    <>
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-white mb-6">
          {loan.isActive ? "Active Loan" : "Loan Power"}
        </h2>

        {loan.isActive ? (
          // Active Loan State
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Current Loan</p>
                <p className="text-2xl font-bold text-white">
                  ₹{loan.amount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Total to Repay</p>
                <p className="text-2xl font-bold text-red-400">
                  ₹{loan.totalRepayment.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-1">Due Date</p>
              <p className="text-lg text-white">{loan.dueDate}</p>
            </div>

            <button
              onClick={() => setShowRepayModal(true)}
              className="w-full bg-accent-green hover:bg-green-400 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/25"
            >
              Repay Now
            </button>
          </div>
        ) : (
          // No Active Loan State
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm mb-1">Available to Borrow</p>
              <p className="text-4xl font-bold text-accent-green mb-2">
                ₹{maxLoanAmount.toLocaleString()}
              </p>
              <p className="text-gray-400 text-sm">
                Based on your deposited crop receipts
              </p>
            </div>

            <button
              onClick={() => setShowBorrowModal(true)}
              className="w-full bg-accent-green hover:bg-green-400 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/25"
            >
              Take a Loan
            </button>
          </div>
        )}

        {/* Loan Benefits */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="text-lg font-semibold text-white mb-3">Benefits</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 backdrop-blur-sm bg-white/5 rounded-lg">
              <p className="text-accent-green font-bold">5% APR</p>
              <p className="text-gray-400">Low Interest</p>
            </div>
            <div className="text-center p-3 backdrop-blur-sm bg-white/5 rounded-lg">
              <p className="text-accent-green font-bold">Instant</p>
              <p className="text-gray-400">Processing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BorrowLoanModal 
        isOpen={showBorrowModal} 
        onClose={() => setShowBorrowModal(false)}
        maxAmount={maxLoanAmount}
      />
      <RepayLoanModal 
        isOpen={showRepayModal} 
        onClose={() => setShowRepayModal(false)}
        loan={loan}
      />
    </>
  );
}
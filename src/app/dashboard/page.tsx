"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ActiveLoanCard } from "@/components/dashboard/ActiveLoanCard";
import { LoanPowerCard } from "@/components/dashboard/LoanPowerCard";
import { KisanSanchayCard } from "@/components/dashboard/KisanSanchayCard";
import { MyReceiptsGrid } from "@/components/dashboard/MyReceiptsGrid";
import { ActivityStreamCard } from "@/components/dashboard/ActivityStreamCard";
import { QuickStatsCard } from "@/components/dashboard/QuickStatsCard";
import { UploadReceiptModal } from "@/components/dashboard/UploadReceiptModal";
import { IPFSIntegrationCard } from "@/components/dashboard/IPFSIntegrationCard";
import { MarketAnalyticsCard } from "@/components/dashboard/MarketAnalyticsCard";
import { DemoTransactionButton } from "@/components/DemoTransactionButton";
import { DemoBanner } from "@/components/DemoBanner";
import { DEMO_CROP_DATA, DEMO_ANALYTICS, BlockchainIntegration } from "@/utils/ipfsDatabase";

export default function Dashboard() {
  const { connected } = useWallet();
  const router = useRouter();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isSimulating, setIsSimulating] = useState(true);
  const [demoTransactions, setDemoTransactions] = useState(DEMO_ANALYTICS.recentTransactions);

  useEffect(() => {
    if (!connected) {
      router.push("/");
    }
  }, [connected, router]);

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark via-gray-900 to-primary-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-green mx-auto mb-4"></div>
          <p className="text-gray-400">Connecting to blockchain...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary-dark via-gray-900 to-primary-dark">
      <DemoBanner />
      <Header />
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent-green/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl animate-pulse animation-delay-200"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/2 rounded-full blur-3xl animate-pulse animation-delay-400"></div>
      </div>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-16 relative z-10">
        <div className="max-w-8xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-accent-green to-white bg-clip-text text-transparent mb-2">
                  Farmer Dashboard
                </h1>
                <p className="text-gray-400 text-lg">
                  Manage your digital crop receipts, loans, and earnings
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex space-x-4">
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="bg-gradient-to-r from-accent-green to-green-400 text-primary-dark px-6 py-3 rounded-xl font-semibold hover:from-green-400 hover:to-accent-green transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-green/25 flex items-center space-x-2"
                  suppressHydrationWarning={true}
                >
                  <span className="text-xl">📄</span>
                  <span>Upload Receipt</span>
                </button>
              </div>
            </div>
          </div>

          {/* Modern Bento Layout Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 auto-rows-auto">
            
            {/* Active Loan Status - Prominent Position */}
            <div className="col-span-full lg:col-span-4 xl:col-span-4">
              <ActiveLoanCard />
            </div>

            {/* Quick Stats */}
            <div className="col-span-full md:col-span-1 lg:col-span-2 xl:col-span-2">
              <QuickStatsCard />
            </div>

            {/* Loan Power Card */}
            <div className="col-span-full md:col-span-1 lg:col-span-2 xl:col-span-2">
              <LoanPowerCard onTakeLoan={() => console.log("Take loan clicked")} />
            </div>

            {/* Kisan Sanchay (Staking) */}
            <div className="col-span-full md:col-span-1 lg:col-span-2 xl:col-span-2">
              <KisanSanchayCard />
            </div>

            {/* IPFS Integration */}
            <div className="col-span-full md:col-span-1 lg:col-span-2 xl:col-span-2">
              <IPFSIntegrationCard />
            </div>

            {/* Market Analytics */}
            <div className="col-span-full md:col-span-1 lg:col-span-2 xl:col-span-2">
              <MarketAnalyticsCard />
            </div>

            {/* Activity Stream */}
            <div className="col-span-full md:col-span-2 lg:col-span-2 xl:col-span-2">
              <ActivityStreamCard />
            </div>

            {/* My Receipts Grid - Full Width */}
            <div className="col-span-full">
              <MyReceiptsGrid onUploadReceipt={() => setShowUploadModal(true)} />
            </div>

          </div>
        </div>
      </main>

      {/* Demo Transaction Button */}
      <DemoTransactionButton />

      {/* Upload Receipt Modal */}
      {showUploadModal && (
        <UploadReceiptModal 
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
        />
      )}

      <Footer />
    </div>
  );
}
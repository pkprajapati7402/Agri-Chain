"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function HeroSection() {
  const { connected, connect } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (connected) {
      router.push("/dashboard");
    }
  }, [connected, router]);

  const handleConnectWallet = async () => {
    try {
      await connect("Petra" as any);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="mb-8">
          {/* Hindi Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-accent-green to-green-400 bg-clip-text text-transparent">
            फसल बेचे बिना, तुरंत कैश पाएं
          </h1>
          
          {/* English Headline */}
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-6 text-gray-200">
            Get Instant Cash Without Selling Your Crops
          </h2>
        </div>

        {/* Sub-headline */}
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Tokenize your warehouse receipts on the Aptos blockchain and unlock instant liquidity. 
          Secure, transparent, and farmer-friendly.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleConnectWallet}
          suppressHydrationWarning={true}
          className="bg-accent-green hover:bg-green-400 text-black font-bold text-lg md:text-xl px-12 py-4 rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent-green/25 hover:scale-105"
        >
          {connected ? "Go to Dashboard" : "Connect Wallet to Start"}
        </button>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">₹10L+</div>
            <div className="text-gray-400">Loans Disbursed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">500+</div>
            <div className="text-gray-400">Farmers Served</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-green mb-2">24/7</div>
            <div className="text-gray-400">Instant Processing</div>
          </div>
        </div>
      </div>
    </section>
  );
}
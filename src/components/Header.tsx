"use client";

import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Link from "next/link";

export function Header() {
  const { connected, connect, disconnect, account } = useWallet();

  const handleConnectWallet = async () => {
    if (connected) {
      disconnect();
    } else {
      try {
        await connect("Petra" as any);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-green to-green-400 bg-clip-text text-transparent">
              Kisan Kosh
            </h1>
          </Link>

          {/* Connect Wallet Button */}
          <button
            onClick={handleConnectWallet}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              connected
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-accent-green hover:bg-green-400 text-black hover:shadow-lg hover:shadow-accent-green/25"
            }`}
          >
            {connected && account?.address
              ? formatAddress(account.address.toString())
              : "Connect Wallet"}
          </button>
        </div>
      </div>
    </nav>
  );
}
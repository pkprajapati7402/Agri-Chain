"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const { connected, connect, disconnect, account } = useWallet();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Enhanced Top Separator Line */}
      <div className="relative h-1">
        {/* Main separator line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-green to-transparent shadow-lg shadow-accent-green/50"></div>
        {/* Double line effect */}
        <div className="absolute top-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-green/30 to-transparent"></div>
        {/* Animated glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-green to-transparent animate-pulse opacity-80"></div>
        {/* Subtle background */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent-green/10 to-transparent"></div>
      </div>

      <nav className={`transition-all duration-500 ${
        isScrolled 
          ? "backdrop-blur-xl bg-primary-dark/90 border-b border-accent-green/20 shadow-2xl shadow-accent-green/10" 
          : "backdrop-blur-md bg-white/5 border-b border-white/10"
      }`}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent-green/5 via-transparent to-blue-500/5 animate-pulse opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-3 group">
            {/* Logo Icon */}
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-green-300 to-green-400 rounded-xl flex items-center justify-center shadow-lg shadow-accent-green/25 group-hover:shadow-accent-green/40 transition-all duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              {/* Animated ring */}
              <div className="absolute inset-0 rounded-xl border-2 border-accent-green/30 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            {/* Logo Text */}
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-300 via-green-400 to-emerald-300 bg-clip-text text-transparent group-hover:from-green-300 group-hover:to-accent-green transition-all duration-500">
                Kisan Kosh
              </h1>
              <p className="text-xs text-gray-400 tracking-wider">AGRI-CHAIN</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-accent-green ${
                  pathname === item.href 
                    ? "text-accent-green" 
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {/* Active indicator */}
                {pathname === item.href && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-green to-transparent animate-pulse"></div>
                )}
                {/* Hover effect */}
                <div className="absolute inset-0 rounded-lg bg-accent-green/10 scale-0 group-hover:scale-100 transition-transform duration-300 -z-10"></div>
              </Link>
            ))}
          </div>

          {/* Wallet Section */}
          <div className="flex items-center space-x-4">
            {/* Network Status */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-2 bg-white/5 rounded-lg border border-white/10">
              <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400">Aptos</span>
            </div>

            {/* Connect Wallet Button */}
            <button
              onClick={handleConnectWallet}
              suppressHydrationWarning={true}
              className={`relative group px-6 py-3 rounded-xl font-semibold transition-all duration-300 overflow-hidden ${
                connected
                  ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white border border-gray-600 hover:border-accent-green/50"
                  : "bg-gradient-to-r from-green-300 to-green-400 text-black hover:from-green-400 hover:to-accent-green shadow-lg shadow-accent-green/25 hover:shadow-accent-green/40 hover:scale-105"
              }`}
            >
              {/* Button background animation */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-300/20 to-green-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              
              {/* Button content */}
              <div className="relative flex items-center space-x-2">
                {connected ? (
                  <>
                    <div className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></div>
                    <span className="text-sm">
                      {account?.address ? formatAddress(account.address.toString()) : "Connected"}
                    </span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Connect Wallet</span>
                  </>
                )}
              </div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              suppressHydrationWarning={true}
              className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300"
            >
              <svg className={`w-6 h-6 text-gray-300 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="py-4 border-t border-white/10 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  pathname === item.href 
                    ? "bg-accent-green/20 text-accent-green border-l-2 border-accent-green" 
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-accent-green rounded-full animate-float opacity-60"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-float-delayed opacity-40"></div>
          <div className="absolute bottom-1/2 right-1/4 w-0.5 h-0.5 bg-accent-green rounded-full animate-float-slow opacity-80"></div>
        </div>
      </nav>
    </div>
  );
}
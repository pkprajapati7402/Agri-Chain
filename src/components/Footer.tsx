"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState(2025); // Default fallback
  
  useEffect(() => {
    // Set the current year on the client side to avoid hydration mismatch
    setCurrentYear(new Date().getFullYear());
  }, []);
  
  const socialLinks = [
    { 
      name: "Twitter", 
      href: "#", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    { 
      name: "Discord", 
      href: "#", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
        </svg>
      )
    },
    { 
      name: "GitHub", 
      href: "#", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    { 
      name: "Telegram", 
      href: "#", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      )
    }
  ];

  const quickLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "/about" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Help Center", href: "/help" },
    { name: "Contact", href: "/contact" }
  ];

  const features = [
    { name: "Tokenize Assets", description: "Convert receipts to NFTs" },
    { name: "Instant Loans", description: "Get loans in minutes" },
    { name: "Secure Storage", description: "Blockchain-powered security" },
    { name: "Low Interest", description: "Competitive 5% APR" }
  ];

  return (
    <footer className="relative mt-20 bg-gradient-to-t from-primary-dark via-primary-light/50 to-transparent">
      {/* Glowing top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-green to-transparent"></div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent-green rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative">
        {/* Add a thin horizontal line from left edge to right edge in white color here. */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/10"></div>
        {/* Main footer content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-accent-green to-green-400 rounded-xl flex items-center justify-center shadow-lg shadow-accent-green/25">
                  <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-green-300 to-green-400 bg-clip-text text-transparent">
                    Kisan Kosh
                  </h3>
                  <p className="text-xs text-gray-400 tracking-wider">AGRI-CHAIN PLATFORM</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Empowering farmers with blockchain technology. Transform your warehouse receipts into instant liquidity through our secure, transparent platform.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-lg font-bold text-accent-green">₹10L+</div>
                  <div className="text-xs text-gray-400">Loans Disbursed</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <div className="text-lg font-bold text-accent-green">500+</div>
                  <div className="text-xs text-gray-400">Farmers Served</div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <svg className="w-5 h-5 text-accent-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Features
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 group cursor-pointer">
                    <div className="w-2 h-2 bg-accent-green rounded-full mt-2 group-hover:animate-pulse"></div>
                    <div>
                      <h4 className="text-sm font-medium text-white group-hover:text-accent-green transition-colors duration-300">
                        {feature.name}
                      </h4>
                      <p className="text-xs text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <svg className="w-5 h-5 text-accent-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                Quick Links
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-accent-green transition-all duration-300 hover:translate-x-1 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-accent-green transition-colors duration-300"></span>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Connect & Newsletter */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <svg className="w-5 h-5 text-accent-green mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2v-6a2 2 0 012-2h2m2-4h2a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V6a2 2 0 012-2h2z" />
                </svg>
                Stay Connected
              </h3>
              
              {/* Social Links */}
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-accent-green hover:bg-accent-green/10 hover:border-accent-green/30 transition-all duration-300 hover:scale-110 group"
                    title={social.name}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>

              {/* Newsletter */}
              <div className="space-y-3">
                <p className="text-sm text-gray-400">Get updates on new features</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter email"
                    suppressHydrationWarning={true}
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-l-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-accent-green/50 focus:bg-white/10 transition-all duration-300"
                  />
                  <button 
                    suppressHydrationWarning={true}
                    className="px-4 py-2 bg-gradient-to-r from-accent-green to-green-400 text-black rounded-r-lg hover:from-green-400 hover:to-accent-green transition-all duration-300 hover:shadow-lg hover:shadow-accent-green/25"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <span>© {currentYear} Kisan Kosh. All rights reserved.</span>
                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  <span className="text-xs">Built on Aptos</span>
                </div>
              </div>

              {/* Tech badges */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400">Blockchain Secured</span>
                </div>
                <div className="flex items-center space-x-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-xs text-gray-400">Web3 Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating animation elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-accent-green/30 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-float-delayed opacity-80"></div>
          <div className="absolute bottom-1/3 left-3/4 w-1.5 h-1.5 bg-accent-green/20 rounded-full animate-float-slow opacity-70"></div>
        </div>
      </div>
    </footer>
  );
}
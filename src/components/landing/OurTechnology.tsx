"use client";
import { useState } from "react";

export function OurTechnology() {
  const [activeStep, setActiveStep] = useState(0);

  const techSteps = [
    {
      id: 1,
      title: "Digital Identity (NFT)",
      description: "Your official warehouse receipt (e-NWR) is converted into a unique, tamper-proof digital token (NFT) that only you control.",
      icon: "🏷️",
      detail: "Each e-NWR becomes a unique Non-Fungible Token (NFT) on the Aptos blockchain, ensuring complete ownership and preventing duplication or fraud.",
      techStack: ["Aptos Move", "NFT Standards", "Digital Signatures"]
    },
    {
      id: 2,
      title: "Smart Contracts",
      description: "Our loan agreements are automated smart contracts. They are fair, transparent, and execute automatically, removing the need for middlemen.",
      icon: "📝",
      detail: "Self-executing contracts with terms directly written into code. No human intervention needed for loan disbursement or collateral management.",
      techStack: ["Move Language", "Automated Execution", "Transparent Logic"]
    },
    {
      id: 3,
      title: "Stablecoin Liquidity",
      description: "Loans are provided in a stable digital currency (like USDC), giving you a stable and universally accepted asset you can easily convert to Rupees.",
      icon: "💎",
      detail: "Receive loans in stable digital currencies that maintain their value, with instant conversion to INR through integrated payment gateways.",
      techStack: ["USDC Integration", "Price Stability", "Instant Conversion"]
    }
  ];

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-gray-900 to-primary-dark"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')"
        }}
      />
      
      {/* Animated tech grid */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 border border-accent-green/20 rounded-lg animate-pulse"></div>
        <div className="absolute top-20 right-20 w-24 h-24 border border-blue-400/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-accent-green/10 rounded-lg animate-float"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-500/10 rounded-full mb-6">
            <div className="bg-blue-500/20 rounded-full p-3">
              <span className="text-2xl">⚙️</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-accent-green to-purple-400 bg-clip-text text-transparent">
            Our Technology
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Built on cutting-edge blockchain technology to ensure security, transparency, and efficiency in every transaction.
          </p>
        </div>

        {/* Tech Flow Diagram */}
        <div className="mb-16">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
            {techSteps.map((step, index) => (
              <div key={step.id} className="flex-1 relative group">
                {/* Step Card */}
                <div 
                  className={`
                    backdrop-blur-xl border rounded-2xl p-6 cursor-pointer transition-all duration-500
                    ${activeStep === index 
                      ? 'bg-accent-green/20 border-accent-green/50 scale-105 shadow-2xl shadow-accent-green/25' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }
                  `}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="text-center">
                    <div className={`
                      text-4xl mb-4 transition-all duration-300
                      ${activeStep === index ? 'scale-110 animate-pulse' : ''}
                    `}>
                      {step.icon}
                    </div>
                    
                    <div className={`
                      w-8 h-8 rounded-full mx-auto mb-4 flex items-center justify-center text-sm font-bold
                      ${activeStep === index 
                        ? 'bg-accent-green text-primary-dark' 
                        : 'bg-white/10 text-white'
                      }
                    `}>
                      {step.id}
                    </div>
                    
                    <h3 className={`
                      text-lg font-bold mb-3 transition-colors duration-300
                      ${activeStep === index ? 'text-accent-green' : 'text-white'}
                    `}>
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Arrow */}
                {index < techSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="text-accent-green/60 text-2xl animate-pulse">→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Active Step Details */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Detail Content */}
            <div>
              <div className="flex items-center mb-6">
                <span className="text-4xl mr-4">{techSteps[activeStep].icon}</span>
                <h3 className="text-3xl font-bold text-accent-green">
                  {techSteps[activeStep].title}
                </h3>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {techSteps[activeStep].detail}
              </p>
              
              <div className="space-y-3">
                <h4 className="text-white font-semibold">Technology Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {techSteps[activeStep].techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-accent-green/20 text-accent-green px-3 py-1 rounded-full text-sm border border-accent-green/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Visual Representation */}
            <div className="relative">
              <div className="backdrop-blur-sm bg-gradient-to-br from-accent-green/10 to-blue-500/10 rounded-2xl p-8 border border-accent-green/20">
                {activeStep === 0 && (
                  <div className="text-center space-y-4">
                    <div className="text-6xl animate-bounce">🏷️</div>
                    <div className="text-sm text-gray-400">e-NWR → NFT Conversion</div>
                    <div className="bg-accent-green/20 rounded-lg p-4">
                      <div className="text-xs font-mono text-accent-green">
                        Token ID: 0x1a2b3c...
                        <br />Owner: farmer_wallet
                        <br />Status: Active
                      </div>
                    </div>
                  </div>
                )}
                
                {activeStep === 1 && (
                  <div className="text-center space-y-4">
                    <div className="text-6xl animate-pulse">📝</div>
                    <div className="text-sm text-gray-400">Smart Contract Execution</div>
                    <div className="bg-blue-500/20 rounded-lg p-4">
                      <div className="text-xs font-mono text-blue-400">
                        function loan_against_nft() &#123;
                        <br />&nbsp;&nbsp;verify_ownership();
                        <br />&nbsp;&nbsp;calculate_loan();
                        <br />&nbsp;&nbsp;transfer_funds();
                        <br />&#125;
                      </div>
                    </div>
                  </div>
                )}
                
                {activeStep === 2 && (
                  <div className="text-center space-y-4">
                    <div className="text-6xl animate-spin-slow">💎</div>
                    <div className="text-sm text-gray-400">Stablecoin Liquidity Pool</div>
                    <div className="bg-purple-500/20 rounded-lg p-4">
                      <div className="text-xs font-mono text-purple-400">
                        USDC Balance: $10,000
                        <br />Conversion Rate: ₹83.2/USD
                        <br />Available: ₹8,32,000
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: "🔐", title: "Multi-Sig Security", desc: "Multiple signature verification" },
            { icon: "🛡️", title: "Audited Contracts", desc: "Third-party security audits" },
            { icon: "⚡", title: "High Performance", desc: "1000+ TPS on Aptos" },
            { icon: "🌍", title: "Global Access", desc: "24/7 worldwide availability" }
          ].map((badge, index) => (
            <div key={index} className="text-center group">
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 hover:scale-105 group-hover:border-accent-green/30">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {badge.icon}
                </div>
                <h4 className="font-semibold text-white text-sm mb-1 group-hover:text-accent-green transition-colors duration-300">
                  {badge.title}
                </h4>
                <p className="text-xs text-gray-400">
                  {badge.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
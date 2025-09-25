"use client";
import { useState } from "react";

export function WhyKisanKosh() {
  const benefits = [
    {
      icon: "📈",
      title: "Maximize Your Profits",
      description: "Don't sell at harvest prices. Our instant loans give you the power to hold your crops and sell only when the price is right.",
      detail: "Market timing can increase your profits by 30-60%. Our flexible loan terms let you wait for better prices.",
      color: "from-green-500 to-emerald-400"
    },
    {
      icon: "⚡",
      title: "Instant & Transparent",
      description: "No paperwork, no bank visits. Get a fair loan in minutes. All terms are clear and secured on the blockchain.",
      detail: "Complete loan processing in under 15 minutes with transparent smart contracts and real-time updates.",
      color: "from-blue-500 to-cyan-400"
    },
    {
      icon: "🎯",
      title: "Complete Control",
      description: "You always own your crop receipt. Once you repay the loan, your receipt is instantly unlocked. It's that simple.",
      detail: "Your e-NWR remains in your custody as an NFT. No third-party risks or hidden conditions.",
      color: "from-purple-500 to-pink-400"
    },
    {
      icon: "🔒",
      title: "Bank-Grade Security",
      description: "Built on the secure and scalable Aptos blockchain, your assets are protected by world-class technology.",
      detail: "Multi-signature security, audited smart contracts, and institutional-grade infrastructure protection.",
      color: "from-orange-500 to-red-400"
    }
  ];

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-gray-900 to-primary-dark"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(57,255,20,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(57,255,20,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center p-2 bg-accent-green/10 rounded-full mb-6">
            <div className="bg-accent-green/20 rounded-full p-3">
              <span className="text-2xl">💡</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-accent-green to-white bg-clip-text text-transparent">
            Why Kisan Kosh?
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Revolutionizing agricultural finance with blockchain technology. Experience the power of decentralized lending designed specifically for farmers.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card */}
              <div className={`
                relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 
                transition-all duration-500 cursor-pointer overflow-hidden
                ${hoveredCard === index ? 'bg-white/10 scale-105 border-accent-green/30' : ''}
              `}>
                {/* Gradient overlay */}
                <div className={`
                  absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.color} 
                  opacity-10 rounded-full blur-2xl transition-all duration-500
                  ${hoveredCard === index ? 'scale-150 opacity-20' : ''}
                `}></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className={`
                      text-4xl mr-4 transition-all duration-300
                      ${hoveredCard === index ? 'scale-110 rotate-12' : ''}
                    `}>
                      {benefit.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-accent-green transition-colors duration-300">
                      {benefit.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                    {benefit.description}
                  </p>
                  
                  {/* Expandable detail */}
                  <div className={`
                    overflow-hidden transition-all duration-500
                    ${hoveredCard === index ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-accent-green/80 text-sm italic">
                        💡 {benefit.detail}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className={`
                  absolute inset-0 rounded-3xl bg-gradient-to-br ${benefit.color} opacity-0 
                  transition-opacity duration-300 pointer-events-none
                  ${hoveredCard === index ? 'opacity-10' : ''}
                `}></div>
              </div>

              {/* Floating particles */}
              {hoveredCard === index && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 w-1 h-1 bg-accent-green rounded-full animate-ping"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="backdrop-blur-sm bg-accent-green/10 border border-accent-green/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Transform Your Agricultural Business?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of progressive farmers who are already maximizing their profits with Kisan Kosh.
            </p>
            <button 
              className="bg-gradient-to-r from-accent-green to-green-400 text-primary-dark px-8 py-3 rounded-full font-semibold hover:from-green-400 hover:to-accent-green transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-green/25"
              suppressHydrationWarning={true}
            >
              Start Your Journey Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
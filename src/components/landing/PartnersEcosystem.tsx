"use client";

export function PartnersEcosystem() {
  const partnerCategories = [
    {
      title: "Technology Partners",
      partners: [
        { name: "Aptos", logo: "🚀", description: "Blockchain Infrastructure" },
        { name: "Web3 Auth", logo: "🔐", description: "Secure Authentication" },
        { name: "IPFS", logo: "🌐", description: "Decentralized Storage" },
      ]
    },
    {
      title: "Warehouse Partners", 
      partners: [
        { name: "National E-Repository Ltd", logo: "🏭", description: "Digital Warehousing" },
        { name: "Central Warehousing Corp", logo: "🏛️", description: "Storage Infrastructure" },
        { name: "WDRA", logo: "📋", description: "Regulatory Authority" },
      ]
    },
    {
      title: "Financial Partners",
      partners: [
        { name: "NABARD", logo: "🏦", description: "Agricultural Banking" },
        { name: "Rural Banks Network", logo: "💳", description: "Rural Finance" },
        { name: "Microfinance Partners", logo: "💰", description: "Micro Lending" },
      ]
    },
    {
      title: "Community Partners",
      partners: [
        { name: "Farmer Producer Orgs", logo: "👥", description: "FPO Network" },
        { name: "Agricultural Cooperatives", logo: "🤝", description: "Cooperative Society" },
        { name: "Krishi Vigyan Kendras", logo: "🎓", description: "Extension Services" },
      ]
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/50 to-transparent"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1926&q=80')"
        }}
      />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-accent-green/20 rounded-full animate-float opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-float-delayed opacity-80"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-green via-green-400 to-emerald-300 bg-clip-text text-transparent">
            Our Growing Ecosystem
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Building the future of agricultural finance with trusted partners across technology, infrastructure, and community networks.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnerCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 group">
              <h3 className="text-xl font-semibold text-accent-green mb-6 text-center group-hover:text-green-300 transition-colors duration-300">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.partners.map((partner, partnerIndex) => (
                  <div 
                    key={partnerIndex} 
                    className="flex items-center space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer group/item"
                  >
                    <div className="text-2xl group-hover/item:scale-110 transition-transform duration-300">
                      {partner.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white text-sm group-hover/item:text-accent-green transition-colors duration-300">
                        {partner.name}
                      </h4>
                      <p className="text-xs text-gray-400">
                        {partner.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "50+", label: "Partner Organizations" },
            { number: "₹500Cr+", label: "Network Value" },
            { number: "10,000+", label: "Warehouses Connected" },
            { number: "99.9%", label: "Uptime Guarantee" }
          ].map((stat, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <div className="backdrop-blur-sm bg-accent-green/10 border border-accent-green/20 rounded-xl p-4 hover:bg-accent-green/20 transition-all duration-300 hover:scale-105">
                <div className="text-2xl font-bold text-accent-green mb-1 group-hover:text-green-300 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
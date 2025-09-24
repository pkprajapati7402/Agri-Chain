import { DocumentIcon, CurrencyRupeeIcon, LockOpenIcon } from "@heroicons/react/24/outline";

export function HowItWorks() {
  const features = [
    {
      icon: DocumentIcon,
      title: "Deposit Receipt",
      description: "Securely upload and tokenize your e-NWR into an NFT on Aptos."
    },
    {
      icon: CurrencyRupeeIcon,
      title: "Get Loan",
      description: "Instantly borrow up to 60% of your crop's value."
    },
    {
      icon: LockOpenIcon,
      title: "Repay & Reclaim",
      description: "Repay your loan anytime to reclaim full ownership of your receipt."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Secure, and Swift
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Transform your agricultural assets into instant liquidity with our blockchain-powered platform
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent-green/10"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 p-4 rounded-full bg-accent-green/20 border border-accent-green/30">
                  <feature.icon className="w-8 h-8 text-accent-green" />
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Process Flow */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 p-4 backdrop-blur-md bg-white/5 rounded-full border border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-accent-green text-black font-bold flex items-center justify-center text-sm">
                1
              </div>
              <span className="text-sm font-medium text-gray-300">Upload</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-accent-green text-black font-bold flex items-center justify-center text-sm">
                2
              </div>
              <span className="text-sm font-medium text-gray-300">Borrow</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-600"></div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-accent-green text-black font-bold flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-sm font-medium text-gray-300">Repay</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
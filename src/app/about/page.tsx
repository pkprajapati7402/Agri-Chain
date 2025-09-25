import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-accent-green via-green-400 to-emerald-300 bg-clip-text text-transparent">
              About Kisan Kosh
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Revolutionizing agriculture finance through blockchain technology. 
              Empowering farmers with instant liquidity while keeping their crops secure.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  We believe every farmer deserves access to instant, fair financing without the need to sell their crops prematurely. 
                  By leveraging blockchain technology, we're creating a transparent, secure, and efficient agricultural finance ecosystem.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-green rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <p className="text-gray-300">Democratize access to agricultural finance</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-green rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <p className="text-gray-300">Eliminate middlemen and reduce costs</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-accent-green rounded-full flex items-center justify-center mt-1">
                      <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                    <p className="text-gray-300">Provide transparent and secure transactions</p>
                  </div>
                </div>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-green mb-2">₹10L+</div>
                    <div className="text-gray-400 text-sm">Total Loans</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-green mb-2">500+</div>
                    <div className="text-gray-400 text-sm">Farmers Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-green mb-2">5%</div>
                    <div className="text-gray-400 text-sm">Interest Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent-green mb-2">24/7</div>
                    <div className="text-gray-400 text-sm">Availability</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-black/20">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">How Kisan Kosh Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Tokenize Receipt",
                  description: "Upload your e-NWR and convert it into a secure NFT on the Aptos blockchain"
                },
                {
                  step: "2", 
                  title: "Get Instant Loan",
                  description: "Receive up to 60% of your crop value as an instant loan with competitive rates"
                },
                {
                  step: "3",
                  title: "Repay & Reclaim",
                  description: "Repay anytime to unlock your NFT and regain full ownership of your crops"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-green to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-black">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-12">Built on Cutting-Edge Technology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Aptos Blockchain",
                  description: "Fast, secure, and scalable blockchain infrastructure",
                  icon: "🔗"
                },
                {
                  name: "NFT Technology", 
                  description: "Warehouse receipts tokenized as unique digital assets",
                  icon: "🎨"
                },
                {
                  name: "Smart Contracts",
                  description: "Automated, trustless loan processing and management",
                  icon: "📜"
                },
                {
                  name: "Web3 Wallets",
                  description: "Seamless integration with popular crypto wallets",
                  icon: "👛"
                }
              ].map((tech, index) => (
                <div key={index} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                  <div className="text-4xl mb-4">{tech.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-3">{tech.name}</h3>
                  <p className="text-gray-400 text-sm">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
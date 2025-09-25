"use client";
import { useState } from "react";

export function ComprehensiveFAQ() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqCategories = [
    {
      title: "Getting Started",
      icon: "🚀",
      faqs: [
        {
          question: "What is a warehouse receipt (e-NWR)?",
          answer: "An electronic Negotiable Warehouse Receipt (e-NWR) is a digital document issued by a registered warehouse when you store your agricultural produce. It serves as proof that you own the stored goods and can be used as collateral for loans. Think of it as a digital certificate of your crop stored safely in a warehouse."
        },
        {
          question: "How do I get started with Kisan Kosh?",
          answer: "Simply connect your digital wallet, upload your e-NWR documents, and our system will automatically convert them into NFTs. Once verified, you can immediately apply for loans against your stored crops. The entire process takes less than 15 minutes."
        },
        {
          question: "What documents do I need?",
          answer: "You only need your valid e-NWR (electronic Negotiable Warehouse Receipt) and a digital wallet. That's it! No additional paperwork, bank statements, or lengthy documentation required."
        }
      ]
    },
    {
      title: "Security & Safety",
      icon: "🔒",
      faqs: [
        {
          question: "Is my data safe and secure?",
          answer: "Absolutely! We use military-grade encryption and blockchain technology. Your data is stored on the decentralized Aptos blockchain, making it virtually impossible to hack or manipulate. We never store your private keys or personal information on centralized servers."
        },
        {
          question: "What happens if I lose access to my wallet?",
          answer: "We provide multiple recovery options including seed phrase backup, social recovery, and multi-signature wallets. However, we always recommend keeping your seed phrase safe and backed up in multiple secure locations."
        },
        {
          question: "Can someone steal my crop NFT?",
          answer: "No! Your crop NFT is cryptographically secured and can only be accessed with your private keys. Even we cannot access or transfer your NFTs without your explicit permission and digital signature."
        }
      ]
    },
    {
      title: "Loans & Payments",
      icon: "💰",
      faqs: [
        {
          question: "How quickly do I get the loan?",
          answer: "Once your e-NWR is verified and converted to an NFT, loan disbursement is instantaneous! The smart contract automatically processes your application and transfers the approved amount to your wallet within minutes."
        },
        {
          question: "What are the interest rates and fees?",
          answer: "Our interest rates start from 8% per annum, significantly lower than traditional lenders. We charge a one-time processing fee of 1% and no hidden charges. All fees are transparently displayed before you confirm the loan."
        },
        {
          question: "How do I convert the digital loan into Rupees?",
          answer: "You receive loans in stablecoins (like USDC) which can be instantly converted to Indian Rupees through our integrated payment partners. Funds can be transferred directly to your bank account or UPI wallet within minutes."
        }
      ]
    },
    {
      title: "Loan Management",
      icon: "📊",
      faqs: [
        {
          question: "What happens if I can't repay the loan on time?",
          answer: "We offer flexible repayment options including extensions and partial payments. If needed, our smart contract will automatically sell your crop at the best available market price to recover the loan amount. Any excess amount is returned to you immediately."
        },
        {
          question: "Can I repay my loan early?",
          answer: "Yes! You can repay your loan at any time without penalties. Early repayment actually saves you interest, and your crop NFT is unlocked immediately upon full payment."
        },
        {
          question: "How do I track my loan status?",
          answer: "Your personalized dashboard provides real-time updates on loan status, repayment schedule, interest accrued, and current market value of your stored crops. You'll also receive notifications for important updates."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: "🛠️",
      faqs: [
        {
          question: "Do I need technical knowledge to use Kisan Kosh?",
          answer: "Not at all! Our platform is designed to be user-friendly with simple Hindi and English interfaces. We provide step-by-step guidance and 24/7 support in multiple regional languages."
        },
        {
          question: "What if I face technical issues?",
          answer: "Our dedicated support team is available 24/7 via phone, WhatsApp, and live chat. We also have local representatives in major agricultural districts who can provide in-person assistance if needed."
        },
        {
          question: "Is there a mobile app available?",
          answer: "Yes! Our mobile app is available for both Android and iOS. You can manage your entire portfolio, apply for loans, and make repayments directly from your smartphone."
        }
      ]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark via-gray-900 to-primary-dark"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
        }}
      />
      
      {/* Question mark pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl text-accent-green/5 animate-float">❓</div>
        <div className="absolute top-40 right-20 text-4xl text-blue-400/5 animate-float-delayed">💡</div>
        <div className="absolute bottom-20 left-1/4 text-5xl text-purple-400/5 animate-pulse">❔</div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-purple-500/10 rounded-full mb-6">
            <div className="bg-purple-500/20 rounded-full p-3">
              <span className="text-2xl">❓</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-accent-green to-blue-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Got questions? We've got answers! Find everything you need to know about Kisan Kosh and how it can transform your agricultural business.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Navigation */}
          <div className="lg:col-span-1">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-8">
              <h3 className="text-xl font-bold text-white mb-6">Categories</h3>
              <div className="space-y-3">
                {faqCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveCategory(index);
                      setOpenFAQ(null);
                    }}
                    className={`
                      w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 text-left
                      ${activeCategory === index 
                        ? 'bg-accent-green/20 text-accent-green border border-accent-green/30' 
                        : 'hover:bg-white/10 text-gray-300 hover:text-white'
                      }
                    `}
                    suppressHydrationWarning={true}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium text-sm">{category.title}</span>
                  </button>
                ))}
              </div>

              {/* Help Contact */}
              <div className="mt-8 p-4 bg-gradient-to-br from-accent-green/10 to-blue-500/10 border border-accent-green/20 rounded-xl">
                <h4 className="font-semibold text-white mb-2 text-sm">Still Need Help?</h4>
                <p className="text-xs text-gray-400 mb-3">Our support team is here for you</p>
                <button 
                  className="w-full bg-accent-green/20 text-accent-green px-3 py-2 rounded-lg text-xs font-medium hover:bg-accent-green/30 transition-colors duration-300 border border-accent-green/30"
                  suppressHydrationWarning={true}
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
              <div className="flex items-center mb-8">
                <span className="text-3xl mr-4">{faqCategories[activeCategory].icon}</span>
                <h3 className="text-2xl font-bold text-white">{faqCategories[activeCategory].title}</h3>
              </div>

              <div className="space-y-4">
                {faqCategories[activeCategory].faqs.map((faq, index) => {
                  const globalIndex = index + (activeCategory * 10); // Unique index across categories
                  const isOpen = openFAQ === globalIndex;
                  
                  return (
                    <div 
                      key={globalIndex}
                      className="border border-white/10 rounded-xl overflow-hidden hover:border-accent-green/30 transition-all duration-300"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-all duration-300 group"
                        suppressHydrationWarning={true}
                      >
                        <h4 className="font-semibold text-white pr-4 group-hover:text-accent-green transition-colors duration-300">
                          {faq.question}
                        </h4>
                        <div className={`
                          text-accent-green text-xl transition-transform duration-300 flex-shrink-0
                          ${isOpen ? 'rotate-180' : 'group-hover:scale-110'}
                        `}>
                          ▼
                        </div>
                      </button>
                      
                      <div className={`
                        transition-all duration-300 overflow-hidden
                        ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `}>
                        <div className="p-6 pt-0 border-t border-white/10">
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="backdrop-blur-sm bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center hover:bg-green-500/20 transition-all duration-300 cursor-pointer group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">📞</div>
                <h4 className="font-semibold text-white mb-1 text-sm">Call Support</h4>
                <p className="text-green-400 text-xs">1800-KISAN-KOSH</p>
              </div>

              <div className="backdrop-blur-sm bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center hover:bg-blue-500/20 transition-all duration-300 cursor-pointer group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">💬</div>
                <h4 className="font-semibold text-white mb-1 text-sm">Live Chat</h4>
                <p className="text-blue-400 text-xs">24/7 Available</p>
              </div>

              <div className="backdrop-blur-sm bg-purple-500/10 border border-purple-500/20 rounded-xl p-6 text-center hover:bg-purple-500/20 transition-all duration-300 cursor-pointer group">
                <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">📧</div>
                <h4 className="font-semibold text-white mb-1 text-sm">Email Us</h4>
                <p className="text-purple-400 text-xs">support@kisankosh.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="backdrop-blur-xl bg-gradient-to-r from-accent-green/10 via-blue-500/10 to-purple-500/10 border border-white/20 rounded-3xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Didn't Find Your Answer?
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Our expert team is always ready to help you with personalized assistance for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="bg-gradient-to-r from-accent-green to-green-400 text-primary-dark px-8 py-3 rounded-full font-semibold hover:from-green-400 hover:to-accent-green transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent-green/25"
                suppressHydrationWarning={true}
              >
                Get Personal Support
              </button>
              <button 
                className="backdrop-blur-sm bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
                suppressHydrationWarning={true}
              >
                Schedule a Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
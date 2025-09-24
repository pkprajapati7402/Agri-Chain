import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Help() {
  const faqs = [
    {
      question: "How do I get started with Kisan Kosh?",
      answer: "Connect your Aptos wallet (like Petra) on our homepage, then deposit your warehouse receipt to tokenize it as an NFT. Once deposited, you can borrow against its value."
    },
    {
      question: "What is the maximum loan amount I can get?",
      answer: "You can borrow up to 60% of your crop's estimated value. The loan amount depends on the total value of all your deposited receipts."
    },
    {
      question: "What happens to my crops during the loan period?",
      answer: "Your crops remain safely stored in the warehouse. Only the digital receipt (NFT) is locked as collateral. You can access your crops once the loan is repaid."
    },
    {
      question: "How do I repay my loan?",
      answer: "Go to your dashboard and click 'Repay Now'. The payment will be deducted from your connected wallet, and your receipt NFT will be unlocked immediately."
    },
    {
      question: "Is there a prepayment penalty?",
      answer: "No, you can repay your loan at any time without any additional fees or penalties."
    },
    {
      question: "What wallets are supported?",
      answer: "We currently support Aptos-compatible wallets like Petra Wallet. More wallet options will be added in the future."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Help & Support</h1>
            <p className="text-xl text-gray-400">
              Find answers to common questions about Kisan Kosh
            </p>
          </div>
          
          {/* FAQ Section */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-accent-green mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">
              Still need help?
            </h2>
            <p className="text-gray-400 mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-accent-green mb-2">Email Support</h3>
                <p className="text-gray-300">support@kisankosh.com</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-accent-green mb-2">Phone Support</h3>
                <p className="text-gray-300">+91 1800-KISAN-KOSH</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-accent-green mb-2">Support Hours</h3>
                <p className="text-gray-300">Monday to Friday, 9 AM - 6 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
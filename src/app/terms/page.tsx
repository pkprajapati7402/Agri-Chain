import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
          
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-accent-green mb-4">1. Platform Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                Kisan Kosh is a blockchain-based platform that enables farmers to tokenize their warehouse receipts 
                as NFTs and obtain loans against them. By using our platform, you agree to these terms and conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-accent-green mb-4">2. Eligibility</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>You must be a legitimate farmer or agricultural producer</li>
                <li>You must possess valid warehouse receipts (e-NWRs)</li>
                <li>You must have a compatible Aptos wallet</li>
                <li>You must comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-accent-green mb-4">3. Loan Terms</h2>
              <ul className="text-gray-300 space-y-2 list-disc list-inside">
                <li>Maximum loan amount: 60% of crop value</li>
                <li>Interest rate: 5% APR (subject to change)</li>
                <li>Collateral: Your warehouse receipt NFT will be locked</li>
                <li>Repayment: Full amount plus interest must be paid to unlock NFT</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-accent-green mb-4">4. Risks and Disclaimers</h2>
              <p className="text-gray-300 leading-relaxed">
                Blockchain transactions are irreversible. Crop values may fluctuate. We are not responsible for 
                market price changes, technical issues, or losses due to user error. Use the platform at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-accent-green mb-4">5. Contact</h2>
              <p className="text-gray-300 leading-relaxed">
                For questions or support, please contact us through the Help section of our platform.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
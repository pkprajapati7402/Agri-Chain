import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DemoBanner } from "@/components/DemoBanner";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PartnersEcosystem } from "@/components/landing/PartnersEcosystem";
import { WhyKisanKosh } from "@/components/landing/WhyKisanKosh";
import { OurTechnology } from "@/components/landing/OurTechnology";
import { FarmerSuccessStories } from "@/components/landing/FarmerSuccessStories";
import { ComprehensiveFAQ } from "@/components/landing/ComprehensiveFAQ";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <DemoBanner />
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <PartnersEcosystem />
        <WhyKisanKosh />
        <OurTechnology />
        <FarmerSuccessStories />
        <ComprehensiveFAQ />
      </main>
      <Footer />
    </div>
  );
}

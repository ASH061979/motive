import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowWeHelp from "@/components/HowWeHelp";
import WhyChooseUs from "@/components/WhyChooseUs";
import ResourcesSection from "@/components/ResourcesSection";
import Footer from "@/components/Footer";
import LanguageSelector from "@/components/LanguageSelector";

const Index = () => {
  return (
    <div className="min-h-screen">
      <LanguageSelector />
      <Navbar />
      <main>
        <HeroSection />
        <HowWeHelp />
        <WhyChooseUs />
        <ResourcesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

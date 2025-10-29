import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowWeHelp from "@/components/HowWeHelp";
import WhyChooseUs from "@/components/WhyChooseUs";
import ResourcesSection from "@/components/ResourcesSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowWeHelp />
        <WhyChooseUs />
        <ResourcesSection />
      </main>
    </div>
  );
};

export default Index;

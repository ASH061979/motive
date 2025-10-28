import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowWeHelp from "@/components/HowWeHelp";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <HowWeHelp />
        <Services />
        <WhyChooseUs />
      </main>
    </div>
  );
};

export default Index;

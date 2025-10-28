import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatWeDo from "@/components/WhatWeDo";
import HowWeHelp from "@/components/HowWeHelp";
import WhyChooseUs from "@/components/WhyChooseUs";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <WhatWeDo />
        <HowWeHelp />
        <WhyChooseUs />
      </main>
    </div>
  );
};

export default Index;

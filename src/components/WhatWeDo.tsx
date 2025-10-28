import { Card, CardContent } from "@/components/ui/card";

const WhatWeDo = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-primary mb-6">
          What We Do
        </h2>
        
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <p className="text-foreground/80 leading-relaxed text-lg">
              MotivWealth is a trusted distributor of mutual funds, dedicated to helping individuals grow their wealth through smart investment solutions. The Mutual Fund Distributor partners with leading asset management companies to offer a wide range of mutual fund options tailored to clients' needs. With a focus on transparency, guidance, and customer satisfaction, the distributor simplifies the investment process by providing expert advice and personalized recommendations. The mission is to empower clients with the knowledge and tools they need to make informed financial decisions, ensuring long-term financial growth and stability.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhatWeDo;

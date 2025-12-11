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
              At MotivWealth, Meghna Prakash combines her passion for financial empowerment with professional expertise as a Mutual Fund Distributor. She partners with leading AMCs to offer thoughtfully curated mutual fund solutions that align with every client's unique financial goals.
            </p>
            <p className="text-foreground/80 leading-relaxed text-lg mt-4">
              Meghna believes that investing should feel simple, transparent, and stress-free. Through MotivWealth, she provides personalised guidance, honest advice, and clear strategies that help clients build long-term wealth with confidence and peace of mind.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhatWeDo;

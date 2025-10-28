import { Card, CardContent } from "@/components/ui/card";

const WhatWeDo = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto border-2 shadow-lg">
          <CardContent className="p-8 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              What We Do
            </h2>
            <div className="space-y-4 text-foreground/90 text-lg leading-relaxed">
              <p>
                At MotivWealth, we are dedicated mutual fund distributors registered with 
                the Association of Mutual Funds in India (AMFI). Our mission is to empower 
                individuals and families to achieve their financial goals through strategic 
                and informed investment decisions.
              </p>
              <p>
                We provide expert guidance on a wide range of mutual fund products, helping 
                you navigate the complexities of investing with confidence. Whether you're 
                planning for retirement, building wealth, or saving for specific milestones, 
                we tailor our services to meet your unique financial needs.
              </p>
              <p className="font-semibold text-primary">
                Our commitment is to transparency, integrity, and putting your financial 
                well-being first in every recommendation we make.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhatWeDo;

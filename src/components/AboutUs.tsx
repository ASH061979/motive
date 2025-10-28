import { Card, CardContent } from "@/components/ui/card";

const AboutUs = () => {
  return (
    <section className="py-20 bg-background" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-8">
          About Us
        </h2>

        <div className="space-y-16">
          {/* What We Do Section */}
          <div>
            <h3 className="text-3xl font-semibold text-primary mb-6">
              What We Do
            </h3>
            <p className="text-foreground/80 leading-relaxed text-lg">
              MotivWealth is a trusted distributor of mutual funds, dedicated to helping individuals grow their wealth through smart investment solutions. The Mutual Fund Distributor partners with leading asset management companies to offer a wide range of mutual fund options tailored to clients' needs. With a focus on transparency, guidance, and customer satisfaction, the distributor simplifies the investment process by providing expert advice and personalized recommendations. The mission is to empower clients with the knowledge and tools they need to make informed financial decisions, ensuring long-term financial growth and stability.
            </p>
          </div>

          {/* The Team Section */}
          <div>
            <h3 className="text-3xl font-semibold text-primary mb-6">
              The Team
            </h3>
            
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <h4 className="text-2xl font-semibold text-primary mb-4">
                  About Meghna Prakash
                </h4>
                
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>
                    Meghna Prakash is a banking and finance professional with nearly 20 years of experience, specializing in credit and risk management. Her career is marked by significant roles at a leading Public Sector Bank (PSB) and a Developmental Financial Institution (DFI) - a former subsidiary of the Reserve Bank of India.
                  </p>
                  
                  <p>
                    At the PSB, she expertly managed the entire credit cycle for retail, corporate, and large industrial clients, while her DFI tenure was specialized in regulating, supervising, and financing the housing sector through institutional and direct credit.
                  </p>
                  
                  <p>
                    This experience required extensive engagement with diverse stakeholders, including government ministries, regulatory bodies, and multilateral agencies. Holding a Master of Business Administration in Finance, Meghna also hold necessary certifications from NISM to register with SEBI as an Investment Adviser, besides holding an Associate Wealth Planner certification from FPAS, Singapore, showcasing her robust financial expertise.
                  </p>
                  
                  <p>
                    Her professional journey includes progressive leadership positions at the National Housing Bank, culminating in her role as Assistant General Manager, following her foundational experience in credit management at Canara Bank.
                  </p>
                  
                  <p>
                    Particularly, determined to champion the cause of middle class, ambitious and hard working Indians and women in particular, Meghna has forayed into wealth management and advisory to contribute her bit to the community.
                  </p>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <h5 className="text-xl font-semibold text-primary mb-3">
                      Professional Credentials
                    </h5>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Master of Business Administration (Finance)</li>
                      <li>NISM Mutual Fund Distribution Certification</li>
                      <li>NISM Investment Adviser Certification</li>
                      <li>Associate Wealth Planner and Associate Financial Planner (FPAS – Singapore)</li>
                      <li>CAIIB from Indian Institute of Banking and Finance</li>
                      <li>Work experience of nearly 20 years in Banking & Finance</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

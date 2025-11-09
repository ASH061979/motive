import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import WhatWeDo from "@/components/WhatWeDo";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
              About Us
            </h1>
          </div>
        </div>
        
        <WhatWeDo />
        
        <div className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div>
              <h2 className="text-3xl font-semibold text-primary mb-6">
                About Meghna
              </h2>
              
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="space-y-4 text-foreground/80 leading-relaxed">
                    <p>
                      Meghna is a compassionate and relationship-driven professional who has always believed that financial confidence can transform lives — especially for women and families. After a successful career spanning leadership roles in Banking and Finance, client engagement, and business development across India she discovered a deeper purpose: helping families and women build long-term financial security with clarity and confidence.
                    </p>
                    
                    <p>
                      Over the years, Meghna has worked closely with professionals, parents, and home-makers, and noticed one common challenge — many people earn well, but do not know how to grow money wisely. This inspired her to bridge the gap with MotivWealth, where she combines her strong corporate experience, people-centric approach, and passion for financial literacy to guide families towards stress-free and goal-based investing.
                    </p>
                    
                    <p>
                      As a Mutual Fund Distributor, Meghna brings trust, patience, and a teaching mindset to every conversation. She simplifies financial concepts, listens to your unique needs, and ensures that you feel supported and confident while taking investment decisions. Her approach is calm, non-pushy, and personalised — making investing comfortable even for first-time investors.
                    </p>
                    
                    <p className="font-semibold text-foreground">
                      At MotivWealth, Meghna's mission is simple: to empower more women and families to take charge of their finances, build wealth with discipline, and live with financial freedom and dignity.
                    </p>
                    
                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="text-xl font-semibold text-primary mb-4">
                        Professional Credentials
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-4 font-semibold text-foreground">Qualification / Licence</th>
                              <th className="text-left py-3 px-4 font-semibold text-foreground">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border/50">
                              <td className="py-3 px-4">AMFI–Registered Mutual Fund Distributor (MFD)</td>
                              <td className="py-3 px-4">ARN: 330963</td>
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-3 px-4">NISM Certified</td>
                              <td className="py-3 px-4">NISM Series V-A Mutual Fund Distributors Certification</td>
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-3 px-4">Pan-India Empanelment</td>
                              <td className="py-3 px-4">Empanelled with all major Mutual Fund AMCs</td>
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-3 px-4">Digital Execution & Onboarding</td>
                              <td className="py-3 px-4">Enabled for online transactions via NSE NMF II</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4">Client Segments Served</td>
                              <td className="py-3 px-4">Resident Indians, NRIs, Working Professionals, Women & Families</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="text-xl font-semibold text-primary mb-4">
                        What Clients Appreciate About Meghna
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>She explains investing in simple, relatable language</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>Her approach is warm, trustworthy, and family-oriented</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>She focuses on long-term wealth creation, not "quick returns"</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>She walks with clients throughout their financial journey — patiently and empathetically</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;

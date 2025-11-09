import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const resourceCategories = [
  {
    title: "Regulatory",
    links: [
      { name: "AMFI (Association of Mutual Funds in India)", url: "https://www.amfiindia.com" },
      { name: "SEBI (Securities & Exchange Board of India)", url: "https://www.sebi.gov.in" },
      { name: "SEBI SCORES – Investor Complaint Portal", url: "https://scores.sebi.gov.in" },
      { name: "NSE NMF II Platform Login", url: "https://www.nsenmf.com" },
      { name: "BSE Star MF Login", url: "https://www.bseindia.com/mfunds" },
    ]
  },
  {
    title: "Investor Education",
    links: [
      { name: "Mutual Fund Sahi Hai (AMFI Initiative)", url: "https://www.mutualfundssahihai.com" },
      { name: "NISM e-Learning Modules (Free)", url: "https://nism.ac.in/elearning" },
      { name: "ValueResearch Online (MF Research)", url: "https://www.valueresearchonline.com" },
      { name: "Morningstar India", url: "https://www.morningstar.in" },
      { name: "Finsafe India – Women Financial Awareness", url: "https://finsafe.in" },
    ]
  },
  {
    title: "Calculators",
    links: [
      { name: "AMFI SIP & Goal Calculators", url: "https://www.amfiindia.com/investor-corner/calculators" },
      { name: "Groww SIP Calculator", url: "https://groww.in/calculators/sip-calculator" },
      { name: "HDFC MF Calculators", url: "https://www.hdfcfund.com/calculators" },
      { name: "ClearTax Financial Calculators", url: "https://cleartax.in/calculators" },
    ]
  },
  {
    title: "Downloads",
    description: "Essential documents and guides for your investment journey",
    subsections: [
      {
        subtitle: "Client Documents",
        items: [
          "MotivWealth Client Onboarding Form",
          "Risk Profile Assessment Form",
          "Financial Goal Planning Sheet",
          "KYC Documentation Checklist",
          "NRI Investment Guide",
        ]
      },
      {
        subtitle: "Investor Guides",
        items: [
          "Beginner's Guide to Mutual Funds",
          "SIP Starter Kit – How to Begin Investing",
          "Mutual Fund Taxation Basics",
          "Understanding Risk & Asset Allocation",
        ]
      },
      {
        subtitle: "Regulatory & Disclosures",
        items: [
          "AMFI Code of Conduct for MFDs",
          "Disclosure Document (Commission Details / TER)",
        ]
      }
    ]
  },
  {
    title: "Support & Grievances",
    links: [
      { name: "AMFI Grievance Redressal", url: "https://www.amfiindia.com/investor-corner/investor-grievance" },
      { name: "SEBI SCORES Complaint Portal", url: "https://scores.sebi.gov.in" },
      { name: "KFinTech Investor Support", url: "https://mfs.kfintech.com" },
      { name: "CAMS Investor Support", url: "https://www.camsonline.com" },
    ]
  },
  {
    title: "Market Insights",
    links: [
      { name: "Moneycontrol – Markets", url: "https://www.moneycontrol.com" },
      { name: "Economic Times Markets", url: "https://economictimes.indiatimes.com/markets" },
      { name: "LiveMint – Mutual Funds", url: "https://www.livemint.com/mutual-fund" },
      { name: "Morningstar Fund Analysis", url: "https://www.morningstar.in" },
      { name: "ValueResearch MF Reports", url: "https://www.valueresearchonline.com" },
      { name: "HerMoney (Women Finance)", url: "https://hermoney.com" },
    ]
  }
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Resources</h1>
        <p className="text-foreground/70 text-lg mb-12">
          Comprehensive tools, guides, and regulatory information to support your investment journey
        </p>
        
        <div className="space-y-8">
          {resourceCategories.map((category, index) => (
            <Card key={index} className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">{category.title}</CardTitle>
                {category.description && (
                  <p className="text-foreground/70">{category.description}</p>
                )}
              </CardHeader>
              <CardContent>
                {category.links && (
                  <ul className="space-y-3">
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-2 text-foreground hover:text-primary transition-colors group"
                        >
                          <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0 group-hover:text-primary" />
                          <span>{link.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                
                {category.subsections && (
                  <div className="space-y-6">
                    {category.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h4 className="font-semibold text-foreground mb-3">{subsection.subtitle}</h4>
                        <ul className="space-y-2 ml-4">
                          {subsection.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-foreground/80">
                              <span className="text-primary mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <p className="text-sm text-foreground/60 italic mt-4">
                      Contact us to request any of these documents
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Resources;

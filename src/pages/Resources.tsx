import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react";

const resourceCategories = [
  {
    title: "Investor Education",
    links: [
      { name: "AMFI Investor Corner", url: "https://www.amfiindia.com/investor" },
      { name: "Mutual Funds Sahi Hai", url: "https://www.mutualfundssahihai.com/en" },
      { name: "SEBI Investor Website", url: "https://investor.sebi.gov.in/" },
    ]
  },
  {
    title: "Calculators",
    links: [
      { name: "AMFI SIP & Goal Calculators", url: "https://www.amfiindia.com/investor-corner/calculators" },
      { name: "Groww SIP Calculator", url: "https://groww.in/calculators/sip-calculator" },
      { name: "Groww SWP Calculator", url: "https://groww.in/calculators/swp-calculator" },
      { name: "Groww Lumpsum Calculator", url: "https://groww.in/calculators/lumpsum-calculator" },
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
    title: "Market Insights",
    links: [
      { name: "Economic Times Markets", url: "https://economictimes.indiatimes.com/markets" },
      { name: "LiveMint – Mutual Funds", url: "https://www.livemint.com/mutual-fund" },
      { name: "Morningstar Fund Analysis", url: "https://www.morningstar.in" },
      { name: "ValueResearch MF Reports", url: "https://www.valueresearchonline.com" },
      { name: "HerMoney (Women Finance)", url: "https://hermoney.com" },
    ]
  }
];

const Resources = () => {
  const [libraryOpen, setLibraryOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <PageBackground variant="resources" />
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Resources</h1>
        <p className="text-foreground/70 text-lg mb-12">
          Comprehensive tools, guides, and regulatory information to support your investment journey
        </p>
        
        <div className="space-y-8">
          {resourceCategories.map((category, index) => (
            <Card
              key={index}
              id={category.title === "Regulatory" ? "regulatory" : category.title === "Support & Grievances" ? "support-grievances" : undefined}
              className="border-primary/20"
            >
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
                        target={link.internal ? undefined : "_blank"}
                        rel={link.internal ? undefined : "noopener noreferrer"}
                        className="flex items-start gap-2 text-foreground hover:text-primary transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0 group-hover:text-primary" />
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}

              {category.title === "Investor Education" && (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setLibraryOpen((open) => !open)}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
                    aria-expanded={libraryOpen}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${libraryOpen ? "rotate-180" : ""}`} />
                    <span className="font-medium">MotivWealth Learning Library</span>
                  </button>
                  {libraryOpen && (
                    <div className="space-y-2 mt-3 ml-6">
                      <a
                        href="/blogs#videos"
                        className="block p-3 rounded-lg bg-card hover:bg-accent transition-colors border border-border hover:border-primary text-sm font-medium text-foreground"
                      >
                        Educational Videos
                      </a>
                      <a
                        href="/blogs#articles"
                        className="block p-3 rounded-lg bg-card hover:bg-accent transition-colors border border-border hover:border-primary text-sm font-medium text-foreground"
                      >
                        Market and Investor Notes
                      </a>
                    </div>
                  )}
                </div>
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

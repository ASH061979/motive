import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const resourceCategories = [
  {
    title: "Regulatory",
    links: [
      { name: "Verify an AMFI-registered Mutual Fund Distributor", url: "https://www.amfiindia.com/locate-distributor" },
      { name: "AMFI - Association of Mutual Funds in India", url: "https://www.amfiindia.com" },
      { name: "AMFI Investor Corner", url: "https://www.amfiindia.com/investor" },
      { name: "AMFI Distributor Corner", url: "https://www.amfiindia.com/distributor-corner" },
      { name: "AMFI Circulars for MFDs", url: "https://www.amfiindia.com/distributor/amfi-circulars" },
      { name: "SEBI", url: "https://www.sebi.gov.in" },
    ]
  },
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
    title: "Support & Grievances",
    supportContent: {
      introTitle: "We're Here to Help",
      introText: "Have a question regarding your mutual fund investment, transaction or service request? Please contact MotivWealth first and we will be happy to assist.",
      contactName: "Meghna Prakash",
      contactDesignation: "AMFI-registered Mutual Fund Distributor",
      contactArnEuin: "ARN-330963 | EUIN-E628002",
      email: "meghna@motivewealth.in",
      phone: "+91-8130498071 and +65-83538647",
      workingHours: "10:00 am - 06:00 pm (IST)",
      escalationTitle: "Grievance Escalation",
      escalationLevels: [
        "Level 1 - MotivWealth: Raise the service issue with Meghna / MotivWealth and retain the email or ticket reference.",
        "Level 2 - Concerned Mutual Fund / AMC / RTA: For scheme or transaction-related issues, contact the relevant AMC or its investor service centre / RTA.",
        "Level 3 - SEBI SCORES: If the grievance relates to a SEBI-regulated entity and remains unresolved, use the official SCORES portal as applicable."
      ],
      links: [
        { name: "SEBI SCORES - Official SEBI Complaint Redressal System", url: "https://scores.sebi.gov.in" },
        { name: "CAMS Investor Grievances - For mutual funds serviced through CAMS", url: "https://www.camsonline.com" },
        { name: "AMFI - Official AMFI website; use Investor Corner for mutual fund investor information", url: "https://www.amfiindia.com" }
      ]
    }
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

              {category.supportContent && (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary text-lg mb-2">{category.supportContent.introTitle}</h4>
                    <p className="text-foreground/80 leading-relaxed">{category.supportContent.introText}</p>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                    <p className="font-medium text-foreground">{category.supportContent.contactName} | {category.supportContent.contactDesignation} | {category.supportContent.contactArnEuin}</p>
                    <p className="text-foreground/80"><span className="font-medium">E-mail:</span> <a href={`mailto:${category.supportContent.email}`} className="text-primary hover:underline">{category.supportContent.email}</a></p>
                    <p className="text-foreground/80"><span className="font-medium">Phone/WhatsApp:</span> {category.supportContent.phone}</p>
                    <p className="text-foreground/80"><span className="font-medium">Working hours:</span> {category.supportContent.workingHours}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-primary text-lg mb-3">{category.supportContent.escalationTitle}</h4>
                    <ul className="space-y-3 ml-4">
                      {category.supportContent.escalationLevels.map((level, levelIndex) => (
                        <li key={levelIndex} className="flex items-start gap-2 text-foreground/80">
                          <span className="text-primary mt-1">•</span>
                          <span className="leading-relaxed">{level}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <ul className="space-y-3">
                    {category.supportContent.links.map((link, linkIndex) => (
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

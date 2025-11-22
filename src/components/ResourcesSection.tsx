import { FileText, GraduationCap, Calculator, Handshake, Newspaper } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const regulatoryLinks = [
  { title: "AMFI – Official Website", url: "https://www.amfiindia.com" },
  { title: "SEBI – Official Website", url: "https://www.sebi.gov.in" },
  { title: "SEBI SCORES – Investor Complaints Portal", url: "https://scores.sebi.gov.in" },
  { title: "AMFI Code of Conduct for MFDs (PDF)", url: "https://www.amfiindia.com/Themes/Theme1/downloads/RevisedCodeofConductforMutualFundDistributors-April2022.pdf" },
];

const investorEducationLinks = [
  { title: "Mutual Fund Sahi Hai (AMFI)", url: "https://www.mutualfundssahihai.com" },
];

const calculatorLinks = [
  { title: "SIP Calculator", url: "https://www.mutualfundssahihai.com/en/calculators/sip-calculator" },
];


const supportLinks = [
  { title: "Investor Grievances (to AMC)", description: "Contact respective AMC" },
  { title: "SEBI SCORES Portal", url: "https://scores.sebi.gov.in" },
  { title: "AMFI Helpline", url: "https://www.amfiindia.com/investor-corner/investor-awareness-programs/contact-us" },
];

const marketInsightsLinks = [
  { title: "Live Market Data (NSE)", url: "https://www.nseindia.com" },
  { title: "Moneycontrol MF Section", url: "https://www.moneycontrol.com/mutualfunds" },
  { title: "Economic Times Markets", url: "https://economictimes.indiatimes.com/markets" },
];

const resources = [
  { icon: FileText, title: "Regulatory", dialogType: "regulatory" },
  { icon: GraduationCap, title: "Investor Education", dialogType: "education" },
  { icon: Calculator, title: "Calculators", dialogType: "calculators" },
  { icon: Handshake, title: "Support & Grievances", dialogType: "support" },
  { icon: Newspaper, title: "Market Insights", dialogType: "insights" },
];

const ResourcesSection = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16">
          Resources
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            
            return (
              <div
                key={index}
                onClick={() => setOpenDialog(resource.dialogType)}
                className="text-center bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:border hover:border-emerald-600 cursor-pointer"
              >
                <div className="mb-3 flex justify-center transition-transform duration-300 hover:scale-110">
                  <Icon className="w-12 h-12 text-emerald-600" strokeWidth={1.5} />
                </div>
                <p className="text-emerald-600 font-semibold text-sm leading-tight">
                  {resource.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Regulatory Dialog */}
      <Dialog open={openDialog === "regulatory"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Regulatory Resources</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {regulatoryLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg bg-card hover:bg-accent transition-colors border border-border hover:border-primary"
              >
                <p className="text-foreground font-medium">{link.title}</p>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Investor Education Dialog */}
      <Dialog open={openDialog === "education"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Investor Education</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {investorEducationLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg bg-card hover:bg-accent transition-colors border border-border hover:border-primary"
              >
                <p className="text-foreground font-medium">{link.title}</p>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Calculators Dialog */}
      <Dialog open={openDialog === "calculators"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Calculators & Tools</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {calculatorLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg bg-card hover:bg-accent transition-colors border border-border hover:border-primary"
              >
                <p className="text-foreground font-medium">{link.title}</p>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>


      {/* Support & Grievances Dialog */}
      <Dialog open={openDialog === "support"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Support & Grievances</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {supportLinks.map((link, index) => (
              link.url ? (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg bg-card hover:bg-accent transition-colors border border-border hover:border-primary"
                >
                  <p className="text-foreground font-medium">{link.title}</p>
                </a>
              ) : (
                <div key={index} className="p-4 rounded-lg bg-card border border-border">
                  <p className="text-foreground font-medium">{link.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                </div>
              )
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Market Insights Dialog */}
      <Dialog open={openDialog === "insights"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">Market Insights</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {marketInsightsLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg bg-card hover:bg-accent transition-colors border border-border hover:border-primary"
              >
                <p className="text-foreground font-medium">{link.title}</p>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ResourcesSection;

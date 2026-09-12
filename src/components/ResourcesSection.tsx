import { FileText, GraduationCap, Calculator, Handshake, Newspaper } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const regulatoryLinks = [
  { titleKey: "resources.regulatoryLinks.verifyDistributor", url: "https://www.amfiindia.com/locate-distributor" },
  { titleKey: "resources.regulatoryLinks.amfi", url: "https://www.amfiindia.com" },
  { titleKey: "resources.regulatoryLinks.amfiInvestorCorner", url: "https://www.amfiindia.com/investor" },
  { titleKey: "resources.regulatoryLinks.amfiDistributorCorner", url: "https://www.amfiindia.com/distributor-corner" },
  { titleKey: "resources.regulatoryLinks.amfiCirculars", url: "https://www.amfiindia.com/distributor/amfi-circulars" },
  { titleKey: "resources.regulatoryLinks.sebi", url: "https://www.sebi.gov.in" },
];

const investorEducationLinks = [
  { title: "AMFI Investor Corner", url: "https://www.amfiindia.com/investor" },
  { title: "Mutual Funds Sahi Hai", url: "https://www.mutualfundssahihai.com/en" },
  { title: "SEBI Investor Website", url: "https://investor.sebi.gov.in/" },
];

const calculatorLinks = [
  { title: "SIP Calculator", url: "https://www.mutualfundssahihai.com/en/calculators/sip-calculator" },
];


const supportLinks = [
  { title: "SEBI SCORES Portal", url: "https://scores.sebi.gov.in" },
];

const marketInsightsLinks = [
  { title: "Live Market Data (NSE)", url: "https://www.nseindia.com" },
  { title: "Economic Times Markets", url: "https://economictimes.indiatimes.com/markets" },
];

const ResourcesSection = () => {
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const resources = [
    { icon: FileText, titleKey: "resources.regulatory", dialogType: "regulatory" },
    { icon: GraduationCap, titleKey: "resources.investorEducation", dialogType: "education" },
    { icon: Calculator, titleKey: "resources.calculators", dialogType: "calculators" },
    { icon: Handshake, titleKey: "resources.supportGrievances", dialogType: "support" },
    { icon: Newspaper, titleKey: "resources.marketInsights", dialogType: "insights" },
  ];

  return (
    <section className="py-20 bg-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16">
          {t('resources.title')}
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
                  {t(resource.titleKey)}
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
            <DialogTitle className="text-2xl font-bold text-primary">{t('resources.transparencyFirst')}</DialogTitle>
          </DialogHeader>
          <p className="text-foreground/80 mt-4 leading-relaxed">
            {t('resources.regulatoryIntro')}
          </p>
          <div className="space-y-3 mt-6">
            {regulatoryLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg bg-card hover:bg-accent transition-colors border border-border hover:border-primary"
              >
                <p className="text-foreground font-medium">{t(link.titleKey)}</p>
              </a>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Investor Education Dialog */}
      <Dialog open={openDialog === "education"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">{t('resources.investorEducation')}</DialogTitle>
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
            <DialogTitle className="text-2xl font-bold text-primary">{t('resources.calculatorsTools')}</DialogTitle>
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
            <DialogTitle className="text-2xl font-bold text-primary">{t('resources.supportGrievances')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {supportLinks.map((link, index) => (
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

      {/* Market Insights Dialog */}
      <Dialog open={openDialog === "insights"} onOpenChange={() => setOpenDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">{t('resources.marketInsights')}</DialogTitle>
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

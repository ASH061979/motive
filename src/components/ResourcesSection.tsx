import { FileText, GraduationCap, Calculator, Download, Handshake, Newspaper } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const regulatoryLinks = [
  { title: "AMFI Website", url: "https://www.amfiindia.com" },
  { title: "SEBI Website", url: "https://www.sebi.gov.in" },
  { title: "Know Your Distributor (KYD)", url: "https://www.amfiindia.com/investor-corner/kyd" },
  { title: "Investor Complaints – SEBI SCORES Portal", url: "https://scores.sebi.gov.in" },
  { title: "AMFI Code of Conduct for MFDs", url: "https://www.amfiindia.com/Themes/Theme1/downloads/RevisedCodeofConductforMutualFundDistributors-April2022.pdf" },
];

const resources = [
  { icon: FileText, title: "Regulatory", url: "", isDialog: true },
  { icon: GraduationCap, title: "Investor Education", url: "" },
  { icon: Calculator, title: "Calculators", url: "" },
  { icon: Download, title: "Downloads", url: "" },
  { icon: Handshake, title: "Support & Grievances", url: "" },
  { icon: Newspaper, title: "Market Insights (optional)", url: "" },
];

const ResourcesSection = () => {
  const [isRegulatoryOpen, setIsRegulatoryOpen] = useState(false);

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16">
          Resources
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            const Component = resource.url ? 'a' : 'div';
            const linkProps = resource.url ? {
              href: resource.url,
              target: "_blank",
              rel: "noopener noreferrer"
            } : {};
            
            const handleClick = resource.isDialog ? () => setIsRegulatoryOpen(true) : undefined;
            
            return (
              <Component
                key={index}
                {...linkProps}
                onClick={handleClick}
                className="text-center bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:border hover:border-emerald-600 cursor-pointer block"
              >
                <div className="mb-3 flex justify-center transition-transform duration-300 hover:scale-110">
                  <Icon className="w-12 h-12 text-emerald-600" strokeWidth={1.5} />
                </div>
                <p className="text-emerald-600 font-semibold text-sm leading-tight">
                  {resource.title}
                </p>
              </Component>
            );
          })}
        </div>
      </div>

      <Dialog open={isRegulatoryOpen} onOpenChange={setIsRegulatoryOpen}>
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
    </section>
  );
};

export default ResourcesSection;

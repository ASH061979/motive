import { FileText, GraduationCap, Calculator, Download, Handshake, Newspaper } from "lucide-react";

const resources = [
  { icon: FileText, title: "Regulatory", url: "https://www.amfiindia.com" },
  { icon: GraduationCap, title: "Investor Education", url: "https://www.mutualfundssahihai.com" },
  { icon: Calculator, title: "Calculators", url: "https://www.mutualfundssahihai.com/en/calculators/sip-calculator" },
  { icon: Download, title: "Downloads", url: "https://www.amfiindia.com/investor-corner" },
  { icon: Handshake, title: "Support & Grievances", url: "https://scores.sebi.gov.in" },
  { icon: Newspaper, title: "Market Insights (optional)", url: "https://www.amfiindia.com/net-asset-value-nav" },
];

const ResourcesSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16">
          Resources
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center bg-white rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:border hover:border-emerald-600 cursor-pointer block"
              >
                <div className="mb-3 flex justify-center transition-transform duration-300 hover:scale-110">
                  <Icon className="w-12 h-12 text-emerald-600" strokeWidth={1.5} />
                </div>
                <p className="text-emerald-600 font-semibold text-sm leading-tight">
                  {resource.title}
                </p>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;

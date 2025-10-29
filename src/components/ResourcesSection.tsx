import { FileText, GraduationCap, Calculator, Download, Handshake, Newspaper } from "lucide-react";

const resources = [
  { icon: FileText, title: "Regulatory" },
  { icon: GraduationCap, title: "Investor Education" },
  { icon: Calculator, title: "Calculators" },
  { icon: Download, title: "Downloads" },
  { icon: Handshake, title: "Support & Grievances" },
  { icon: Newspaper, title: "Market Insights (optional)" },
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
              <div 
                key={index} 
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
    </section>
  );
};

export default ResourcesSection;

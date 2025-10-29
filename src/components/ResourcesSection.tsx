const resources = [
  { icon: "📑", title: "Regulatory" },
  { icon: "🎓", title: "Investor Education" },
  { icon: "🧮", title: "Calculators" },
  { icon: "📥", title: "Downloads" },
  { icon: "🤝", title: "Support & Grievances" },
  { icon: "📰", title: "Market Insights (optional)" },
];

const ResourcesSection = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16">
          Resources
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {resources.map((resource, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-3">{resource.icon}</div>
              <p className="text-foreground/80 font-medium">
                {resource.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;

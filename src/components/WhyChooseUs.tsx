const features = [
  {
    title: "Expert Guidance",
    description:
      "Leverage our experience as an AMFI registered distributor to navigate your investments.",
  },
  {
    title: "Client-Centric Approach",
    description:
      "We prioritize your financial well-being with personalialized investment strategies.",
  },
  {
    title: "Trust and Integrity",
    description:
      "Committed to transparency and ethics in all our mutual fund distribution practices.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16">
          Why Choose Us
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {features.map((feature, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                {feature.title}
              </h3>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center text-foreground/70 text-sm border-t border-border pt-8">
          <p>
            Mutual Fund Distributor, AMFI registered. Fees and commissions are aplicable in distribution of products
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

const features = [
  {
    title: "Expert & Caring Guidance",
    description:
      "As an AMFI-registered Mutual Fund Distributor, we bring professional expertise with a personal touch. You receive clear, well-researched guidance that helps you make confident financial decisions—without jargon or pressure.",
  },
  {
    title: "Truly Client-Centric Approach",
    description:
      "Your life goals, comfort, and financial well-being come first. We take time to understand your needs and craft personalised investment plans that suit your family, values, and priorities—because every financial journey is unique.",
  },
  {
    title: "Trust, Transparency & Integrity",
    description:
      "You deserve advice that's honest and unbiased. We follow ethical, transparent practices so you always know where your money is invested and why. With MotivWealth, you gain a partner you can trust—not just for today, but for years to come.",
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

      </div>
    </section>
  );
};

export default WhyChooseUs;

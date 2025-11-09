import { TrendingUp, Target, BookOpen, Users } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Investment Solutions",
    description: "We guide you toward the right mix of mutual funds based on your goals, comfort with risk, and life stage. Every recommendation is thoughtfully selected to help your wealth grow steadily and securely — without overwhelm or confusion.",
  },
  {
    icon: Target,
    title: "Goal Planning",
    description: "Your dreams deserve a clear financial path. Whether it's children's education, retirement, buying a home, or creating a personal financial cushion, we help you plan with structured strategies and practical steps so you reach each milestone with confidence.",
  },
  {
    icon: BookOpen,
    title: "Financial Education",
    description: "We believe informed investors make the best decisions. Through simple explanations, regular learning sessions, and easy-to-understand guidance, we help you build financial clarity and confidence — especially if you're just starting your investment journey.",
  },
  {
    icon: Users,
    title: "Client Support",
    description: "You'll never feel alone in your financial journey. We provide personalised support, regular updates, and periodic portfolio reviews — always just a call or message away. Our approach is warm, patient, and relationship-driven, ensuring you feel heard, supported, and valued.",
  },
];

const HowWeHelp = () => {
  return (
    <section className="py-20 bg-card" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center md:text-left mb-16">
          How We Help
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-primary stroke-[1.5]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeHelp;

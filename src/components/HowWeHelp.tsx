import { TrendingUp, Target, BookOpen, Users } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Investment Solutions",
    description: "Providing a range of mutual fund investment options tailored to your goals.",
  },
  {
    icon: Target,
    title: "Goal Planning",
    description: "Helping you plan-for future financial mifesteries with strategic investing",
  },
  {
    icon: BookOpen,
    title: "Financial Education",
    description: "Empowering you with knowledge to make informed investment decisions",
  },
  {
    icon: Users,
    title: "Client Support",
    description: "Offering personalized assistance andall due support  for your investment journey.",
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

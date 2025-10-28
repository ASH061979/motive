import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shield, Target, Users, PiggyBank, LineChart } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Portfolio Growth",
      description: "Smart investment strategies designed to maximize your returns while you focus on your career."
    },
    {
      icon: Shield,
      title: "Secure Investing",
      description: "Bank-level security and insurance protection for all your investments and financial data."
    },
    {
      icon: Target,
      title: "Goal-Based Planning",
      description: "Customized investment plans tailored to your specific financial goals and timeline."
    },
    {
      icon: Users,
      title: "Expert Advisory",
      description: "Access to experienced financial advisors who understand your unique needs and aspirations."
    },
    {
      icon: PiggyBank,
      title: "Systematic Investment Plans",
      description: "Build wealth gradually with disciplined SIP strategies that fit your budget and lifestyle."
    },
    {
      icon: LineChart,
      title: "Portfolio Monitoring",
      description: "Regular performance reviews and rebalancing to keep your investments aligned with your goals."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Your Money, Always Working
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Experience the future of passive income with our intelligent investment platform designed for busy professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Card className="max-w-3xl mx-auto bg-primary/5">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold text-primary mb-4">
                  Why Choose Our Services?
                </h2>
                <p className="text-foreground/80 leading-relaxed mb-4">
                  With nearly 20 years of experience in banking and finance, we bring deep expertise in credit, risk management, and wealth advisory. Our SEBI-registered investment advisory services are backed by certifications from NISM and FPAS Singapore, ensuring you receive professional, ethical, and transparent financial guidance.
                </p>
                <p className="text-foreground/80 leading-relaxed">
                  We're committed to empowering middle-class professionals, particularly women, with the knowledge and tools needed to achieve financial independence and long-term wealth creation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Services;

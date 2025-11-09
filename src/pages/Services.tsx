import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shield, Target, Users, PiggyBank, LineChart } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: TrendingUp,
      title: "Portfolio Growth",
      description: "Your money should grow with you and for you. We help you build a thoughtfully curated portfolio that matches your life dreams, comfort level, and family priorities. With steady and balanced growth, your investments work quietly in the background — helping you move closer to the life you desire."
    },
    {
      icon: Shield,
      title: "Secure Investing",
      description: "Financial security gives peace of mind — and that's what we focus on first. We guide you toward safe, regulated and well-diversified investments, so your hard-earned money is protected. You stay in control, informed, and confident at every step, without any pressure or confusion."
    },
    {
      icon: Target,
      title: "Goal-Based Planning",
      description: "Every woman has unique dreams — whether it's planning for children's future, creating your own identity, supporting parents, or building a retirement fund that gives freedom. We create a personalised plan for each of your goals, with care, clarity, and step-by-step guidance so you can achieve them with confidence."
    },
    {
      icon: PiggyBank,
      title: "Systematic Investment Plans (SIP)",
      description: "SIPs make investing simple, stress-free, and completely manageable — even if you're new to it. By investing small amounts regularly, you build wealth gradually and peacefully over time. We help you choose the right SIPs so you can enjoy the magic of compounding while still caring for your everyday responsibilities."
    },
    {
      icon: LineChart,
      title: "Portfolio Monitoring",
      description: "We don't leave your hand once you start. Your investments are reviewed with sensitivity to life changes — career breaks, children, family needs, or personal goals. With gentle guidance and timely updates, we make sure your money continues to stay aligned with your life's journey."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Services
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Thoughtful financial guidance designed to support your life dreams with care, clarity, and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                  Why Choose Our Services
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  MotivWealth brings a calm, friendly, and educational approach to investing — without pressure or jargon. You receive personalised guidance, transparent advice, and ongoing support tailored especially for families, first-time investors and women who want clarity, confidence, and compassionate support in their financial journey. We prioritise trust, long-term relationships, and helping you grow your wealth confidently and comfortably.
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

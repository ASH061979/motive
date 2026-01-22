import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shield, Target, PiggyBank, LineChart } from "lucide-react";
import { useTranslation } from "react-i18next";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: TrendingUp,
      titleKey: "services.portfolioGrowth.title",
      descriptionKey: "services.portfolioGrowth.description"
    },
    {
      icon: Shield,
      titleKey: "services.secureInvesting.title",
      descriptionKey: "services.secureInvesting.description"
    },
    {
      icon: Target,
      titleKey: "services.goalBasedPlanning.title",
      descriptionKey: "services.goalBasedPlanning.description"
    },
    {
      icon: PiggyBank,
      titleKey: "services.sip.title",
      descriptionKey: "services.sip.description"
    },
    {
      icon: LineChart,
      titleKey: "services.portfolioMonitoring.title",
      descriptionKey: "services.portfolioMonitoring.description"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              {t('services.title')}
            </h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              {t('services.subtitle')}
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
                      <CardTitle className="text-xl">{t(service.titleKey)}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/80 leading-relaxed">
                      {t(service.descriptionKey)}
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
                  {t('services.whyChoose.title')}
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  {t('services.whyChoose.description')}
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
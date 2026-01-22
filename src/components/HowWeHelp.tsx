import { TrendingUp, Target, BookOpen, Users } from "lucide-react";
import { useTranslation } from "react-i18next";

const HowWeHelp = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: TrendingUp,
      titleKey: "howWeHelp.investmentSolutions.title",
      descriptionKey: "howWeHelp.investmentSolutions.description",
    },
    {
      icon: Target,
      titleKey: "howWeHelp.goalPlanning.title",
      descriptionKey: "howWeHelp.goalPlanning.description",
    },
    {
      icon: BookOpen,
      titleKey: "howWeHelp.financialEducation.title",
      descriptionKey: "howWeHelp.financialEducation.description",
    },
    {
      icon: Users,
      titleKey: "howWeHelp.clientSupport.title",
      descriptionKey: "howWeHelp.clientSupport.description",
    },
  ];

  return (
    <section className="py-20 bg-card" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center md:text-left mb-16">
          {t('howWeHelp.title')}
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
                  {t(service.titleKey)}
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  {t(service.descriptionKey)}
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

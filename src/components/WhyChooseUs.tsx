import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      titleKey: "whyChooseUs.expertGuidance.title",
      descriptionKey: "whyChooseUs.expertGuidance.description",
    },
    {
      titleKey: "whyChooseUs.clientCentric.title",
      descriptionKey: "whyChooseUs.clientCentric.description",
    },
    {
      titleKey: "whyChooseUs.trustTransparency.title",
      descriptionKey: "whyChooseUs.trustTransparency.description",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-16">
          {t('whyChooseUs.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {features.map((feature, index) => (
            <div key={index}>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                {t(feature.titleKey)}
              </h3>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;

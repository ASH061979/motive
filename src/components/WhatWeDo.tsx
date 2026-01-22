import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const WhatWeDo = () => {
  const { t } = useTranslation();

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-primary mb-6">
          {t('whatWeDo.title')}
        </h2>
        
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <p className="text-foreground/80 leading-relaxed text-lg">
              {t('whatWeDo.description1')}
            </p>
            <p className="text-foreground/80 leading-relaxed text-lg mt-4">
              {t('whatWeDo.description2')}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WhatWeDo;
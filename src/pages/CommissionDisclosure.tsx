import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

const CommissionDisclosure = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <PageBackground variant="about" />
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {t('commissionDisclosure.title')}
        </h1>
        <p className="text-foreground/70 text-lg mb-12">
          {t('commissionDisclosure.subtitle')}
        </p>

        <div className="space-y-6">
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <p className="text-foreground/80 leading-relaxed">
                MotivWealth is a mutual fund distribution service. When you invest in a Regular Plan of a mutual fund through MotivWealth, Meghna Prakash (ARN-330963) may receive trail commission from the respective Asset Management Company (AMC).
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <p className="text-foreground/80 leading-relaxed">
                The commission rate may vary across AMCs, schemes and categories and may change from time to time in accordance with the commission structure of the respective AMC and applicable regulations.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <p className="text-foreground/80 leading-relaxed">
                MotivWealth believes in transparency and will make relevant commission information available to investors in accordance with applicable requirements.
              </p>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold text-primary mb-3">
                {t('commissionDisclosure.amfiHeading')}
              </h2>
              <a
                href="https://www.amfiindia.com/research-information/commission-disclosure"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors group"
              >
                <ExternalLink className="w-4 h-4 flex-shrink-0 group-hover:text-primary" />
                <span>{t('commissionDisclosure.amfiLink')}</span>
              </a>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CommissionDisclosure;

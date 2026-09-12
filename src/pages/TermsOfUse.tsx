import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const sections = [
  {
    title: "Acceptance",
    content: `By using the website, you agree to these Terms of Use and the linked Disclaimer and Privacy Policy.`
  },
  {
    title: "Permitted Use",
    content: `Website content may be used for personal informational purposes. Users should not misuse the website, interfere with its operation or reproduce branded content for commercial purposes without permission.`
  },
  {
    title: "Intellectual Property",
    content: `MotivWealth branding, original articles, graphics and educational content are owned by or used with permission by MotivWealth, except third-party marks and linked content.`
  },
  {
    title: "No Assured Outcome",
    content: `Nothing on the site should be understood as an assurance of investment returns or future market outcomes.`
  },
  {
    title: "External Services",
    content: `Any third-party portal, calculator, AMC, RTA, payment or regulatory website is governed by that provider's own terms.`
  },
  {
    title: "Changes",
    content: `MotivWealth may update website content or these terms from time to time.`
  }
];

const TermsOfUse = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <PageBackground variant="about" />
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {t('termsOfUse.title')}
        </h1>
        <p className="text-foreground/70 text-lg mb-12">
          {t('termsOfUse.subtitle')}
        </p>

        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="border-primary/20">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-primary mb-3">
                  {section.title}
                </h2>
                <p className="text-foreground/80 leading-relaxed">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TermsOfUse;

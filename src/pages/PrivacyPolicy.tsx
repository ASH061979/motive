import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const sections = [
  {
    title: "Information We May Collect",
    content: `Name, contact details, KYC-related information, PAN/bank information where required for onboarding or transaction processing, investment/service information, correspondence and basic website usage/cookie information.`
  },
  {
    title: "Purpose of Use",
    content: `To respond to enquiries, assist with KYC/onboarding, facilitate authorised mutual fund transactions, provide service and portfolio-related communications, meet regulatory/record-keeping obligations and improve website/service experience.`
  },
  {
    title: "Sharing",
    content: `Information may be shared where necessary with AMCs, RTAs, transaction/execution platforms, KYC/KRA/CKYC entities, banks/payment service providers, technology providers or regulators/law-enforcement authorities where legally required.`
  },
  {
    title: "Security",
    content: `MotivWealth will take reasonable administrative and technical steps appropriate to the nature of the information held. No internet or electronic storage system can be guaranteed to be completely secure.`
  },
  {
    title: "Retention",
    content: `Personal information may be retained for as long as required to provide services or meet applicable legal, regulatory, audit and record-keeping obligations.`
  },
  {
    title: "User Choices",
    content: `Users may request correction of contact information and may opt out of non-essential marketing communications, subject to communications that are required for service, transaction or regulatory purposes.`
  }
];

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <PageBackground variant="about" />
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {t('privacyPolicy.title')}
        </h1>
        <p className="text-foreground/70 text-lg mb-12">
          {t('privacyPolicy.subtitle')}
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

export default PrivacyPolicy;

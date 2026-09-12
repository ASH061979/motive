import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "Regulatory Status",
    content: `MotivWealth is the brand name used by Meghna Prakash, an AMFI-registered Mutual Fund Distributor (ARN-330963 | EUIN-E628002). MotivWealth / Meghna Prakash is not presented on this website as a SEBI-registered Investment Adviser.`
  },
  {
    title: "Nature of Website Content",
    content: `The information, educational material, illustrations and general content on this website are provided for information and investor education. They should not be construed as personalised investment advice or as a guarantee, assurance or representation regarding the future performance of any mutual fund scheme.`
  },
  {
    title: "Mutual Fund Risk",
    content: `Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully, including the Scheme Information Document, Key Information Memorandum and other applicable scheme documents. NAVs and investment values can rise or fall.`
  },
  {
    title: "Past Performance",
    content: `Past performance is not indicative of future performance. Historical returns, rankings, illustrations and examples, if displayed, are not assurances of future returns.`
  },
  {
    title: "Calculators & Illustrations",
    content: `Calculator results and projections are based on user-selected assumptions and are illustrative only. Actual returns may be higher or lower, and no rate of return is assured.`
  },
  {
    title: "Third-Party Information",
    content: `Market data, NAVs, transaction information or other information may be sourced from AMCs, RTAs, exchanges, regulators or other third-party providers. Reasonable care may be taken in presenting such information, but information can change and users should verify material information from the relevant official source.`
  },
  {
    title: "Regular Plans & Commission",
    content: `When an investor invests in a Regular Plan through Meghna Prakash (Brand Name – MotivWealth), the relevant AMC may pay trail commission to Meghna Prakash in accordance with the AMC's prevailing commission structure and applicable regulations. See the Commission Disclosure page for further information. The information regarding trailing commissions is also available on respective AMCs' websites.`,
    link: { text: "View Commission Disclosure", href: "/commission-disclosure" }
  },
  {
    title: "External Links",
    content: `Links to third-party websites are provided for convenience and education. Those websites are governed by their own terms, privacy policies and content standards.`
  },
  {
    title: "Investor Responsibility",
    content: `Investors should consider their own goals, time horizon, financial circumstances and risk tolerance, and should read the relevant scheme documents before investing.`
  },
  {
    title: "Limitation",
    content: `To the extent permitted by applicable law, Meghna Prakash (Brand name – MotivWealth) will not be responsible for losses arising solely from market movements or a user's reliance on general website information. Nothing in this disclaimer excludes any responsibility that cannot lawfully be excluded.`
  },
  {
    title: "Changes",
    content: `Website information and disclosures may be updated from time to time to reflect regulatory, product or operational changes.`
  },
  {
    title: "Grievances",
    content: `For service issues or complaints, please use the Support & Grievances page.`
  }
];

const Disclaimer = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <PageBackground variant="about" />
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {t('disclaimer.title')}
        </h1>
        <p className="text-foreground/70 text-lg mb-12">
          {t('disclaimer.subtitle')}
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
                {section.link && (
                  <Link
                    to={section.link.href}
                    className="inline-block mt-4 text-primary hover:underline font-medium"
                  >
                    {section.link.text}
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Disclaimer;

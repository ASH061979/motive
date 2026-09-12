import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Mail, Phone, Clock } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const [regulatoryOpen, setRegulatoryOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const regulatoryLinks = [
    { label: t("resources.regulatoryLinks.verifyDistributor"), url: "https://www.amfiindia.com/locate-distributor" },
    { label: t("resources.regulatoryLinks.amfi"), url: "https://www.amfiindia.com" },
    { label: t("resources.regulatoryLinks.amfiInvestorCorner"), url: "https://www.amfiindia.com/investor" },
    { label: t("resources.regulatoryLinks.amfiDistributorCorner"), url: "https://www.amfiindia.com/distributor-corner" },
    { label: t("resources.regulatoryLinks.amfiCirculars"), url: "https://www.amfiindia.com/distributor/amfi-circulars" },
    { label: t("resources.regulatoryLinks.sebi"), url: "https://www.sebi.gov.in" },
  ];

  const supportLinks = [
    { label: t("resources.support.sebiScores"), url: "https://scores.sebi.gov.in" },
    { label: t("resources.support.camsGrievances"), url: "https://www.camsonline.com" },
    { label: t("resources.support.amfi"), url: "https://www.amfiindia.com" },
  ];

  const escalationLevels = [
    t("resources.support.level1"),
    t("resources.support.level2"),
    t("resources.support.level3"),
  ];

  const linkItems = [
    { label: t("footer.links.regulatory"), action: () => setRegulatoryOpen(true) },
    { label: t("footer.links.disclaimerDisclosures"), href: "/disclaimer" },
    { label: t("footer.links.commissionDisclosure"), href: "/commission-disclosure" },
    { label: t("footer.links.privacyPolicy"), href: "/privacy-policy" },
    { label: t("footer.links.termsOfUse"), href: "/terms-of-use" },
    { label: t("footer.links.supportGrievances"), action: () => setSupportOpen(true) },
  ];

  return (
    <footer className="bg-secondary border-t border-border py-8">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p className="text-primary" style={{ fontSize: '14px' }}>
          {t('footer.disclaimer')}
          <br />
          {t('footer.riskWarning')}
        </p>

        <div className="flex flex-wrap justify-center gap-x-2 text-sm text-foreground/80 max-w-4xl mx-auto">
          {linkItems.map((item, index) => (
            <span key={item.label} className="whitespace-nowrap">
              {item.href ? (
                <Link to={item.href} className="hover:text-primary hover:underline transition-colors">
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={item.action}
                  className="hover:text-primary hover:underline transition-colors"
                >
                  {item.label}
                </button>
              )}
              {index < linkItems.length - 1 && (
                <span className="ml-2 text-foreground/50">|</span>
              )}
            </span>
          ))}
        </div>

        <p className="text-primary text-xs">
          {t('footer.developer')}
        </p>
      </div>

      <Dialog open={regulatoryOpen} onOpenChange={setRegulatoryOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {t('resources.regulatoryResources')}
            </DialogTitle>
            <DialogDescription className="text-foreground/70">
              {t('resources.regulatoryIntro')}
            </DialogDescription>
          </DialogHeader>
          <ul className="space-y-3 mt-4">
            {regulatoryLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-foreground hover:text-primary transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0 group-hover:text-primary" />
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>

      <Dialog open={supportOpen} onOpenChange={setSupportOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-primary">
              {t('resources.supportGrievances')}
            </DialogTitle>
            <DialogDescription className="text-foreground/70">
              {t('resources.support.contactPrompt')}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div className="bg-card border border-border rounded-lg p-4 space-y-2">
              <p className="font-medium text-foreground">
                {t('resources.support.name')} | {t('resources.support.designation')} | ARN-330963 | EUIN-E628002
              </p>
              <p className="text-foreground/80 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" />
                <a href={`mailto:${t('resources.support.emailValue')}`} className="text-primary hover:underline">
                  {t('resources.support.emailValue')}
                </a>
              </p>
              <p className="text-foreground/80 flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                {t('resources.support.phoneNumbers')}
              </p>
              <p className="text-foreground/80 flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                {t('resources.support.workingHours')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-primary text-lg mb-3">
                {t('resources.support.grievanceEscalation')}
              </h4>
              <ul className="space-y-3 ml-4">
                {escalationLevels.map((level, index) => (
                  <li key={index} className="flex items-start gap-2 text-foreground/80">
                    <span className="text-primary mt-1">•</span>
                    <span className="leading-relaxed">{level}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-2 text-foreground hover:text-primary transition-colors group"
                  >
                    <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0 group-hover:text-primary" />
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;

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
import { ExternalLink } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const [regulatoryOpen, setRegulatoryOpen] = useState(false);

  const regulatoryLinks = [
    { label: t("resources.regulatoryLinks.verifyDistributor"), url: "https://www.amfiindia.com/locate-distributor" },
    { label: t("resources.regulatoryLinks.amfi"), url: "https://www.amfiindia.com" },
    { label: t("resources.regulatoryLinks.amfiInvestorCorner"), url: "https://www.amfiindia.com/investor" },
    { label: t("resources.regulatoryLinks.amfiDistributorCorner"), url: "https://www.amfiindia.com/distributor-corner" },
    { label: t("resources.regulatoryLinks.amfiCirculars"), url: "https://www.amfiindia.com/distributor/amfi-circulars" },
    { label: t("resources.regulatoryLinks.sebi"), url: "https://www.sebi.gov.in" },
  ];

  const linkItems = [
    { label: t("footer.links.regulatory"), isRegulatory: true },
    { label: t("footer.links.disclaimerDisclosures"), href: "/disclaimer" },
    { label: t("footer.links.commissionDisclosure"), href: "/commission-disclosure" },
    { label: t("footer.links.privacyPolicy"), href: "/privacy-policy" },
    { label: t("footer.links.termsOfUse"), href: "/terms-of-use" },
    { label: t("footer.links.supportGrievances"), href: "/resources#support-grievances" },
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
              {item.isRegulatory ? (
                <button
                  onClick={() => setRegulatoryOpen(true)}
                  className="hover:text-primary hover:underline transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <Link to={item.href!} className="hover:text-primary hover:underline transition-colors">
                  {item.label}
                </Link>
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
    </footer>
  );
};

export default Footer;

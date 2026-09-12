import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  const linkItems = [
    { label: t("footer.links.regulatory") },
    { label: t("footer.links.disclaimerDisclosures"), href: "/disclaimer" },
    { label: t("footer.links.commissionDisclosure"), href: "/commission-disclosure" },
    { label: t("footer.links.privacyPolicy"), href: "/privacy-policy" },
    { label: t("footer.links.termsOfUse") },
    { label: t("footer.links.supportGrievances") },
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
                item.label
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
    </footer>
  );
};

export default Footer;

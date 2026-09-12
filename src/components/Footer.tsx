import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();

  const links = [
    { key: "footer.links.regulatory", to: "/resources" },
    { key: "footer.links.disclaimerDisclosures", to: "/resources" },
    { key: "footer.links.commissionDisclosure", to: "/resources" },
    { key: "footer.links.privacyPolicy", to: "/resources" },
    { key: "footer.links.termsOfUse", to: "/resources" },
    { key: "footer.links.supportGrievances", to: "/contact" },
  ];

  return (
    <footer className="bg-secondary border-t border-border py-8">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p className="text-primary" style={{ fontSize: '14px' }}>
          {t('footer.disclaimer')}
        </p>
        <p className="text-primary" style={{ fontSize: '14px' }}>
          {t('footer.riskWarning')}
        </p>

        <nav className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 max-w-2xl mx-auto text-sm">
          {links.map((link) => (
            <Link
              key={link.key}
              to={link.to}
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border w-full" />

        <p className="text-primary text-xs">
          {t('footer.developer')}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

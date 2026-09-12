import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const linkLabels = [
    t("footer.links.regulatory"),
    t("footer.links.disclaimerDisclosures"),
    t("footer.links.commissionDisclosure"),
    t("footer.links.privacyPolicy"),
    t("footer.links.termsOfUse"),
    t("footer.links.supportGrievances"),
  ];

  return (
    <footer className="bg-secondary border-t border-border py-8">
      <div className="container mx-auto px-4 text-center space-y-4">
        <p className="text-primary" style={{ fontSize: '14px' }}>
          {t('footer.disclaimer')} {t('footer.riskWarning')}
        </p>

        <div className="flex flex-wrap justify-center gap-x-2 text-sm text-foreground/80 max-w-4xl mx-auto">
          {linkLabels.map((label, index) => (
            <span key={label} className="whitespace-nowrap">
              {label}
              {index < linkLabels.length - 1 && (
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

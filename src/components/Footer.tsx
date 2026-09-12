import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const linkKeys = [
    "footer.links.regulatory",
    "footer.links.disclaimerDisclosures",
    "footer.links.commissionDisclosure",
    "footer.links.privacyPolicy",
    "footer.links.termsOfUse",
    "footer.links.supportGrievances",
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

        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-sm text-primary">
          {linkKeys.map((key, idx) => (
            <span key={key}>
              {t(key)}
              {idx < linkKeys.length - 1 && <span className="mx-2">|</span>}
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

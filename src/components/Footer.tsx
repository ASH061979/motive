import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-secondary border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2">
          <p className="text-foreground/80 text-sm">
            {t('footer.disclaimer')}
          </p>
          <p className="text-foreground/60 text-xs">
            {t('footer.riskWarning')}
          </p>
          <p className="text-foreground/50 text-xs mt-4">
            {t('footer.developer')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

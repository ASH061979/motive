import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hasSelectedLanguage = localStorage.getItem('preferredLanguage');
    if (!hasSelectedLanguage) {
      setOpen(true);
    }
  }, []);

  const selectLanguage = (lang: 'en' | 'hi') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-primary text-center">
            {t('languageSelector.title')}
          </DialogTitle>
          <p className="text-xl text-foreground/80 text-center mt-1">
            {t('languageSelector.subtitle')}
          </p>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 py-8 text-lg font-semibold border-2 hover:border-primary hover:bg-primary/10"
            onClick={() => selectLanguage('en')}
          >
            🇬🇧 {t('languageSelector.english')}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="flex-1 py-8 text-lg font-semibold border-2 hover:border-primary hover:bg-primary/10"
            onClick={() => selectLanguage('hi')}
          >
            🇮🇳 {t('languageSelector.hindi')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelector;

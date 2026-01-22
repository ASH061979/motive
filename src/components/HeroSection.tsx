import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/AuthDialog";

const HeroSection = () => {
  const { t } = useTranslation();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  return (
    <>
      <AuthDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    <section className="py-20 md:py-32 bg-secondary" id="home">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-8 max-w-4xl mx-auto leading-tight">
          {t('hero.title')}
        </h1>
        
        <div className="flex justify-center items-center">
          <Button 
            size="lg" 
            variant="outline"
            className="border-2 border-foreground text-foreground hover:bg-foreground/10 px-8 py-6 text-lg font-semibold rounded-lg bg-background"
            onClick={() => setAuthDialogOpen(true)}
          >
            {t('common.getStarted')}
          </Button>
        </div>
      </div>
    </section>
    </>
  );
};

export default HeroSection;

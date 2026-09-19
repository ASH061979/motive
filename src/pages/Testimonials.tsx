import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials: { quote: string; name: string; detail: string }[] = [];

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <PageBackground variant="blogs" />
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-primary mb-4">{t("nav.testimonials")}</h1>
        <p className="text-muted-foreground mb-12 text-lg max-w-2xl">
          {t("testimonials.subtitle")}
        </p>

        {testimonials.length === 0 ? (
          <Card className="max-w-xl">
            <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
              <Quote className="h-10 w-10 text-primary/40" />
              <p className="text-muted-foreground">{t("testimonials.empty")}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {testimonials.map((item, i) => (
              <Card key={i} className="h-full">
                <CardContent className="flex flex-col gap-4 py-6">
                  <Quote className="h-8 w-8 text-primary/40" />
                  <p className="text-foreground">{item.quote}</p>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Testimonials;

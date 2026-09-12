import { useState } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const HELP_TOPICS = [
  "gettingStarted",
  "sip",
  "goalPlanning",
  "existingPortfolio",
  "nriInvesting",
  "other",
] as const;

const ContactUs = () => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [cityCountry, setCityCountry] = useState("");
  const [helpTopic, setHelpTopic] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setName("");
    setEmail("");
    setMobile("");
    setCityCountry("");
    setHelpTopic("");
    setMessage("");
  };

  const validateForm = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMobile = mobile.trim();
    const trimmedCityCountry = cityCountry.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      toast({
        title: t("contactUs.validation.nameRequired"),
        description: t("contactUs.validation.nameRequiredDesc"),
        variant: "destructive",
      });
      return null;
    }

    if (!trimmedEmail) {
      toast({
        title: t("contactUs.validation.emailRequired"),
        description: t("contactUs.validation.emailRequiredDesc"),
        variant: "destructive",
      });
      return null;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast({
        title: t("contactUs.validation.invalidEmail"),
        description: t("contactUs.validation.invalidEmailDesc"),
        variant: "destructive",
      });
      return null;
    }

    if (!trimmedMobile) {
      toast({
        title: t("contactUs.validation.mobileRequired"),
        description: t("contactUs.validation.mobileRequiredDesc"),
        variant: "destructive",
      });
      return null;
    }

    if (!trimmedCityCountry) {
      toast({
        title: t("contactUs.validation.cityCountryRequired"),
        description: t("contactUs.validation.cityCountryRequiredDesc"),
        variant: "destructive",
      });
      return null;
    }

    if (!helpTopic) {
      toast({
        title: t("contactUs.validation.helpTopicRequired"),
        description: t("contactUs.validation.helpTopicRequiredDesc"),
        variant: "destructive",
      });
      return null;
    }

    if (!trimmedMessage) {
      toast({
        title: t("contactUs.validation.messageRequired"),
        description: t("contactUs.validation.messageRequiredDesc"),
        variant: "destructive",
      });
      return null;
    }

    return {
      name: trimmedName,
      email: trimmedEmail,
      mobile: trimmedMobile,
      cityCountry: trimmedCityCountry,
      helpTopic,
      message: trimmedMessage,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = validateForm();
    if (!formData) {
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: formData,
      });

      if (error) throw error;

      toast({
        title: t("contactUs.success.title"),
        description: t("contactUs.success.description"),
      });

      resetForm();
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: t("contactUs.error.title"),
        description: t("contactUs.error.description"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormFilled =
    name.trim() &&
    email.trim() &&
    mobile.trim() &&
    cityCountry.trim() &&
    helpTopic &&
    message.trim();

  return (
    <div className="min-h-screen">
      <PageBackground variant="contact" />
      <Navbar />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {t("contactUs.title")}
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            {t("contactUs.intro")}
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    {t("contactUs.phoneNumbers")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a
                    href="tel:+6583538647"
                    className="block text-lg hover:text-primary transition-colors"
                  >
                    +65 8353 8647
                  </a>
                  <a
                    href="tel:+918130498071"
                    className="block text-lg hover:text-primary transition-colors"
                  >
                    +91 8130498071
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    {t("contactUs.email")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <a
                    href="mailto:meghna@motivewealth.in"
                    className="text-lg hover:text-primary transition-colors"
                  >
                    meghna@motivewealth.in
                  </a>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{t("contactUs.sendMessage")}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("contactUs.form.name")}</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={t("contactUs.form.namePlaceholder")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={100}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contactUs.form.email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("contactUs.form.emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={255}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">
                      {t("contactUs.form.mobile")}
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder={t("contactUs.form.mobilePlaceholder")}
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      maxLength={30}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cityCountry">
                      {t("contactUs.form.cityCountry")}
                    </Label>
                    <Input
                      id="cityCountry"
                      type="text"
                      placeholder={t("contactUs.form.cityCountryPlaceholder")}
                      value={cityCountry}
                      onChange={(e) => setCityCountry(e.target.value)}
                      maxLength={100}
                      required
                      aria-required="true"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="helpTopic">
                      {t("contactUs.form.helpTopic")}
                    </Label>
                    <Select
                      value={helpTopic}
                      onValueChange={setHelpTopic}
                      required
                    >
                      <SelectTrigger id="helpTopic" aria-required="true">
                        <SelectValue
                          placeholder={t(
                            "contactUs.form.helpTopicPlaceholder"
                          )}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {HELP_TOPICS.map((topic) => (
                          <SelectItem key={topic} value={topic}>
                            {t(
                              `contactUs.form.helpTopicOptions.${topic}`
                            )}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      {t("contactUs.form.message")}
                    </Label>
                    <Textarea
                      id="message"
                      placeholder={t("contactUs.form.messagePlaceholder")}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={1000}
                      rows={5}
                      required
                      aria-required="true"
                    />
                    <p className="text-xs text-muted-foreground">
                      {message.length}/1000 {t("contactUs.form.characters")}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !isFormFilled}
                  >
                    {isSubmitting
                      ? t("contactUs.form.sending")
                      : t("contactUs.form.send")}
                  </Button>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {t("contactUs.form.consentNote")}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;

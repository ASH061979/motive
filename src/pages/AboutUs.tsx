import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import WhatWeDo from "@/components/WhatWeDo";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-8">
              {t('aboutUs.title')}
            </h1>
          </div>
        </div>
        
        <WhatWeDo />
        
        <div className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <div>
              <h2 className="text-3xl font-semibold text-primary mb-6">
                {t('aboutUs.aboutMeghna')}
              </h2>
              
              <Card className="border-primary/20">
                <CardContent className="pt-6">
                  <div className="space-y-4 text-foreground/80 leading-relaxed">
                    <p>{t('aboutUs.bio1')}</p>
                    <p>{t('aboutUs.bio2')}</p>
                    <p>{t('aboutUs.bio3')}</p>
                    
                    <p className="font-semibold text-foreground">
                      {t('aboutUs.mission')}
                    </p>
                    
                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="text-xl font-semibold text-primary mb-4">
                        {t('aboutUs.credentials.title')}
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-3 px-4 font-semibold text-foreground">{t('aboutUs.credentials.qualification')}</th>
                              <th className="text-left py-3 px-4 font-semibold text-foreground">{t('aboutUs.credentials.details')}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-border/50">
                              <td className="py-3 px-4">{t('aboutUs.credentials.amfi')}</td>
                              <td className="py-3 px-4">{t('aboutUs.credentials.arnNumber')}</td>
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-3 px-4">{t('aboutUs.credentials.nism')}</td>
                              <td className="py-3 px-4">{t('aboutUs.credentials.nismDetails')}</td>
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-3 px-4">{t('aboutUs.credentials.panIndia')}</td>
                              <td className="py-3 px-4">{t('aboutUs.credentials.panIndiaDetails')}</td>
                            </tr>
                            <tr className="border-b border-border/50">
                              <td className="py-3 px-4">{t('aboutUs.credentials.digital')}</td>
                              <td className="py-3 px-4">{t('aboutUs.credentials.digitalDetails')}</td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4">{t('aboutUs.credentials.clients')}</td>
                              <td className="py-3 px-4">{t('aboutUs.credentials.clientsDetails')}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border">
                      <h4 className="text-xl font-semibold text-primary mb-4">
                        {t('aboutUs.clientAppreciation.title')}
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{t('aboutUs.clientAppreciation.point1')}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{t('aboutUs.clientAppreciation.point2')}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{t('aboutUs.clientAppreciation.point3')}</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{t('aboutUs.clientAppreciation.point4')}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUs;
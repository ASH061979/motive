import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Shield } from "lucide-react";

const Services = () => {
  return (
    <section className="py-20 bg-secondary" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Your Money, Always Working
          </h2>
          <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
            Experience the future of passive income with our intelligent investment platform designed for busy professionals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Portfolio Growth</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 leading-relaxed">
                Smart investment strategies designed to maximize your returns while you focus on your career.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Investing</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 leading-relaxed">
                Bank-level security and insurance protection for all your investments and financial data.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;

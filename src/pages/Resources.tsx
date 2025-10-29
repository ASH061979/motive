import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";

const Resources = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8">Resources</h1>
        
        <Card className="border-primary/20">
          <CardContent className="pt-6">
            <p className="text-foreground/80 leading-relaxed text-lg">
              Resources content will be added here.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Resources;

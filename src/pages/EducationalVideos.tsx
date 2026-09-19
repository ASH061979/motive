import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const videos = [
  { title: "Introduction to MotivWealth", src: "/media/introduction-to-motivwealth.mp4" },
  { title: "What does a Mutual Fund do?", src: "/media/what-does-a-mutual-fund-do.mp4" },
  { title: "Liquid Funds", src: "/media/liquid-funds.mp4" },
  { title: "Debt Funds", src: "/media/debt-funds.mp4" },
  { title: "Equity Mutual Funds", src: "/media/equity-mutual-funds.mp4" },
  { title: "Hybrid Funds", src: "/media/hybrid-funds.mp4" },
  { title: "Index Funds", src: "/media/index-funds.mp4" },
];

const EducationalVideos = () => {
  return (
    <div className="min-h-screen">
      <PageBackground variant="blogs" />
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-primary mb-12">Educational Videos</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {videos.map((v) => (
            <Card key={v.src} className="hover:shadow-lg transition-shadow overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full bg-black flex items-center justify-center">
                  <video controls className="w-full h-auto max-h-[70vh]" preload="metadata">
                    <source src={v.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle className="text-lg">{v.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EducationalVideos;

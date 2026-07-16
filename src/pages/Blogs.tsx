import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, User } from "lucide-react";

const blogPosts = [
  {
    id: "india-vs-world-mutual-funds",
    titleKey: "blogs.post1.title",
    excerptKey: "blogs.post1.excerpt",
    date: "2025-06-15",
    author: "Meghna Prakash",
  },
];

const videos = [
  { title: "Introduction to MotivWealth", src: "/media/introduction-to-motivwealth.mp4" },
  { title: "What does a Mutual Fund do?", src: "/media/what-does-a-mutual-fund-do.mp4" },
  { title: "Liquid Funds", src: "/media/liquid-funds.mp4" },
  { title: "Debt Funds", src: "/media/debt-funds.mp4" },
  { title: "Equity Mutual Funds", src: "/media/equity-mutual-funds.mp4" },
  { title: "Hybrid Funds", src: "/media/hybrid-funds.mp4" },
  { title: "Index Funds", src: "/media/index-funds.mp4" },
];

const Blogs = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <PageBackground variant="blogs" />
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-primary mb-4">{t("blogs.title")}</h1>
        <p className="text-muted-foreground mb-12 text-lg max-w-2xl">
          {t("blogs.subtitle")}
        </p>

        {/* Articles Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-primary mb-6 border-b border-border pb-2">
            Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {blogPosts.map((post) => (
              <Link key={post.id} to={`/blogs/${post.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                  <CardHeader>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {t(post.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {t(post.excerptKey)}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {post.date}
                      </span>
                    </div>
                    <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      {t("blogs.readMore")} <ArrowRight className="h-4 w-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Videos Section */}
        <section>
          <h2 className="text-2xl font-semibold text-primary mb-6 border-b border-border pb-2">
            Videos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
            {videos.map((v) => (
              <Card key={v.src} className="hover:shadow-lg transition-shadow overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video w-full bg-black">
                    <video
                      controls
                      className="w-full h-full object-contain"
                      preload="metadata"
                    >
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
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;

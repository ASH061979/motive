import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, User, Play } from "lucide-react";

const blogPosts = [
  {
    id: "india-vs-world-mutual-funds",
    titleKey: "blogs.post1.title",
    excerptKey: "blogs.post1.excerpt",
    date: "2025-06-15",
    author: "Meghna Prakash",
  },
];

const Blogs = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-primary mb-4">{t("blogs.title")}</h1>
        <p className="text-muted-foreground mb-12 text-lg max-w-2xl">
          {t("blogs.subtitle")}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blogs/${post.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
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

          {/* Media Card 1 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0 rounded-t-lg overflow-hidden">
              <video
                controls
                className="w-full rounded-t-lg max-h-[400px]"
                preload="metadata"
              >
                <source src="/media/motivwealth-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </CardContent>
            <CardHeader>
              <CardTitle className="text-lg">{t("blogs.media1.title")}</CardTitle>
            </CardHeader>
          </Card>

          {/* Media Card 2 */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-0 rounded-t-lg overflow-hidden">
              <video
                controls
                className="w-full rounded-t-lg max-h-[400px]"
                preload="metadata"
              >
                <source src="/media/what-does-a-mutual-fund-do.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </CardContent>
            <CardHeader>
              <CardTitle className="text-lg">What does a Mutual Fund do?</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blogs;

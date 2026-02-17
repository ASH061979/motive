import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { t } = useTranslation();
  const { slug } = useParams();

  if (slug !== "india-vs-world-mutual-funds") {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">{t("blogs.notFound")}</h1>
          <Button asChild className="mt-4">
            <Link to="/blogs">{t("blogs.backToBlogs")}</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const sections = [
    { titleKey: "blogs.post1.sections.evolution.title", contentKey: "blogs.post1.sections.evolution.content" },
    { titleKey: "blogs.post1.sections.amcs.title", contentKey: "blogs.post1.sections.amcs.content" },
    { titleKey: "blogs.post1.sections.clientele.title", contentKey: "blogs.post1.sections.clientele.content" },
    { titleKey: "blogs.post1.sections.aum.title", contentKey: "blogs.post1.sections.aum.content" },
    { titleKey: "blogs.post1.sections.distribution.title", contentKey: "blogs.post1.sections.distribution.content" },
    { titleKey: "blogs.post1.sections.penetration.title", contentKey: "blogs.post1.sections.penetration.content" },
    { titleKey: "blogs.post1.sections.gdp.title", contentKey: "blogs.post1.sections.gdp.content" },
    { titleKey: "blogs.post1.sections.growth.title", contentKey: "blogs.post1.sections.growth.content" },
    { titleKey: "blogs.post1.sections.regulatory.title", contentKey: "blogs.post1.sections.regulatory.content" },
    { titleKey: "blogs.post1.sections.outlook.title", contentKey: "blogs.post1.sections.outlook.content" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <Button asChild variant="ghost" className="mb-8 gap-2">
          <Link to="/blogs">
            <ArrowLeft className="h-4 w-4" /> {t("blogs.backToBlogs")}
          </Link>
        </Button>

        <article className="prose prose-lg max-w-none">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("blogs.post1.title")}
          </h1>
          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground text-lg my-6">
            {t("blogs.post1.quote1")}
          </blockquote>

          <p className="text-foreground/90 leading-relaxed whitespace-pre-line mb-8">
            {t("blogs.post1.intro")}
          </p>

          {sections.map((section, idx) => (
            <div key={idx} className="mb-8">
              <h2 className="text-xl font-semibold text-primary mb-3">
                {idx + 1}. {t(section.titleKey)}
              </h2>
              <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                {t(section.contentKey)}
              </p>
            </div>
          ))}

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-primary mb-3">{t("blogs.post1.conclusionTitle")}</h2>
            <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
              {t("blogs.post1.conclusion")}
            </p>
          </div>

          <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground text-lg my-6">
            {t("blogs.post1.quote2")}
          </blockquote>

          <div className="mt-12 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {t("blogs.post1.references")}
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {t("blogs.post1.disclaimer")}
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;

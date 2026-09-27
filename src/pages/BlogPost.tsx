import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const renderContent = (content: string) => {
  return content.split("\n\n").map((block, idx) => {
    const lines = block.split("\n");
    const isBullets = lines.length > 0 && lines.every((l) => l.startsWith("• "));
    if (isBullets) {
      return (
        <ul key={idx} className="space-y-1 my-3">
          {lines.map((line, li) => (
            <li key={li} className="flex items-start gap-2 text-foreground/90">
              <span className="text-primary mt-1">•</span>
              <span className="leading-relaxed">{line.slice(2)}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={idx} className="text-foreground/90 leading-relaxed whitespace-pre-line my-3">
        {block}
      </p>
    );
  });
};

const post2Sections: { key: string; subs?: string[] }[] = [
  { key: "s1" },
  { key: "s2" },
  { key: "s3" },
  { key: "s4" },
  { key: "s5" },
  { key: "s6", subs: ["equity", "debt", "hybrid"] },
  { key: "s7" },
  { key: "s8" },
  { key: "s9", subs: ["regular", "direct"] },
  { key: "s10" },
  { key: "s11" },
  { key: "s12" },
  { key: "s13", subs: ["q1", "q2", "q3", "q4", "q5"] },
];

const BlogPost = () => {
  const { t } = useTranslation();
  const { slug } = useParams();

  if (slug !== "india-vs-world-mutual-funds" && slug !== "new-to-mutual-funds-start-here") {
    return (
      <div className="min-h-screen">
        <PageBackground variant="blog-post" />
        <Navbar />
        <main className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold">{t("blogs.notFound")}</h1>
          <Button asChild className="mt-4">
            <Link to="/market-investor-notes">{t("blogs.backToBlogs")}</Link>
          </Button>
        </main>
      </div>
    );
  }

  if (slug === "new-to-mutual-funds-start-here") {
    return (
      <div className="min-h-screen">
        <PageBackground variant="blog-post" />
        <Navbar />
        <main className="container mx-auto px-4 py-16 max-w-4xl">
          <Button asChild variant="ghost" className="mb-8 gap-2">
            <Link to="/market-investor-notes">
              <ArrowLeft className="h-4 w-4" /> {t("blogs.backToBlogs")}
            </Link>
          </Button>

          <article>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
              {t("blogs.post2.title")}
            </h1>
            <p className="text-muted-foreground text-lg mb-8">{t("blogs.post2.excerpt")}</p>

            <div className="mb-10">{renderContent(t("blogs.post2.intro"))}</div>

            {post2Sections.map((section) => (
              <div key={section.key} className="mb-10">
                <h2 className="text-xl font-semibold text-primary mb-3">
                  {t(`blogs.post2.sections.${section.key}.title`)}
                </h2>
                {renderContent(t(`blogs.post2.sections.${section.key}.content`))}

                {section.subs?.map((subKey) => (
                  <div key={subKey} className="ml-4 my-3">
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      {t(`blogs.post2.sections.${section.key}.subs.${subKey}.title`)}
                    </h3>
                    <p className="text-foreground/90 leading-relaxed">
                      {t(`blogs.post2.sections.${section.key}.subs.${subKey}.content`)}
                    </p>
                  </div>
                ))}

                {t(`blogs.post2.sections.${section.key}.callout`, { defaultValue: "" }) && (
                  <div className="border-l-4 border-amber-400 bg-accent/40 rounded-r-lg px-4 py-3 my-4 text-foreground/90 italic leading-relaxed whitespace-pre-line">
                    {t(`blogs.post2.sections.${section.key}.callout`)}
                  </div>
                )}
              </div>
            ))}

            <div className="mb-10">
              <h2 className="text-xl font-semibold text-primary mb-3">
                {t("blogs.post2.conclusionTitle")}
              </h2>
              {renderContent(t("blogs.post2.conclusion"))}
            </div>

            <div className="mb-10">
              <h2 className="text-xl font-semibold text-primary mb-3">
                {t("blogs.post2.whatsNextTitle")}
              </h2>
              {renderContent(t("blogs.post2.whatsNext"))}
            </div>

            <div className="border border-border bg-card rounded-lg p-5 my-8">
              <h3 className="text-lg font-semibold text-primary mb-2">
                {t("blogs.post2.aboutTitle")}
              </h3>
              <p className="text-foreground/90 leading-relaxed">{t("blogs.post2.about")}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">{t("blogs.post2.disclaimer")}</p>
            </div>
          </article>
        </main>
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
      <PageBackground variant="blog-post" />
      <Navbar />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <Button asChild variant="ghost" className="mb-8 gap-2">
          <Link to="/market-investor-notes">
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
    </div>
  );
};

export default BlogPost;

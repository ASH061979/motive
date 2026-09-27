import Navbar from "@/components/Navbar";
import PageBackground from "@/components/PageBackground";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { learningNotes, type NoteBlock } from "@/content/learningNotes";

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

const renderBlock = (block: NoteBlock, idx: number) => {
  switch (block.type) {
    case "h1":
      return (
        <h2 key={idx} className="text-xl font-semibold text-primary mb-3 mt-10">
          {block.text}
        </h2>
      );
    case "h2":
      return (
        <h3 key={idx} className="text-base font-semibold text-foreground mb-1 mt-4">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={idx} className="text-foreground/90 leading-relaxed my-3">
          {block.text}
        </p>
      );
    case "bullets":
      return (
        <ul key={idx} className="space-y-1 my-3">
          {block.items.map((item, li) => (
            <li key={li} className="flex items-start gap-2 text-foreground/90">
              <span className="text-primary mt-1">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "kv":
      return (
        <div key={idx} className="grid sm:grid-cols-2 gap-2 my-4">
          {block.items.map((item, li) => (
            <div
              key={li}
              className="border border-border bg-card rounded-lg px-4 py-3 text-sm font-medium text-foreground/90"
            >
              {item}
            </div>
          ))}
        </div>
      );
    case "callout":
      return (
        <div
          key={idx}
          className="border-l-4 border-amber-400 bg-accent/40 rounded-r-lg px-4 py-3 my-4 text-foreground/90 italic leading-relaxed"
        >
          {block.text}
        </div>
      );
    case "dialogue":
      return (
        <div key={idx} className="border border-border bg-card rounded-lg px-4 py-3 my-4 space-y-2">
          {block.lines.map((line, li) => (
            <p key={li} className="text-foreground/90 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      );
  }
};

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

const BlogPost = () => {
  const { t } = useTranslation();
  const { slug } = useParams();

  if (
    slug !== "india-vs-world-mutual-funds" &&
    !learningNotes[slug ?? ""]
  ) {
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

  const note = slug ? learningNotes[slug] : undefined;
  if (note) {
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
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-2">
              {note.kicker}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">{note.title}</h1>
            <p className="text-muted-foreground text-lg mb-8">{note.tagline}</p>

            {note.blocks.map(renderBlock)}

            <div className="border border-border bg-card rounded-lg p-5 my-8">
              <h3 className="text-lg font-semibold text-primary mb-2">About MotivWealth</h3>
              <p className="text-foreground/90 leading-relaxed">{note.about}</p>
            </div>

            <div className="mt-8 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground">{note.disclaimer}</p>
            </div>
          </article>
        </main>
      </div>
    );
  }

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

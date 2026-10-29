import SiteShell from "@/components/site/site-shell";
import cover from "@/assets/cover.jpg";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Book",
      name: "The Generational Curse Breaker",
      subtitle:
        "A Family's Battle Against Undue Influence, Systemic Neglect, and the Theft of Carrie Evans's Legacy",
      author: { "@type": "Person", name: "Victor L. Evans" },
      datePublished: "2025",
      inLanguage: "en",
      bookEdition: "First edition",
      numberOfChapters: 12,
      description:
        "A work of nonfiction: one family's battle against undue influence, systemic neglect, and the theft of Carrie Evans's legacy — documented across thirty years.",
    },
    {
      "@type": "Person",
      name: "Victor L. Evans",
      jobTitle: "Author",
      description:
        "Retired United States Army veteran with two Master's degrees and a career among records and accountability. Author of The Generational Curse Breaker.",
      knowsAbout: ["public administration", "human resources management", "documentation and accountability"],
    },
    {
      "@type": "WebSite",
      name: "The Generational Curse Breaker",
      inLanguage: "en",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteShell cover={cover} />
    </>
  );
}

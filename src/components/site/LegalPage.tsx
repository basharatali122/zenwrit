export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; paragraphs: string[] }[];
}) {
  return (
    <div className="container-page py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated {updated}</p>
      <div className="prose-article mt-8 max-w-2xl">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}

import { ArticleCta } from "./ArticleCta";
import { KeyTakeaways } from "./KeyTakeaways";
import { extractHeadings, renderMarkdown, splitMarkdownBlocks } from "@/lib/content";

/**
 * Renders admin-authored markdown, adding a Key Takeaways box after the first
 * paragraph and a content-relevant tool CTA roughly mid-article.
 */
export function MarkdownArticle({ markdown }: { markdown: string }) {
  const blocks = splitMarkdownBlocks(markdown);
  const headings = extractHeadings(markdown);
  let paragraphCount = 0;
  let ctaPlaced = false;
  let takeawaysPlaced = false;

  return (
    <>
      {blocks.map((block, index) => {
        const isParagraph = !/^(#|>|-|\*|\d+\.|```|\||!\[)/.test(block);
        if (isParagraph) paragraphCount += 1;
        const isLead = isParagraph && paragraphCount === 1;
        const showTakeaways = !takeawaysPlaced && isLead;
        if (showTakeaways) takeawaysPlaced = true;
        const showCta = !ctaPlaced && isParagraph && paragraphCount >= 4;
        if (showCta) ctaPlaced = true;

        return (
          <div key={index}>
            <div
              className={isLead ? "lead-paragraph" : undefined}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(block) }}
            />
            {showTakeaways ? <KeyTakeaways points={headings} /> : null}
            {showCta ? <ArticleCta /> : null}
          </div>
        );
      })}
    </>
  );
}

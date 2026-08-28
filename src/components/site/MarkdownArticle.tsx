import { ArticleCta } from "./ArticleCta";
import { renderMarkdown, splitMarkdownBlocks } from "@/lib/content";

/**
 * Renders admin-authored markdown, adding a content-relevant tool CTA
 * roughly mid-article (after the 4th paragraph).
 */
export function MarkdownArticle({ markdown }: { markdown: string }) {
  const blocks = splitMarkdownBlocks(markdown);
  let paragraphCount = 0;
  let ctaPlaced = false;

  return (
    <>
      {blocks.map((block, index) => {
        const isParagraph = !/^(#|>|-|\*|\d+\.|```|\||!\[)/.test(block);
        if (isParagraph) paragraphCount += 1;
        const isLead = isParagraph && paragraphCount === 1;
        const showCta = !ctaPlaced && isParagraph && paragraphCount >= 4;
        if (showCta) ctaPlaced = true;

        return (
          <div key={index}>
            <div
              className={isLead ? "lead-paragraph" : undefined}
              dangerouslySetInnerHTML={{ __html: renderMarkdown(block) }}
            />
            {showCta ? <ArticleCta /> : null}
          </div>
        );
      })}
    </>
  );
}

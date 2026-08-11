import { AdSlot } from "./AdSlot";
import { renderMarkdown, splitMarkdownBlocks } from "@/lib/content";

/**
 * Renders admin-authored markdown with the same in-content ad placement
 * the hardcoded articles used (ad slot 2 after the second block).
 */
export function MarkdownArticle({ markdown }: { markdown: string }) {
  const blocks = splitMarkdownBlocks(markdown);

  return (
    <>
      {blocks.map((block, index) => (
        <div key={index}>
          <div dangerouslySetInnerHTML={{ __html: renderMarkdown(block) }} />
          {index === 1 ? (
            <AdSlot id="ad-slot-2" label="Ad slot 2 — in content" variant="inline" className="my-6" />
          ) : null}
        </div>
      ))}
    </>
  );
}

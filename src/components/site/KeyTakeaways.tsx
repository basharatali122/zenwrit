import { Zap } from "lucide-react";

export function KeyTakeaways({ points }: { points: { id: string; text: string }[] }) {
  if (points.length < 2) return null;
  const items = points.slice(0, 5);

  return (
    <aside className="my-8 rounded-lg border border-border border-l-[3px] border-l-primary bg-primary/5 p-5 sm:p-6 dark:bg-primary/10">
      <div className="flex items-center gap-2">
        <Zap className="h-4 w-4 text-primary" aria-hidden="true" />
        <p className="text-sm font-bold text-foreground">Key Takeaways</p>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">What you'll learn in this article</p>
      <ul className="mt-3 space-y-2">
        {items.map((point) => (
          <li key={point.id} className="flex gap-2 text-sm leading-relaxed text-foreground/90">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            <a href={`#${point.id}`} className="hover:text-primary hover:underline">
              {point.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

import { useState } from "react";
import { Star } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { rateArticle } from "@/lib/engagement.functions";

export function ArticleRating({
  slug,
  initialAverage,
  initialCount,
}: {
  slug: string;
  initialAverage: number;
  initialCount: number;
}) {
  const submit = useServerFn(rateArticle);
  const [hover, setHover] = useState(0);
  const [selected, setSelected] = useState(0);
  const [locked, setLocked] = useState(false);
  const [average, setAverage] = useState(initialAverage);
  const [count, setCount] = useState(initialCount);

  const onRate = async (value: number) => {
    if (locked) return;
    setSelected(value);
    setLocked(true);
    try {
      const result = await submit({ data: { slug, rating: value } });
      setAverage(result.average);
      setCount(result.count);
    } catch {
      /* keep the optimistic locked state */
    }
  };

  const active = hover || selected;

  return (
    <section className="mt-12 rounded-xl border border-border bg-surface p-6 text-center">
      <h2 className="text-base font-bold">Was this article helpful?</h2>
      <div className="mt-3 flex justify-center gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            aria-label={`Rate ${value} out of 5`}
            disabled={locked}
            onMouseEnter={() => !locked && setHover(value)}
            onFocus={() => !locked && setHover(value)}
            onClick={() => void onRate(value)}
            className="p-1 transition-transform disabled:cursor-default enabled:hover:scale-110"
          >
            <Star
              className={`h-7 w-7 ${value <= active ? "fill-gold text-gold" : "text-muted-foreground"}`}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      {locked ? <p className="mt-3 text-sm font-semibold text-success">Thanks for your feedback!</p> : null}

      <p className="mt-2 text-xs text-muted-foreground">
        {count === 0
          ? "Be the first to rate this article"
          : `${average.toFixed(1)} out of 5 (${count} ${count === 1 ? "rating" : "ratings"})`}
      </p>
    </section>
  );
}

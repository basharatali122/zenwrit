const GRADIENTS = [
  "from-primary/80 via-primary/40 to-accent/50",
  "from-accent/70 via-primary/30 to-primary/60",
  "from-primary/60 via-accent/40 to-primary/80",
  "from-accent/60 via-primary/50 to-accent/30",
];

function hashIndex(value: string, length: number) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  return hash % length;
}

export function BlogCover({
  src,
  title,
  category,
}: {
  src?: string | null;
  title: string;
  category: string;
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={title}
        loading="lazy"
        decoding="async"
        className="aspect-[16/9] w-full rounded-t-lg border-b border-border object-cover"
      />
    );
  }

  const gradient = GRADIENTS[hashIndex(title + category, GRADIENTS.length)];

  return (
    <div
      role="img"
      aria-label={`${category}: ${title}`}
      className={`flex aspect-[16/9] w-full flex-col justify-end rounded-t-lg border-b border-border bg-gradient-to-br ${gradient} p-5`}
    >
      <p className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/80">{category}</p>
      <p className="mt-1 line-clamp-3 text-lg font-bold leading-snug text-primary-foreground">{title}</p>
    </div>
  );
}

/**
 * Ad placeholder slots. No real ad network code yet — swap the inner markup
 * for your ad provider snippet when you're ready.
 */
export function AdSlot({
  id,
  label,
  className = "",
  variant = "banner",
}: {
  id: string;
  label: string;
  className?: string;
  variant?: "banner" | "square" | "inline";
}) {
  const heights = {
    banner: "min-h-[90px]",
    square: "min-h-[250px]",
    inline: "min-h-[110px]",
  } as const;

  return (
    <div
      id={id}
      data-ad-slot={id}
      aria-hidden="true"
      className={`flex ${heights[variant]} w-full items-center justify-center rounded-lg border border-dashed border-border bg-surface text-[11px] uppercase tracking-widest text-muted-foreground ${className}`}
    >
      {label}
    </div>
  );
}

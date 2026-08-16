/**
 * Ad slots. Flip ADSENSE_ENABLED to true once AdSense is approved and paste
 * the publisher script/slot ids below — nothing renders until then.
 */
export const ADSENSE_ENABLED = false;

// Fill these in when ADSENSE_ENABLED is turned on.
export const ADSENSE_CLIENT = "ca-pub-XXXXXXXXXXXXXXXX";

export function AdSlot({
  id,
  label,
  className = "",
  variant = "banner",
  slot,
}: {
  id: string;
  label: string;
  className?: string;
  variant?: "banner" | "square" | "inline";
  /** AdSense data-ad-slot id, used only when ADSENSE_ENABLED is true. */
  slot?: string;
}) {
  // Disabled: render nothing at all so no height, margin or padding is reserved.
  if (!ADSENSE_ENABLED) return null;


  const heights = {
    banner: "min-h-[90px]",
    square: "min-h-[250px]",
    inline: "min-h-[110px]",
  } as const;

  return (
    <div id={id} data-ad-slot={id} aria-label={label} className={`w-full ${heights[variant]} ${className}`}>
      <ins
        className="adsbygoogle block w-full"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format={variant === "square" ? "rectangle" : "auto"}
        data-full-width-responsive="true"
      />
    </div>
  );
}

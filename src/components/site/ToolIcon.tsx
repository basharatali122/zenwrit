import { FileText, Linkedin, PenLine, ShoppingBag, Sparkles, Youtube } from "lucide-react";

const ICONS: Record<string, typeof FileText> = {
  resume: FileText,
  letter: PenLine,
  linkedin: Linkedin,
  youtube: Youtube,
  product: ShoppingBag,
};

export function ToolIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = ICONS[icon] ?? Sparkles;
  return <Icon className={className} />;
}

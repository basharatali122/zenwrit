import { FileText, Linkedin, PenLine, ShoppingBag, Youtube } from "lucide-react";
import type { Tool } from "@/lib/tools";

const ICONS = {
  resume: FileText,
  letter: PenLine,
  linkedin: Linkedin,
  youtube: Youtube,
  product: ShoppingBag,
} as const;

export function ToolIcon({ icon, className }: { icon: Tool["icon"]; className?: string }) {
  const Icon = ICONS[icon];
  return <Icon className={className} />;
}

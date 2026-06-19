import {
  Hand,
  Shield,
  HardHat,
  Shirt,
  Footprints,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const categoryIconMap: Record<string, LucideIcon> = {
  "hand-protection": Hand,
  "face-protection": Shield,
  "head-protection": HardHat,
  "body-protection": Shirt,
  "foot-protection": Footprints,
  "fda-gear": ShieldCheck,
};

export function getCategoryIcon(slug: string): LucideIcon {
  return categoryIconMap[slug] ?? Shield;
}

export function CategoryIcon({ slug, className }: { slug: string; className?: string }) {
  const Icon = getCategoryIcon(slug);
  return <Icon className={className} aria-hidden />;
}

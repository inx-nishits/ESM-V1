import {
  BadgeCheck,
  Headphones,
  Package,
  ScanLine,
  ShieldCheck,
  TrendingDown,
  Truck,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  truck: Truck,
  package: Package,
  "shield-check": ShieldCheck,
  "badge-check": BadgeCheck,
  "scan-line": ScanLine,
  "trending-down": TrendingDown,
  headphones: Headphones,
};

export function getHomepageIcon(name: string): LucideIcon {
  return iconMap[name] ?? Package;
}

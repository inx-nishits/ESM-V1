import { MarketingShell } from "@/components/layout/shells";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketingShell>{children}</MarketingShell>;
}

import { ShopShell } from "@/components/layout/shells";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ShopShell>{children}</ShopShell>;
}

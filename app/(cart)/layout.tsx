import { CartShell } from "@/components/layout/shells";

export default async function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CartShell>{children}</CartShell>;
}

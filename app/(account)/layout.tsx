import { AccountShell } from "@/components/layout/shells";

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AccountShell>{children}</AccountShell>;
}

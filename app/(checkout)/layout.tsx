import { CheckoutShell } from "@/components/layout/shells";
import { CheckoutProvider } from "@/providers/checkout-provider";

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CheckoutProvider>
      <CheckoutShell>{children}</CheckoutShell>
    </CheckoutProvider>
  );
}

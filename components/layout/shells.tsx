import { SiteShell } from "./site-shell";

export async function MarketingShell({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}

export async function ShopShell({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}

export async function CartShell({ children }: { children: React.ReactNode }) {
  return <SiteShell showFooter={false}>{children}</SiteShell>;
}

export function CheckoutShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-card">
        <div className="site-container flex h-16 items-center">
          <span className="font-display text-lg font-bold text-primary">Checkout</span>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}

export async function AccountShell({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[var(--esm-navy-900)] p-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[var(--esm-coral-500)]/15 blur-3xl"
        aria-hidden
      />
      <main className="relative w-full max-w-md">{children}</main>
    </div>
  );
}

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

import { ShieldCheck } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left Pane - Branding */}
      <div className="relative hidden flex-col items-center justify-center overflow-hidden bg-[var(--esm-navy-900)] p-12 lg:flex">
        {/* Ambient Glows & Patterns */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-[var(--esm-coral-500)]/15 blur-3xl"
          aria-hidden
        />
        
        {/* Brand Content */}
        <div className="relative z-10 max-w-md text-center">
          <div className="mb-12 flex justify-center">
             <SiteLogo />
          </div>
          
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 mb-8 shadow-2xl">
            <ShieldCheck className="h-8 w-8 text-[var(--esm-coral-500)]" />
          </div>
          <h2 className="mb-4 font-display text-4xl font-extrabold text-white">
            B2B Procurement, <br /> simplified.
          </h2>
          <p className="text-lg text-[var(--esm-navy-100)]/80">
            Access tier-based pricing, direct supplier contracts, and streamlined ordering for your entire organization.
          </p>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="flex flex-col justify-center bg-white p-6 sm:p-12 lg:p-24 shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.1)] relative z-20">
        {/* Mobile Logo */}
        <div className="mb-8 flex justify-center lg:hidden">
          <SiteLogo />
        </div>
        
        <main className="mx-auto w-full max-w-md">
          {children}
        </main>
      </div>
    </div>
  );
}

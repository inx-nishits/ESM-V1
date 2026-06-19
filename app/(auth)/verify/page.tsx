import Link from "next/link";
import { MailCheck } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Verify Email",
  path: "/verify",
  noIndex: true,
});

export default function VerifyPage() {
  return (
    <Card className="overflow-hidden border-border shadow-lg">
      <div className="border-b border-border bg-[var(--esm-navy-50)] px-6 py-8 text-center md:px-8">
        <div className="flex justify-center">
          <SiteLogo />
        </div>
        <span className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--esm-coral-100)] text-accent">
          <MailCheck className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-primary">Check your email</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a verification link to your work email. Click the link to activate your account.
        </p>
      </div>
      <div className="p-6 text-center md:p-8">
        <Button asChild>
          <Link href="/login">Back to sign in</Link>
        </Button>
      </div>
    </Card>
  );
}

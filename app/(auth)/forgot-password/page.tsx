import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Forgot Password",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return (
    <Card className="overflow-hidden border-border shadow-lg">
      <div className="border-b border-border bg-[var(--esm-navy-50)] px-6 py-8 text-center md:px-8">
        <div className="flex justify-center">
          <SiteLogo />
        </div>
        <h1 className="mt-6 font-display text-2xl font-extrabold text-primary">Reset password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your work email and we&apos;ll send reset instructions.
        </p>
      </div>
      <form className="space-y-4 p-6 md:p-8">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
            Work email
          </label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <Button type="submit" size="lg" className="w-full">
          Send reset link
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
      <p className="border-t border-border px-6 py-5 text-center text-sm text-muted-foreground md:px-8">
        <Link href="/login" className="font-semibold text-accent hover:underline">
          Back to sign in
        </Link>
      </p>
    </Card>
  );
}

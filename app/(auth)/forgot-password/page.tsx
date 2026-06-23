import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Forgot Password",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">Reset password</h1>
        <p className="mt-3 text-base text-muted-foreground">
          Enter your work email and we&apos;ll send reset instructions.
        </p>
      </div>
      <form className="space-y-5">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-primary">
            Work email
          </label>
          <Input id="email" name="email" type="email" required autoComplete="email" className="h-12 bg-gray-50/50" />
        </div>
        <div className="pt-4">
          <Button type="submit" size="lg" className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all">
            Send reset link
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-semibold text-primary hover:text-accent transition-colors">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}

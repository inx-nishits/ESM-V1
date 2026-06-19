"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface AuthFormProps {
  mode: "login" | "signup";
}

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isLogin = mode === "login";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/account/profile");
  }

  return (
    <Card className="overflow-hidden border-border shadow-lg">
      <div className="border-b border-border bg-[var(--esm-navy-50)] px-6 py-8 text-center md:px-8">
        <div className="flex justify-center">
          <SiteLogo />
        </div>
        <h1 className="mt-6 font-display text-2xl font-extrabold text-primary">
          {isLogin ? "Sign in to your account" : "Create a business account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {isLogin
            ? "Access order history, saved products, and contract pricing."
            : "Register for tiered pricing and dedicated B2B support."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 p-6 md:p-8">
        {!isLogin && (
          <div>
            <label htmlFor="company" className="mb-1.5 block text-sm font-semibold">
              Company name
            </label>
            <Input id="company" name="company" required autoComplete="organization" />
          </div>
        )}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
            Work email
          </label>
          <Input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            {isLogin && (
              <Link href="/forgot-password" className="text-xs font-semibold text-accent hover:underline">
                Forgot password?
              </Link>
            )}
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>
        <Button type="submit" size="lg" className="w-full">
          {isLogin ? "Sign in" : "Create account"}
        </Button>
      </form>

      <p className="border-t border-border px-6 py-5 text-center text-sm text-muted-foreground md:px-8">
        {isLogin ? (
          <>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-accent hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-accent hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </Card>
  );
}

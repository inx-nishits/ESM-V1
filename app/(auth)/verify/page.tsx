"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { SiteLogo } from "@/components/layout/site-logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/account/profile");
  };

  return (
    <Card className="overflow-hidden border-border shadow-lg">
      <div className="border-b border-border bg-[var(--esm-navy-50)] px-6 py-8 text-center md:px-8">
        <div className="flex justify-center">
          <SiteLogo />
        </div>
        <span className="mx-auto mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--esm-coral-100)] text-accent">
          <KeyRound className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="mt-5 font-display text-2xl font-extrabold text-primary">Verify your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a 6-digit verification code to your email. Enter it below to activate your account.
        </p>
      </div>
      <div className="p-6 md:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-center gap-2 sm:gap-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="h-12 w-12 text-center text-xl font-bold sm:h-14 sm:w-14"
              />
            ))}
          </div>
          <Button type="submit" size="lg" className="w-full">
            Verify code
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Didn't receive a code? <button type="button" className="text-accent hover:underline font-semibold">Resend</button>
          </div>
        </form>
      </div>
    </Card>
  );
}

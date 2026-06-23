"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <div className="w-full">
      <div className="mb-10 flex flex-col items-center sm:items-start text-center sm:text-left">
        <span className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--esm-coral-500)]/10 text-[var(--esm-coral-600)]">
          <KeyRound className="h-7 w-7" aria-hidden />
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">Verify your account</h1>
        <p className="mt-3 text-base text-muted-foreground">
          We sent a 6-digit verification code to your email. Enter it below to activate your account.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-center sm:justify-start gap-2 sm:gap-4">
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
                className="h-12 w-12 sm:h-14 sm:w-14 text-center text-xl font-bold bg-gray-50/50"
              />
            ))}
          </div>
          <div className="pt-2">
            <Button type="submit" size="lg" className="w-full h-12 text-base font-bold shadow-md hover:shadow-lg transition-all">
              Verify code
            </Button>
          </div>
          <div className="text-center sm:text-left text-sm text-muted-foreground mt-2">
            Didn't receive a code? <button type="button" className="text-primary hover:text-accent font-medium transition-colors">Resend code</button>
          </div>
        </form>
      </div>
    </div>
  );
}

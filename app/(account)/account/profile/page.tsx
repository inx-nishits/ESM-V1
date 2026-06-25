"use client";

import { Upload } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SITE_EMAIL, SITE_PHONE } from "@/lib/constants";
import { useState } from "react";
import { AccountSidebar } from "@/components/account/account-sidebar";

const inputStyles = "flex w-full rounded-lg border-2 border-transparent bg-muted/50 px-4 py-3 text-sm shadow-sm transition-colors hover:border-border focus-visible:border-primary focus-visible:bg-transparent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10 h-12";

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-primary">
        {label}
      </label>
      {children}
    </div>
  );
}

export default function AccountProfilePage() {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [company, setCompany] = useState("Demo Procurement Co.");

  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Account", href: "/account/profile" },
        ]}
      />
      <h1 className="mt-4 font-display text-3xl font-extrabold text-primary">My account</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <AccountSidebar />
        </aside>

        <div className="space-y-8 min-w-0">
          <div className="rounded-[2rem] border border-border bg-white shadow-2xl shadow-black/5 overflow-hidden">
            <div className="bg-muted/30 p-6 sm:p-8 border-b border-border">
              <h2 className="font-display text-xl font-bold text-primary">Profile Details</h2>
            </div>
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-10 items-start">
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-md bg-muted flex items-center justify-center">
                  <span className="text-4xl font-display font-bold text-muted-foreground">
                    {firstName.charAt(0)}{lastName.charAt(0)}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="relative overflow-hidden cursor-pointer rounded-full bg-muted/50 hover:bg-muted border-transparent transition-colors">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload photo
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                </Button>
              </div>
              
              <form className="flex-1 space-y-6 w-full" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-muted-foreground">Email Address</label>
                    <p className="text-base font-bold text-primary">{SITE_EMAIL}</p>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-muted-foreground">Phone Number</label>
                    <p className="text-base font-bold text-primary">{SITE_PHONE}</p>
                  </div>
                </div>
                
                <div className="grid gap-6 sm:grid-cols-2 pt-2">
                  <Field label="First Name" htmlFor="firstName">
                    <Input id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className={inputStyles} />
                  </Field>
                  <Field label="Last Name" htmlFor="lastName">
                    <Input id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className={inputStyles} />
                  </Field>
                </div>
                
                <Field label="Business / Company Name" htmlFor="company">
                  <Input id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} className={inputStyles} />
                </Field>
                
                <div className="pt-4">
                  <Button type="submit" size="lg" className="h-12 px-8 text-base font-bold transition-transform hover:scale-105">Save changes</Button>
                </div>
              </form>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border bg-white shadow-2xl shadow-black/5 overflow-hidden">
            <div className="bg-muted/30 p-6 sm:p-8 border-b border-border">
              <h2 className="font-display text-xl font-bold text-primary">Security</h2>
              <p className="mt-2 text-sm text-muted-foreground">Update your password to keep your account secure.</p>
            </div>
            
            <div className="p-6 sm:p-8">
              <form className="space-y-6 max-w-md" onSubmit={(e) => e.preventDefault()}>
                <Field label="Current Password" htmlFor="currentPassword">
                  <Input id="currentPassword" name="currentPassword" type="password" required className={inputStyles} />
                </Field>
                
                <Field label="New Password" htmlFor="newPassword">
                  <Input 
                    id="newPassword" 
                    name="newPassword" 
                    type="password" 
                    required 
                    className={inputStyles}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
                    title="Must contain at least one number and one uppercase and lowercase letter, one symbol, and at least 8 or more characters"
                  />
                  <p className="mt-2 text-xs font-medium leading-relaxed text-muted-foreground">Must be at least 8 characters and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.</p>
                </Field>
                
                <Field label="Confirm New Password" htmlFor="confirmPassword">
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    required 
                    className={inputStyles}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
                  />
                </Field>

                <div className="pt-4">
                  <Button type="submit" size="lg" className="h-12 px-8 text-base font-bold transition-transform hover:scale-105">Update password</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

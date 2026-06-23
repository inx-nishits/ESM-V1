"use client";

import Link from "next/link";
import { Upload } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SITE_EMAIL, SITE_PHONE } from "@/lib/constants";
import { useState } from "react";
import { AccountSidebar } from "@/components/account/account-sidebar";

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
          <Card className="p-6">
            <h2 className="font-display text-lg font-bold text-primary">Profile Details</h2>
            <div className="mt-6 flex flex-col sm:flex-row gap-8 items-start">
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-border bg-muted flex items-center justify-center">
                  <span className="text-3xl font-bold text-muted-foreground">
                    {firstName.charAt(0)}{lastName.charAt(0)}
                  </span>
                </div>
                <Button variant="outline" size="sm" className="relative overflow-hidden cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload photo
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                </Button>
              </div>
              
              <form className="flex-1 space-y-4 w-full" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Email Address</label>
                  <p className="text-sm font-semibold">{SITE_EMAIL}</p>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Phone Number</label>
                  <p className="text-sm font-semibold">{SITE_PHONE}</p>
                </div>
                
                <div className="grid gap-4 sm:grid-cols-2 pt-2">
                  <div>
                    <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium">First Name</label>
                    <Input id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium">Last Name</label>
                    <Input id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="mb-1.5 block text-sm font-medium">Business / Company Name</label>
                  <Input id="company" name="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                </div>
                
                <div className="pt-2">
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-lg font-bold text-primary">Security</h2>
            <p className="mt-1 text-sm text-muted-foreground">Update your password to keep your account secure.</p>
            <form className="mt-6 space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium">Current Password</label>
                <Input id="currentPassword" name="currentPassword" type="password" required />
              </div>
              
              <div>
                <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium">New Password</label>
                <Input 
                  id="newPassword" 
                  name="newPassword" 
                  type="password" 
                  required 
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
                  title="Must contain at least one number and one uppercase and lowercase letter, one symbol, and at least 8 or more characters"
                />
                <p className="mt-1.5 text-xs text-muted-foreground">Must be at least 8 characters and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol.</p>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium">Confirm New Password</label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  type="password" 
                  required 
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}"
                />
              </div>

              <div className="pt-2">
                <Button type="submit">Update password</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

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

export function CheckoutDeliveryForm() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/checkout/shipping");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="First name" htmlFor="firstName">
          <Input id="firstName" name="firstName" required autoComplete="given-name" className={inputStyles} />
        </Field>
        <Field label="Last name" htmlFor="lastName">
          <Input id="lastName" name="lastName" required autoComplete="family-name" className={inputStyles} />
        </Field>
      </div>
      <Field label="Company" htmlFor="company">
        <Input id="company" name="company" required autoComplete="organization" className={inputStyles} />
      </Field>
      <Field label="Street address" htmlFor="address">
        <Input id="address" name="address" required autoComplete="street-address" className={inputStyles} />
      </Field>
      <div className="grid gap-6 sm:grid-cols-3">
        <Field label="City" htmlFor="city">
          <Input id="city" name="city" required autoComplete="address-level2" className={inputStyles} />
        </Field>
        <Field label="State" htmlFor="state">
          <Select name="state" required defaultValue="">
            <SelectTrigger id="state" className={cn(inputStyles, "bg-muted/50")}>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
            <SelectItem value="AL">Alabama</SelectItem>
            <SelectItem value="AK">Alaska</SelectItem>
            <SelectItem value="AZ">Arizona</SelectItem>
            <SelectItem value="AR">Arkansas</SelectItem>
            <SelectItem value="CA">California</SelectItem>
            <SelectItem value="CO">Colorado</SelectItem>
            <SelectItem value="CT">Connecticut</SelectItem>
            <SelectItem value="DE">Delaware</SelectItem>
            <SelectItem value="FL">Florida</SelectItem>
            <SelectItem value="GA">Georgia</SelectItem>
            <SelectItem value="HI">Hawaii</SelectItem>
            <SelectItem value="ID">Idaho</SelectItem>
            <SelectItem value="IL">Illinois</SelectItem>
            <SelectItem value="IN">Indiana</SelectItem>
            <SelectItem value="IA">Iowa</SelectItem>
            <SelectItem value="KS">Kansas</SelectItem>
            <SelectItem value="KY">Kentucky</SelectItem>
            <SelectItem value="LA">Louisiana</SelectItem>
            <SelectItem value="ME">Maine</SelectItem>
            <SelectItem value="MD">Maryland</SelectItem>
            <SelectItem value="MA">Massachusetts</SelectItem>
            <SelectItem value="MI">Michigan</SelectItem>
            <SelectItem value="MN">Minnesota</SelectItem>
            <SelectItem value="MS">Mississippi</SelectItem>
            <SelectItem value="MO">Missouri</SelectItem>
            <SelectItem value="MT">Montana</SelectItem>
            <SelectItem value="NE">Nebraska</SelectItem>
            <SelectItem value="NV">Nevada</SelectItem>
            <SelectItem value="NH">New Hampshire</SelectItem>
            <SelectItem value="NJ">New Jersey</SelectItem>
            <SelectItem value="NM">New Mexico</SelectItem>
            <SelectItem value="NY">New York</SelectItem>
            <SelectItem value="NC">North Carolina</SelectItem>
            <SelectItem value="ND">North Dakota</SelectItem>
            <SelectItem value="OH">Ohio</SelectItem>
            <SelectItem value="OK">Oklahoma</SelectItem>
            <SelectItem value="OR">Oregon</SelectItem>
            <SelectItem value="PA">Pennsylvania</SelectItem>
            <SelectItem value="RI">Rhode Island</SelectItem>
            <SelectItem value="SC">South Carolina</SelectItem>
            <SelectItem value="SD">South Dakota</SelectItem>
            <SelectItem value="TN">Tennessee</SelectItem>
            <SelectItem value="TX">Texas</SelectItem>
            <SelectItem value="UT">Utah</SelectItem>
            <SelectItem value="VT">Vermont</SelectItem>
            <SelectItem value="VA">Virginia</SelectItem>
            <SelectItem value="WA">Washington</SelectItem>
            <SelectItem value="WV">West Virginia</SelectItem>
            <SelectItem value="WI">Wisconsin</SelectItem>
            <SelectItem value="WY">Wyoming</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="ZIP" htmlFor="zip">
          <Input id="zip" name="zip" required autoComplete="postal-code" className={inputStyles} />
        </Field>
      </div>
      <Field label="Phone" htmlFor="phone">
        <Input id="phone" name="phone" type="tel" required autoComplete="tel" className={inputStyles} />
      </Field>
      
      <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border pt-8">
        <Button variant="ghost" size="lg" className="h-14 font-semibold text-muted-foreground hover:text-primary" asChild>
          <Link href="/cart">Return to cart</Link>
        </Button>
        <Button type="submit" size="lg" className="h-14 px-8 text-base font-bold transition-transform hover:scale-105">
          Continue to shipping
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}

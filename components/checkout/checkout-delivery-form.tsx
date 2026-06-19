"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CheckoutDeliveryForm() {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/checkout/shipping");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium">
            First name
          </label>
          <Input id="firstName" name="firstName" required autoComplete="given-name" />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium">
            Last name
          </label>
          <Input id="lastName" name="lastName" required autoComplete="family-name" />
        </div>
      </div>
      <div>
        <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
          Company
        </label>
        <Input id="company" name="company" required autoComplete="organization" />
      </div>
      <div>
        <label htmlFor="address" className="mb-1.5 block text-sm font-medium">
          Street address
        </label>
        <Input id="address" name="address" required autoComplete="street-address" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="city" className="mb-1.5 block text-sm font-medium">
            City
          </label>
          <Input id="city" name="city" required autoComplete="address-level2" />
        </div>
        <div>
          <label htmlFor="state" className="mb-1.5 block text-sm font-medium">
            State
          </label>
          <Input id="state" name="state" required autoComplete="address-level1" />
        </div>
        <div>
          <label htmlFor="zip" className="mb-1.5 block text-sm font-medium">
            ZIP
          </label>
          <Input id="zip" name="zip" required autoComplete="postal-code" />
        </div>
      </div>
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
          Phone
        </label>
        <Input id="phone" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" size="lg">
          Continue to shipping
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/cart">Back to cart</Link>
        </Button>
      </div>
    </form>
  );
}

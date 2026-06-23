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
          <Select name="state" required defaultValue="">
            <SelectTrigger id="state">
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

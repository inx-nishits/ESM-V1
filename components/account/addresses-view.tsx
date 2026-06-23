"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", 
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  addressLine: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const initialAddresses: Address[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    addressLine: "1130 Carolina Drive Unit A",
    city: "West Chicago",
    state: "IL",
    zipCode: "60185",
    country: "United States",
    isDefault: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    addressLine: "400 Logistics Way",
    city: "Dallas",
    state: "TX",
    zipCode: "75001",
    country: "United States",
    isDefault: false,
  }
];

export function AddressesView() {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

  const handleOpenNew = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (addr: Address) => {
    setEditingAddress(addr);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (addressToDelete) {
      setAddresses(addresses.filter(a => a.id !== addressToDelete));
      setAddressToDelete(null);
    }
  };

  const handleMakeDefault = (id: string) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const isDefaultCheckbox = formData.get("isDefault") === "on";

    const newAddress: Address = {
      id: editingAddress ? editingAddress.id : Math.random().toString(36).substr(2, 9),
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      addressLine: formData.get("addressLine") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zipCode: formData.get("zipCode") as string,
      country: formData.get("country") as string,
      isDefault: isDefaultCheckbox || (addresses.length === 0),
    };

    let updatedAddresses = [...addresses];

    if (newAddress.isDefault) {
      updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
    }

    if (editingAddress) {
      updatedAddresses = updatedAddresses.map(a => a.id === editingAddress.id ? newAddress : a);
    } else {
      updatedAddresses.push(newAddress);
    }

    setAddresses(updatedAddresses);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-3xl font-extrabold text-primary">Addresses</h1>
        <Button size="sm" onClick={handleOpenNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add new address
        </Button>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {addresses.map((address) => (
          <Card key={address.id} className={`relative p-6 ${address.isDefault ? "border-accent ring-1 ring-accent shadow-sm" : ""}`}>
            <div className="absolute right-4 top-4 flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={() => handleOpenEdit(address)}>
                <Edit2 className="h-4 w-4" />
                <span className="sr-only">Edit Address</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => setAddressToDelete(address.id)}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete Address</span>
              </Button>
            </div>
            {address.isDefault ? (
              <Badge variant="success" className="mb-2">Default Shipping</Badge>
            ) : (
              <div className="h-6 mb-2" />
            )}
            <p className="mt-2 font-medium text-primary">{address.firstName} {address.lastName}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {address.addressLine}<br />
              {address.city}, {address.state} {address.zipCode}<br />
              {address.country}
            </p>
            {!address.isDefault && (
              <Button variant="link" className="px-0 mt-3 text-xs h-auto" onClick={() => handleMakeDefault(address.id)}>
                Make as Default Address
              </Button>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <label htmlFor="country" className="mb-1.5 block text-sm font-medium">Country / Region</label>
              <Select name="country" defaultValue={editingAddress?.country || "United States"} required>
                <SelectTrigger id="country">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="United States">United States</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-1.5 block text-sm font-medium">First Name</label>
                <Input id="firstName" name="firstName" defaultValue={editingAddress?.firstName} required pattern="[A-Za-z\s]+" title="Only alphabetic characters allowed" />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-1.5 block text-sm font-medium">Last Name</label>
                <Input id="lastName" name="lastName" defaultValue={editingAddress?.lastName} required pattern="[A-Za-z\s]+" title="Only alphabetic characters allowed" />
              </div>
            </div>

            <div>
              <label htmlFor="addressLine" className="mb-1.5 block text-sm font-medium">Address Line</label>
              <Input id="addressLine" name="addressLine" defaultValue={editingAddress?.addressLine} required />
            </div>

            <div className="grid gap-4 sm:grid-cols-[2fr_1fr_1fr]">
              <div>
                <label htmlFor="city" className="mb-1.5 block text-sm font-medium">City</label>
                <Input id="city" name="city" defaultValue={editingAddress?.city} required />
              </div>
              <div>
                <label htmlFor="state" className="mb-1.5 block text-sm font-medium">State</label>
                <Select name="state" defaultValue={editingAddress?.state || ""} required>
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label htmlFor="zipCode" className="mb-1.5 block text-sm font-medium">Zip Code</label>
                <Input id="zipCode" name="zipCode" defaultValue={editingAddress?.zipCode} required pattern="\d{5}(-\d{4})?" title="5 digit zip code required" />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Checkbox id="isDefault" name="isDefault" defaultChecked={editingAddress?.isDefault} />
              <label htmlFor="isDefault" className="text-sm font-medium cursor-pointer">Make this my default address</label>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit">Save Address</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!addressToDelete} onOpenChange={(open) => !open && setAddressToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the selected address from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Address
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

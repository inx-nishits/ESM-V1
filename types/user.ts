import type { DeliveryAddress } from "./checkout";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phone?: string;
  taxExempt: boolean;
  poRequired: boolean;
}

export interface SavedAddress extends DeliveryAddress {
  id: string;
  isDefault: boolean;
  label?: string;
}

export interface ContractPricing {
  userId: string;
  customPrices: Record<string, number>;
}

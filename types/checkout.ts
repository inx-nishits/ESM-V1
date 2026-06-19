export type CheckoutStep =
  | "delivery"
  | "shipping"
  | "billing"
  | "payment"
  | "review";

export interface DeliveryAddress {
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  company?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface BillingDetails {
  sameAsShipping: boolean;
  billingAddress?: DeliveryAddress;
  poNumber?: string;
  poRequired?: boolean;
  taxExempt: boolean;
  taxCertificateNumber?: string;
  orderNotes?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  carrier: string;
  estimatedDays: string;
  price: number;
}

export type PaymentMethodType = "stripe" | "google_pay";

export interface CheckoutSession {
  step: CheckoutStep;
  delivery?: DeliveryAddress;
  shippingMethodId?: string;
  billing?: BillingDetails;
  paymentMethod?: PaymentMethodType;
  agreedToTerms?: boolean;
}

export interface PlaceOrderPayload {
  cart: import("./cart").Cart;
  delivery: DeliveryAddress;
  shippingMethodId: string;
  billing: BillingDetails;
  paymentMethod: PaymentMethodType;
}

export interface OrderConfirmation {
  orderId: string;
  orderNumber: string;
  email: string;
  total: number;
  placedAt: string;
}

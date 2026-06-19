import type { VariantAttributes } from "./product";

export type OrderStatus = "placed" | "in_progress" | "in_transit" | "delivered";

export interface OrderLine {
  productId: string;
  variantId: string;
  name: string;
  sku: string;
  variantAttributes: VariantAttributes;
  quantityCases: number;
  unitCount: number;
  pricePerCase: number;
  lineTotal: number;
  fdaGear: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  placedAt: string;
  email: string;
  lines: OrderLine[];
  deliveryAddress: import("./checkout").DeliveryAddress;
  shippingMethod: string;
  shippingCost: number;
  merchandiseSubtotal: number;
  tax: number;
  total: number;
  poNumber?: string;
  trackingUrl?: string;
}

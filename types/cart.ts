import type { VariantAttributes } from "./product";

export interface CartLine {
  id: string;
  productId: string;
  variantId: string;
  slug: string;
  name: string;
  sku: string;
  categorySlug: string;
  imageUrl: string;
  variantAttributes: VariantAttributes;
  caseQuantity: number;
  quantityCases: number;
  listPricePerCase: number;
  effectivePricePerCase: number;
  fdaGear: boolean;
  inventoryStatus: string;
}

export interface Cart {
  lines: CartLine[];
  updatedAt: string;
}

export interface CartSavings {
  contractSavings: number;
  volumeSavings: number;
  totalSavings: number;
}

export interface CartValidationIssue {
  lineId: string;
  code: "moq" | "inventory" | "pricing" | "quote_required";
  message: string;
}

export interface CartValidationResult {
  valid: boolean;
  issues: CartValidationIssue[];
}

export interface CartTotals {
  merchandiseSubtotal: number;
  listSubtotal: number;
  savings: CartSavings;
  itemCount: number;
  caseCount: number;
}

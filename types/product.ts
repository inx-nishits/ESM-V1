export type InventoryStatus = "in_stock" | "low_stock" | "out_of_stock" | "made_to_order";
export type PricingStatus = "standard" | "contact" | "quote_required";

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface VariantAttributes {
  color?: string;
  size?: string;
  style?: string;
  cartonSize?: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  attributes: VariantAttributes;
  price: number;
  inventoryStatus: InventoryStatus;
}

export interface VolumeTier {
  minCases: number;
  maxCases: number | null;
  pricePerCase?: number;
  discountPercent?: number;
  pricingStatus?: PricingStatus;
}

export interface SpecificationItem {
  label: string;
  value: string;
}

export interface SpecificationGroup {
  group: string;
  items: SpecificationItem[];
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  name: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  basePrice: number;
  pricingStatus: PricingStatus;
  fdaGear: boolean;
  certifications: string[];
  caseQuantity: number;
  boxesPerCase?: number;
  unitsPerBox?: number;
  moqCases: number;
  inventoryStatus: InventoryStatus;
  featured: boolean;
  variantOptions: Partial<Record<keyof VariantAttributes, string[]>>;
  variants: ProductVariant[];
  volumeTiers: VolumeTier[];
  specifications: SpecificationGroup[];
  relatedProductIds: string[];
  frequentlyBoughtTogetherIds: string[];
}

export interface ProductFilters {
  categorySlug?: string;
  industry?: string[];
  certification?: string[];
  brand?: string[];
  inStock?: boolean;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  page?: number;
  pageSize?: number;
  sort?: ProductSortOption;
}

export type ProductSortOption =
  | "featured"
  | "best-selling"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "newest"
  | "relevance";

export interface ResolvedPrice {
  listPrice: number;
  effectivePrice: number;
  isContractPrice: boolean;
  savings: number;
  pricingStatus: PricingStatus;
}

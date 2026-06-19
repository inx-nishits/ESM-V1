export interface Category {
  slug: string;
  name: string;
  number: string;
  description: string;
  image: string;
  heroImage?: string;
  productCount: number;
  defaultIndustryFilters?: string[];
}

export type Industry =
  | "food-processing"
  | "healthcare"
  | "industrial"
  | "government";

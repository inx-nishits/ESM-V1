import type { PaginatedResult } from "@/types/api";
import type { Category } from "@/types/category";
import type {
  CmsPage,
  CmsPageSlug,
  Certification,
  HomepageContent,
  NavigationConfig,
  NewsArticle,
} from "@/types/cms";
import type { Product, ProductFilters, ResolvedPrice } from "@/types/product";

export interface ContentProvider {
  getProducts(filters?: ProductFilters): Promise<PaginatedResult<Product>>;
  getProductBySlug(slug: string): Promise<Product | null>;
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | null>;
  searchProducts(query: string, filters?: ProductFilters): Promise<PaginatedResult<Product>>;
  getHomepage(): Promise<HomepageContent>;
  getPage(slug: CmsPageSlug): Promise<CmsPage | null>;
  getNewsArticles(): Promise<NewsArticle[]>;
  getNewsArticle(slug: string): Promise<NewsArticle | null>;
  getNavigation(): Promise<NavigationConfig>;
  getCertifications(): Promise<Certification[]>;
  resolvePrice(productId: string, variantId: string, userId?: string): Promise<ResolvedPrice | null>;
}

export type { ContentProvider as IContentProvider };

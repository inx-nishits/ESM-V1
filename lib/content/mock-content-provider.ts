import categoriesData from "@/content/mock/categories.json";
import certificationsData from "@/content/mock/certifications.json";
import homepageData from "@/content/mock/homepage.json";
import navigationData from "@/content/mock/navigation.json";
import pagesData from "@/content/mock/pages.json";
import productsData from "@/content/mock/products.json";
import newsData from "@/content/mock/news.json";
import usersMockData from "@/content/mock/users.mock.json";
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
import type { ContentProvider } from "./content-provider";
import { queryProducts } from "./product-utils";

const products = productsData as Product[];
const categories = categoriesData as Category[];
const pages = pagesData as CmsPage[];
const newsArticles = newsData as NewsArticle[];

export class MockContentProvider implements ContentProvider {
  async getProducts(filters?: ProductFilters): Promise<PaginatedResult<Product>> {
    return queryProducts(products, filters);
  }

  async getProductBySlug(slug: string): Promise<Product | null> {
    return products.find((p) => p.slug === slug) ?? null;
  }

  async getCategories(): Promise<Category[]> {
    return categories;
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    return categories.find((c) => c.slug === slug) ?? null;
  }

  async searchProducts(
    query: string,
    filters?: ProductFilters,
  ): Promise<PaginatedResult<Product>> {
    return queryProducts(products, { ...filters, search: query, sort: filters?.sort ?? "relevance" });
  }

  async getHomepage(): Promise<HomepageContent> {
    return homepageData as HomepageContent;
  }

  async getPage(slug: CmsPageSlug): Promise<CmsPage | null> {
    return pages.find((p) => p.slug === slug) ?? null;
  }

  async getNewsArticles(): Promise<NewsArticle[]> {
    return [...newsArticles].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  }

  async getNewsArticle(slug: string): Promise<NewsArticle | null> {
    return newsArticles.find((article) => article.slug === slug) ?? null;
  }

  async getNavigation(): Promise<NavigationConfig> {
    return navigationData as NavigationConfig;
  }

  async getCertifications(): Promise<Certification[]> {
    return certificationsData as Certification[];
  }

  async resolvePrice(
    productId: string,
    variantId: string,
    userId?: string,
  ): Promise<ResolvedPrice | null> {
    const product = products.find((p) => p.id === productId);
    if (!product) return null;

    const variant = product.variants.find((v) => v.id === variantId);
    if (!variant) return null;

    const listPrice = variant.price;
    let effectivePrice = listPrice;
    let isContractPrice = false;

    if (userId === usersMockData.userId) {
      const customPrices = usersMockData.customPrices as Record<string, number>;
      const custom = customPrices[variant.sku];
      if (typeof custom === "number") {
        effectivePrice = custom;
        isContractPrice = true;
      }
    }

    return {
      listPrice,
      effectivePrice,
      isContractPrice,
      savings: Math.max(0, listPrice - effectivePrice),
      pricingStatus: product.pricingStatus,
    };
  }
}

export const mockContentProvider = new MockContentProvider();

import { API_ENDPOINTS } from "./endpoints";
import { apiFetch } from "./client";
import type { PaginatedResult } from "@/types/api";
import type { Product, ProductFilters } from "@/types/product";

function buildQuery(filters?: ProductFilters): string {
  if (!filters) return "";
  const params = new URLSearchParams();
  if (filters.categorySlug) params.set("category", filters.categorySlug);
  if (filters.page) params.set("page", String(filters.page));
  if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.inStock) params.set("inStock", "true");
  if (filters.search) params.set("q", filters.search);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export async function fetchProducts(filters?: ProductFilters) {
  return apiFetch<PaginatedResult<Product>>(
    `${API_ENDPOINTS.products}${buildQuery(filters)}`,
  );
}

export async function fetchProductBySlug(slug: string) {
  return apiFetch<Product>(API_ENDPOINTS.product(slug));
}

export async function searchProducts(query: string, filters?: ProductFilters) {
  const params = new URLSearchParams({ q: query });
  if (filters?.page) params.set("page", String(filters.page));
  if (filters?.sort) params.set("sort", filters.sort);
  return apiFetch<PaginatedResult<Product>>(
    `${API_ENDPOINTS.search}?${params.toString()}`,
  );
}

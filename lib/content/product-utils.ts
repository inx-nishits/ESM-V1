import type { PaginatedResult } from "@/types/api";
import type { Product, ProductFilters, ProductSortOption } from "@/types/product";

export function sortProducts(products: Product[], sort?: ProductSortOption): Product[] {
  const list = [...products];

  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.basePrice - b.basePrice);
    case "price-desc":
      return list.sort((a, b) => b.basePrice - a.basePrice);
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return list.sort((a, b) => b.name.localeCompare(a.name));
    case "newest":
      return list.reverse();
    case "best-selling":
    case "featured":
      return list.sort((a, b) => Number(b.featured) - Number(a.featured));
    default:
      return list;
  }
}

export function filterProducts(products: Product[], filters: ProductFilters = {}): Product[] {
  let result = [...products];

  if (filters.categorySlug) {
    if (filters.categorySlug === "fda-gear") {
      result = result.filter((p) => p.fdaGear);
    } else {
      result = result.filter((p) => p.categorySlug === filters.categorySlug);
    }
  }

  if (filters.inStock) {
    result = result.filter((p) => p.inventoryStatus === "in_stock");
  }

  if (filters.priceMin !== undefined) {
    result = result.filter((p) => p.basePrice >= filters.priceMin!);
  }

  if (filters.priceMax !== undefined) {
    result = result.filter((p) => p.basePrice <= filters.priceMax!);
  }

  if (filters.certification?.length) {
    result = result.filter((p) =>
      filters.certification!.every((cert) => p.certifications.includes(cert)),
    );
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q),
    );
  }

  return result;
}

export function paginateProducts(
  products: Product[],
  page = 1,
  pageSize = 24,
): PaginatedResult<Product> {
  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: products.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}

export function queryProducts(
  products: Product[],
  filters: ProductFilters = {},
): PaginatedResult<Product> {
  const filtered = filterProducts(products, filters);
  const sorted = sortProducts(filtered, filters.sort);
  return paginateProducts(sorted, filters.page, filters.pageSize);
}

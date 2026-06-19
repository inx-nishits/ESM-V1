import type { Product } from "@/types/product";
import { absoluteUrl } from "@/lib/utils";

export function buildProductJsonLd(product: Product) {
  const primaryImage = product.images.find((i) => i.isPrimary) ?? product.images[0];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    description: product.shortDescription,
    image: primaryImage?.url,
    brand: {
      "@type": "Brand",
      name: product.fdaGear ? "FDA Gear" : "ESM Products",
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: "USD",
      price: product.basePrice,
      availability:
        product.inventoryStatus === "out_of_stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ESM Products",
    url: absoluteUrl("/"),
    telephone: "+1-630-915-4569",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1130 Carolina Drive Unit A",
      addressLocality: "West Chicago",
      addressRegion: "IL",
      postalCode: "60185",
      addressCountry: "US",
    },
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ESM Products",
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/search?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

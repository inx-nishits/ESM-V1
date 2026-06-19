/**
 * Sync mock catalog images and product data from live esmproducts.com (Shopify storefront API).
 * Run: node scripts/sync-live-catalog.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MOCK = path.join(ROOT, "content", "mock");

const UA = { "User-Agent": "Mozilla/5.0", Accept: "application/json" };

function toHttps(url) {
  if (!url) return url;
  return url.startsWith("//") ? `https:${url}` : url;
}

/** Use Shopify CDN URLs directly — most reliable for Next.js Image */
function productImageUrl(shopifySrc) {
  return shopifySrc;
}

function toSpotlight(product) {
  if (!product) return null;
  const img = product.images?.[0]?.src;
  if (!img) return null;
  return {
    slug: product.handle,
    name: product.title,
    sku: product.variants?.[0]?.sku || product.handle,
    price: parseFloat(product.variants?.[0]?.price ?? "0"),
    image: productImageUrl(img),
  };
}

function toSpotlightFromTransformed(product) {
  if (!product?.images?.[0]?.url) return null;
  return {
    slug: product.slug,
    name: product.name,
    sku: product.sku,
    price: product.basePrice,
    image: product.images[0].url,
  };
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  return res.json();
}

const CATEGORY_MAP = {
  "Head Protection": "head-protection",
  "Face Protection": "face-protection",
  "Hand Protection": "hand-protection",
  "Body Protection": "body-protection",
  "Foot Protection": "foot-protection",
};

function mapCategory(product) {
  for (const tag of product.tags) {
    if (CATEGORY_MAP[tag]) return CATEGORY_MAP[tag];
  }
  if (CATEGORY_MAP[product.product_type]) return CATEGORY_MAP[product.product_type];
  return "hand-protection";
}

function isFdaGearProduct(product) {
  const fdaTypes = new Set(["Bouffant", "Apron", "Lab Coat", "Pants", "Gown"]);
  return fdaTypes.has(product.product_type);
}

function stripHtml(html) {
  return html?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() ?? "";
}

function transformProduct(product, index) {
  const variant = product.variants[0];
  const categorySlug = mapCategory(product);
  const price = parseFloat(variant?.price ?? "0");
  const images = product.images.map((img, i) => ({
    url: productImageUrl(img.src),
    alt: img.alt || product.title,
    isPrimary: i === 0,
  }));

  return {
    id: `prod_${product.id}`,
    slug: product.handle,
    sku: variant?.sku || `ESM-${product.id}`,
    name: product.title,
    categorySlug,
    shortDescription: stripHtml(product.body_html).slice(0, 160),
    description: stripHtml(product.body_html),
    images: images.length
      ? images
      : [{ url: productImageUrl(product.images[0]?.src ?? ""), alt: product.title, isPrimary: true }],
    basePrice: price,
    pricingStatus: "standard",
    fdaGear: isFdaGearProduct(product),
    certifications: isFdaGearProduct(product)
      ? ["fda-registered", "21-cfr-177"]
      : ["fda-registered"],
    caseQuantity: 2000,
    moqCases: 1,
    inventoryStatus: "in_stock",
    featured: index < 6,
    variantOptions: {},
    variants: product.variants.slice(0, 4).map((v) => ({
      id: `var_${v.id}`,
      sku: v.sku || variant?.sku || product.handle,
      attributes: {},
      price: parseFloat(v.price),
      inventoryStatus: v.available === false ? "out_of_stock" : "in_stock",
    })),
    volumeTiers: [{ minCases: 1, maxCases: null, pricePerCase: price }],
    specifications: [],
    relatedProductIds: [],
    frequentlyBoughtTogetherIds: [],
  };
}

async function main() {
  const allProducts = [];
  for (let page = 1; page <= 10; page++) {
    const data = await fetchJson(`https://esmproducts.com/products.json?limit=50&page=${page}`);
    allProducts.push(...data.products);
    if (data.products.length < 50) break;
  }

  const products = allProducts.map(transformProduct);

  const categoryImages = {
    "hand-protection": "https://esmproducts.com/cdn/shop/products/ESM-61_750x.jpg?v=1675442172",
    "face-protection": "https://esmproducts.com/cdn/shop/products/FaceMask_750x.jpg?v=1675430760",
    "head-protection": "https://esmproducts.com/cdn/shop/files/1_3cf9ffa4-6e2b-4cc8-9c2e-58f0091cb8e9_750x.png?v=1744119929",
    "body-protection": "https://esmproducts.com/cdn/shop/products/YelllowProtectiveSleeve_750x.jpg?v=1675445183",
    "foot-protection": "https://esmproducts.com/cdn/shop/products/ESM-86_044c294e-854b-4e08-a843-1bcfcfff31c5_750x.jpg?v=1675428761",
    "fda-gear": "https://esmproducts.com/cdn/shop/files/FDA_GearImage_1066x.png?v=1675288609",
  };

  const categories = JSON.parse(fs.readFileSync(path.join(MOCK, "categories.json"), "utf8"));

  const collectionCounts = {};
  for (const cat of categories) {
    try {
      const data = await fetchJson(
        `https://esmproducts.com/collections/${cat.slug}/products.json?limit=250`,
      );
      collectionCounts[cat.slug] = data.products.length;
    } catch {
      collectionCounts[cat.slug] = products.filter((p) => p.categorySlug === cat.slug).length;
    }
  }

  for (const cat of categories) {
    cat.image = categoryImages[cat.slug] ?? cat.image;
    const mappedCount =
      cat.slug === "fda-gear"
        ? products.filter((p) => p.fdaGear).length
        : products.filter((p) => p.categorySlug === cat.slug).length;
    cat.productCount = Math.max(collectionCounts[cat.slug] ?? 0, mappedCount);
  }

  const homepage = JSON.parse(fs.readFileSync(path.join(MOCK, "homepage.json"), "utf8"));

  const nitrile = products.find((p) => p.slug === "nitrile-glove-5-mil-disposable-glove");
  const mask = products.find((p) => p.slug === "3-ply-face-mask-2-000-pcs");
  const bouffant = products.find((p) => p.slug === "bouffants-cap");
  const nitrile7 = products.find((p) => p.slug === "nitrile-glove-7-mil-disposable-glove");
  const workGloves = products.find((p) => p.slug === "work-gloves-sandy-green-nitrile-gloves");
  const hairnet = products.find((p) => p.slug === "hairnet-2-000-pcs");
  const n95 = products.find((p) => p.slug === "face-mask");

  homepage.heroSlides = [
    {
      id: "hero-1",
      tabLabel: "Overview",
      overline: "Certified women-owned · Since 1998",
      headline: "Stock PPE your team can count on — shipped next business day",
      subheadline:
        "Case-quantity gloves, masks, and FDA Gear from a trusted West Chicago supplier. Published pricing, volume tiers, and dedicated B2B support.",
      primaryCtaLabel: "Shop all products",
      primaryCtaHref: "/shop",
      secondaryCtaLabel: "Request a quote",
      secondaryCtaHref: "/contact",
      image: "https://esmproducts.com/cdn/shop/files/shutterstock_1229815867_copy-1_1500x.png?v=1672851678",
      video: "https://cdn.shopify.com/videos/c/o/v/7bdb3afd3303466d84be2147c0341bdc.mp4",
      trustPoints: [
        "In-stock cases ship within 1 business day",
        "Tiered case pricing — no surprise invoices",
        "WBE/MBE certified for diversity spend programs",
      ],
      productSpotlights: [nitrile, mask, bouffant].map(toSpotlightFromTransformed).filter(Boolean),
      categoryLinks: [
        { label: "Hand Protection", href: "/collections/hand-protection" },
        { label: "Face Masks", href: "/collections/face-protection" },
        { label: "FDA Gear", href: "/collections/fda-gear" },
      ],
    },
    {
      id: "hero-2",
      tabLabel: "Industrial",
      overline: "Hand & body protection",
      headline: "Protect your workforce. Protect your operation.",
      subheadline:
        "Nitrile, latex, and work gloves built for manufacturing floors, food lines, and healthcare restocks — with contract pricing for qualified accounts.",
      primaryCtaLabel: "Shop hand protection",
      primaryCtaHref: "/collections/hand-protection",
      secondaryCtaLabel: "Create business account",
      secondaryCtaHref: "/signup",
      image: "https://esmproducts.com/cdn/shop/products/ESM-61_1500x.jpg?v=1675442172",
      trustPoints: [
        "5 mil & 7 mil nitrile in stock",
        "Volume discounts from 5+ cases",
        "Same-day processing on in-stock SKUs",
      ],
      productSpotlights: [nitrile, nitrile7, workGloves].map(toSpotlightFromTransformed).filter(Boolean),
      categoryLinks: [
        { label: "Nitrile Gloves", href: "/collections/hand-protection" },
        { label: "Work Gloves", href: "/collections/hand-protection" },
        { label: "Body Protection", href: "/collections/body-protection" },
      ],
    },
    {
      id: "hero-3",
      tabLabel: "FDA Gear",
      overline: "Food-safe · Lot traceability",
      headline: "Audit-ready PPE for regulated environments",
      subheadline:
        "Exclusive FDA Gear brand — 21 CFR compliant bouffants, hairnets, and apparel with lot-coded cases for SQF and USDA inspections.",
      primaryCtaLabel: "Shop FDA Gear",
      primaryCtaHref: "/collections/fda-gear",
      secondaryCtaLabel: "Talk to sales",
      secondaryCtaHref: "/contact",
      image: "https://esmproducts.com/cdn/shop/files/FDA_GearImage_1500x.png?v=1675288609",
      trustPoints: [
        "21 CFR 177 compliant materials",
        "Lot numbers on every case",
        "Engineered for food & cleanroom use",
      ],
      productSpotlights: [bouffant, hairnet, n95].map(toSpotlightFromTransformed).filter(Boolean),
      categoryLinks: [
        { label: "Bouffants", href: "/products/bouffants-cap" },
        { label: "Hairnets", href: "/products/hairnet-2-000-pcs" },
        { label: "All FDA Gear", href: "/collections/fda-gear" },
      ],
    },
  ];

  homepage.featuredProductIds = [nitrile, mask, bouffant].filter(Boolean).map((p) => p.id);
  homepage.fdaGearSpotlight.productIds = bouffant ? [bouffant.id] : homepage.fdaGearSpotlight.productIds;
  homepage.fdaGearSpotlight.image = categoryImages["fda-gear"];
  homepage.heritage.image = "https://esmproducts.com/cdn/shop/products/ESM-61_1500x.jpg?v=1675442172";
  homepage.sustainability.image = "https://esmproducts.com/cdn/shop/files/shutterstock_1229815867_copy-1_1066x.png?v=1672851678";
  homepage.industrySolutions = homepage.industrySolutions.map((s) => ({
    ...s,
    image:
      s.id === "food-processing"
        ? categoryImages["fda-gear"]
        : s.id === "healthcare"
          ? categoryImages["face-protection"]
          : s.id === "industrial"
            ? categoryImages["hand-protection"]
            : "https://esmproducts.com/cdn/shop/files/ESM_Graphic_750x.png?v=1673985411",
  }));

  fs.writeFileSync(path.join(MOCK, "products.json"), JSON.stringify(products, null, 2));
  fs.writeFileSync(path.join(MOCK, "categories.json"), JSON.stringify(categories, null, 2));
  fs.writeFileSync(path.join(MOCK, "homepage.json"), JSON.stringify(homepage, null, 2));

  console.log(`Synced ${products.length} products, ${categories.length} categories, homepage media updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

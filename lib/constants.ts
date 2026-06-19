export const SITE_NAME = "ESM Products";
export const SITE_DESCRIPTION =
  "Quality disposable PPE for healthcare, food service, and industrial workplaces. Trusted protection, delivered.";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const SITE_PHONE = "630-915-4569";
export const SITE_EMAIL = "sales@esmproducts.com";
export const SITE_LOGO_URL =
  "https://esmproducts.com/cdn/shop/files/ESM_Logo-03.png?v=1666898842";
/** White artwork — use on navy/dark backgrounds, or inside the default SiteLogo badge on light backgrounds. */
export const SITE_LOGO_ALT = "ESM Products";

export const NO_INDEX_PATHS = ["/cart", "/checkout", "/account", "/compare", "/api"];

export const CONTENT_PROVIDER = process.env.CONTENT_PROVIDER ?? "mock";

export const CART_STORAGE_KEY = "esm_cart";
export const COMPARE_STORAGE_KEY = "esm_compare";
export const SAVED_PRODUCTS_STORAGE_KEY = "esm_saved_products";
export const CHECKOUT_STORAGE_KEY = "esm_checkout";

export const MAX_COMPARE_ITEMS = 4;
export const DEFAULT_PAGE_SIZE = 24;

export const COOKIE_CONSENT_KEY = "esm_cookie_consent";

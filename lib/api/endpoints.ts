export const API_ENDPOINTS = {
  products: "/api/products",
  product: (slug: string) => `/api/products/${slug}`,
  categories: "/api/categories",
  category: (slug: string) => `/api/categories/${slug}`,
  search: "/api/search",
  cart: "/api/cart",
  cartItem: (lineId: string) => `/api/cart/items/${lineId}`,
  shippingRates: "/api/checkout/shipping-rates",
  checkoutValidate: "/api/checkout/validate",
  placeOrder: "/api/checkout/place-order",
  quote: "/api/quote",
} as const;

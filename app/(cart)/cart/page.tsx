import { CartPageView } from "@/components/cart/cart-page-view";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Cart",
  description: "Review your ESM Products cart.",
  path: "/cart",
  noIndex: true,
});

export default function CartPage() {
  return <CartPageView />;
}

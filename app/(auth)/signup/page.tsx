import { AuthForm } from "@/components/auth/auth-form";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Create Account",
  description: "Create an ESM Products business account for tiered pricing and order history.",
  path: "/signup",
  noIndex: true,
});

export default function SignupPage() {
  return <AuthForm mode="signup" />;
}

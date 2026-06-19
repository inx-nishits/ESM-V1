import { AuthForm } from "@/components/auth/auth-form";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Sign In",
  description: "Sign in to your ESM Products business account.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return <AuthForm mode="login" />;
}

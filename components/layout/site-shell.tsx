
import { CookieConsentBanner } from "./cookie-consent";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { getShellData } from "@/lib/navigation/get-shell-data";

interface SiteShellProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export async function SiteShell({ children, showFooter = true }: SiteShellProps) {
  const { categories, navigation, announcementMessages, announcementEnabled } =
    await getShellData();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="sticky top-0 z-50">

        <SiteHeader categories={categories} navigation={navigation.primary} />
      </div>
      <main className="flex-1">{children}</main>
      {showFooter && <SiteFooter navigation={navigation} />}
      <CookieConsentBanner />
    </div>
  );
}

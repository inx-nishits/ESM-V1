import { CmsPageView } from "@/components/cms/cms-page-view";
import { getCmsPage } from "@/lib/cms/get-cms-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const page = await getCmsPage("privacy");
  return buildPageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: "/privacy",
  });
}

export default async function PrivacyPage() {
  const page = await getCmsPage("privacy");
  return <CmsPageView page={page} />;
}

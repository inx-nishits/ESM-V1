import { CmsPageView } from "@/components/cms/cms-page-view";
import { getCmsPage } from "@/lib/cms/get-cms-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const page = await getCmsPage("terms");
  return buildPageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: "/terms",
  });
}

export default async function TermsPage() {
  const page = await getCmsPage("terms");
  return <CmsPageView page={page} />;
}

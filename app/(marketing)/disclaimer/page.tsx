import { CmsPageView } from "@/components/cms/cms-page-view";
import { getCmsPage } from "@/lib/cms/get-cms-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const page = await getCmsPage("disclaimer");
  return buildPageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: "/disclaimer",
  });
}

export default async function DisclaimerPage() {
  const page = await getCmsPage("disclaimer");
  return <CmsPageView page={page} />;
}

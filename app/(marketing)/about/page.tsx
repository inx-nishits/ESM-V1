import { CmsPageView } from "@/components/cms/cms-page-view";
import { getCmsPage } from "@/lib/cms/get-cms-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const page = await getCmsPage("about");
  return buildPageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: "/about",
  });
}

export default async function AboutPage() {
  const page = await getCmsPage("about");
  return <CmsPageView page={page} />;
}

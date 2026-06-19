import { CmsPageView } from "@/components/cms/cms-page-view";
import { getCmsPage } from "@/lib/cms/get-cms-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const page = await getCmsPage("faq");
  return buildPageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: "/faq",
  });
}

export default async function FaqPage() {
  const page = await getCmsPage("faq");
  return <CmsPageView page={page} />;
}

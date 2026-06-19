import { ContactPageView } from "@/components/cms/contact-page-view";
import { getCmsPage } from "@/lib/cms/get-cms-page";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata() {
  const page = await getCmsPage("contact");
  return buildPageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: "/contact",
  });
}

export default async function ContactPage() {
  const page = await getCmsPage("contact");
  return <ContactPageView page={page} />;
}

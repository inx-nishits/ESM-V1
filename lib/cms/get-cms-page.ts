import { notFound } from "next/navigation";
import { getContentProvider } from "@/lib/content/get-content-provider";
import type { CmsPageSlug } from "@/types/cms";

export async function getCmsPage(slug: CmsPageSlug) {
  const provider = getContentProvider();
  const page = await provider.getPage(slug);
  if (!page) notFound();
  return page;
}

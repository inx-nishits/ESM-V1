import { notFound } from "next/navigation";
import { getContentProvider } from "@/lib/content/get-content-provider";

export async function getNewsArticles() {
  const provider = getContentProvider();
  return provider.getNewsArticles();
}

export async function getNewsArticle(slug: string) {
  const provider = getContentProvider();
  const article = await provider.getNewsArticle(slug);
  if (!article) notFound();
  return article;
}

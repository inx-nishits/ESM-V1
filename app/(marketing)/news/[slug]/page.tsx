import { NewsArticleView } from "@/components/cms/news-article-view";
import { getNewsArticle } from "@/lib/cms/get-news";
import { buildPageMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  return buildPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/news/${article.slug}`,
  });
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  return <NewsArticleView article={article} />;
}

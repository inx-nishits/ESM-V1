import { HomepageView } from "@/components/homepage/homepage-view";
import { getHomepageData } from "@/lib/homepage/get-homepage-data";
import { buildDefaultMetadata } from "@/lib/seo/metadata";

export const metadata = buildDefaultMetadata();

export default async function HomePage() {
  const data = await getHomepageData();

  return <HomepageView data={data} />;
}

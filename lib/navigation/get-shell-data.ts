import categoriesData from "@/content/mock/categories.json";
import homepageData from "@/content/mock/homepage.json";
import navigationData from "@/content/mock/navigation.json";
import type { Category } from "@/types/category";
import type { AnnouncementMessage, HomepageContent, NavigationConfig } from "@/types/cms";

export interface ShellData {
  categories: Category[];
  navigation: NavigationConfig;
  announcementMessages: AnnouncementMessage[];
  announcementEnabled: boolean;
}

export async function getShellData(): Promise<ShellData> {
  const homepage = homepageData as HomepageContent;

  return {
    categories: categoriesData as Category[],
    navigation: navigationData as NavigationConfig,
    announcementMessages: homepage.announcementBar.messages,
    announcementEnabled: homepage.announcementBar.enabled,
  };
}

export type CmsPageSlug = "about" | "faq" | "terms" | "privacy" | "contact" | "disclaimer";

export type CmsBlockType =
  | "hero"
  | "rich_text"
  | "stat_row"
  | "faq_group"
  | "cta_band"
  | "image_text"
  | "product_grid";

export interface HeroBlock {
  overline?: string;
  headline: string;
  subheadline?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: string;
}

export interface RichTextBlock {
  html: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatRowBlock {
  stats: StatItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqGroupBlock {
  title?: string;
  items: FaqItem[];
}

export interface CtaBandBlock {
  headline: string;
  subheadline?: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export interface ImageTextBlock {
  headline: string;
  body: string;
  image: string;
  imagePosition: "left" | "right";
}

export interface ProductGridBlock {
  productIds: string[];
}

export type CmsBlock =
  | { type: "hero"; data: HeroBlock }
  | { type: "rich_text"; data: RichTextBlock }
  | { type: "stat_row"; data: StatRowBlock }
  | { type: "faq_group"; data: FaqGroupBlock }
  | { type: "cta_band"; data: CtaBandBlock }
  | { type: "image_text"; data: ImageTextBlock }
  | { type: "product_grid"; data: ProductGridBlock };

export interface CmsPageSeo {
  title: string;
  description: string;
  noIndex?: boolean;
}

export interface CmsPage {
  slug: CmsPageSlug;
  title: string;
  seo: CmsPageSeo;
  blocks: CmsBlock[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category?: string;
  blocks: CmsBlock[];
}

export interface AnnouncementMessage {
  id: string;
  text: string;
  href?: string;
}

export interface HeroProductSpotlight {
  slug: string;
  name: string;
  sku: string;
  price: number;
  image: string;
}

export interface HeroCategoryLink {
  label: string;
  href: string;
}

export interface HeroSlide {
  id: string;
  tabLabel: string;
  overline: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  image: string;
  video?: string;
  trustPoints?: string[];
  productSpotlights?: HeroProductSpotlight[];
  categoryLinks?: HeroCategoryLink[];
}

export interface TrustBadge {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  industry: string;
}

export interface ClientLogo {
  id: string;
  name: string;
  wordmark: string;
}

export interface WhyEsmItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyEsmContent {
  overline: string;
  headline: string;
  subheadline: string;
  items: WhyEsmItem[];
}

export interface HeritageContent {
  overline: string;
  headline: string;
  body: string;
  image: string;
  stats: StatItem[];
}

export interface IndustrySolution {
  id: string;
  name: string;
  description: string;
  href: string;
  image: string;
}

export interface FdaGearSpotlight {
  overline: string;
  headline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  productIds: string[];
  image: string;
}

export interface SustainabilityContent {
  headline: string;
  subheadline: string;
  image: string;
  points: { id: string; title: string; description: string }[];
}

export interface HomepageContent {
  announcementBar: {
    enabled: boolean;
    messages: AnnouncementMessage[];
  };
  heroSlides: HeroSlide[];
  trustBadges: TrustBadge[];
  clientLogos: ClientLogo[];
  whyEsm: WhyEsmContent;
  heritage: HeritageContent;
  featuredProductIds: string[];
  fdaGearSpotlight: FdaGearSpotlight;
  industrySolutions: IndustrySolution[];
  testimonials: Testimonial[];
  sustainability: SustainabilityContent;
  newsletter: {
    headline: string;
    subheadline: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface NavigationConfig {
  primary: NavItem[];
  footer: {
    shop: NavItem[];
    company: NavItem[];
  };
}

export interface Certification {
  id: string;
  label: string;
  description: string;
}

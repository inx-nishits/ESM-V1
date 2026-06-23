import { CategoryDiscovery } from "./category-discovery";
import { CertificationsTrust } from "./certifications-trust";
import { FdaGearSpotlightSection } from "./fda-gear-spotlight";
import { FeaturedProducts } from "./featured-products";
import { HeritageSection } from "./heritage-section";
import { HeroCarousel } from "./hero-carousel";
import { IndustrySolutions } from "./industry-solutions";
import { NewsletterCta } from "./newsletter-cta";
import { SustainabilitySection } from "./sustainability-section";
import { TestimonialsSection } from "./testimonials";
import { TrustBadges } from "./trust-badges";
import { WhyEsmSection } from "./why-esm";
import type { HomepageData } from "@/lib/homepage/get-homepage-data";

interface HomepageViewProps {
  data: HomepageData;
}

export function HomepageView({ data }: HomepageViewProps) {
  const { content, categories, certifications, featuredProducts, fdaProducts } = data;

  return (
    <>
      <HeroCarousel slides={content.heroSlides} />
      <TrustBadges badges={content.trustBadges} />
      <CertificationsTrust
        certifications={certifications}
        clientLogos={content.clientLogos}
      />
      <FeaturedProducts products={featuredProducts} categories={categories} />
      <CategoryDiscovery categories={categories} />
      <WhyEsmSection content={content.whyEsm} />
      <HeritageSection content={content.heritage} />
      <FdaGearSpotlightSection
        content={content.fdaGearSpotlight}
        products={fdaProducts}
      />
      <IndustrySolutions solutions={content.industrySolutions} />
      <TestimonialsSection testimonials={content.testimonials} />
      <SustainabilitySection content={content.sustainability} />
      <NewsletterCta
        headline={content.newsletter.headline}
        subheadline={content.newsletter.subheadline}
      />
    </>
  );
}

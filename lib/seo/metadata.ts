import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/constants";
import { absoluteUrl } from "@/lib/utils";

export interface PageMetadataInput {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}

export function buildPageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? absoluteUrl("/images/og-default.svg");

  return {
    title: title === SITE_NAME ? title : `${title} | ${SITE_NAME}`,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function buildDefaultMetadata(): Metadata {
  return buildPageMetadata({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    path: "/",
  });
}

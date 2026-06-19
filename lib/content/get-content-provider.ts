import { CONTENT_PROVIDER } from "@/lib/constants";
import type { ContentProvider } from "./content-provider";
import { mockContentProvider } from "./mock-content-provider";

export function getContentProvider(): ContentProvider {
  switch (CONTENT_PROVIDER) {
    case "mock":
    default:
      return mockContentProvider;
  }
}

export { mockContentProvider } from "./mock-content-provider";
export type { ContentProvider } from "./content-provider";

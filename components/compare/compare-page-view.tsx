"use client";

import Image from "next/image";
import Link from "next/link";
import { GitCompare, X } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { useCompare } from "@/providers/compare-provider";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ComparePageViewProps {
  products: Product[];
}

export function ComparePageView({ products }: ComparePageViewProps) {
  const compare = useCompare();

  if (products.length === 0) {
    return (
      <div className="site-container py-16 text-center">
        <GitCompare className="mx-auto h-12 w-12 text-muted-foreground" aria-hidden />
        <h1 className="mt-4 font-display text-2xl font-extrabold text-primary">No products to compare</h1>
        <p className="mt-2 text-muted-foreground">Add up to 4 products from any product page.</p>
        <Button className="mt-8" size="lg" asChild>
          <Link href="/shop">Browse products</Link>
        </Button>
      </div>
    );
  }

  const rows: { label: string; values: (string | number)[] }[] = [
    { label: "Price / case", values: products.map((p) => formatCurrency(p.basePrice)) },
    { label: "SKU", values: products.map((p) => p.sku) },
    { label: "Units / case", values: products.map((p) => p.caseQuantity.toLocaleString()) },
    { label: "MOQ (cases)", values: products.map((p) => p.moqCases) },
    {
      label: "Availability",
      values: products.map((p) =>
        p.inventoryStatus === "in_stock" ? "In stock" : p.inventoryStatus.replace(/_/g, " "),
      ),
    },
    { label: "FDA Gear", values: products.map((p) => (p.fdaGear ? "Yes" : "No")) },
  ];

  return (
    <div>
      <PageHeader
        title="Compare products"
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Compare", href: "/compare" },
        ]}
        action={
          <Button variant="ghost" size="sm" onClick={compare.clear}>
            Clear all
          </Button>
        }
      />

      <div className="site-container mb-10 md:mb-16">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="w-36 p-3 text-left font-medium text-muted-foreground" />
              {products.map((product) => (
                <th key={product.id} className="min-w-[180px] p-3 align-top">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -right-1 -top-1 h-7 w-7"
                      onClick={() => compare.remove(product.id)}
                      aria-label={`Remove ${product.name}`}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-md bg-muted">
                      {product.images[0] && (
                        <Image
                          src={product.images[0].url}
                          alt={product.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      )}
                    </div>
                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-3 block font-display text-sm font-bold text-primary hover:underline"
                    >
                      {product.name}
                    </Link>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-border">
                <td className="p-3 font-medium text-muted-foreground">{row.label}</td>
                {row.values.map((value, index) => (
                  <td key={`${row.label}-${index}`} className="p-3 text-foreground">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

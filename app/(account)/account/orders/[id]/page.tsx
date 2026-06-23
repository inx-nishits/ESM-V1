"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, Minus, Plus } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const demoOrderDetails = {
  id: "ESM-10482",
  date: "2026-06-12",
  status: "In Transit",
  totalAmount: 556.6,
  itemsCount: 3,
  trackingDetails: "Package has left the sorting facility in Chicago, IL and is currently in transit to the destination. Expected delivery: Tomorrow, by 8:00 PM.",
  deliveryAddress: "John Doe\n123 Innovation Drive\nSuite 400\nSan Francisco, CA 94105\nUnited States",
  shippingMethod: "FedEx Standard Ground (3-5 Business Days)",
  paymentMethod: "Visa ending in 4242",
  subTotal: 540.6,
  shippingCharges: 16.0,
  items: [
    {
      id: "item-1",
      name: "Surgical Grade N95 Respirator",
      category: "Personal Protective Equipment",
      style: "Standard Fit",
      color: "White",
      size: "Medium",
      cartonSize: "Pack of 50",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1583947581924-860bda6a5f0e?auto=format&fit=crop&q=80&w=200&h=200",
      quantity: 2,
    },
    {
      id: "item-2",
      name: "Nitrile Examination Gloves",
      category: "Personal Protective Equipment",
      style: "Powder-Free",
      color: "Blue",
      size: "Large",
      cartonSize: "Box of 100",
      price: 40.62,
      image: "https://images.unsplash.com/photo-1584726243162-4155db0622a3?auto=format&fit=crop&q=80&w=200&h=200",
      quantity: 1,
    },
  ],
};

export default function DetailedOrderPage() {
  const params = useParams();
  const orderId = typeof params.id === "string" ? params.id : demoOrderDetails.id;
  
  // We mock state for the quantity modifier buttons even though they don't submit anywhere yet
  const [items, setItems] = useState(demoOrderDetails.items);

  const handleUpdateQuantity = (id: string, delta: number) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const currentSubTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const currentTotal = currentSubTotal + demoOrderDetails.shippingCharges;

  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Orders", href: "/account/orders" },
          { name: `Order ${orderId}`, href: `/account/orders/${orderId}` },
        ]}
      />

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild className="rounded-full">
            <Link href="/account/orders">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-display text-3xl font-extrabold text-primary">
            Order {orderId}
          </h1>
        </div>
        <Button variant="outline" className="gap-2 cursor-pointer">
          <Download className="h-4 w-4" />
          Download Invoice
        </Button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left Column: Order Summary and Items */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6">
            <h2 className="font-display text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="overflow-auto max-h-[500px] pr-2 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-border last:border-0 last:pb-0">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-border">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="font-medium text-primary">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      
                      <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
                        {item.style && <span>Style: {item.style}</span>}
                        {item.color && <span>Color: {item.color}</span>}
                        {item.size && <span>Size: {item.size}</span>}
                        {item.cartonSize && <span>Carton: {item.cartonSize}</span>}
                      </div>
                    </div>

                    <div className="mt-4 flex items-end justify-between">
                      <div className="flex items-center rounded-md border border-input">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-primary cursor-pointer"
                          onClick={() => handleUpdateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="flex h-8 w-10 items-center justify-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-primary cursor-pointer"
                          onClick={() => handleUpdateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      
                      <div className="font-medium text-primary">
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-border pt-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sub Total</span>
                <span className="font-medium">{formatCurrency(currentSubTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping Charges</span>
                <span className="font-medium">{formatCurrency(demoOrderDetails.shippingCharges)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-medium text-primary">Total Amount</span>
                <span className="font-display text-xl font-extrabold text-primary">
                  {formatCurrency(currentTotal)}
                </span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-xl font-bold mb-4">Tracking Details</h2>
            <div className="rounded-md bg-muted/50 p-4 border border-border">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {demoOrderDetails.trackingDetails}
              </p>
            </div>
          </Card>
        </div>

        {/* Right Column: Order Details */}
        <div className="space-y-6 lg:col-span-1">
          <Card className="p-6">
            <h2 className="font-display text-lg font-bold mb-4">Order Details</h2>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-medium">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order Date</span>
                <span className="font-medium">{demoOrderDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items</span>
                <span className="font-medium">{demoOrderDetails.itemsCount} items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Order Status</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {demoOrderDetails.status}
                </Badge>
              </div>
              <div className="flex justify-between pt-3 border-t border-border">
                <span className="font-medium">Total Amount</span>
                <span className="font-bold text-primary">{formatCurrency(currentTotal)}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-lg font-bold mb-4">Delivery Address</h2>
            <div className="text-sm text-muted-foreground whitespace-pre-line">
              {demoOrderDetails.deliveryAddress}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-lg font-bold mb-4">Shipping Method</h2>
            <div className="text-sm text-muted-foreground">
              {demoOrderDetails.shippingMethod}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-display text-lg font-bold mb-4">Payment Method</h2>
            <div className="text-sm text-muted-foreground">
              {demoOrderDetails.paymentMethod}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

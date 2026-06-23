"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { Breadcrumbs } from "@/components/commerce/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";

import { AccountSidebar } from "@/components/account/account-sidebar";

const demoOrders = [
  {
    id: "ESM-10482",
    date: "2026-06-12",
    status: "Shipped",
    total: 556.6,
    items: 3,
  },
  {
    id: "ESM-10391",
    date: "2026-05-28",
    status: "Delivered",
    total: 192,
    items: 1,
  },
];

export default function AccountOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

  return (
    <div className="site-container site-page">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Orders", href: "/account/orders" },
        ]}
      />
      
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h1 className="font-display text-3xl font-extrabold text-primary">Orders</h1>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <AccountSidebar />
        </aside>
        
        <div className="min-w-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by Order ID, product name..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex flex-1 gap-4 md:justify-end">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="order_placed">Order placed</SelectItem>
              <SelectItem value="in_progress">In progress</SelectItem>
              <SelectItem value="in_transit">In Transit</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Sort" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-desc">Newest First</SelectItem>
              <SelectItem value="date-asc">Oldest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ul className="mt-6 space-y-4">
        {demoOrders.map((order) => (
          <li key={order.id}>
            <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Link
                  href={`/account/orders/${order.id}`}
                  className="font-display font-bold text-primary hover:underline"
                >
                  Order {order.id}
                </Link>
                <p className="mt-1 text-sm text-muted-foreground">
                  {order.date} · {order.items} item{order.items === 1 ? "" : "s"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant={order.status === "Delivered" ? "outline" : "success"}>{order.status}</Badge>
                <span className="font-display font-extrabold text-primary">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </Card>
          </li>
        ))}
      </ul>
        </div>
      </div>
    </div>
  );
}

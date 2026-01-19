import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Orders | EduWrites Academic Writing Platform",
  description:
    "View and track all your academic writing orders. Monitor order status, delivery dates, and project details.",
  keywords: ["my orders", "order history", "order tracking", "academic orders"],
  alternates: {
    canonical: "https://eduwrites.com/orders",
  },
  robots: {
    index: false,
  },
  openGraph: {
    title: "My Orders | EduWrites",
    description: "Track your academic writing orders",
    type: "website",
    url: "https://eduwrites.com/orders",
  },
};

export default function OrdersLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

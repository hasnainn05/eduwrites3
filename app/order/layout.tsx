import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Place Your Order | EduWrites - Academic Writing Services",
  description:
    "Place your academic writing order at EduWrites. Simple ordering process with transparent pricing and guaranteed quality.",
  keywords: ["order", "place order", "academic writing", "pricing", "services"],
  alternates: {
    canonical: "https://eduwrites.com/order",
  },
  openGraph: {
    title: "Place Your Order | EduWrites",
    description: "Order professional academic writing services",
    type: "website",
    url: "https://eduwrites.com/order",
  },
};

export default function OrderLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

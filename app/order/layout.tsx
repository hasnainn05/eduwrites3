import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Place an Order | EduWrites Academic Writing Platform",
  description:
    "Place your academic writing order in 3 simple steps. Choose service, specify requirements, get instant quote. Start your order now.",
  keywords: ["place order", "order form", "writing request", "academic help"],
  alternates: {
    canonical: "https://eduwrites.com/order",
  },
  robots: {
    index: false,
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

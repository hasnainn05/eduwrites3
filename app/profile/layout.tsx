import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Account | Order History & Profile Management | EduWrites",
  description:
    "Access your EduWrites profile: view order history, track projects, manage account settings, and communicate with support.",
  keywords: [
    "profile",
    "account",
    "dashboard",
    "order history",
    "account management",
  ],
  alternates: {
    canonical: "https://eduwrites.com/profile",
  },
  robots: {
    index: false,
  },
  openGraph: {
    title: "My Account | EduWrites",
    description: "Access your EduWrites profile and order history.",
    url: "https://eduwrites.com/profile",
    type: "website",
  },
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

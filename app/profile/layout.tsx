import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "My Profile | EduWrites - Manage Your Account",
  description:
    "Manage your EduWrites profile, view your orders, and track your academic writing projects.",
  keywords: ["profile", "account", "my account", "orders", "dashboard"],
  alternates: {
    canonical: "https://eduwrites.com/profile",
  },
  robots: {
    index: false,
  },
};

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login | EduWrites - Academic Writing Services",
  description:
    "Sign in to your EduWrites account to manage your orders, track projects, and access your academic writing services.",
  keywords: ["login", "sign in", "account", "academic writing"],
  alternates: {
    canonical: "https://eduwrites.com/login",
  },
  openGraph: {
    title: "Login | EduWrites",
    description: "Access your EduWrites account",
    type: "website",
    url: "https://eduwrites.com/login",
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

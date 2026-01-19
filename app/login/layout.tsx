import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Login to Your Account | EduWrites Student Portal",
  description:
    "Login to your EduWrites account to track orders, manage projects, view history, and communicate with writers securely.",
  keywords: ["login", "student account", "order tracking", "customer portal"],
  alternates: {
    canonical: "https://eduwrites.com/login",
  },
  robots: {
    index: false,
  },
  openGraph: {
    title: "Login | EduWrites Student Portal",
    description: "Access your EduWrites account",
    type: "website",
    url: "https://eduwrites.com/login",
  },
};

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

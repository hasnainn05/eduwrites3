import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign Up for EduWrites | Create Your Student Account",
  description:
    "Create your EduWrites account in seconds. Get access to expert writers, place orders, and track your academic projects 24/7.",
  keywords: ["sign up", "create account", "register", "student registration"],
  alternates: {
    canonical: "https://eduwrites.com/signup",
  },
  robots: {
    index: false,
  },
  openGraph: {
    title: "Sign Up | EduWrites",
    description: "Create your account for professional academic writing services",
    type: "website",
    url: "https://eduwrites.com/signup",
  },
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

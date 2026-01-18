import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign Up | EduWrites - Start Your Academic Writing Journey",
  description:
    "Create your EduWrites account and get started with professional academic writing services. Join 50,000+ satisfied students worldwide.",
  keywords: [
    "sign up",
    "register",
    "create account",
    "academic writing services",
  ],
  alternates: {
    canonical: "https://eduwrites.com/signup",
  },
  openGraph: {
    title: "Sign Up | EduWrites",
    description:
      "Create your account and start with professional academic writing services",
    type: "website",
    url: "https://eduwrites.com/signup",
  },
};

export default function SignupLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

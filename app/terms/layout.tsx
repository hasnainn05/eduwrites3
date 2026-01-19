import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms of Service | EduWrites Legal Agreement",
  description:
    "Terms of Service for EduWrites: Usage guidelines, plagiarism policy, revision policy, and legal terms for academic writing services.",
  keywords: ["terms of service", "legal agreement", "usage terms"],
  alternates: {
    canonical: "https://eduwrites.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Service | EduWrites",
    description: "Read EduWrites Terms of Service and legal agreement",
    url: "https://eduwrites.com/terms",
    type: "website",
  },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

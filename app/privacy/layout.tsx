import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | EduWrites - Your Data Protection",
  description:
    "EduWrites Privacy Policy: Learn how we protect your personal data, maintain confidentiality, and ensure secure transactions.",
  keywords: ["privacy policy", "data protection", "confidentiality"],
  alternates: {
    canonical: "https://eduwrites.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | EduWrites",
    description: "Learn how EduWrites protects your personal data",
    url: "https://eduwrites.com/privacy",
    type: "website",
  },
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

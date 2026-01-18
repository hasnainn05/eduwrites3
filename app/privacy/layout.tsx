import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Privacy Policy | EduWrites",
  description:
    "EduWrites Privacy Policy. Learn how we protect your personal data and information.",
  keywords: ["privacy policy", "privacy", "data protection", "terms"],
  alternates: {
    canonical: "https://eduwrites.com/privacy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Terms of Service | EduWrites",
  description:
    "EduWrites Terms of Service. Read our terms and conditions for using our academic writing services.",
  keywords: ["terms of service", "terms", "conditions", "legal"],
  alternates: {
    canonical: "https://eduwrites.com/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

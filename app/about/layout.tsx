import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us | EduWrites - Professional Academic Writers",
  description:
    "Learn about EduWrites' mission to provide professional academic writing services. Trusted by 50,000+ students with 98% satisfaction rate.",
  keywords: [
    "about us",
    "academic writing company",
    "professional writers",
    "mission",
    "vision",
  ],
  alternates: {
    canonical: "https://eduwrites.com/about",
  },
  openGraph: {
    title: "About Us | EduWrites",
    description: "Professional academic writing services with expert writers",
    type: "website",
    url: "https://eduwrites.com/about",
  },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

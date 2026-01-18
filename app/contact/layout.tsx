import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Us | EduWrites - Get Academic Writing Help",
  description:
    "Contact EduWrites today for professional academic writing assistance. Available 24/7 to answer your questions and help with your writing needs.",
  keywords: [
    "contact",
    "support",
    "help",
    "academic writing",
    "customer service",
  ],
  alternates: {
    canonical: "https://eduwrites.com/contact",
  },
  openGraph: {
    title: "Contact Us | EduWrites",
    description:
      "Get in touch with our professional academic writing support team",
    type: "website",
    url: "https://eduwrites.com/contact",
  },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

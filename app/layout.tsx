import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import LayoutClient from "./LayoutClient";
import SchemaScript from "@/components/SchemaScript";
import {
  organizationSchema,
  websiteSchema,
  aggregateOfferSchema,
} from "@/lib/schema";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title:
    "EduWrites - Professional Academic Writing Services | Essays, Thesis, Dissertation",
  description:
    "Professional academic writing services for essays, research papers, theses, dissertations, and assignments. Get 100% original, plagiarism-free content from PhD experts. Fast delivery, affordable pricing, and unlimited revisions guaranteed.",
  keywords: [
    "essay writing service",
    "research paper writing",
    "thesis writing",
    "dissertation writing",
    "assignment writing",
    "academic writing help",
    "professional writers",
    "plagiarism-free",
    "original content",
    "academic excellence",
  ],
  metadataBase: new URL("https://eduwrites.com"),
  alternates: {
    canonical: "https://eduwrites.com",
  },
  icons: {
    icon: "https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800",
  },
  openGraph: {
    title: "EduWrites - Professional Academic Writing Services",
    description:
      "Expert academic writing services including essays, research papers, theses, and dissertations. 50,000+ satisfied students worldwide.",
    type: "website",
    url: "https://eduwrites.com",
    siteName: "EduWrites",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "EduWrites - Academic Writing Services",
    description:
      "Professional academic writing help for students. Essays, theses, dissertations, research papers.",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Preload critical resources for Core Web Vitals optimization */}
        <link
          rel="preload"
          as="image"
          href="https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800"
          type="image/webp"
        />

        {/* JSON-LD Schema Markup for SEO */}
        <SchemaScript schema={organizationSchema} />
        <SchemaScript schema={websiteSchema} />
        <SchemaScript schema={aggregateOfferSchema()} />
      </head>
      <body className={inter.className}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}

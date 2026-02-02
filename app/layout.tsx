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
import UserContextProvider from "../context/UserContextProvider";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title:
    "Academic Writing Services | EduWrites - Essays, Theses, Dissertations",
  description:
    "Professional academic writing services. PhD experts write essays, research papers, theses & dissertations. 100% original, plagiarism-free. Fast delivery, unlimited revisions.",
  keywords: [
    "essay writing service",
    "academic writing help",
    "research paper writing",
    "thesis writing service",
    "dissertation writing",
    "professional writers",
    "plagiarism-free essays",
  ],
  metadataBase: new URL("https://eduwrites.com"),
  alternates: {
    canonical: "https://eduwrites.com",
  },
  icons: {
    icon: "https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800",
  },
  openGraph: {
    title: "Academic Writing Services | EduWrites",
    description:
      "Professional academic writing for essays, research papers, theses, and dissertations. 50,000+ satisfied students.",
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
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} overflow-x-hidden`}
    >
      <head>
        {/* SEO Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="x-ua-compatible" content="IE=edge" />
        <meta name="color-scheme" content="light" />
        <link rel="canonical" href="https://eduwrites.com" />

        {/* Verification Tags */}
        <meta
          name="google-site-verification"
          content="YOUR_GOOGLE_VERIFICATION_CODE"
        />
        <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />

        {/* Additional SEO Meta Tags */}
        <meta name="theme-color" content="#3B82F6" />
        <meta
          name="description"
          content="Professional academic writing services. PhD experts write essays, research papers, theses & dissertations. 100% original, plagiarism-free."
        />

        {/* Preload critical resources for Core Web Vitals optimization */}
        <link
          rel="preload"
          as="image"
          href="https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800"
          type="image/webp"
        />

        {/* Resource Hints */}
        <link rel="dns-prefetch" href="https://cdn.builder.io" />
        <link rel="preconnect" href="https://cdn.builder.io" />

        {/* Alternate Links for Multi-language Support (if applicable) */}
        <link rel="alternate" hrefLang="en-US" href="https://eduwrites.com" />

        {/* JSON-LD Schema Markup for SEO */}
        <SchemaScript schema={organizationSchema} />
        <SchemaScript schema={websiteSchema} />
        <SchemaScript schema={aggregateOfferSchema()} />
      </head>
      <body
        className={`${inter.className} overflow-x-hidden`}
        suppressHydrationWarning
      >
        <ToastContainer />
        <UserContextProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </UserContextProvider>
      </body>
    </html>
  );
}

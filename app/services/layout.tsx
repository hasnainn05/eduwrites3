import type { Metadata } from "next";
import { ReactNode } from "react";
import SchemaScript from "@/components/SchemaScript";
import { serviceSchema, breadcrumbSchema } from "@/lib/schema";

const serviceMetadata: Record<
  string,
  { title: string; description: string; h1: string }
> = {
  essay: {
    title: "Professional Essay Writing Service | EduWrites",
    description:
      "Expert essay writing service for all academic levels. Get original, plagiarism-free essays written by PhD holders. Fast delivery, affordable pricing, and unlimited revisions guaranteed.",
    h1: "Professional Essay Writing Service",
  },
  assignment: {
    title: "Assignment Writing Service | Complete Solutions | EduWrites",
    description:
      "Professional assignment writing help for all subjects. Our expert writers deliver high-quality, original assignments with proper citations and on-time delivery.",
    h1: "Assignment Writing Service",
  },
  thesis: {
    title: "Thesis Writing Service | Expert Academic Support | EduWrites",
    description:
      "Professional thesis writing service by experienced academic writers. Get comprehensive thesis support from research to final submission with guaranteed quality.",
    h1: "Expert Thesis Writing Service",
  },
  research: {
    title: "Research Paper Writing Service | Original Content | EduWrites",
    description:
      "Expert research paper writing service with in-depth analysis and original content. Get well-researched, properly cited papers delivered on time.",
    h1: "Professional Research Paper Writing Service",
  },
  proofreading: {
    title: "Proofreading & Editing Service | Professional Quality | EduWrites",
    description:
      "Professional proofreading and editing service to perfect your academic writing. Expert editors ensure grammar, style, and formatting excellence.",
    h1: "Expert Proofreading & Editing Service",
  },
  dissertation: {
    title: "Dissertation Writing Service | Complete Support | EduWrites",
    description:
      "Professional dissertation writing service with expert guidance throughout the entire process. Get PhD-level support from planning to final submission.",
    h1: "Professional Dissertation Writing Service",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug;
  const meta = serviceMetadata[slug] || serviceMetadata.essay;
  const canonicalUrl = `https://eduwrites.com/services/${slug}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: "website",
      url: canonicalUrl,
    },
    keywords: [
      `${slug} writing service`,
      "academic writing",
      "professional writing",
      "original content",
      "plagiarism-free",
    ],
  };
}

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

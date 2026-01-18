// JSON-LD Schema Markup for SEO
// Implements structured data for Google, Bing, and other search engines

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "EduWrites",
  url: "https://eduwrites.com",
  logo: "https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800",
  description:
    "Professional academic writing services including essays, research papers, theses, and dissertations. 50,000+ satisfied students worldwide.",
  sameAs: [
    "https://www.facebook.com/eduwrites",
    "https://www.twitter.com/eduwrites",
    "https://www.linkedin.com/company/eduwrites",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    telephone: "+1-365-829-1551",
    email: "info@eduwrites.com",
    availableLanguage: ["en-US", "en-GB", "fr", "de", "it", "nl"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "US",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "EduWrites - Professional Academic Writing Services",
  url: "https://eduwrites.com",
  description:
    "Professional academic writing services for essays, research papers, theses, dissertations, and assignments.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://eduwrites.com/services?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

export const serviceSchema = (
  slug: string,
  serviceName: string,
  description: string,
  price: string = "100"
) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceName,
  url: `https://eduwrites.com/services/${slug}`,
  description: description,
  provider: {
    "@type": "Organization",
    name: "EduWrites",
    url: "https://eduwrites.com",
  },
  priceRange: `$${price}-$500`,
  areaServed: {
    "@type": "Country",
    name: "Worldwide",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `${serviceName} Packages`,
    itemListElement: [
      {
        "@type": "Offer",
        name: "Basic",
        price: price,
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Standard",
        price: (Number(price) * 2.5).toFixed(0),
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: (Number(price) * 4).toFixed(0),
        priceCurrency: "USD",
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "450",
  },
});

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "EduWrites",
  description: "Professional academic writing services",
  url: "https://eduwrites.com",
  telephone: "+1-365-829-1551",
  email: "info@eduwrites.com",
  sameAs: ["https://www.facebook.com/eduwrites", "https://www.twitter.com/eduwrites"],
  priceRange: "$$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "450",
  },
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (
  faqs: Array<{ question: string; answer: string }>
) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const articleSchema = (
  title: string,
  description: string,
  imageUrl: string,
  datePublished: string,
  author: string = "EduWrites"
) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description: description,
  image: imageUrl,
  datePublished: datePublished,
  author: {
    "@type": "Organization",
    name: author,
    url: "https://eduwrites.com",
  },
  publisher: {
    "@type": "Organization",
    name: "EduWrites",
    logo: {
      "@type": "ImageObject",
      url: "https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800",
    },
  },
});

export const aggregateOfferSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AggregateOffer",
  priceCurrency: "USD",
  lowPrice: "100",
  highPrice: "500",
  offerCount: "6",
  offers: [
    {
      "@type": "Offer",
      name: "Essay Writing",
      price: "100",
      priceCurrency: "USD",
      url: "https://eduwrites.com/services/essay",
    },
    {
      "@type": "Offer",
      name: "Assignment Writing",
      price: "120",
      priceCurrency: "USD",
      url: "https://eduwrites.com/services/assignment",
    },
    {
      "@type": "Offer",
      name: "Thesis Writing",
      price: "200",
      priceCurrency: "USD",
      url: "https://eduwrites.com/services/thesis",
    },
    {
      "@type": "Offer",
      name: "Research Paper Writing",
      price: "150",
      priceCurrency: "USD",
      url: "https://eduwrites.com/services/research",
    },
    {
      "@type": "Offer",
      name: "Proofreading & Editing",
      price: "80",
      priceCurrency: "USD",
      url: "https://eduwrites.com/services/proofreading",
    },
    {
      "@type": "Offer",
      name: "Dissertation Writing",
      price: "300",
      priceCurrency: "USD",
      url: "https://eduwrites.com/services/dissertation",
    },
  ],
});

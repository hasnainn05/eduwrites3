export interface PricingPackage {
  id: string;
  name: string;
  words: number;
  price: number;
  delivery: string;
  revisions: string;
  features: string[];
  highlighted?: boolean;
}

export interface ServicePricing {
  id: string;
  name: string;
  packages: PricingPackage[];
}

export const GENERAL_PRICING_PLANS: PricingPackage[] = [
  {
    id: "basic",
    name: "Basic",
    words: 2000,
    price: 100,
    delivery: "3 days",
    revisions: "Unlimited revisions",
    features: [
      "2000 words",
      "Standard complexity",
      "Unlimited revisions",
      "3 days delivery",
      "Email support",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    words: 5000,
    price: 250,
    delivery: "5-7 days",
    revisions: "Unlimited revisions",
    features: [
      "5000 words",
      "Medium complexity",
      "Unlimited revisions",
      "5-7 days delivery",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    words: 10000,
    price: 450,
    delivery: "12-15 days",
    revisions: "Unlimited revisions",
    features: [
      "10000 words",
      "Complex assignments",
      "Unlimited revisions",
      "12-15 days delivery",
      "24/7 dedicated support",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    words: 0,
    price: 0,
    delivery: "Custom",
    revisions: "Unlimited revisions",
    features: [
      "Any word count",
      "Custom requirements",
      "Unlimited revisions",
      "Rush delivery available",
      "Personal writer assignment",
    ],
    highlighted: false,
  },
];

export const PROOFREADING_PRICING_PLANS: PricingPackage[] = [
  {
    id: "basic",
    name: "Basic",
    words: 2000,
    price: 50,
    delivery: "3 days",
    revisions: "Unlimited revisions",
    features: [
      "2000 words",
      "Grammar and spelling only",
      "Unlimited revisions",
      "3 days delivery",
      "Email support",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    words: 5000,
    price: 150,
    delivery: "5-7 days",
    revisions: "Unlimited revisions",
    features: [
      "5000 words",
      "Comprehensive editing",
      "Unlimited revisions",
      "5-7 days delivery",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    words: 10000,
    price: 250,
    delivery: "12-15 days",
    revisions: "Unlimited revisions",
    features: [
      "10000 words",
      "In-depth editing",
      "Unlimited revisions",
      "12-15 days delivery",
      "24/7 dedicated support",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    words: 0,
    price: 0,
    delivery: "Custom",
    revisions: "Unlimited revisions",
    features: [
      "Custom editing scope",
      "Specialized document types",
      "Unlimited revisions",
      "Rush service available",
      "Personal editor assignment",
    ],
    highlighted: false,
  },
];

export const SERVICES_PRICING: ServicePricing[] = [
  {
    id: "essay",
    name: "Essay Writing",
    packages: GENERAL_PRICING_PLANS,
  },
  {
    id: "assignment",
    name: "Assignment Writing",
    packages: GENERAL_PRICING_PLANS,
  },
  {
    id: "research",
    name: "Research Paper",
    packages: GENERAL_PRICING_PLANS,
  },
  {
    id: "thesis",
    name: "Thesis Writing",
    packages: GENERAL_PRICING_PLANS,
  },
  {
    id: "proofreading",
    name: "Proofreading & Editing",
    packages: PROOFREADING_PRICING_PLANS,
  },
  {
    id: "dissertation",
    name: "Dissertation Writing",
    packages: GENERAL_PRICING_PLANS,
  },
];

export function getServicePricing(
  serviceId: string,
): ServicePricing | undefined {
  return SERVICES_PRICING.find((service) => service.id === serviceId);
}

export function getPackageDetails(
  serviceId: string,
  packageId: string,
): PricingPackage | undefined {
  const service = getServicePricing(serviceId);
  return service?.packages.find((pkg) => pkg.id === packageId);
}

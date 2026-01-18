export interface PricingPackage {
  id: string;
  name: string;
  words: number;
  price: number;
}

export interface ServicePricing {
  id: string;
  name: string;
  packages: PricingPackage[];
}

export const SERVICES_PRICING: ServicePricing[] = [
  {
    id: "essay",
    name: "Essay Writing",
    packages: [
      { id: "basic", name: "Basic Package", words: 2000, price: 100 },
      { id: "standard", name: "Standard Package", words: 5000, price: 250 },
      { id: "premium", name: "Premium Package", words: 10000, price: 450 },
      { id: "custom", name: "Custom Package", words: 0, price: 0 },
    ],
  },
  {
    id: "assignment",
    name: "Assignment Writing",
    packages: [
      { id: "basic", name: "Basic Package", words: 2000, price: 100 },
      { id: "standard", name: "Standard Package", words: 5000, price: 250 },
      { id: "premium", name: "Premium Package", words: 10000, price: 450 },
      { id: "custom", name: "Custom Package", words: 0, price: 0 },
    ],
  },
  {
    id: "research",
    name: "Research Paper",
    packages: [
      { id: "basic", name: "Basic Package", words: 2000, price: 100 },
      { id: "standard", name: "Standard Package", words: 5000, price: 250 },
      { id: "premium", name: "Premium Package", words: 10000, price: 450 },
      { id: "custom", name: "Custom Package", words: 0, price: 0 },
    ],
  },
  {
    id: "thesis",
    name: "Thesis & Dissertation",
    packages: [
      { id: "basic", name: "Basic Package", words: 2000, price: 100 },
      { id: "standard", name: "Standard Package", words: 5000, price: 250 },
      { id: "premium", name: "Premium Package", words: 10000, price: 450 },
      { id: "custom", name: "Custom Package", words: 0, price: 0 },
    ],
  },
  {
    id: "proofreading",
    name: "Proofreading & Editing",
    packages: [
      { id: "basic", name: "Basic Package", words: 2000, price: 50 },
      { id: "standard", name: "Standard Package", words: 5000, price: 150 },
      { id: "premium", name: "Premium Package", words: 10000, price: 250 },
      { id: "custom", name: "Custom Package", words: 0, price: 0 },
    ],
  },
  {
    id: "dissertation",
    name: "Dissertation Writing",
    packages: [
      { id: "basic", name: "Basic Package", words: 2000, price: 100 },
      { id: "standard", name: "Standard Package", words: 5000, price: 250 },
      { id: "premium", name: "Premium Package", words: 10000, price: 450 },
      { id: "custom", name: "Custom Package", words: 0, price: 0 },
    ],
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

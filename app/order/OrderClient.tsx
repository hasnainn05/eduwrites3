"use client";

import OrderForm from "@/components/OrderForm";
import { useSearchParams } from "next/navigation";

export function OrderClient() {
  const searchParams = useSearchParams();
  let service = searchParams.get("service");
  const pkg = searchParams.get("package");

  // Map proofreading variants to main proofreading service
  if (service && service.includes("-proofreading")) {
    service = "proofreading";
  }

  return (
    <div className="card-bg rounded-lg border-2 border-border p-5 sm:p-8 shadow-sm">
      <OrderForm
        preSelectedService={service || undefined}
        preSelectedPackage={pkg || undefined}
        onSuccess={() => {
          // Optional: handle post-submission
        }}
      />
      <p className="text-center text-xs text-foreground/60 mt-3">
        * Required fields. We'll contact you within 1 hour to confirm your
        order.
      </p>
    </div>
  );
}

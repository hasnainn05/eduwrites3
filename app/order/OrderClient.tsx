"use client";

import OrderForm from "@/components/OrderForm";
import { useSearchParams } from "next/navigation";

export function OrderClient() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service");
  const pkg = searchParams.get("package");

  return (
    <div className="card-bg rounded-2xl border-2 border-border p-8 sm:p-12 shadow-sm">
      <OrderForm
        preSelectedService={service || undefined}
        preSelectedPackage={pkg || undefined}
        onSuccess={() => {
          // Optional: handle post-submission
        }}
      />
      <p className="text-center text-sm text-foreground/60 mt-4">
        * Required fields. We'll contact you within 1 hour to confirm your
        order.
      </p>
    </div>
  );
}

"use client";

import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { OrderClient } from "./OrderClient";

export default function Order() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen py-6 sm:py-8 lg:py-12 px-3 sm:px-4 md:px-6">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blur-gradient absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600 to-transparent"></div>
        <div className="blur-gradient absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-transparent"></div>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-primary hover:text-accent transition-colors mb-6 font-semibold text-sm group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2 font-poppins">
            Place Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Order
            </span>
          </h1>
          <p className="text-xs text-foreground/70">
            Fill in your details and we'll get started on your academic work
            right away
          </p>
        </div>

        {/* Form Container */}
        <Suspense
          fallback={
            <div className="glass p-8 sm:p-12 rounded-2xl text-center">
              Loading order form...
            </div>
          }
        >
          <OrderClient />
        </Suspense>
      </div>
    </div>
  );
}

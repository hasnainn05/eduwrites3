import { Suspense } from "react";
import { OrderClient } from "./OrderClient";

export default function Order() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blur-gradient absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600 to-transparent"></div>
        <div className="blur-gradient absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-transparent"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 font-poppins">
            Place Your{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Order
            </span>
          </h1>
          <p className="text-lg text-foreground/70">
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

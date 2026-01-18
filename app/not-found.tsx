'use client';

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center glass p-12 rounded-2xl max-w-md w-full">
        <div className="text-6xl mb-6">🚀</div>
        <h1 className="text-4xl font-bold text-foreground mb-4 font-poppins">
          Page Not Found
        </h1>
        <p className="text-foreground/70 mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 gradient-primary text-white px-8 py-3 rounded-lg font-semibold hover:shadow-glow transition-all transform hover:scale-105"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

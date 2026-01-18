"use client";

import { usePathname } from "next/navigation";

export function Canvas3DWrapper() {
  const pathname = usePathname();

  // Show gradient background on all pages except login and signup
  const showBackground =
    !pathname.includes("/login") && !pathname.includes("/signup");

  if (!showBackground) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none h-screen">
      {/* Light Background Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>

      {/* Subtle Gradient Accents - Soft Navy & Gold hints */}
      <div className="blur-gradient absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/8 to-transparent rounded-full"></div>
      <div className="blur-gradient absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-bl from-accent/8 to-transparent rounded-full animation-delay-2000"></div>
      <div className="blur-gradient absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-primary/5 to-transparent rounded-full animation-delay-4000"></div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(31,41,55,.04) 25%, rgba(31,41,55,.04) 26%, transparent 27%, transparent 74%, rgba(31,41,55,.04) 75%, rgba(31,41,55,.04) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(31,41,55,.04) 25%, rgba(31,41,55,.04) 26%, transparent 27%, transparent 74%, rgba(31,41,55,.04) 75%, rgba(31,41,55,.04) 76%, transparent 77%, transparent)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>
    </div>
  );
}

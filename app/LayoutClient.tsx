"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import { Canvas3DWrapper } from "@/client/components/Canvas3DWrapper";
import { usePathname } from "next/navigation";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className="light" suppressHydrationWarning>
      <Canvas3DWrapper />
      <div className="flex flex-col min-h-screen">
        {!isAdminRoute && <Header />}
        <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 sm:py-8 md:py-10">
          {children}
        </main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <LiveChat />}
      </div>
    </div>
  );
}

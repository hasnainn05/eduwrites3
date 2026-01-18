"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import { Canvas3DWrapper } from "@/client/components/Canvas3DWrapper";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <div className={!isAdminRoute ? "light" : ""}>
      <>
        {!isAdminRoute && <Canvas3DWrapper />}
        <div className="flex flex-col min-h-screen">
          {!isAdminRoute && <Header />}
          <main className="flex-grow">{children}</main>
          {!isAdminRoute && <Footer />}
          {!isAdminRoute && <LiveChat />}
        </div>
      </>
    </div>
  );
}

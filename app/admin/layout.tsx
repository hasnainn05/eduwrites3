"use client";

import { ReactNode, useEffect } from "react";
import { AdminSidebar } from "@/client/components/AdminSidebar";
import { AdminMobileNav } from "@/client/components/AdminMobileNav";
import { AdminMobileMenu } from "@/client/components/AdminMobileMenu";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (res.status === 401) {
          router.replace("/login");
          return;
        }

        const data = await res.json();
        console.log("admin user : ", data)
        if(data?.user?.role !== "admin"){
          router.replace("/login");
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    fetchUser();
  }, [router]);
  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header with Logo and Mobile Menu */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center px-4 sm:px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2 flex-shrink-0"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800"
              alt="EduWrites Logo"
              className="w-8 h-8 rounded"
            />
            <span className="hidden sm:inline text-base font-bold text-slate-900 font-poppins">
              Admin
            </span>
          </Link>

          {/* Mobile Menu - Hamburger */}
          <AdminMobileMenu />
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0">
          <AdminSidebar />
        </aside>

        {/* Content Area - Add padding for mobile bottom nav */}
        <main className="flex-1 overflow-y-auto w-full bg-slate-50 pb-16 md:pb-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <AdminMobileNav />
    </div>
  );
}

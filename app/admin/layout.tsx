"use client";

import { ReactNode, useState } from "react";
import { AdminSidebar } from "@/client/components/AdminSidebar";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header with Logo Only */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 h-16 flex items-center px-4 sm:px-6">
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/admin/dashboard" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800"
              alt="EduWrites Logo"
              className="w-8 h-8 rounded"
            />
            <span className="hidden sm:inline text-base font-bold text-slate-900 font-poppins">
              Admin
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-slate-700" />
            ) : (
              <Menu size={20} className="text-slate-700" />
            )}
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0">
          <AdminSidebar />
        </aside>

        {/* Mobile Drawer Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 md:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <aside className="absolute left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 overflow-y-auto shadow-lg">
              <AdminSidebar />
            </aside>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto w-full bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}

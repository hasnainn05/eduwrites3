"use client";

import { ReactNode, useState } from "react";
import { AdminSidebar } from "@/client/components/AdminSidebar";
import { Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Fixed Header - Only on Mobile */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-slate-200 p-3 sm:p-4 md:hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-bold text-slate-900 font-poppins">
              Admin Panel
            </h1>
            <p className="text-slate-600 text-[10px] sm:text-xs mt-0.5">
              Manage platform
            </p>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <X size={18} className="text-slate-700" />
            ) : (
              <Menu size={18} className="text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Main Layout Container */}
      <div className="flex flex-1 overflow-hidden pt-16 sm:pt-18 md:pt-0">
        {/* Fixed Sidebar - Desktop */}
        <div className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0">
          <AdminSidebar />
        </div>

        {/* Mobile Drawer Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-20 md:hidden">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 overflow-y-auto z-30">
              <AdminSidebar />
            </div>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto w-full bg-slate-50">
          <div className="h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

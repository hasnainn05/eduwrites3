"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Settings,
  LogOut,
  Users,
  Star,
  FileText,
  Home,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      label: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      label: "Services",
      href: "/admin/services",
      icon: FileText,
    },
    {
      label: "Reviews",
      href: "/admin/reviews",
      icon: Star,
    },
    {
      label: "Live Chat",
      href: "/admin/live-chat",
      icon: MessageSquare,
    },
    {
      label: "Support Messages",
      href: "/admin/quote-requests",
      icon: MessageSquare,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => pathname === href;

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Logo - Fixed */}
      <div className="flex-shrink-0 p-4 md:p-6 border-b border-border">
        <Link href="/admin/dashboard" className="flex items-center gap-2 mb-2">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F360dd9d64b604bb58688c9e51710ce3e%2F118b262353ba4908905314ab922751d3?format=webp&width=800"
            alt="EduWrites Logo"
            className="w-[46px] h-[46px] sm:w-[51px] sm:h-[51px] flex-shrink-0"
          />
          <h2 className="text-xl md:text-2xl font-bold text-primary font-poppins">
            Admin
          </h2>
        </Link>
        <p className="text-xs text-foreground/60 ml-11">EduWrites</p>
      </div>

      {/* Navigation Menu - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-2 md:p-4 space-y-1 md:space-y-2 min-h-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all text-sm md:text-base ${
                active
                  ? "bg-primary/10 border border-primary/30 text-primary"
                  : "text-foreground/70 hover:text-foreground hover:bg-primary/5"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer - Fixed */}
      <div className="flex-shrink-0 p-2 md:p-4 border-t border-border space-y-2 md:space-y-3">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-foreground/70 hover:text-foreground hover:bg-primary/5 transition-all text-sm md:text-base"
        >
          <Home size={20} />
          <span className="font-medium">Back to Site</span>
        </Link>
        <button
          onClick={() => {
            window.location.href = "/admin/login";
          }}
          className="w-full flex items-center gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all text-sm md:text-base"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-64 flex-col">
        <SidebarContent />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-20 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 transition-all"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed left-0 top-0 z-40 w-56 h-screen bg-white border-r border-border flex flex-col transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
}

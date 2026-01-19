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
    <div className="h-full flex flex-col bg-white">
      {/* Navigation Menu - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 min-h-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm font-medium group ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} className={active ? "text-blue-600" : "group-hover:text-slate-900"} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Section - Fixed */}
      <div className="flex-shrink-0 p-3 border-t border-slate-200 space-y-1.5">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all text-sm font-medium group"
        >
          <Home size={18} className="group-hover:text-slate-900" />
          <span>Back to Site</span>
        </Link>
        <button
          onClick={() => {
            window.location.href = "/admin/login";
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-red-600 hover:bg-red-50 transition-all text-sm font-medium group"
        >
          <LogOut size={18} className="group-hover:text-red-700" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full w-64 flex-col bg-white">
        <SidebarContent />
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 z-20 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed left-0 top-16 z-30 w-56 h-[calc(100vh-4rem)] bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
}

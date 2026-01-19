"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Star,
  MessageSquare,
  Settings,
  Home,
  LogOut,
} from "lucide-react";

export function AdminMobileNav() {
  const pathname = usePathname();

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
      label: "Chat",
      href: "/admin/live-chat",
      icon: MessageSquare,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 h-16 overflow-hidden">
      <div className="flex items-center justify-between h-full px-1 gap-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-start flex-1 gap-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-md transition-all text-xs font-medium flex-shrink-0 min-w-fit ${
                  active
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title={item.label}
              >
                <Icon size={20} />
                <span className="text-[10px] leading-none">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-0 ml-auto flex-shrink-0">
          <div className="border-l border-slate-200 h-8"></div>
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-md text-slate-600 hover:text-slate-900 transition-all text-xs font-medium flex-shrink-0 min-w-fit"
            title="Back to Site"
          >
            <Home size={20} />
            <span className="text-[10px] leading-none">Site</span>
          </Link>
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-md text-red-600 hover:text-red-700 transition-all text-xs font-medium flex-shrink-0 min-w-fit"
            title="Logout"
          >
            <LogOut size={20} />
            <span className="text-[10px] leading-none">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

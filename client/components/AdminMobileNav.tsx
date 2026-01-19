"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  MessageSquare,
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
      label: "Chat",
      href: "/admin/live-chat",
      icon: MessageSquare,
    },
    {
      label: "Support",
      href: "/admin/quote-requests",
      icon: MessageSquare,
    },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 h-16">
      <div className="flex items-center h-full w-full">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-all text-xs font-medium ${
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
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Home,
  ShoppingBag,
  LogOut,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  
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
      label: "Live Chat",
      href: "/admin/live-chat",
      icon: MessageSquare,
    },
    {
      label: "Support Messages",
      href: "/admin/quote-requests",
      icon: MessageSquare,
    },
  ];

  const handleLogout = async () => {
    try {
      setLoading(true)
      await fetch("/api/auth/logout", { method: "POST" });
      
      router.replace("/login");
    } catch (err) {
      console.log("Error : ", err)
    } finally {
      setLoading(false);
    }
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Desktop Sidebar Only */}
      <div className="h-full flex flex-col bg-white w-full">
        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 min-h-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-all text-sm font-medium group ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Icon
                  size={18}
                  className={
                    active ? "text-blue-600" : "group-hover:text-slate-900"
                  }
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Section - Fixed */}
        <div className="flex-shrink-0 p-3 border-t border-slate-200 space-y-1.5">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all text-sm font-medium group"
          >
            <Home size={18} className="group-hover:text-slate-900" />
            <span>Back to Site</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-red-600 hover:bg-red-50 transition-all text-sm font-medium group"
          >
            <LogOut size={18} className="group-hover:text-red-700" />
            <span>{loading ? "Logging out ..." :"Logout"}</span>
          </button>
        </div>
      </div>
    </>
  );
}

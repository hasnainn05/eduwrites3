"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, DollarSign, BookOpen, User } from "lucide-react";
import { useState, useEffect } from "react";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState<string>("/");

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Services", icon: ShoppingBag, path: "/#services" },
    { label: "Pricing", icon: DollarSign, path: "/#pricing" },
    { label: "About", icon: BookOpen, path: "/about" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  useEffect(() => {
    // Update selected tab based on pathname
    if (pathname === "/" || pathname.startsWith("/")) {
      // For home page, keep the previously selected tab if it's one of the home sections
      if (
        pathname === "/" &&
        (selectedTab === "/" || selectedTab === "/#services" || selectedTab === "/#pricing")
      ) {
        // Keep the current selection
        return;
      }
      // For other pages, select the matching tab
      const matchingTab = navItems.find((item) => {
        if (item.path === "/") return pathname === "/";
        if (item.path.startsWith("/#")) return false;
        return pathname === item.path || pathname.startsWith(item.path + "/");
      });
      if (matchingTab) {
        setSelectedTab(matchingTab.path);
      } else if (pathname === "/") {
        setSelectedTab("/");
      }
    }
  }, [pathname]);

  const isActive = (path: string) => selectedTab === path;

  return (
    <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-2">
      <div className="flex items-center justify-between gap-1 bg-white border border-border rounded-t-2xl shadow-lg h-16 px-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-all duration-300 ${
                active ? "text-primary -translate-y-1" : "text-gray-400 hover:text-primary"
              }`}
              title={item.label}
            >
              <Icon size={14} className={active ? "fill-current" : ""} />
              <span
                className={`whitespace-nowrap ${
                  active ? "text-[10px] font-bold" : "text-[8px] font-medium"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

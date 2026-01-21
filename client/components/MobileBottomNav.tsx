"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, DollarSign, BookOpen, User } from "lucide-react";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Services", icon: ShoppingBag, path: "/#services" },
    { label: "Pricing", icon: DollarSign, path: "/#pricing" },
    { label: "About", icon: BookOpen, path: "/about" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    if (path.startsWith("/#")) {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

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
                active ? "text-primary -translate-y-2 scale-110" : "text-foreground hover:text-primary"
              }`}
              title={item.label}
            >
              <Icon size={24} className={active ? "fill-current" : ""} />
              <span
                className={`text-[11px] whitespace-nowrap ${
                  active ? "font-bold" : "font-medium"
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

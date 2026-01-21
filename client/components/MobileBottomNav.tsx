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
    if (path === "/") return pathname === "/";
    if (path.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(path);
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
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg transition-all duration-200 ${
                active
                  ? "bg-primary text-white shadow-md scale-105"
                  : "text-foreground hover:bg-primary/5 hover:text-primary"
              }`}
              title={item.label}
            >
              <Icon size={18} />
              <span className="text-[9px] font-semibold whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

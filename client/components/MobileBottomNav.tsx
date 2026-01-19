"use client";

import Link from "next/link";
import { Home, ShoppingBag, DollarSign, BookOpen, User } from "lucide-react";

export default function MobileBottomNav() {
  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Services", icon: ShoppingBag, path: "/#services" },
    { label: "Pricing", icon: DollarSign, path: "/#pricing" },
    { label: "About", icon: BookOpen, path: "/about" },
    { label: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 px-1">
      <div className="flex items-center justify-center h-14 sm:h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={item.path}
              className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 hover:bg-primary/5 transition-colors text-foreground hover:text-primary"
              title={item.label}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

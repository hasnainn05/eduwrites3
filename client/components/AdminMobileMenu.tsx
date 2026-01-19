"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Settings, LogOut, Home } from "lucide-react";
import Link from "next/link";

export function AdminMobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="md:hidden relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-700"
        title="Menu"
      >
        <MoreVertical size={24} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
          <Link
            href="/admin/settings"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-100"
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-100"
          >
            <Home size={18} />
            <span>Back to Site</span>
          </Link>
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
}

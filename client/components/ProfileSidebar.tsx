"use client";

import Link from "next/link";
import { User, FileText, MessageSquare, Settings, LogOut } from "lucide-react";

interface ProfileSidebarProps {
  activeTab: "overview" | "orders" | "chat" | "settings";
  onTabChange: (tab: "overview" | "orders" | "chat" | "settings") => void;
  onLogout: () => void;
  userName: string;
}

export function ProfileSidebar({
  activeTab,
  onTabChange,
  onLogout,
  userName,
}: ProfileSidebarProps) {
  const navItems = [
    { id: "overview", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: FileText },
    { id: "chat", label: "Live Chat", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-border flex flex-col z-40">
      {/* Header Spacing */}
      <div className="h-16 flex-shrink-0"></div>

      {/* Profile Info */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl text-white text-base font-bold mb-2 relative shadow-lg">
            {userName.split(" ")[0][0]}
            {userName.split(" ")[1]?.[0] || ""}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-accent rounded-full border-2 border-white flex items-center justify-center">
              <User size={10} className="text-primary" />
            </div>
          </div>
          <h3 className="text-foreground font-semibold text-xs mb-0.5">
            {userName}
          </h3>
          <p className="text-foreground/60 text-[10px]">User Account</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() =>
                onTabChange(
                  item.id as "overview" | "orders" | "chat" | "settings",
                )
              }
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all font-medium text-xs md:text-sm ${
                isActive
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "text-foreground/70 hover:text-foreground hover:bg-primary/5 border border-transparent"
              }`}
            >
              <Icon size={16} className="md:w-4.5 md:h-4.5" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Logout */}
      <div className="p-2 border-t border-border flex-shrink-0">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all font-medium text-xs md:text-sm text-red-600 hover:bg-red-500/20 hover:border-red-500/30 border border-transparent"
        >
          <LogOut size={16} className="md:w-4.5 md:h-4.5" />
          Logout
        </button>
      </div>
    </div>
  );
}

"use client";

import {
  BarChart3,
  Users,
  Star,
  FileText,
  TrendingUp,
  MessageSquare,
  Activity,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Services",
      value: "6",
      change: "+2 this month",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Projects Completed",
      value: "1,234",
      change: "+156 this month",
      icon: TrendingUp,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Average Rating",
      value: "4.8",
      change: "+0.3 this month",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
    {
      label: "Total Reviews",
      value: "892",
      change: "+89 this month",
      icon: Users,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "New Messages",
      value: "23",
      change: "Pending responses",
      icon: MessageSquare,
      color: "from-indigo-500 to-purple-500",
    },
    {
      label: "Customer Satisfaction",
      value: "94%",
      change: "+2% this month",
      icon: BarChart3,
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const recentActivities = [
    {
      date: "Today, 2:30 PM",
      action: "New message from John Doe",
      type: "message",
    },
    {
      date: "Today, 1:15 PM",
      action: "Service review: 5 stars from Sarah",
      type: "review",
    },
    {
      date: "Yesterday, 4:45 PM",
      action: "Project completed for Design Service",
      type: "project",
    },
    {
      date: "Yesterday, 10:20 AM",
      action: "New package inquiry received",
      type: "inquiry",
    },
  ];

  return (
    <div className="p-3 sm:p-4 space-y-4 sm:space-y-5">
            {/* Stats Grid */}
            <div>
              <h2 className="text-sm sm:text-base font-bold text-foreground mb-3">
                Key Metrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-lg border-2 border-border p-3 hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div
                          className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-20`}
                        >
                          <Icon className="w-4 h-4 text-foreground/70" />
                        </div>
                      </div>
                      <p className="text-foreground/70 text-xs font-medium">
                        {stat.label}
                      </p>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground mt-1">
                        {stat.value}
                      </h3>
                      <p className="text-[10px] text-foreground/50 mt-1">
                        {stat.change}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {/* Recent Activity */}
              <div className="bg-white rounded-lg border-2 border-border p-3">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-3">
                  <h2 className="text-sm font-bold text-foreground">
                    Recent Activity
                  </h2>
                  <Link
                    href="/admin/messages"
                    className="text-primary hover:text-primary/80 text-xs font-medium flex items-center gap-1"
                  >
                    View All <ArrowRight size={12} />
                  </Link>
                </div>
                <div className="space-y-2">
                  {recentActivities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-start sm:items-center gap-2 p-2 rounded-lg bg-white hover:bg-primary/5 transition-colors border border-border"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-0.5 sm:mt-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-xs font-medium truncate">
                          {activity.action}
                        </p>
                        <p className="text-foreground/50 text-[10px] mt-0.5">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-lg border-2 border-border p-3">
                <h2 className="text-sm font-bold text-foreground mb-3">
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  <Link
                    href="/admin/orders"
                    className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-orange-50 transition-all group border-2 border-border"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-xs">
                        Manage Orders
                      </p>
                      <p className="text-[10px] text-foreground/60">
                        View and manage orders
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-primary flex-shrink-0" />
                  </Link>

                  <Link
                    href="/admin/services"
                    className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-indigo-50 transition-all group border-2 border-border"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-xs">
                        Manage Services
                      </p>
                      <p className="text-[10px] text-foreground/60">
                        Add, edit, delete
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-primary flex-shrink-0" />
                  </Link>

                  <Link
                    href="/admin/packages"
                    className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-purple-50 transition-all group border-2 border-border"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-xs">
                        Package Pricing
                      </p>
                      <p className="text-[10px] text-foreground/60">
                        Update details & pricing
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-primary flex-shrink-0" />
                  </Link>

                  <Link
                    href="/admin/reviews"
                    className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-yellow-50 transition-all group border-2 border-border"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-xs">
                        Reviews & Ratings
                      </p>
                      <p className="text-[10px] text-foreground/60">
                        Manage reviews
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-primary flex-shrink-0" />
                  </Link>

                  <Link
                    href="/admin/messages"
                    className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-green-50 transition-all group border-2 border-border"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-xs">
                        Messages & Chat
                      </p>
                      <p className="text-[10px] text-foreground/60">
                        23 unread messages
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-primary flex-shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
    </div>
  );
}

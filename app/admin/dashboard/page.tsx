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
    <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
            {/* Stats Grid */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
                Key Metrics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="group glass p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3 sm:mb-4">
                        <div
                          className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                        </div>
                      </div>
                      <p className="text-foreground/70 text-xs sm:text-sm font-medium">
                        {stat.label}
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">
                        {stat.value}
                      </h3>
                      <p className="text-xs text-foreground/50 mt-2 sm:mt-3">
                        {stat.change}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {/* Recent Activity */}
              <div className="glass p-4 sm:p-6 rounded-2xl border border-white/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-bold text-foreground">
                    Recent Activity
                  </h2>
                  <Link
                    href="/admin/messages"
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1"
                  >
                    View All <ArrowRight size={16} />
                  </Link>
                </div>
                <div className="space-y-2 sm:space-y-4">
                  {recentActivities.map((activity, idx) => (
                    <div
                      key={idx}
                      className="flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex-shrink-0 mt-1 sm:mt-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-sm font-medium truncate sm:truncate">
                          {activity.action}
                        </p>
                        <p className="text-foreground/50 text-xs mt-1">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="glass p-4 sm:p-6 rounded-2xl border border-white/10">
                <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4 sm:mb-6">
                  Quick Actions
                </h2>
                <div className="space-y-2 sm:space-y-3">
                  <Link
                    href="/admin/orders"
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg bg-gradient-to-r from-orange-600/20 to-amber-500/20 border border-orange-500/20 hover:border-orange-500/50 transition-all group gap-3 sm:gap-0"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">
                        Manage Orders
                      </p>
                      <p className="text-xs text-foreground/60">
                        View and manage customer orders
                      </p>
                    </div>
                    <ArrowRight className="text-orange-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>

                  <Link
                    href="/admin/services"
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 border border-indigo-500/20 hover:border-indigo-500/50 transition-all group gap-3 sm:gap-0"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">
                        Manage Services
                      </p>
                      <p className="text-xs text-foreground/60">
                        Add, edit, or delete services
                      </p>
                    </div>
                    <ArrowRight className="text-indigo-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>

                  <Link
                    href="/admin/packages"
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-500/20 border border-purple-500/20 hover:border-purple-500/50 transition-all group gap-3 sm:gap-0"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">
                        Package Pricing
                      </p>
                      <p className="text-xs text-foreground/60">
                        Update package details & pricing
                      </p>
                    </div>
                    <ArrowRight className="text-purple-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>

                  <Link
                    href="/admin/reviews"
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg bg-gradient-to-r from-yellow-600/20 to-orange-500/20 border border-yellow-500/20 hover:border-yellow-500/50 transition-all group gap-3 sm:gap-0"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">
                        Reviews & Ratings
                      </p>
                      <p className="text-xs text-foreground/60">
                        Manage customer reviews
                      </p>
                    </div>
                    <ArrowRight className="text-yellow-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>

                  <Link
                    href="/admin/messages"
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-500/20 border border-green-500/20 hover:border-green-500/50 transition-all group gap-3 sm:gap-0"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">
                        Messages & Chat
                      </p>
                      <p className="text-xs text-foreground/60">
                        23 unread messages
                      </p>
                    </div>
                    <ArrowRight className="text-green-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Link>
                </div>
              </div>
            </div>
    </div>
  );
}

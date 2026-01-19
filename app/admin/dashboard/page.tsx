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
    <div className="p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-poppins">
          Dashboard
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Welcome back! Here's your platform overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Key Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-lg transition-all cursor-pointer hover:border-slate-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}
                  >
                    <Icon className="w-5 h-5 text-slate-700" />
                  </div>
                </div>
                <p className="text-slate-600 text-sm font-medium">
                  {stat.label}
                </p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                  {stat.value}
                </h3>
                <p className="text-xs text-slate-500 mt-2">
                  {stat.change}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Activity
            </h2>
            <Link
              href="/admin/messages"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-2">
            {recentActivities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start sm:items-center gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 mt-1 sm:mt-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-slate-900 text-sm font-medium truncate">
                    {activity.action}
                  </p>
                  <p className="text-slate-500 text-xs mt-1">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-2">
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-orange-50 transition-all group border border-slate-100 hover:border-orange-200"
            >
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Manage Orders
                </p>
                <p className="text-xs text-slate-600">
                  View and manage orders
                </p>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-orange-600 flex-shrink-0 transition-colors" />
            </Link>

            <Link
              href="/admin/services"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-indigo-50 transition-all group border border-slate-100 hover:border-indigo-200"
            >
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Manage Services
                </p>
                <p className="text-xs text-slate-600">
                  Add, edit, delete
                </p>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-indigo-600 flex-shrink-0 transition-colors" />
            </Link>

            <Link
              href="/admin/packages"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-purple-50 transition-all group border border-slate-100 hover:border-purple-200"
            >
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Package Pricing
                </p>
                <p className="text-xs text-slate-600">
                  Update details & pricing
                </p>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-purple-600 flex-shrink-0 transition-colors" />
            </Link>

            <Link
              href="/admin/reviews"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-yellow-50 transition-all group border border-slate-100 hover:border-yellow-200"
            >
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Reviews & Ratings
                </p>
                <p className="text-xs text-slate-600">Manage reviews</p>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-yellow-600 flex-shrink-0 transition-colors" />
            </Link>

            <Link
              href="/admin/messages"
              className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-green-50 transition-all group border border-slate-100 hover:border-green-200"
            >
              <div>
                <p className="font-semibold text-slate-900 text-sm">
                  Messages & Chat
                </p>
                <p className="text-xs text-slate-600">
                  23 unread messages
                </p>
              </div>
              <ArrowRight size={16} className="text-slate-400 group-hover:text-green-600 flex-shrink-0 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LogOut,
  FileText,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  Mail,
  Eye,
  Clock,
  Zap,
} from "lucide-react";
import { Canvas3DWrapper } from "@/client/components/Canvas3DWrapper";

export default function Profile() {
  const [user] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    joinDate: "January 2024",
    avatar: "JD",
  });

  const orders = [
    {
      id: "#ORD-001",
      service: "Essay Writing",
      status: "Completed",
      amount: "$99",
      date: "Dec 20, 2024",
    },
    {
      id: "#ORD-002",
      service: "Research Paper",
      status: "In Progress",
      amount: "$249",
      date: "Dec 22, 2024",
    },
    {
      id: "#ORD-003",
      service: "Thesis Writing",
      status: "Pending",
      amount: "$2,999",
      date: "Dec 23, 2024",
    },
  ];

  const stats = [
    { label: "Total Orders", value: "0", icon: FileText, color: "indigo" },
    { label: "Completed", value: "0", icon: CheckCircle, color: "emerald" },
    { label: "Total Spent", value: "$0.00", icon: DollarSign, color: "violet" },
    { label: "Rating", value: "0.00", icon: Star, color: "amber" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  const colorMap: { [key: string]: string } = {
    indigo: "text-indigo-600 bg-indigo-50",
    emerald: "text-emerald-600 bg-emerald-50",
    violet: "text-violet-600 bg-violet-50",
    amber: "text-amber-600 bg-amber-50",
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 lg:py-12 px-3 sm:px-4 md:px-6">
      <Canvas3DWrapper />

      <div className="max-w-5xl mx-auto">
        {/* Header with User Info and Actions */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {user.avatar}
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {user.fullName}
                </h1>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Mail size={16} />
                    {user.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {user.joinDate}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-semibold text-sm shadow-md hover:shadow-lg"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Stats Grid - Premium Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`rounded-2xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-xl transition-all duration-300 ${colorMap[stat.color] || ""}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon
                    size={32}
                    className={
                      stat.color === "indigo"
                        ? "text-indigo-600"
                        : stat.color === "emerald"
                          ? "text-emerald-600"
                          : stat.color === "violet"
                            ? "text-violet-600"
                            : "text-amber-600"
                    }
                  />
                  <Zap size={16} className="text-gray-400" />
                </div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-3">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Orders Section */}
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Orders
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                Track your academic projects
              </p>
            </div>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors"
            >
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {/* Orders List */}
          <div className="space-y-4 mb-12">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="group rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                        <FileText size={24} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {order.service}
                        </h4>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {order.date}
                          </span>
                          <span className="font-semibold text-gray-900">
                            {order.id}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${
                          order.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : order.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="font-bold text-lg text-gray-900 whitespace-nowrap">
                        {order.amount}
                      </span>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <Eye size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-12 text-center">
                <FileText size={40} className="text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 mb-6">No orders yet</p>
                <Link
                  href="/order"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all font-semibold text-sm shadow-md"
                >
                  Create Your First Order <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">Ready to start?</h3>
              <p className="text-white/90 mb-6">
                Place a new order and get professional academic writing
                assistance today.
              </p>
              <Link
                href="/order"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 rounded-xl hover:bg-gray-50 transition-all font-bold shadow-lg hover:shadow-xl"
              >
                Place New Order <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

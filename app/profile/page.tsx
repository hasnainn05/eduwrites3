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
    {
      label: "Total Orders",
      value: "0",
      icon: FileText,
      gradient: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
    },
    {
      label: "Completed",
      value: "0",
      icon: CheckCircle,
      gradient: "from-green-500 to-green-600",
      bgLight: "bg-green-50",
    },
    {
      label: "Total Spent",
      value: "$0.00",
      icon: DollarSign,
      gradient: "from-purple-500 to-purple-600",
      bgLight: "bg-purple-50",
    },
    {
      label: "Rating",
      value: "0.00",
      icon: Star,
      gradient: "from-amber-500 to-amber-600",
      bgLight: "bg-amber-50",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <Canvas3DWrapper />
      <div className="max-w-4xl mx-auto">
        {/* Main Profile Card Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

          {/* Profile Header Section with Gradient Background */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-cyan-500 to-indigo-600 p-8 sm:p-10 text-white overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
            
            <div className="relative z-10 flex items-start justify-between">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-3xl font-bold border border-white/30">
                  {user.avatar}
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold">
                    {user.fullName}
                  </h1>
                  <div className="flex items-center gap-2 mt-3 text-white/90">
                    <Mail size={16} />
                    <p className="text-sm">{user.email}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-white/80">
                    <Calendar size={16} />
                    <p className="text-xs sm:text-sm">Member since {user.joinDate}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-all duration-200 text-sm font-semibold border border-white/30 hover:border-white/50"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="p-8 sm:p-10 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900 mb-8">Your Statistics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index} 
                    className={`${stat.bgLight} rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-md`}
                  >
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mb-4 text-white shadow-md`}>
                      <Icon size={24} />
                    </div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="p-8 sm:p-10 border-b border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
                <p className="text-sm text-gray-600 mt-2">
                  Your latest academic writing projects
                </p>
              </div>
              <Link
                href="/order"
                className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors"
              >
                View All
              </Link>
            </div>

            <div className="space-y-3">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <div
                    key={index}
                    className="group p-5 flex items-center justify-between gap-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                          <FileText size={20} className="text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">
                            {order.service}
                          </p>
                          <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                            <Calendar size={12} />
                            {order.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : order.status === "In Progress"
                              ? "bg-blue-100 text-blue-700 border border-blue-300"
                              : "bg-amber-100 text-amber-700 border border-amber-300"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                        {order.amount}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center bg-gray-50 rounded-xl border border-gray-200">
                  <FileText size={40} className="text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">
                    No orders yet. Start by creating your first order!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="p-8 sm:p-10 bg-gradient-to-r from-indigo-50 via-cyan-50 to-indigo-50">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/order"
                className="group relative bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-indigo-600 hover:border-indigo-700 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                <div className="relative flex items-center justify-center gap-2 font-semibold">
                  <div className="text-2xl">+</div>
                  <span>New Order</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link
                href="/#services"
                className="group relative bg-white text-indigo-600 rounded-xl p-6 hover:shadow-lg transition-all duration-200 border border-gray-200 hover:border-indigo-300 font-semibold"
              >
                <div className="relative flex items-center justify-center gap-2">
                  <span>View Services</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

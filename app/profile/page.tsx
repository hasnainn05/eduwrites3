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
  MoreVertical,
  TrendingUp,
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
      bgGradient: "from-blue-50 to-blue-100",
    },
    {
      label: "Completed",
      value: "0",
      icon: CheckCircle,
      gradient: "from-green-500 to-green-600",
      bgGradient: "from-green-50 to-green-100",
    },
    {
      label: "Total Spent",
      value: "$0.00",
      icon: DollarSign,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
    },
    {
      label: "Rating",
      value: "0.00",
      icon: Star,
      gradient: "from-amber-500 to-amber-600",
      bgGradient: "from-amber-50 to-amber-100",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <Canvas3DWrapper />
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user.fullName}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold text-sm shadow-md hover:shadow-lg"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            {/* Profile Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 h-24"></div>
              <div className="px-6 pb-6">
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="w-28 h-28 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-full flex items-center justify-center text-4xl font-bold text-white border-4 border-white shadow-lg">
                    {user.avatar}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 text-center">
                  {user.fullName}
                </h2>
                <p className="text-sm text-gray-600 text-center mt-2 flex items-center justify-center gap-1">
                  <Mail size={16} />
                  {user.email}
                </p>
                <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
                  <Calendar size={14} />
                  Member since {user.joinDate}
                </p>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="w-full px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 font-semibold text-sm">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Stats and Orders */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden group"
                  >
                    <div className={`bg-gradient-to-br ${stat.bgGradient} h-20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-md`}>
                        <Icon size={28} />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Orders Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
                  <p className="text-sm text-gray-600 mt-1">Latest activity</p>
                </div>
                <Link
                  href="/order"
                  className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-colors flex items-center gap-1"
                >
                  View All <ArrowRight size={16} />
                </Link>
              </div>

              <div className="divide-y divide-gray-100">
                {orders.length > 0 ? (
                  orders.map((order, index) => (
                    <div
                      key={index}
                      className="p-5 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-cyan-50 transition-all duration-200 group"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
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
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                              order.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : order.status === "In Progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {order.status}
                          </span>
                          <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                            {order.amount}
                          </span>
                          <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all">
                            <MoreVertical size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center">
                    <FileText size={40} className="text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">No orders yet</p>
                    <Link
                      href="/order"
                      className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm"
                    >
                      Create Your First Order <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-cyan-50 rounded-2xl border border-indigo-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Quick Start</h3>
                  <p className="text-sm text-gray-600 mt-1">Get started with your next project</p>
                </div>
                <TrendingUp size={24} className="text-indigo-600 opacity-20" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/order"
                  className="group relative bg-white border-2 border-indigo-300 text-indigo-600 rounded-xl p-5 hover:shadow-lg hover:border-indigo-500 transition-all duration-200 font-semibold text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-2xl">+</div>
                    <span>New Order</span>
                  </div>
                </Link>
                <Link
                  href="/#services"
                  className="group relative bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl p-5 hover:shadow-lg transition-all duration-200 font-semibold text-center"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Explore Services</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

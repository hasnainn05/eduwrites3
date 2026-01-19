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
      color: "bg-blue-100 text-blue-600",
    },
    {
      label: "Completed",
      value: "0",
      icon: CheckCircle,
      color: "bg-green-100 text-green-600",
    },
    {
      label: "Total Spent",
      value: "$0.00",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600",
    },
    {
      label: "Rating",
      value: "0.00",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
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
      <div className="max-w-3xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                {user.avatar}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.fullName}
                </h1>
                <p className="text-sm text-gray-600 mt-1">{user.email}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Member since {user.joinDate}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>

        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
              >
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon size={20} />
                </div>
                <p className="text-xs font-semibold text-gray-600 uppercase">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Recent Orders</h2>
            <p className="text-sm text-gray-600 mt-1">
              Your latest academic writing orders
            </p>
          </div>

          <div className="divide-y divide-gray-200">
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <FileText size={18} className="text-indigo-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 text-sm">
                          {order.service}
                        </p>
                        <p className="text-xs text-gray-600 mt-0.5">
                          {order.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span
                      className={`px-2.5 py-1 rounded text-xs font-semibold border whitespace-nowrap ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700 border-green-300"
                          : order.status === "In Progress"
                            ? "bg-blue-100 text-blue-700 border-blue-300"
                            : "bg-yellow-100 text-yellow-700 border-yellow-300"
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
              <div className="p-8 text-center">
                <p className="text-sm text-gray-600">
                  No orders yet. Start by creating your first order!
                </p>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <Link
              href="/order"
              className="flex items-center justify-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              View All Orders <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/order"
            className="bg-indigo-600 text-white rounded-lg p-4 hover:bg-indigo-700 transition-colors font-semibold text-center"
          >
            + New Order
          </Link>
          <Link
            href="/#services"
            className="bg-gray-200 text-gray-900 rounded-lg p-4 hover:bg-gray-300 transition-colors font-semibold text-center"
          >
            View Services
          </Link>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full border border-gray-200 shadow-lg">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Edit Profile
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editData.fullName}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) =>
                    setEditData({ ...editData, email: e.target.value })
                  }
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>


              <div className="flex gap-2 pt-3">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-indigo-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border border-gray-300 text-gray-900 py-2 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

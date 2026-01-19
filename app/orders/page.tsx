"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Clock,
  Eye,
  Filter,
} from "lucide-react";
import { Canvas3DWrapper } from "@/client/components/Canvas3DWrapper";

export default function Orders() {
  const [filterStatus, setFilterStatus] = useState("all");

  const orders = [
    {
      id: "#ORD-001",
      service: "Essay Writing",
      status: "Completed",
      amount: "$99",
      date: "Dec 20, 2024",
      dueDate: "Dec 25, 2024",
    },
    {
      id: "#ORD-002",
      service: "Research Paper",
      status: "In Progress",
      amount: "$249",
      date: "Dec 22, 2024",
      dueDate: "Dec 29, 2024",
    },
    {
      id: "#ORD-003",
      service: "Thesis Writing",
      status: "Pending",
      amount: "$2,999",
      date: "Dec 23, 2024",
      dueDate: "Jan 10, 2025",
    },
  ];

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status.toLowerCase() === filterStatus);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-amber-100 text-amber-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <Canvas3DWrapper />

      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors mb-6 font-semibold text-sm group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
            My Orders
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track and manage all your academic writing orders
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["all", "pending", "in progress", "completed"].map((status) => (
            <button
              key={status}
              onClick={() =>
                setFilterStatus(status === "all" ? "all" : status.toLowerCase())
              }
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                filterStatus === (status === "all" ? "all" : status.toLowerCase())
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <div
                key={index}
                className="group rounded-lg sm:rounded-xl border border-gray-200 bg-white hover:border-indigo-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-md">
                      <FileText size={24} className="sm:size-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-base sm:text-lg text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
                        {order.service}
                      </h3>
                      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock size={14} className="flex-shrink-0" />
                          <span className="truncate">Ordered: {order.date}</span>
                        </span>
                        <span className="flex items-center gap-1 col-span-2 sm:col-auto">
                          <Clock size={14} className="flex-shrink-0" />
                          <span className="truncate">Due: {order.dueDate}</span>
                        </span>
                        <span className="font-semibold text-gray-900 col-span-2 sm:col-auto">
                          {order.id}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap justify-between sm:justify-end">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap ${getStatusStyles(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                    <span className="font-bold text-lg text-gray-900 whitespace-nowrap">
                      {order.amount}
                    </span>
                    <button
                      title="View order details"
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg sm:rounded-xl border border-gray-200 bg-gray-50 p-8 sm:p-12 text-center">
            <Filter size={40} className="text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-6">No orders found for this filter</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 rounded-lg sm:rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-6 sm:p-8 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full -mr-16 sm:-mr-20 -mt-16 sm:-mt-20"></div>
          <div className="relative z-10">
            <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-3">
              Ready for another order?
            </h3>
            <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base">
              Place a new order and continue getting professional academic
              writing assistance.
            </p>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-white text-indigo-600 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all font-bold text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Place New Order →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

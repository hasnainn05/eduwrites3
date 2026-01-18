"use client";

import { useState } from "react";
import { Order } from "@/app/admin/orders/page";
import { ChevronDown, Download } from "lucide-react";
import { updateOrderStatus } from "@/lib/orderStorage";
import React from "react";

interface OrdersListProps {
  orders: Order[];
  status: "pending" | "in_progress" | "completed";
  onStatusChange?: (
    orderId: string,
    status: "pending" | "in_progress" | "completed",
  ) => void;
}

export function OrdersList({
  orders,
  status,
  onStatusChange,
}: OrdersListProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleApprove = (orderId: string) => {
    updateOrderStatus(orderId, "in_progress");
    onStatusChange?.(orderId, "in_progress");
    setExpandedOrderId(null);
  };

  const handleReject = (orderId: string) => {
    setExpandedOrderId(null);
  };

  if (orders.length === 0) {
    return (
      <div className="p-8 sm:p-12 text-center">
        <p className="text-foreground/60 text-sm sm:text-base">
          No orders in this status.
        </p>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-4 md:p-6">
      <div className="grid grid-cols-1 gap-3 sm:gap-4">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order.id;

          return (
            <div
              key={order.id}
              className="border border-white/10 rounded-lg bg-white/5 hover:bg-white/8 transition-all overflow-hidden"
            >
              {/* Card Header */}
              <div
                className="p-3 sm:p-4 cursor-pointer hover:bg-white/10 transition-colors active:bg-white/10"
                onClick={() => toggleExpand(order.id)}
              >
                <div className="flex items-start justify-between gap-2 sm:gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2 mb-2 flex-wrap">
                      <span className="text-foreground font-mono text-xs sm:text-xs font-medium">
                        #{order.id.split("-").pop()}
                      </span>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                          order.status === "pending"
                            ? "bg-green-500/20 text-green-400"
                            : order.status === "in_progress"
                              ? "bg-yellow-500/20 text-yellow-400"
                              : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {order.status === "pending"
                          ? "Pending"
                          : order.status === "in_progress"
                            ? "In Progress"
                            : "Completed"}
                      </span>
                    </div>
                    <h3 className="text-foreground font-semibold text-sm sm:text-base truncate">
                      {order.fullName}
                    </h3>
                    <p className="text-foreground/60 text-xs sm:text-xs mt-1 line-clamp-2">
                      {order.service} • {order.wordCount.toLocaleString()} words
                      • ${order.price}
                    </p>
                  </div>
                  <button
                    className="text-foreground/60 hover:text-foreground/80 transition-colors flex-shrink-0 p-1 active:text-foreground/50"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(order.id);
                    }}
                    aria-label={isExpanded ? "Collapse order" : "Expand order"}
                  >
                    <ChevronDown
                      size={20}
                      className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="border-t border-white/10 p-3 sm:p-4 md:p-6 bg-white/[0.02] space-y-4 sm:space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-3 sm:pb-4 gap-2">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">
                      Order Details
                    </h3>
                    <span className="text-xs font-medium text-foreground/60 truncate">
                      {order.id}
                    </span>
                  </div>

                  {/* Customer Information Section */}
                  <div>
                    <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-3">
                      Customer Information
                    </p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-foreground/60 text-xs mb-1">Email</p>
                        <p className="text-foreground text-sm break-all">
                          {order.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-foreground/60 text-xs mb-1">
                          Academic Level
                        </p>
                        <p className="text-foreground text-sm">
                          {order.academicLevel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10"></div>

                  {/* Service Information Section */}
                  <div>
                    <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-3">
                      Service Information
                    </p>
                    <div className="space-y-2">
                      <div>
                        <p className="text-foreground/60 text-xs mb-1">
                          Subject/Topic
                        </p>
                        <p className="text-foreground text-sm">
                          {order.subject}
                        </p>
                      </div>
                      <div>
                        <p className="text-foreground/60 text-xs mb-1">
                          Paper Type
                        </p>
                        <p className="text-foreground text-sm">
                          {order.paperType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-white/10"></div>

                  {/* Assignment Details Section */}
                  <div>
                    <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-3">
                      Assignment Details
                    </p>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-foreground/80 text-sm leading-relaxed">
                        {order.description}
                      </p>
                    </div>
                  </div>

                  {/* Attachments Section */}
                  {order.attachments && order.attachments.length > 0 && (
                    <div>
                      <p className="text-foreground/60 text-xs font-semibold uppercase tracking-wide mb-3">
                        Attached Files
                      </p>
                      <div className="space-y-2">
                        {order.attachments.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all group"
                          >
                            <span className="text-foreground text-sm truncate flex-1">
                              {file}
                            </span>
                            <a
                              href={`data:application/octet-stream;base64,${btoa("Sample file content")}`}
                              download={file}
                              className="text-cyan-400 hover:text-cyan-300 transition-colors p-1.5 flex-shrink-0 group-hover:bg-white/5 rounded"
                              title="Download file"
                            >
                              <Download size={16} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons - Only for Pending Orders */}
                  {status === "pending" && (
                    <div className="border-t border-white/10 pt-4 sm:pt-6 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-end">
                      <button
                        onClick={() => handleApprove(order.id)}
                        className="px-4 sm:px-6 py-2.5 rounded-lg bg-green-600 text-white font-medium text-sm hover:bg-green-700 transition-all shadow-lg hover:shadow-green-600/50 active:bg-green-800 min-h-10"
                      >
                        ✓ Approve Order
                      </button>
                      <button
                        onClick={() => handleReject(order.id)}
                        className="px-4 sm:px-6 py-2.5 rounded-lg border border-red-500/50 text-red-400 font-medium text-sm hover:bg-red-500/10 hover:border-red-500/80 transition-all active:bg-red-500/20 min-h-10"
                      >
                        ✕ Reject Order
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

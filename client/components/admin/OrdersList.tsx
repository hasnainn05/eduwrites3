"use client";

import { useState } from "react";
import { Order } from "@/app/admin/orders/page";
import { ChevronDown, Download } from "lucide-react";
import { updateOrderStatus } from "@/lib/orders";

import React from "react";
import { formatDate, getServiceType } from "@/lib/utils";

interface OrdersListProps {
  orders: Order[];
  status: "pending" | "in-progress" | "completed" | "cancelled";
  onStatusChange?: (
    orderId: string,
    status: "pending" | "in-progress" | "completed" | "cancelled",
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

  console.log("status tab : ", status)

  // const handleApprove = (orderId: string) => {
  //   updateOrderStatus(orderId, "in-progress");
  //   onStatusChange?.(orderId, "in-progress");
  //   setExpandedOrderId(null);
  // };

  // const handleReject = (orderId: string) => {
  //   setExpandedOrderId(null);
  // };

  const handleApprove = async (orderId: string) => {
    await updateOrderStatus(orderId, "in-progress");
    onStatusChange?.(orderId, "in-progress");
    setExpandedOrderId(null);
  };

  const handleComplete = async (orderId: string) => {
    await updateOrderStatus(orderId, "completed");
    onStatusChange?.(orderId, "completed");
    setExpandedOrderId(null);
  };

  const handleReject = async (orderId: string) => {
    await updateOrderStatus(orderId, "cancelled");
    onStatusChange?.(orderId, "cancelled");
    setExpandedOrderId(null);
  };


  if (orders.length === 0) {
    return (
      <div className="p-6 sm:p-8 text-center">
        <p className="text-foreground/60 text-xs sm:text-sm">
          No orders in this status.
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-4">
      <div className="grid grid-cols-1 gap-3">
        {orders.map((order) => {
          const isExpanded = expandedOrderId === order._id;

          return (
            <div
              key={order._id}
              className="border-2 border-border rounded-lg bg-white hover:shadow-md transition-all overflow-hidden"
            >
              {/* Card Header */}
              <div
                className="p-2 sm:p-3 cursor-pointer hover:bg-primary/5 transition-colors active:bg-primary/5"
                onClick={() => toggleExpand(order._id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-1 flex-wrap">
                      <span className="text-foreground font-mono text-xs font-medium">
                        #{order._id.split("-").pop()}
                      </span>
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-bold flex-shrink-0 ${
                          order.status === "pending"
                            ? "bg-green-100 text-green-700"
                            : order.status === "in-progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status === "pending"
                          ? "Pending"
                          : order.status === "in-progress"
                            ? "In Progress"
                            : "Completed"}
                      </span>
                    </div>
                    <h3 className="text-foreground font-semibold text-xs sm:text-sm truncate">
                      {order.name}
                    </h3>
                    <p className="text-foreground/60 text-[10px] sm:text-xs mt-0.5 line-clamp-2">
                      {getServiceType(order.service)} • {order.wordCount.toLocaleString()} words
                      • ${order.budget} • {formatDate(order?.deadline)}
                    </p>
                  </div>
                  <button
                    className="text-foreground/60 hover:text-foreground/80 transition-colors flex-shrink-0 p-1 active:text-foreground/50"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleExpand(order._id);
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
                <div className="border-t-2 border-border p-3 sm:p-4 bg-white space-y-3">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-border pb-2 gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-foreground">
                      Order Details
                    </h3>
                    <span className="text-[10px] font-medium text-foreground/60 truncate">
                      {order._id}
                    </span>
                  </div>

                  {/* Customer Information Section */}
                  <div>
                    <p className="text-foreground/60 text-[10px] font-bold uppercase tracking-wide mb-2">
                      Customer Information
                    </p>
                    <div className="space-y-1">
                      <div>
                        <p className="text-foreground/60 text-[10px] mb-0.5">
                          Email
                        </p>
                        <p className="text-foreground text-xs break-all">
                          {order.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-foreground/60 text-[10px] mb-0.5">
                          Academic Level
                        </p>
                        <p className="text-foreground text-xs">
                          {order.academicLevel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-border"></div>

                  {/* Service Information Section */}
                  <div>
                    <p className="text-foreground/60 text-[10px] font-bold uppercase tracking-wide mb-2">
                      Service Information
                    </p>
                    <div className="space-y-1">                      
                      <div>
                        <p className="text-foreground/60 text-[10px] mb-0.5">
                          Subject/Topic
                        </p>
                        <p className="text-foreground text-xs">
                          {order.subject}
                        </p>
                      </div>
                      <div>
                        <p className="text-foreground/60 text-[10px] mb-0.5">
                          Paper Type
                        </p>
                        <p className="text-foreground text-xs">
                          {order.paperType}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t-2 border-border"></div>

                  {/* Assignment Details Section */}
                  <div>
                    <p className="text-foreground/60 text-[10px] font-bold uppercase tracking-wide mb-2">
                      Assignment Details
                    </p>
                    <div className="bg-white border-2 border-border rounded-lg p-2">
                      <p className="text-foreground/80 text-xs leading-relaxed">
                        {order.description}
                      </p>
                    </div>
                  </div>

                  {/* Attachments Section */}
                  {order?.attachments && order?.attachments?.length > 0 && (
                    <div>
                      <p className="text-foreground/60 text-[10px] font-bold uppercase tracking-wide mb-2">
                        Attached Files
                      </p>
                      <div className="space-y-1">
                        {order?.attachments?.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 bg-white border-2 border-border rounded-lg hover:shadow-sm transition-all group"
                          >
                            <span className="text-foreground text-xs truncate flex-1">
                              File                            </span>
                            <a
                              // href={`data:application/octet-stream;base64,${btoa("Sample file content")}`}
                              href={file?.url}
                              download={file?.filename || "attachment.pdf"}
                              target="_blank"
                              className="text-primary hover:text-primary/80 transition-colors p-1 flex-shrink-0"
                              rel="noopener noreferrer"
                              title="Download file"
                            >
                              <Download size={14} />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons - Only for Pending Orders */}
                  {/* {status === "pending" && (
                    <div className="border-t-2 border-border pt-3 flex flex-col sm:flex-row gap-2 justify-end">
                      <button
                        onClick={() => handleApprove(order._id)}
                        className="px-3 sm:px-4 py-1.5 rounded-lg bg-green-600 text-white font-bold text-xs hover:bg-green-700 transition-all active:bg-green-800"
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleReject(order._id)}
                        className="px-3 sm:px-4 py-1.5 rounded-lg border-2 border-red-500 text-red-600 font-bold text-xs hover:bg-red-50 transition-all active:bg-red-100"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )} */}

                  {order?.status === "pending" && (
                    <div className="border-t-2 border-border pt-3 flex gap-2 justify-end">
                      <button
                        onClick={() => handleApprove(order._id)}
                        className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold"
                      >
                        ▶ In Progress
                      </button>

                      <button
                        onClick={() => handleReject(order._id)}
                        className="px-4 py-1.5 rounded-lg border-2 border-red-500 text-red-600 text-xs font-bold"
                      >
                        ✕ Reject
                      </button>
                    </div>
                  )}

                  {order?.status === "in-progress" && (
                    <div className="border-t-2 border-border pt-3 flex justify-end">
                      <button
                        onClick={() => handleComplete(order._id)}
                        className="px-4 py-1.5 rounded-lg bg-green-600 text-white text-xs font-bold"
                      >
                        ✓ Mark Completed
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

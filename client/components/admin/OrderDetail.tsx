"use client";

import { useState } from "react";
import { Order } from "@/app/admin/orders/page";
import {
  ArrowLeft,
  User,
  Mail,
  FileText,
  Calendar,
  Book,
  Zap,
  BookOpen,
  Download,
  CheckCircle,
  Clock,
} from "lucide-react";
import { updateOrderStatus } from "@/lib/orderStorage";

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
  onStatusChange?: (orderId: string, status: "pending" | "in_progress" | "completed") => void;
}

export function OrderDetail({ order, onBack }: OrderDetailProps) {
  const getStatusBadge = (status: string) => {
    const styles: {
      [key: string]: { bg: string; text: string; icon: string };
    } = {
      new: {
        bg: "bg-orange-500/20",
        text: "text-orange-400",
        icon: "Package",
      },
      pending: {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        icon: "Clock",
      },
      completed: {
        bg: "bg-green-500/20",
        text: "text-green-400",
        icon: "CheckCircle",
      },
    };
    const style = styles[status];
    return style;
  };

  const statusStyle = getStatusBadge(order.status);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-xs sm:text-sm transition-colors"
      >
        <ArrowLeft size={18} />
        Back to Orders
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">
              {order.fullName}
            </h2>
            <span
              className={`inline-block px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusStyle.bg} ${statusStyle.text}`}
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <p className="text-foreground/60 text-xs sm:text-sm truncate">
            {order.id}
          </p>
        </div>
        <div className="text-left sm:text-right flex-shrink-0">
          <p className="text-2xl sm:text-3xl font-bold text-cyan-400">
            ${order.price}
          </p>
          <p className="text-foreground/60 text-xs sm:text-sm mt-1">
            Order Value
          </p>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left Column - Customer Information */}
        <div className="space-y-3 sm:space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Customer Information
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start sm:items-center gap-3">
                <User
                  size={16}
                  className="text-cyan-400 flex-shrink-0 mt-0.5 sm:mt-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground/70 text-xs">Full Name</p>
                  <p className="text-foreground font-medium text-sm truncate">
                    {order.fullName}
                  </p>
                </div>
              </div>
              <div className="flex items-start sm:items-center gap-3">
                <Mail
                  size={16}
                  className="text-cyan-400 flex-shrink-0 mt-0.5 sm:mt-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground/70 text-xs">Email</p>
                  <p className="text-foreground font-medium text-sm truncate">
                    {order.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Dates */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Timeline
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start sm:items-center gap-3">
                <Calendar
                  size={16}
                  className="text-yellow-400 flex-shrink-0 mt-0.5 sm:mt-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground/70 text-xs">Submitted Date</p>
                  <p className="text-foreground font-medium text-sm">
                    {new Date(order.submittedDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-start sm:items-center gap-3">
                <Calendar
                  size={16}
                  className="text-orange-400 flex-shrink-0 mt-0.5 sm:mt-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground/70 text-xs">Deadline</p>
                  <p className="text-foreground font-medium text-sm">
                    {new Date(order.deadline).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Project Details */}
        <div className="space-y-3 sm:space-y-4">
          {/* Service & Type */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Project Details
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start sm:items-center gap-3">
                <FileText
                  size={16}
                  className="text-purple-400 flex-shrink-0 mt-0.5 sm:mt-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground/70 text-xs">Service</p>
                  <p className="text-foreground font-medium text-sm">
                    {order.service}
                  </p>
                </div>
              </div>
              <div className="flex items-start sm:items-center gap-3">
                <Book
                  size={16}
                  className="text-indigo-400 flex-shrink-0 mt-0.5 sm:mt-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground/70 text-xs">Paper Type</p>
                  <p className="text-foreground font-medium text-sm">
                    {order.paperType}
                  </p>
                </div>
              </div>
              <div className="flex items-start sm:items-center gap-3">
                <BookOpen
                  size={16}
                  className="text-blue-400 flex-shrink-0 mt-0.5 sm:mt-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground/70 text-xs">Subject</p>
                  <p className="text-foreground font-medium text-sm">
                    {order.subject}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Level & Word Count */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
            <h3 className="text-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
              Requirements
            </h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start sm:items-center gap-3">
                <Zap
                  size={16}
                  className="text-pink-400 flex-shrink-0 mt-0.5 sm:mt-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground/70 text-xs">Academic Level</p>
                  <p className="text-foreground font-medium text-sm">
                    {order.academicLevel}
                  </p>
                </div>
              </div>
              <div className="flex items-start sm:items-center gap-3">
                <FileText
                  size={16}
                  className="text-green-400 flex-shrink-0 mt-0.5 sm:mt-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-foreground/70 text-xs">Word Count</p>
                  <p className="text-foreground font-medium text-sm">
                    {(order.wordCount / 1000).toFixed(1)}k
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
        <h3 className="text-foreground font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
          Order Description
        </h3>
        <p className="text-foreground/80 leading-relaxed text-sm">
          {order.description}
        </p>
      </div>

      {/* Attachments */}
      {order.attachments && order.attachments.length > 0 && (
        <div className="rounded-xl border border-white/10 bg-white/5 p-3 sm:p-4">
          <h3 className="text-foreground font-semibold mb-3 sm:mb-4 text-sm sm:text-base">
            Attachments
          </h3>
          <div className="space-y-2">
            {order.attachments.map((attachment, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Download size={14} className="text-cyan-400 flex-shrink-0" />
                  <span className="text-foreground font-medium text-xs sm:text-sm truncate">
                    {attachment}
                  </span>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 transition-colors p-1.5 sm:p-2 hover:bg-white/10 rounded-lg flex-shrink-0">
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-4 border-t border-white/10">
        {order.status !== "completed" && (
          <button
            onClick={() => {
              updateOrderStatus(order.id, "completed");
              onStatusChange?.(order.id, "completed");
              onBack();
            }}
            className="flex items-center justify-center gap-2 flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-500/20 border border-green-500/30 text-green-400 hover:border-green-500/50 transition-all font-medium text-sm sm:text-base"
          >
            <CheckCircle size={16} />
            Mark as Complete
          </button>
        )}
        {order.status === "pending" && (
          <button
            onClick={() => {
              updateOrderStatus(order.id, "in_progress");
              onStatusChange?.(order.id, "in_progress");
              onBack();
            }}
            className="flex items-center justify-center gap-2 flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-yellow-600/20 to-amber-500/20 border border-yellow-500/30 text-yellow-400 hover:border-yellow-500/50 transition-all font-medium text-sm sm:text-base"
          >
            <Clock size={16} />
            Move to In Progress
          </button>
        )}
        <button className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-white/10 text-foreground/70 hover:text-foreground hover:bg-white/5 transition-all font-medium text-sm sm:text-base">
          Send Message
        </button>
      </div>
    </div>
  );
}

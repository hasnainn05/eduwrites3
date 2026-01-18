"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Edit,
  LogOut,
  FileText,
  DollarSign,
  Settings,
  User,
  Eye,
  CheckCircle,
  ArrowRight,
  Star,
  ShieldAlert,
  Lock,
  Bell,
  Shield,
  Trash2,
} from "lucide-react";
import SupportModal from "@/components/SupportModal";
import SupportChat from "@/components/SupportChat";
import { ProfileSidebar } from "@/client/components/ProfileSidebar";

export default function Profile() {
  const [userMode, setUserMode] = useState<"user" | "admin">("user");
  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "chat" | "settings"
  >("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (202) 555-0123",
    country: "United States",
    city: "New York",
    joinDate: "January 2024",
    avatar: "JD",
  });

  const [editData, setEditData] = useState(user);

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
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Completed",
      value: "0",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Total Spent",
      value: "$0.00",
      icon: DollarSign,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Rating",
      value: "0.00",
      icon: Star,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const handleSaveProfile = () => {
    setUser(editData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  if (userMode === "admin") {
    return (
      <div className="w-full min-h-screen bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setUserMode("user")}
              className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-border text-foreground hover:bg-gray-50 transition-all font-medium text-sm"
            >
              <User size={18} />
              Back to User Profile
            </button>
          </div>

          <div className="text-center py-20">
            <ShieldAlert className="w-16 h-16 text-cyan-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Admin Access Required
            </h2>
            <p className="text-foreground/60 mb-6 text-sm">
              Redirecting to admin panel...
            </p>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
            >
              Go to Admin Panel <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex min-h-screen flex-col md:flex-row overflow-hidden">
        <div className="hidden md:block">
          <ProfileSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onLogout={handleLogout}
            userName={user.fullName}
          />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex flex-col gap-2 p-4 border-b-2 border-border bg-white">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold text-foreground">{user.fullName}</h1>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs rounded-lg bg-red-500/20 text-red-600 hover:bg-red-500/30 transition-all font-medium border border-red-500/30"
            >
              Logout
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: "overview", label: "Overview" },
              { id: "orders", label: "Orders" },
              { id: "chat", label: "Chat" },
              { id: "settings", label: "Settings" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded text-xs font-medium whitespace-nowrap transition-all border-2 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-transparent"
                    : "bg-white text-foreground border-border hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 md:ml-64 flex flex-col overflow-hidden">
          {activeTab !== "chat" && (
            <div className="hidden md:flex justify-center py-4 bg-white border-b-2 border-border">
              <div className="inline-flex gap-2 p-1 bg-white border-2 border-border rounded-lg">
                <button
                  onClick={() => setUserMode("user")}
                  className={`px-4 py-1.5 rounded font-semibold text-xs transition-all border-2 ${
                    userMode === "user"
                      ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-transparent"
                      : "text-foreground border-border hover:bg-gray-50"
                  }`}
                >
                  <User size={14} className="inline mr-1.5" />
                  User
                </button>
                <button
                  onClick={() => setUserMode("admin")}
                  className={`px-4 py-1.5 rounded font-semibold text-xs transition-all border-2 ${
                    (userMode as string) === "admin"
                      ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-transparent"
                      : "text-foreground border-border hover:bg-gray-50"
                  }`}
                >
                  <ShieldAlert size={14} className="inline mr-1.5" />
                  Admin
                </button>
              </div>
            </div>
          )}

          <div
            className={`flex-1 ${activeTab === "chat" ? "overflow-hidden" : "overflow-y-auto"}`}
          >
            <div
              className={`w-full ${activeTab === "chat" ? "h-full" : "md:px-8 md:py-6 px-4 py-4"} flex flex-col`}
            >
              {activeTab === "overview" && (
                <div className="flex-1 flex flex-col overflow-y-auto space-y-6">
                  {/* Profile Header Section */}
                  <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border-2 border-indigo-100 rounded-xl p-6">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                      <div className="flex gap-4 items-start sm:items-center flex-1">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-md">
                          {user.avatar}
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-foreground">
                            {user.fullName}
                          </h2>
                          <p className="text-xs text-foreground/60 mt-2">
                            {user.email}
                          </p>
                          <p className="text-xs text-foreground/50 mt-1">
                            Member since {user.joinDate}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="gradient-primary text-white px-5 py-2.5 rounded-lg font-semibold text-xs hover:shadow-glow transition-all flex items-center gap-2 whitespace-nowrap shadow-md"
                      >
                        <Edit size={16} />
                        Edit Profile
                      </button>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-4 uppercase tracking-wider text-foreground/70">Quick Stats</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <div
                            key={index}
                            className="p-5 border-2 border-border rounded-xl bg-white shadow-sm hover:shadow-lg hover:border-cyan-200 transition-all"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div
                                className={`inline-flex p-2.5 rounded-lg bg-gradient-to-r ${stat.color}`}
                              >
                                <Icon size={18} className="text-white" />
                              </div>
                            </div>
                            <p className="text-foreground/60 text-[10px] font-semibold mb-2 uppercase tracking-wider">
                              {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-foreground">
                              {stat.value}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 p-6 border-2 border-border rounded-xl bg-white shadow-md hover:shadow-lg transition-all">
                      <h3 className="text-sm font-bold text-foreground mb-1 uppercase tracking-wider text-foreground/70">
                        Recent Activity
                      </h3>
                      <p className="text-xs text-foreground/50 mb-6">Your latest orders and updates</p>
                      <div className="space-y-4">
                        {orders.length > 0 ? (
                          orders.map((order, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-4 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-border hover:border-cyan-200 transition-all"
                            >
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 flex items-center justify-center">
                                <FileText size={16} className="text-cyan-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-foreground">
                                  {order.service}
                                </p>
                                <p className="text-[10px] text-foreground/60 mt-1">
                                  {order.date}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <span
                                    className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                                      order.status === "Completed"
                                        ? "bg-green-500/20 text-green-600 border-green-500/30"
                                        : order.status === "In Progress"
                                          ? "bg-blue-500/20 text-blue-600 border-blue-500/30"
                                          : "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                  <span className="text-xs font-bold text-foreground">
                                    {order.amount}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-xs text-foreground/60">No orders yet. Start by creating your first order!</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex flex-col gap-3">
                      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-foreground/70">Quick Actions</h3>
                      <Link
                        href="/order"
                        className="p-4 border-2 border-border rounded-xl bg-gradient-to-br from-cyan-50 to-white hover:shadow-lg hover:border-cyan-300 transition-all group"
                      >
                        <div className="text-2xl mb-2">📝</div>
                        <h4 className="font-semibold text-foreground text-xs mb-2">
                          New Order
                        </h4>
                        <p className="text-cyan-600 text-[10px] flex items-center gap-1 font-semibold">
                          Create Order <ArrowRight size={12} />
                        </p>
                      </Link>

                      <Link
                        href="/#services"
                        className="p-4 border-2 border-border rounded-xl bg-gradient-to-br from-indigo-50 to-white hover:shadow-lg hover:border-indigo-300 transition-all group"
                      >
                        <div className="text-2xl mb-2">🎓</div>
                        <h4 className="font-semibold text-foreground text-xs mb-2">
                          Services
                        </h4>
                        <p className="text-indigo-600 text-[10px] flex items-center gap-1 font-semibold">
                          View All <ArrowRight size={12} />
                        </p>
                      </Link>

                      <button
                        onClick={() => setIsSupportModalOpen(true)}
                        className="p-4 border-2 border-border rounded-xl bg-gradient-to-br from-pink-50 to-white hover:shadow-lg hover:border-pink-300 transition-all group w-full text-left"
                      >
                        <div className="text-2xl mb-2">💬</div>
                        <h4 className="font-semibold text-foreground text-xs mb-2">
                          Support
                        </h4>
                        <p className="text-pink-600 text-[10px] flex items-center gap-1 font-semibold">
                          Get Help <ArrowRight size={12} />
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="flex-1 flex flex-col overflow-y-auto space-y-6">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border-2 border-indigo-100 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      Order History
                    </h2>
                    <p className="text-foreground/60 mt-2 text-sm">
                      Track and manage all your academic writing orders
                    </p>
                  </div>

                  {/* Table */}
                  <div className="border-2 border-border rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b-2 border-border bg-gray-50">
                            <th className="px-4 py-3 text-left text-foreground/60 font-semibold text-[10px] uppercase tracking-wider">
                              Order ID
                            </th>
                            <th className="px-4 py-3 text-left text-foreground/60 font-semibold text-[10px] uppercase tracking-wider hidden sm:table-cell">
                              Service
                            </th>
                            <th className="px-4 py-3 text-left text-foreground/60 font-semibold text-[10px] uppercase tracking-wider hidden sm:table-cell">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-foreground/60 font-semibold text-[10px] uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-3 text-left text-foreground/60 font-semibold text-[10px] uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-4 py-3 text-left text-foreground/60 font-semibold text-[10px] uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order, index) => (
                            <tr
                              key={index}
                              className="border-b border-border hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-4 py-3 text-foreground font-semibold text-xs">
                                {order.id}
                              </td>
                              <td className="px-4 py-3 text-foreground hidden sm:table-cell text-xs">
                                {order.service}
                              </td>
                              <td className="px-4 py-3 text-foreground/60 hidden sm:table-cell text-xs">
                                {order.date}
                              </td>
                              <td className="px-4 py-3">
                                <span
                                  className={`px-2 py-1 rounded text-[10px] font-semibold border inline-block ${
                                    order.status === "Completed"
                                      ? "bg-green-500/20 text-green-600 border-green-500/30"
                                      : order.status === "In Progress"
                                        ? "bg-blue-500/20 text-blue-600 border-blue-500/30"
                                        : "bg-yellow-500/20 text-yellow-600 border-yellow-500/30"
                                  }`}
                                >
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-foreground font-semibold text-xs">
                                {order.amount}
                              </td>
                              <td className="px-4 py-3">
                                <button className="text-cyan-600 hover:text-cyan-700 transition-colors text-xs flex items-center gap-1 font-semibold">
                                  <Eye size={12} />
                                  <span className="hidden sm:inline">View</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "chat" && (
                <div className="h-full flex flex-col">
                  <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border-b-2 border-indigo-100 px-4 md:px-8 py-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      Live Chat Support
                    </h2>
                    <p className="text-foreground/60 mt-2 text-sm">
                      Chat with our support team in real-time
                    </p>
                  </div>
                  <div className="flex-1 overflow-hidden px-4 md:px-8 py-6">
                    <SupportChat />
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="flex-1 flex flex-col overflow-y-auto space-y-6">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border-2 border-indigo-100 rounded-xl p-6">
                    <h2 className="text-2xl font-bold text-foreground">
                      Settings
                    </h2>
                    <p className="text-foreground/60 mt-2 text-sm">
                      Manage your account preferences, security, and notifications
                    </p>
                  </div>

                  {/* Security Section */}
                  <div className="p-6 border-2 border-border rounded-xl bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-border">
                      <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg">
                        <Shield size={18} className="text-cyan-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">
                          Security & Privacy
                        </h3>
                        <p className="text-[10px] text-foreground/60 mt-0.5">Protect your account</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 border-2 border-border rounded hover:bg-gray-50 transition-all">
                        <div>
                          <p className="font-semibold text-foreground text-xs">
                            Change Password
                          </p>
                          <p className="text-[10px] text-foreground/60 mt-0.5">
                            Update your password regularly for security
                          </p>
                        </div>
                        <button className="text-cyan-600 hover:text-cyan-700 text-xs font-semibold whitespace-nowrap px-3 py-1.5 rounded hover:bg-cyan-600/10 transition-all border border-cyan-600/30">
                          Change
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 border-2 border-border rounded hover:bg-gray-50 transition-all">
                        <div>
                          <p className="font-semibold text-foreground text-xs">
                            Two-Factor Authentication
                          </p>
                          <p className="text-[10px] text-foreground/60 mt-0.5">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <button className="text-cyan-600 hover:text-cyan-700 text-xs font-semibold whitespace-nowrap px-3 py-1.5 rounded hover:bg-cyan-600/10 transition-all border border-cyan-600/30">
                          Enable
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-3 border-2 border-border rounded hover:bg-gray-50 transition-all">
                        <div>
                          <p className="font-semibold text-foreground text-xs">
                            Login History
                          </p>
                          <p className="text-[10px] text-foreground/60 mt-0.5">
                            View recent account activity
                          </p>
                        </div>
                        <button className="text-cyan-600 hover:text-cyan-700 text-xs font-semibold whitespace-nowrap px-3 py-1.5 rounded hover:bg-cyan-600/10 transition-all border border-cyan-600/30">
                          View
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Notifications Section */}
                  <div className="p-6 border-2 border-border rounded-xl bg-white shadow-md hover:shadow-lg transition-all">
                    <div className="flex items-center gap-2 mb-4">
                      <Bell size={16} className="text-indigo-600" />
                      <h3 className="text-sm font-bold text-foreground">
                        Notifications
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 p-3 border-2 border-border rounded hover:bg-gray-50 cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded border-border bg-white accent-cyan-600"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-xs">
                            Order Updates
                          </p>
                          <p className="text-[10px] text-foreground/60 mt-0.5">
                            Get notified when your orders are updated
                          </p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border-2 border-border rounded hover:bg-gray-50 cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-border bg-white accent-cyan-600"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-xs">
                            Marketing Emails
                          </p>
                          <p className="text-[10px] text-foreground/60 mt-0.5">
                            Receive promotions and special offers
                          </p>
                        </div>
                      </label>
                      <label className="flex items-center gap-3 p-3 border-2 border-border rounded hover:bg-gray-50 cursor-pointer transition-all">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 rounded border-border bg-white accent-cyan-600"
                        />
                        <div className="flex-1">
                          <p className="font-semibold text-foreground text-xs">
                            Support Messages
                          </p>
                          <p className="text-[10px] text-foreground/60 mt-0.5">
                            Get replies from our support team
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="pb-4" />
                </div>
              )}

              {/* Edit Profile Modal */}
              {isEditing && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-lg p-6 max-w-md w-full border-2 border-border shadow-lg">
                    <h2 className="text-lg font-bold text-foreground mb-4">
                      Edit Profile
                    </h2>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-foreground/90 mb-1">
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
                          className="w-full bg-white border-2 border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-cyan-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground/90 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                          className="w-full bg-white border-2 border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-cyan-600"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground/90 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) =>
                            setEditData({ ...editData, phone: e.target.value })
                          }
                          className="w-full bg-white border-2 border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-cyan-600"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-foreground/90 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            value={editData.city}
                            onChange={(e) =>
                              setEditData({ ...editData, city: e.target.value })
                            }
                            className="w-full bg-white border-2 border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-cyan-600"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground/90 mb-1">
                            Country
                          </label>
                          <input
                            type="text"
                            value={editData.country}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                country: e.target.value,
                              })
                            }
                            className="w-full bg-white border-2 border-border rounded px-3 py-2 text-xs text-foreground focus:outline-none focus:border-cyan-600"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3">
                        <button
                          onClick={handleSaveProfile}
                          className="flex-1 gradient-primary text-white py-2 rounded-lg font-semibold text-xs hover:shadow-glow transition-all"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex-1 border-2 border-border text-foreground py-2 rounded-lg font-semibold text-xs hover:bg-gray-50 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <SupportModal
                isOpen={isSupportModalOpen}
                onClose={() => setIsSupportModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

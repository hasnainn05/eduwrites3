"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  MapPin,
  Edit,
  LogOut,
  FileText,
  Clock,
  DollarSign,
  Settings,
  User,
  Eye,
  CheckCircle,
  ArrowRight,
  Star,
  ShieldAlert,
  MessageSquare,
  Menu,
  X,
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
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<
    { id: number; user: string; message: string; timestamp: string }[]
  >([
    {
      id: 1,
      user: "support",
      message:
        "Hello! Welcome to EduWrites support. How can we assist you today?",
      timestamp: "10:00 AM",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
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

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage = {
        id: chatMessages.length + 1,
        user: "customer",
        message: chatInput,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatInput("");

      setTimeout(() => {
        const supportResponse = {
          id: chatMessages.length + 2,
          user: "support",
          message:
            "Thank you for your message. Our team will get back to you shortly!",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setChatMessages((prev) => [...prev, supportResponse]);
      }, 1000);
    }
  };

  if (userMode === "admin") {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setUserMode("user")}
              className="flex items-center gap-2 px-6 py-3 rounded-lg glass border border-white/20 text-foreground hover:bg-white/10 transition-all font-medium"
            >
              <User size={18} />
              Back to User Profile
            </button>
          </div>

          <div className="text-center py-20">
            <ShieldAlert className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Admin Access Required
            </h2>
            <p className="text-foreground/60 mb-6">
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
    <div className="w-full min-h-screen bg-background">
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="blur-gradient absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-600/30 to-transparent animate-blob"></div>
        <div className="blur-gradient absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/30 to-transparent animate-blob animation-delay-2000"></div>
      </div>

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
        <div className="md:hidden flex flex-col gap-2 p-4 border-b border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-foreground">
              {user.fullName}
            </h1>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-sm rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all"
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
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white"
                    : "bg-white/10 text-foreground/80 hover:bg-white/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`flex-1 md:ml-64 flex flex-col overflow-hidden ${
            sidebarOpen ? "block" : "hidden md:flex"
          }`}
        >
          {activeTab !== "chat" && (
            <div className="hidden md:flex justify-center py-6 pt-8 bg-gradient-to-b from-background/80 to-transparent backdrop-blur-sm border-b border-white/10">
              <div className="inline-flex gap-2 p-1 glass rounded-lg border border-white/20">
                <button
                  onClick={() => setUserMode("user")}
                  className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                    userMode === "user"
                      ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <User size={16} className="inline mr-2" />
                  User
                </button>
                <button
                  onClick={() => setUserMode("admin")}
                  className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${
                    (userMode as string) === "admin"
                      ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  <ShieldAlert size={16} className="inline mr-2" />
                  Admin
                </button>
              </div>
            </div>
          )}

          <div
            className={`flex-1 ${activeTab === "chat" ? "overflow-hidden" : "overflow-y-auto"}`}
          >
            <div
              className={`w-full ${activeTab === "chat" ? "h-full" : "md:px-8 md:py-8 px-3 py-3"} flex flex-col`}
            >
              {activeTab === "overview" && (
                <div className="flex-1 flex flex-col overflow-y-auto">
                  <div className="space-y-4 md:space-y-8">
                    {/* Profile Hero Section */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-6 items-start sm:items-center justify-between p-3 md:p-6 border-2 border-border rounded-xl card-bg shadow-sm">
                      <div className="flex gap-3 md:gap-6 items-start sm:items-center flex-1">
                        <div className="w-14 md:w-20 h-14 md:h-20 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-lg md:text-2xl font-bold flex-shrink-0">
                          {user.avatar}
                        </div>
                        <div>
                          <h2 className="text-base md:text-xl font-bold text-foreground mb-1">
                            {user.fullName}
                          </h2>
                          <p className="text-foreground/60 text-xs md:text-sm mb-2">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="gradient-primary text-white px-4 md:px-6 py-1.5 md:py-2 rounded-lg font-semibold text-xs md:text-sm hover:shadow-glow transition-all flex items-center gap-2 whitespace-nowrap"
                      >
                        <Edit size={14} className="md:w-4 md:h-4" />
                        Edit Profile
                      </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                      {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                          <div
                            key={index}
                            className="p-3 md:p-5 border-2 border-border rounded-lg card-bg hover:shadow-md transition-all"
                          >
                            <div className="flex items-start justify-between mb-2 md:mb-3">
                              <div
                                className={`inline-flex p-2 md:p-2.5 rounded-lg bg-gradient-to-r ${stat.color}`}
                              >
                                <Icon
                                  size={14}
                                  className="text-white md:w-4 md:h-4"
                                />
                              </div>
                            </div>
                            <p className="text-foreground/60 text-xs font-medium mb-1">
                              {stat.label}
                            </p>
                            <p className="text-lg md:text-2xl font-bold text-foreground">
                              {stat.value}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
                      {/* Recent Activity */}
                      <div className="lg:col-span-2 p-3 md:p-6 border-2 border-border rounded-xl card-bg shadow-sm">
                        <h3 className="text-base md:text-lg font-bold text-foreground mb-3 md:mb-6">
                          Recent Activity
                        </h3>
                        <div className="space-y-2 md:space-y-4">
                          {orders.map((order, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-2 md:gap-4 pb-2 md:pb-4 border-b border-white/10 last:border-b-0 last:pb-0"
                            >
                              <div className="flex-shrink-0 w-8 md:w-10 h-8 md:h-10 rounded-lg bg-gradient-to-br from-purple-500/30 to-cyan-500/30 flex items-center justify-center">
                                <FileText
                                  size={14}
                                  className="text-cyan-400 md:w-4.5 md:h-4.5"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs md:text-sm font-semibold text-foreground">
                                  {order.service}
                                </p>
                                <p className="text-xs text-foreground/60 mt-0.5 md:mt-1">
                                  {order.date}
                                </p>
                                <div className="flex items-center gap-1.5 md:gap-2 mt-1 md:mt-2">
                                  <span
                                    className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-xs font-semibold ${
                                      order.status === "Completed"
                                        ? "bg-green-500/20 text-green-300"
                                        : order.status === "In Progress"
                                          ? "bg-blue-500/20 text-blue-300"
                                          : "bg-yellow-500/20 text-yellow-300"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                  <span className="text-xs font-semibold text-foreground">
                                    {order.amount}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="flex flex-col gap-1.5 md:gap-3">
                        <Link
                          href="/order"
                          className="p-2 md:p-4 border-2 border-border rounded-lg md:rounded-xl card-bg hover:shadow-md transition-all group"
                        >
                          <div className="text-lg md:text-2xl mb-0.5 md:mb-2">
                            📝
                          </div>
                          <h4 className="font-semibold text-foreground text-xs md:text-sm mb-0.5">
                            New Order
                          </h4>
                          <p className="text-cyan-400 text-xs flex items-center gap-0.5">
                            Create{" "}
                            <ArrowRight
                              size={8}
                              className="md:w-2.5 md:h-2.5"
                            />
                          </p>
                        </Link>

                        <Link
                          href="/#services"
                          className="p-2 md:p-4 border-2 border-border rounded-lg md:rounded-xl card-bg hover:shadow-md transition-all group"
                        >
                          <div className="text-lg md:text-2xl mb-0.5 md:mb-2">
                            🎓
                          </div>
                          <h4 className="font-semibold text-foreground text-xs md:text-sm mb-0.5">
                            Services
                          </h4>
                          <p className="text-purple-400 text-xs flex items-center gap-0.5">
                            View{" "}
                            <ArrowRight
                              size={8}
                              className="md:w-2.5 md:h-2.5"
                            />
                          </p>
                        </Link>

                        <button
                          onClick={() => setIsSupportModalOpen(true)}
                          className="p-2 md:p-4 border-2 border-border rounded-lg md:rounded-xl card-bg hover:shadow-md transition-all group w-full text-left"
                        >
                          <div className="text-lg md:text-2xl mb-0.5 md:mb-2">
                            💬
                          </div>
                          <h4 className="font-semibold text-foreground text-xs md:text-sm mb-0.5">
                            Support
                          </h4>
                          <p className="text-pink-400 text-xs flex items-center gap-0.5">
                            Contact{" "}
                            <ArrowRight
                              size={8}
                              className="md:w-2.5 md:h-2.5"
                            />
                          </p>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div className="flex-1 flex flex-col overflow-y-auto">
                  <div className="space-y-3 md:space-y-6">
                    {/* Header */}
                    <div className="hidden md:block">
                      <h2 className="text-3xl font-bold text-foreground font-poppins">
                        Order History
                      </h2>
                      <p className="text-foreground/60 mt-2">
                        Manage and track all your orders
                      </p>
                    </div>

                    {/* Table */}
                    <div className="border-2 border-border rounded-lg md:rounded-xl overflow-hidden card-bg shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs md:text-sm">
                          <thead>
                            <tr className="border-b-2 border-border bg-background/50">
                              <th className="px-2 md:px-6 py-2 md:py-4 text-left text-foreground/60 font-semibold text-xs tracking-wider">
                                Order ID
                              </th>
                              <th className="px-2 md:px-6 py-2 md:py-4 text-left text-foreground/60 font-semibold text-xs tracking-wider hidden sm:table-cell">
                                Service
                              </th>
                              <th className="px-2 md:px-6 py-2 md:py-4 text-left text-foreground/60 font-semibold text-xs tracking-wider hidden sm:table-cell">
                                Date
                              </th>
                              <th className="px-2 md:px-6 py-2 md:py-4 text-left text-foreground/60 font-semibold text-xs tracking-wider">
                                Status
                              </th>
                              <th className="px-2 md:px-6 py-2 md:py-4 text-left text-foreground/60 font-semibold text-xs tracking-wider">
                                Amount
                              </th>
                              <th className="px-2 md:px-6 py-2 md:py-4 text-left text-foreground/60 font-semibold text-xs tracking-wider">
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order, index) => (
                              <tr
                                key={index}
                                className="border-b border-border hover:bg-background/30 transition-colors"
                              >
                                <td className="px-2 md:px-6 py-2 md:py-4 text-foreground font-semibold text-xs">
                                  {order.id}
                                </td>
                                <td className="px-2 md:px-6 py-2 md:py-4 text-foreground hidden sm:table-cell text-xs">
                                  {order.service}
                                </td>
                                <td className="px-2 md:px-6 py-2 md:py-4 text-foreground/60 hidden sm:table-cell text-xs">
                                  {order.date}
                                </td>
                                <td className="px-2 md:px-6 py-2 md:py-4">
                                  <span
                                    className={`px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-semibold inline-block ${
                                      order.status === "Completed"
                                        ? "bg-green-500/20 text-green-300 border border-green-500/30"
                                        : order.status === "In Progress"
                                          ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                          : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                                    }`}
                                  >
                                    {order.status}
                                  </span>
                                </td>
                                <td className="px-2 md:px-6 py-2 md:py-4 text-foreground font-semibold text-xs">
                                  {order.amount}
                                </td>
                                <td className="px-2 md:px-6 py-2 md:py-4">
                                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors text-xs flex items-center gap-1 md:gap-1.5 font-semibold">
                                    <Eye
                                      size={12}
                                      className="md:w-3.5 md:h-3.5"
                                    />
                                    <span className="hidden sm:inline">
                                      View
                                    </span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "chat" && (
                <div className="h-full flex flex-col px-8 pt-4 pb-8">
                  <SupportChat />
                </div>
              )}

              {activeTab === "settings" && (
                <div className="flex-1 flex flex-col overflow-y-auto">
                  <div className="space-y-8">
                    {/* Header */}
                    <div>
                      <h2 className="text-3xl font-bold text-foreground font-poppins">
                        Settings
                      </h2>
                      <p className="text-foreground/60 mt-2">
                        Manage your account preferences and security
                      </p>
                    </div>

                    {/* Security Section */}
                    <div className="p-6 border-2 border-border rounded-xl card-bg shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <Shield size={20} className="text-cyan-400" />
                        <h3 className="text-lg font-bold text-foreground">
                          Security & Privacy
                        </h3>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-background/30 transition-all">
                          <div>
                            <p className="font-semibold text-foreground text-sm">
                              Change Password
                            </p>
                            <p className="text-xs text-foreground/60 mt-1">
                              Update your password regularly for security
                            </p>
                          </div>
                          <button className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold whitespace-nowrap px-4 py-2 rounded-lg hover:bg-cyan-400/10 transition-all">
                            Change
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-background/30 transition-all">
                          <div>
                            <p className="font-semibold text-foreground text-sm">
                              Two-Factor Authentication
                            </p>
                            <p className="text-xs text-foreground/60 mt-1">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <button className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold whitespace-nowrap px-4 py-2 rounded-lg hover:bg-cyan-400/10 transition-all">
                            Enable
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-background/30 transition-all">
                          <div>
                            <p className="font-semibold text-foreground text-sm">
                              Login History
                            </p>
                            <p className="text-xs text-foreground/60 mt-1">
                              View recent account activity
                            </p>
                          </div>
                          <button className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold whitespace-nowrap px-4 py-2 rounded-lg hover:bg-cyan-400/10 transition-all">
                            View
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Notifications Section */}
                    <div className="p-6 border-2 border-border rounded-xl card-bg shadow-sm">
                      <div className="flex items-center gap-3 mb-6">
                        <Bell size={20} className="text-purple-400" />
                        <h3 className="text-lg font-bold text-foreground">
                          Notifications
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-background/30 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 rounded border-border bg-white accent-primary"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-foreground text-sm">
                              Order Updates
                            </p>
                            <p className="text-xs text-foreground/60 mt-0.5">
                              Get notified when your orders are updated
                            </p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-background/30 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-border bg-white accent-primary"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-foreground text-sm">
                              Marketing Emails
                            </p>
                            <p className="text-xs text-foreground/60 mt-0.5">
                              Receive promotions and special offers
                            </p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 border border-border rounded-lg hover:bg-background/30 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 rounded border-border bg-white accent-primary"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-foreground text-sm">
                              Support Messages
                            </p>
                            <p className="text-xs text-foreground/60 mt-0.5">
                              Get replies from our support team
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="pb-4" />
                  </div>
                </div>
              )}

              {/* Edit Profile Modal */}
              {isEditing && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl p-8 max-w-md w-full border-2 border-border shadow-lg">
                    <h2 className="text-2xl font-bold text-foreground mb-6 font-poppins">
                      Edit Profile
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-foreground/90 mb-2">
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
                          className="w-full bg-white border-2 border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground/90 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) =>
                            setEditData({ ...editData, email: e.target.value })
                          }
                          className="w-full bg-white border-2 border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground/90 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) =>
                            setEditData({ ...editData, phone: e.target.value })
                          }
                          className="w-full bg-white border-2 border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-foreground/90 mb-2">
                            City
                          </label>
                          <input
                            type="text"
                            value={editData.city}
                            onChange={(e) =>
                              setEditData({ ...editData, city: e.target.value })
                            }
                            className="w-full bg-white border-2 border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-foreground/90 mb-2">
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
                            className="w-full bg-white border-2 border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          onClick={handleSaveProfile}
                          className="flex-1 gradient-primary text-white py-2 rounded-lg font-semibold text-sm hover:shadow-glow transition-all duration-300 transform hover:scale-105 animate-pulse-bounce"
                        >
                          Save Changes
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="flex-1 border border-white/20 text-foreground py-2 rounded-lg font-semibold text-sm hover:bg-white/10 hover:shadow-glow transition-all transform hover:scale-105 animate-pulse-bounce"
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

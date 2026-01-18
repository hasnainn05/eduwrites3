"use client";

import { useState, useEffect } from "react";
import { OrderStatusTabs } from "@/client/components/admin/OrderStatusTabs";
import { OrdersList } from "@/client/components/admin/OrdersList";
import { getOrders } from "@/lib/orderStorage";

export interface Order {
  id: string;
  fullName: string;
  email: string;
  service: string;
  deadline: string;
  wordCount: number;
  academicLevel: string;
  subject: string;
  paperType: string;
  status: "pending" | "in_progress" | "completed";
  submittedDate: string;
  description: string;
  attachments?: string[];
  price?: number;
}

export default function AdminOrders() {
  const [activeStatus, setActiveStatus] = useState<
    "pending" | "in_progress" | "completed"
  >("pending");
  const [allOrders, setAllOrders] = useState<Order[]>([
    {
      id: "ORD-20250114-A1B2C",
      fullName: "Alex Johnson",
      email: "alex.johnson@example.com",
      service: "Essay Writing",
      deadline: "2025-02-15",
      wordCount: 3000,
      academicLevel: "Undergraduate",
      subject: "Literature",
      paperType: "Research Paper",
      status: "pending",
      submittedDate: "2025-01-14",
      description:
        "Need a comprehensive essay on Shakespeare's impact on modern literature. Should include historical context and modern interpretations. Please ensure proper citations and academic tone.",
      attachments: ["requirements.pdf"],
      price: 299,
    },
    {
      id: "ORD-20250113-D3E4F",
      fullName: "Sarah Chen",
      email: "sarah.chen@example.com",
      service: "Thesis Writing",
      deadline: "2025-03-20",
      wordCount: 10000,
      academicLevel: "Master's",
      subject: "Computer Science",
      paperType: "Thesis",
      status: "pending",
      submittedDate: "2025-01-13",
      description:
        "Machine Learning application in healthcare systems. Need comprehensive research and original insights. Must include literature review, methodology, and case studies.",
      attachments: ["outline.docx", "references.xlsx"],
      price: 899,
    },
    {
      id: "ORD-20250112-G5H6I",
      fullName: "Michael Rodriguez",
      email: "m.rodriguez@example.com",
      service: "Proofreading & Editing",
      deadline: "2025-02-10",
      wordCount: 5000,
      academicLevel: "PhD",
      subject: "Physics",
      paperType: "Journal Article",
      status: "pending",
      submittedDate: "2025-01-12",
      description:
        "Proofread and edit research paper before submission to peer-reviewed journal. Focus on clarity, technical accuracy, and academic writing standards.",
      attachments: ["manuscript.pdf"],
      price: 199,
    },
    {
      id: "ORD-20250111-J7K8L",
      fullName: "Emily Thompson",
      email: "emily.t@example.com",
      service: "Assignment Writing",
      deadline: "2025-02-08",
      wordCount: 2500,
      academicLevel: "High School",
      subject: "History",
      paperType: "Assignment",
      status: "pending",
      submittedDate: "2025-01-11",
      description:
        "Help with history assignment on World War II. Multiple sources required with proper bibliography. Should cover causes, major events, and consequences.",
      attachments: [],
      price: 149,
    },
    {
      id: "ORD-20250110-M9N0O",
      fullName: "David Park",
      email: "david.park@example.com",
      service: "Research Paper",
      deadline: "2025-02-05",
      wordCount: 7500,
      academicLevel: "Undergraduate",
      subject: "Environmental Science",
      paperType: "Research Paper",
      status: "in_progress",
      submittedDate: "2025-01-10",
      description:
        "Research paper on climate change impacts on marine ecosystems. Need data analysis and current research findings.",
      attachments: ["guidelines.pdf"],
      price: 499,
    },
    {
      id: "ORD-20250109-P1Q2R",
      fullName: "Jessica Lee",
      email: "jessica.lee@example.com",
      service: "Dissertation Writing",
      deadline: "2025-01-25",
      wordCount: 15000,
      academicLevel: "PhD",
      subject: "Psychology",
      paperType: "Dissertation",
      status: "in_progress",
      submittedDate: "2025-01-09",
      description:
        "PhD dissertation on behavioral psychology and decision-making. Comprehensive research with original theory.",
      attachments: ["proposal.docx"],
      price: 1299,
    },
    {
      id: "ORD-20250108-S3T4U",
      fullName: "Robert Williams",
      email: "robert.w@example.com",
      service: "Essay Writing",
      deadline: "2025-01-20",
      wordCount: 4000,
      academicLevel: "Undergraduate",
      subject: "Economics",
      paperType: "Essay",
      status: "completed",
      submittedDate: "2025-01-08",
      description: "Essay on supply and demand dynamics in modern markets.",
      attachments: [],
      price: 299,
    },
    {
      id: "ORD-20250107-V5W6X",
      fullName: "Lisa Anderson",
      email: "lisa.anderson@example.com",
      service: "Proofreading & Editing",
      deadline: "2025-01-18",
      wordCount: 6000,
      academicLevel: "Master's",
      subject: "Business",
      paperType: "Case Study",
      status: "completed",
      submittedDate: "2025-01-07",
      description: "Proofread MBA case study on corporate strategy.",
      attachments: ["manuscript.pdf"],
      price: 249,
    },
  ]);

  useEffect(() => {
    const storedOrders = getOrders();
    if (storedOrders.length > 0) {
      setAllOrders(storedOrders);
    }
  }, []);

  const handleStatusChange = (
    orderId: string,
    newStatus: "pending" | "in_progress" | "completed",
  ) => {
    const updatedOrders = allOrders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order,
    );
    setAllOrders(updatedOrders);
  };

  const filteredOrders = allOrders
    .filter((order) => order.status === activeStatus)
    .sort(
      (a, b) =>
        new Date(b.submittedDate).getTime() -
        new Date(a.submittedDate).getTime(),
    );

  const stats = {
    pending: allOrders.filter((o) => o.status === "pending").length,
    in_progress: allOrders.filter((o) => o.status === "in_progress").length,
    completed: allOrders.filter((o) => o.status === "completed").length,
    total: allOrders.length,
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 md:space-y-8">
          {/* Stats Overview - No Background, Bottom Line */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            <div className="border-b-2 border-blue-400/40 pb-3 sm:pb-4 md:pb-6 hover:border-blue-400/60 transition-all">
              <p className="text-foreground/70 text-xs sm:text-sm font-medium truncate">
                Total Orders
              </p>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-foreground mt-1 sm:mt-2">
                {stats.total}
              </h3>
            </div>
            <div className="border-b-2 border-orange-400/40 pb-3 sm:pb-4 md:pb-6 hover:border-orange-400/60 transition-all">
              <p className="text-foreground/70 text-xs sm:text-sm font-medium truncate">
                Pending Orders
              </p>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-orange-400 mt-1 sm:mt-2">
                {stats.pending}
              </h3>
            </div>
            <div className="border-b-2 border-yellow-400/40 pb-3 sm:pb-4 md:pb-6 hover:border-yellow-400/60 transition-all">
              <p className="text-foreground/70 text-xs sm:text-sm font-medium truncate">
                In Progress
              </p>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mt-1 sm:mt-2">
                {stats.in_progress}
              </h3>
            </div>
            <div className="border-b-2 border-green-400/40 pb-3 sm:pb-4 md:pb-6 hover:border-green-400/60 transition-all">
              <p className="text-foreground/70 text-xs sm:text-sm font-medium truncate">
                Completed
              </p>
              <h3 className="text-2xl sm:text-2xl md:text-3xl font-bold text-green-400 mt-1 sm:mt-2">
                {stats.completed}
              </h3>
            </div>
          </div>

          {/* Orders Section */}
          <div className="border-b border-white/10 overflow-hidden">
            {/* Tabs */}
            <OrderStatusTabs
              activeStatus={activeStatus}
              onStatusChange={setActiveStatus}
              stats={stats}
            />

            {/* Orders List */}
            <OrdersList
              orders={filteredOrders}
              onStatusChange={handleStatusChange}
              status={activeStatus}
            />
          </div>
    </div>
  );
}

"use client";

interface OrderStatusTabsProps {
  activeStatus: "pending" | "in-progress" | "completed" | "cancelled";
  onStatusChange: (status: "pending" | "in-progress" | "completed" | "cancelled") => void;
  stats: {
    pending: number;
    in_progress: number;
    completed: number;
  };
}

export function OrderStatusTabs({
  activeStatus,
  onStatusChange,
  stats,
}: OrderStatusTabsProps) {
  const tabs = [
    {
      id: "pending",
      label: "Pending Orders",
      count: stats.pending,
    },
    {
      id: "in-progress",
      label: "In Progress",
      count: stats.in_progress,
    },
    {
      id: "completed",
      label: "Completed",
      count: stats.completed,
    },
  ];

  return (
    <div className="border-b border-slate-200 overflow-x-auto bg-white">
      <div className="flex items-center gap-0 min-w-min px-4 sm:px-6">
        {tabs.map((tab) => {
          const isActive = activeStatus === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() =>
                onStatusChange(
                  tab.id as "pending" | "in-progress" | "completed" | "cancelled",
                )
              }
              className={`px-1 sm:px-2 py-4 border-b-2 transition-all text-sm font-semibold whitespace-nowrap ${
                isActive
                  ? "border-b-blue-600 text-blue-600"
                  : "border-b-transparent text-slate-600 hover:text-slate-900 hover:border-b-slate-300"
              }`}
              aria-pressed={isActive}
            >
              <span className="text-slate-900 font-semibold">{tab.label}</span>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "bg-slate-100 text-slate-600"
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

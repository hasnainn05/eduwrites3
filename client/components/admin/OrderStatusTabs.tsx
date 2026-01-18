"use client";

interface OrderStatusTabsProps {
  activeStatus: "pending" | "in_progress" | "completed";
  onStatusChange: (status: "pending" | "in_progress" | "completed") => void;
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
      id: "in_progress",
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
    <div className="border-b border-white/10 overflow-x-auto">
      <div className="flex items-center gap-0 min-w-min">
        {tabs.map((tab) => {
          const isActive = activeStatus === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() =>
                onStatusChange(
                  tab.id as "pending" | "in_progress" | "completed",
                )
              }
              className={`px-3 sm:px-6 py-3 sm:py-4 border-b-2 transition-all text-xs sm:text-sm md:text-base font-medium whitespace-nowrap active:bg-white/5 min-h-12 ${
                isActive
                  ? "border-b-green-400 text-green-400"
                  : "border-b-transparent text-foreground/60 hover:text-foreground/80"
              }`}
              aria-pressed={isActive}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>
    </div>
  );
}

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
    <div className="border-b-2 border-border overflow-x-auto bg-white">
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
              className={`px-3 sm:px-5 py-2 sm:py-3 border-b-2 transition-all text-xs sm:text-xs font-bold whitespace-nowrap active:bg-primary/5 ${
                isActive
                  ? "border-b-primary text-primary"
                  : "border-b-transparent text-foreground/60 hover:text-foreground"
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

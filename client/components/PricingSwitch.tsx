"use client";

import { useState } from "react";

interface PricingSwitchProps {
  onSwitch: (type: "writing" | "proofreading") => void;
}

export function PricingSwitch({ onSwitch }: PricingSwitchProps) {
  const [activeTab, setActiveTab] = useState<"writing" | "proofreading">(
    "writing",
  );

  const handleSwitch = (type: "writing" | "proofreading") => {
    setActiveTab(type);
    onSwitch(type);
  };

  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex rounded-lg border border-border bg-white p-1 shadow-sm">
        <button
          onClick={() => handleSwitch("writing")}
          className={`px-6 sm:px-8 py-2.5 rounded-md font-semibold text-sm transition-all duration-300 ${
            activeTab === "writing"
              ? "bg-primary text-white shadow-md"
              : "text-foreground hover:text-primary"
          }`}
        >
          Writing Services
        </button>
        <button
          onClick={() => handleSwitch("proofreading")}
          className={`px-6 sm:px-8 py-2.5 rounded-md font-semibold text-sm transition-all duration-300 ${
            activeTab === "proofreading"
              ? "bg-primary text-white shadow-md"
              : "text-foreground hover:text-primary"
          }`}
        >
          Editing & Proofreading
        </button>
      </div>
    </div>
  );
}

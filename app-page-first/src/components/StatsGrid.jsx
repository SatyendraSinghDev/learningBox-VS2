import React from "react";

export default function StatsGrid({ stats }) {
  return (
    <div className="flex flex-row md:flex-row gap-3 mb-6">
      {stats.map((item) => (
        <div
          key={item.key}
          className={`bg-white rounded-xl border ${item.borderClass} p-4 flex-1`}
        >
          <p className={`text-xs ${item.labelClass} font-medium uppercase tracking-wide mb-1`}>
            {item.label}
          </p>
          <p className={`text-xl md:text-2xl font-bold ${item.valueClass}`}>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}

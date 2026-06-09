import React from "react";

export default function DashboardStats({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((item) => (
        <div key={item.label} className={`rounded-2xl border p-4 ${item.color}`}>
          <div className="text-2xl mb-2">{item.icon}</div>
          <p className={`text-2xl font-bold ${item.text}`}>{item.value}</p>
          <p className="text-xs text-gray-500 font-medium mt-0.5">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

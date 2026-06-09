import React from "react";

export default function DashboardHeader({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-500 text-sm mt-1">{subtitle}</p>
    </div>
  );
}

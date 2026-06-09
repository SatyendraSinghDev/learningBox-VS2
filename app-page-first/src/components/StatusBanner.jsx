import React from "react";

export default function StatusBanner({
  icon = "ℹ️",
  children,
  className = "bg-white border border-gray-200 text-gray-900",
  role = "status",
}) {
  return (
    <div className={`rounded-xl p-4 text-sm flex items-center gap-2 ${className}`} role={role}>
      <span>{icon}</span>
      <span>{children}</span>
    </div>
  );
}

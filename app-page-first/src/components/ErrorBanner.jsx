import React from "react";

export default function ErrorBanner({ error, onDismiss }) {
  const statusColors = {
    0: "bg-gray-50 border-gray-300 text-gray-800",
    404: "bg-yellow-50 border-yellow-300 text-yellow-800",
    500: "bg-red-50 border-red-300 text-red-800",
    503: "bg-orange-50 border-orange-300 text-orange-800",
  };

  const statusIcons = {
    0: "🌐",
    404: "🔍",
    500: "💥",
    503: "⏳",
  };

  const colorClass =
    statusColors[error.status] || "bg-red-50 border-red-300 text-red-800";
  const icon = statusIcons[error.status] || "⚠️";

  return (
    <div
      className={`border rounded-xl p-4 mb-4 flex items-start gap-3 ${colorClass}`}
      role="alert"
    >
      <span className="text-2xl mt-0.5 shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-sm">
            {error.status === 0 ? "Network Error" : `Error ${error.status}`} —{" "}
            {error.statusText}
          </p>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-xs opacity-60 hover:opacity-100 shrink-0 hover:bg-black/5 rounded px-2 py-1 transition"
            >
              ✕ Dismiss
            </button>
          )}
        </div>
        <p className="text-sm mt-1 opacity-80">{error.message}</p>
        <div className="mt-2 flex items-center gap-4 text-xs opacity-60 font-mono">
          <span>URL: {error.url}</span>
          <span>
            {error.timestamp
              ? new Date(error.timestamp).toLocaleTimeString()
              : ""}
          </span>
        </div>
      </div>
    </div>
  );
}

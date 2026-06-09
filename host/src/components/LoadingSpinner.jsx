import React from "react";

export default function LoadingSpinner({ name }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
      <p className="text-sm text-gray-500 font-medium">Loading {name}...</p>
      <p className="text-xs text-gray-400 mt-1">Fetching remote module</p>
    </div>
  );
}

import React from "react";

export default function ErrorFallback({ name, onRetry }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-2xl border border-red-200 p-8 max-w-md text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="font-bold text-gray-800 text-lg mb-2">Failed to load {name}</h2>
        <p className="text-sm text-gray-500 mb-2">Make sure the remote app is running:</p>
        <code className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg font-mono block mb-4">
          cd {name === "AppPageFirst" ? "app-page-first" : "app-page-second"} &amp;&amp; npm start
        </code>
        <button
          onClick={onRetry}
          className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

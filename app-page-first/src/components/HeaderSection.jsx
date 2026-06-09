import React from "react";

export default function HeaderSection({ icon, title, subtitle, description }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shrink-0">
          <span className="text-white text-lg">{icon}</span>
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
      </div>
      <p className="text-gray-500 text-sm mt-1">{description}</p>
    </div>
  );
}

import React from "react";

export default function DashboardQuickLinks({ links, onNavigate }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {links.map((link) => (
        <button
          key={link.id}
          onClick={() => onNavigate(link.id)}
          className="bg-white rounded-2xl border border-gray-200 p-5 text-left hover:border-indigo-300 hover:shadow-sm transition-all group"
        >
          <span className="text-2xl">{link.icon}</span>
          <p className="font-semibold text-gray-800 mt-2 group-hover:text-indigo-600 transition">
            {link.title}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{link.description}</p>
        </button>
      ))}
    </div>
  );
}

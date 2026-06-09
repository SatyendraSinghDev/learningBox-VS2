import React from "react";
import SidebarLayout from "./SidebarLayout";
import { NAV_ITEMS } from "../constants/navItems";
import {
  BRAND_TITLE,
  BRAND_SUBTITLE,
  NAV_SECTION_LABEL,
  USER_NAME,
  USER_COMPANY,
  USER_INITIALS,
} from "../constants/sidebarText";

function SidebarBrand() {
  return (
    <div className="px-5 py-5 border-b border-white/10">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
          L
        </div>
        <div>
          <p className="text-white font-bold text-base leading-tight">{BRAND_TITLE}</p>
          <p className="text-gray-500 text-xs">{BRAND_SUBTITLE}</p>
        </div>
      </div>
    </div>
  );
}

function SidebarNav({ activePage, onNavigate }) {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      <p className="text-gray-600 text-xs font-semibold uppercase tracking-widest px-3 mb-3">
        {NAV_SECTION_LABEL}
      </p>
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left
            ${
              activePage === item.id
                ? "bg-indigo-600 text-white"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
            }
          `}
        >
          <span className="text-base">{item.icon}</span>
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span
              className={`text-xs px-1.5 py-0.5 rounded font-mono
                ${activePage === item.id ? "bg-white/20 text-white" : "bg-white/5 text-gray-500"}
              `}
            >
              {item.badge}
            </span>
          )}
        </button>
      ))}

      <div className="mt-4 px-3 py-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
        <p className="text-gray-500 text-[11px] uppercase tracking-[0.24em] font-semibold">
          Preview links
        </p>
        <a
          href="http://localhost:3001"
          target="_blank"
          rel="noreferrer"
          className="block text-sm text-gray-300 hover:text-white hover:underline"
        >
          API Monitor (local)
        </a>
        <a
          href="https://learningbox-app-page-first.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="block text-sm text-gray-300 hover:text-white hover:underline"
        >
          API Monitor (prod)
        </a>
        <a
          href="http://localhost:3002"
          target="_blank"
          rel="noreferrer"
          className="block text-sm text-gray-300 hover:text-white hover:underline"
        >
          Calendar (local)
        </a>
        <a
          href="https://learningbox-app-page-second.vercel.app"
          target="_blank"
          rel="noreferrer"
          className="block text-sm text-gray-300 hover:text-white hover:underline"
        >
          Calendar (prod)
        </a>
      </div>
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="px-5 py-4 border-t border-white/10">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">
          {USER_INITIALS}
        </div>
        <div>
          <p className="text-white text-xs font-medium">{USER_NAME}</p>
          <p className="text-gray-500 text-xs">{USER_COMPANY}</p>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <SidebarLayout
      brand={<SidebarBrand />}
      nav={<SidebarNav activePage={activePage} onNavigate={onNavigate} />}
      footer={<SidebarFooter />}
    />
  );
}

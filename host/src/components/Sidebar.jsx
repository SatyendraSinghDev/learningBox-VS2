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
        </button>
      ))}
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

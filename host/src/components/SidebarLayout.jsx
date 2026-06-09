import React from "react";

export default function SidebarLayout({ brand, nav, footer }) {
  return (
    <aside className="w-64 bg-gray-950 min-h-screen flex flex-col shrink-0">
      {brand}
      {nav}
      {footer}
    </aside>
  );
}

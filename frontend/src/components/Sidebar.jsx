import React from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icons from "lucide-react";

export default function Sidebar({ links }) {
  const { pathname } = useLocation();

  return (
    <div className="sidebar shadow-soft bg-white border-r border-[#E9D5FF] min-h-screen p-5">

      <h2 className="text-xl font-bold mb-6 gradient-text">Menu</h2>

      <div className="flex flex-col gap-2">
        {links.map(({ path, label, icon }, index) => {

          // ✅ SAFE FALLBACK so app NEVER breaks
          const IconComp = Icons[icon] || Icons.FileText;

          // ✅ Perfect route match
          const isActive = pathname === path;

          return (
            <Link
              key={index}
              to={path}
              className={`px-4 py-3 flex items-center gap-3 text-sm rounded-xl transition-all
                ${isActive ? "sidebar-link-active font-semibold" : "hover:bg-[#F3E8FF]"}
              `}
            >
              <IconComp
                size={18}
                className={isActive ? "text-[#4C1D95] neon-icon" : "text-slate-500"}
              />

              <span className={isActive ? "text-[#4C1D95] font-semibold" : "text-slate-700"}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

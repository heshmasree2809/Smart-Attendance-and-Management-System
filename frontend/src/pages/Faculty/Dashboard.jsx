import React from "react";
import { QrCode, CalendarDays, Users, ClipboardList } from "lucide-react";

export default function FacultyDashboard() {
  return (
    <div>
      <h1 className="section-title">Faculty Dashboard</h1>

      <div className="dashboard-grid">

        {/* Classes Today */}
        <div className="card-soft card-hover bg-gradient-to-br from-[#F5E8FF] to-[#EDE4FF]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#4C1D95]">Today's Classes</h2>
            <CalendarDays size={26} className="text-[#7C3AED] neon-icon" />
          </div>
          <p className="text-4xl mt-3 font-bold text-[#6D28D9]">3</p>
        </div>

 
        {/* Students */}
        <div className="card-soft card-hover bg-gradient-to-br from-[#F8F4FF] to-[#EFE8FF]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#4C1D95]">Students</h2>
            <Users size={26} className="text-[#7C3AED] neon-icon" />
          </div>
          <p className="text-4xl mt-3 font-bold text-[#6D28D9]">180</p>
        </div>

        {/* Assignments */}
        <div className="card-soft card-hover bg-gradient-to-br from-[#F1E7FF] to-[#F8F5FF]">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[#4C1D95]">Assignments</h2>
            <ClipboardList size={26} className="text-[#7C3AED] neon-icon" />
          </div>
          <p className="text-sm mt-3 text-slate-600">Create & evaluate assignments</p>
        </div>

      </div>
    </div>
  );
}

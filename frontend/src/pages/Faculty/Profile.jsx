import React from "react";
import { User, Mail, Phone, Building2, BadgeCheck } from "lucide-react";

export default function Profile() {
  const faculty = {
    name: "Dr. Kavya Sharma",
    email: "kavya.sharma@scaams.edu",
    phone: "+91 98765 43210",
    department: "CSE",
    facultyId: "FAC002",
    designation: "Assistant Professor"
  };

  return (
    <div>
      <h1 className="section-title">Faculty Profile</h1>

      <div className="glass-card space-y-4 max-w-lg">
        
        <div className="flex items-center gap-4">
          <User size={50} className="text-[#6D28D9]" />
          <div>
            <h2 className="text-xl font-semibold text-[#4C1D95]">{faculty.name}</h2>
            <p className="text-sm text-slate-500">{faculty.designation}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <BadgeCheck size={20} className="text-green-600" />
          <p className="text-slate-700 font-medium">Faculty ID: {faculty.facultyId}</p>
        </div>

        <div className="flex items-center gap-3">
          <Mail size={20} className="text-[#6D28D9]" />
          <p>{faculty.email}</p>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={20} className="text-[#6D28D9]" />
          <p>{faculty.phone}</p>
        </div>

        <div className="flex items-center gap-3">
          <Building2 size={20} className="text-[#6D28D9]" />
          <p>Department: {faculty.department}</p>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Student/Dashboard";
import Attendance from "../pages/Student/Attendance";
import Marks from "../pages/Student/Marks";
import Profile from "../pages/Student/Profile";
import Assignments from "../pages/Student/Assignments";
import AttendanceAnalytics from "../pages/Student/AttendanceAnalytics";
import IDCard from "../pages/Student/IDCard";
import StudentSettings from "../pages/Student/Settings";

export default function StudentLayout() {

  const links = [
    { path: "/student/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { path: "/student/attendance", label: "Attendance", icon: "CalendarCheck" },
    { path: "/student/marks", label: "Marks", icon: "BookOpen" },
    { path: "/student/profile", label: "Personal Details", icon: "User" },
    { path: "/student/assignments", label: "Assignments", icon: "FileText" },
    { path: "/student/attendance-analytics", label: "Analytics", icon: "BarChart3" },
    { path: "/student/settings", label: "Settings", icon: "Settings" },
    { path: "/student/id-card", label: "ID Card", icon: "IdCard" },
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />

      <div className="flex-1">
        <Navbar role="Student" />

        <div className="section">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="marks" element={<Marks />} />
            <Route path="profile" element={<Profile />} />
            <Route path="assignments" element={<Assignments />} />
            <Route path="attendance-analytics" element={<AttendanceAnalytics />} />
            <Route path="settings" element={<StudentSettings />} />
            <Route path="id-card" element={<IDCard />} />

            {/* default route */}
            <Route index element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

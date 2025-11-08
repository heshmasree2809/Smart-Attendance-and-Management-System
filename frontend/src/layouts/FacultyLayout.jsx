import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Routes, Route } from "react-router-dom";

import FacultyDashboard from "../pages/Faculty/Dashboard";
import Settings from "../pages/Faculty/Settings";
import AttendanceList from "../pages/Faculty/AttendanceList";
import ViewAttendance from "../pages/Faculty/ViewAttendance";
import FacultyAssignments from "../pages/Faculty/Assignments";
import AssignmentCreate from "../pages/Faculty/AssignmentCreate";
import AssignmentSubmissions from "../pages/Faculty/AssignmentSubmissions";
import MarksEntry from "../pages/Faculty/MarksEntry";
import Profile from "../pages/Faculty/Profile";          // ✅ FIXED

export default function FacultyLayout() {
  const links = [
    { path: "/faculty/dashboard", label: "Dashboard", icon: "LayoutDashboard" },
    { path: "/faculty/attendance-list", label: "Attendance List", icon: "ClipboardList" },
    { path: "/faculty/view-attendance", label: "View Attendance", icon: "List" },
    { path: "/faculty/assignments", label: "Assignments", icon: "BookCheck" },
    { path: "/faculty/marks-entry", label: "Marks Entry", icon: "FileSpreadsheet" },
    { path: "/faculty/profile", label: "Profile", icon: "User" },            // ✅ FIXED
    { path: "/faculty/settings", label: "Settings", icon: "Settings" },
  ];

  return (
    <div className="flex">
      <Sidebar links={links} />
      <div className="flex-1">
        <Navbar role="Faculty" />
        <div className="section">

          <Routes>
            <Route path="dashboard" element={<FacultyDashboard />} />
            <Route path="attendance-list" element={<AttendanceList />} />
            <Route path="view-attendance" element={<ViewAttendance />} />
            <Route path="assignments" element={<FacultyAssignments />} />
            <Route path="assignments/create" element={<AssignmentCreate />} />
            <Route path="assignments/submissions" element={<AssignmentSubmissions />} />
            <Route path="marks-entry" element={<MarksEntry />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />        {/* ✅ FIXED */}
            <Route index element={<FacultyDashboard />} />
          </Routes>

        </div>
      </div>
    </div>
  );
}

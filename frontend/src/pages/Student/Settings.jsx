import React, { useState } from "react";
import toast from "react-hot-toast";

export default function StudentSettings() {
  const [name, setName] = useState("Student User");
  const [email, setEmail] = useState("student@scaams.edu");
  const [mobile, setMobile] = useState("9876543210");

  const [department, setDepartment] = useState("CSE");
  const [year, setYear] = useState("III");
  const [section, setSection] = useState("A");

  const [password, setPassword] = useState("");

  const [theme, setTheme] = useState(
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  const saveSettings = () => {
    toast.success("✅ Student Settings Updated Successfully!");
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      <h1 className="section-title">Settings</h1>

      <div className="glass-card space-y-6">

        {/* Name */}
        <div>
          <label className="text-sm text-slate-600 font-medium">Full Name</label>
          <input
            type="text"
            className="input mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-slate-600 font-medium">Email</label>
          <input
            type="email"
            className="input mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm text-slate-600 font-medium">Mobile Number</label>
          <input
            type="text"
            className="input mt-1"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* Department, Year, Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Department */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Department</label>
            <select
              className="input mt-1"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="IT">IT</option>
              <option value="MECH">Mechanical</option>
            </select>
          </div>

          {/* Year */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Year</label>
            <select
              className="input mt-1"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
            </select>
          </div>

          {/* Section */}
          <div>
            <label className="text-sm text-slate-600 font-medium">Section</label>
            <select
              className="input mt-1"
              value={section}
              onChange={(e) => setSection(e.target.value)}
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-slate-600 font-medium">New Password</label>
          <input
            type="password"
            className="input mt-1"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Theme Toggle */}
        <div>
          <label className="text-sm font-medium text-slate-600 block mb-2">
            Theme Mode
          </label>

          <button
            onClick={toggleTheme}
            className="btn-primary w-full py-2 text-base"
          >
            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={saveSettings}
          className="btn-primary w-full py-3 text-base mt-4"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}

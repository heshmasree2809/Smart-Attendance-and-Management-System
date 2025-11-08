import React, { useState } from "react";
import { Bell, Shield, Palette, Globe, Lock } from "lucide-react";

export default function AdminSettings() {
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(false);
  const [theme, setTheme] = useState("light");

  return (
    <div className="p-6 space-y-6">

      <h1 className="section-title">System Settings</h1>

      {/* General Settings */}
      <div className="glass-card space-y-5">

        <h2 className="text-lg font-semibold flex items-center gap-2 text-[#4C1D95]">
          <Globe size={20} /> General Settings
        </h2>

        <div>
          <label className="font-medium text-sm">Institute Name</label>
          <input type="text" className="input mt-1" defaultValue="SCAAMS University" />
        </div>

        <div>
          <label className="font-medium text-sm">Academic Session</label>
          <input type="text" className="input mt-1" defaultValue="2025-26" />
        </div>

      </div>



      {/* Notification Preferences */}
      <div className="glass-card space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-[#4C1D95]">
          <Bell size={20} /> Notification Preferences
        </h2>

        <div className="flex justify-between items-center">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
          />
        </div>

        <div className="flex justify-between items-center">
          <span>SMS Alerts</span>
          <input
            type="checkbox"
            className="w-5 h-5"
            checked={smsNotif}
            onChange={() => setSmsNotif(!smsNotif)}
          />
        </div>
      </div>



      {/* Theme Settings */}
      <div className="glass-card space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-[#4C1D95]">
          <Palette size={20} /> Appearance
        </h2>

        <div>
          <label className="font-medium text-sm">Theme</label>
          <select
            className="input mt-1"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light Mode</option>
            <option value="dark">Dark Mode</option>
            <option value="lavender">Lavender Mode</option>
          </select>
        </div>
      </div>



      {/* Security Settings */}
      <div className="glass-card space-y-5">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-[#4C1D95]">
          <Shield size={20} /> Security Settings
        </h2>

        <div>
          <label className="font-medium text-sm">Change Password</label>
          <input type="password" className="input mt-1" placeholder="New Password" />
        </div>

        <button className="btn-primary w-full">Update Password</button>
      </div>




      <button className="btn-primary w-full py-3 text-base">
        Save All Settings
      </button>
    </div>
  );
}

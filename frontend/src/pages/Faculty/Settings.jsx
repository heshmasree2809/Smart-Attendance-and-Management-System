import React from "react";

export default function Settings() {
  return (
    <div className="p-6">
      <h1 className="section-title">Faculty Settings</h1>

      <div className="glass-card space-y-4">
        <p className="text-slate-700">
          This is a placeholder settings page. Add real settings later.
        </p>

        <div>
          <label className="text-sm font-medium text-slate-600">Notification Preference</label>
          <select className="input mt-1">
            <option>Email</option>
            <option>SMS</option>
            <option>Both</option>
          </select>
        </div>

        <button className="btn-primary w-full mt-2">Save Settings</button>
      </div>
    </div>
  );
}

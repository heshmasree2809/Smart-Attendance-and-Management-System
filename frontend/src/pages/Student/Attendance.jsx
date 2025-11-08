import React, { useState, useMemo } from "react";
import { CheckCircle, XCircle, BookOpen, Percent } from "lucide-react";

export default function Attendance() {
  const [subjectFilter, setSubjectFilter] = useState("");

  // ✅ Dummy Attendance Records
  const records = [
    { subject: "DBMS", date: "2025-02-01", status: "Present" },
    { subject: "DBMS", date: "2025-02-02", status: "Absent" },
    { subject: "OS", date: "2025-02-01", status: "Present" },
    { subject: "OS", date: "2025-02-02", status: "Present" },
    { subject: "CN", date: "2025-02-01", status: "Present" },
    { subject: "Maths", date: "2025-02-01", status: "Absent" },
  ];

  // ✅ Subject list from data
  const subjects = [...new Set(records.map((r) => r.subject))];

  // ✅ Filter by subject
  const filtered = subjectFilter
    ? records.filter((r) => r.subject === subjectFilter)
    : records;

  // ✅ Overall attendance summary
  const totalClasses = filtered.length;
  const presentCount = filtered.filter((r) => r.status === "Present").length;
  const percentage =
    totalClasses === 0 ? 0 : Math.round((presentCount / totalClasses) * 100);

  // ✅ Subject-wise summary
  const subjectWise = useMemo(() => {
    const map = {};
    subjects.forEach((sub) => {
      const subRecs = records.filter((r) => r.subject === sub);
      const present = subRecs.filter((r) => r.status === "Present").length;
      map[sub] = {
        total: subRecs.length,
        present,
        percent: Math.round((present / subRecs.length) * 100),
      };
    });
    return map;
  }, [records]);

  return (
    <div>
      <h1 className="section-title">Attendance Overview</h1>

      {/* FILTERS */}
      <div className="glass-card p-5 mb-6 space-y-4">
        <label className="text-sm font-medium text-slate-700">Filter by Subject</label>
        <select
          className="input"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* TOTAL / PERCENTAGE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card-soft flex items-center gap-4 bg-green-50">
          <CheckCircle className="text-green-600" size={32} />
          <div>
            <p className="text-xl font-bold text-green-700">{presentCount}</p>
            <p className="text-sm text-green-700">Present</p>
          </div>
        </div>

        <div className="card-soft flex items-center gap-4 bg-red-50">
          <XCircle className="text-red-600" size={32} />
          <div>
            <p className="text-xl font-bold text-red-700">{totalClasses - presentCount}</p>
            <p className="text-sm text-red-700">Absent</p>
          </div>
        </div>

        <div className="card-soft flex items-center gap-4 bg-purple-50">
          <Percent className="text-purple-600" size={32} />
          <div>
            <p className="text-xl font-bold text-purple-700">{percentage}%</p>
            <p className="text-sm text-purple-700">Attendance</p>
          </div>
        </div>
      </div>

      {/* SUBJECT WISE SUMMARY */}
      <h2 className="text-lg font-semibold text-[#4C1D95] mb-3">
        Subject Wise Attendance
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(subjectWise).map(([sub, info], index) => (
          <div key={index} className="card-soft p-4">
            <div className="flex items-center gap-3 mb-3">
              <BookOpen size={26} className="text-[#6D28D9]" />
              <h3 className="text-md font-semibold">{sub}</h3>
            </div>

            <div className="flex justify-between text-sm">
              <p>Total Classes: {info.total}</p>
              <p>Present: {info.present}</p>
              <p className="font-semibold text-[#4C1D95]">{info.percent}%</p>
            </div>
          </div>
        ))}
      </div>

      {/* ATTENDANCE TABLE */}
      <div className="card-soft overflow-x-auto">
        <table className="table-modern w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-slate-500">
                  No attendance records found
                </td>
              </tr>
            ) : (
              filtered.map((rec, index) => (
                <tr key={index}>
                  <td>{rec.date}</td>
                  <td>{rec.subject}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        rec.status === "Present" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

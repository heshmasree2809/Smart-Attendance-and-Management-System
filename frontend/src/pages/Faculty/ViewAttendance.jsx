import React, { useState } from "react";

export default function ViewAttendance() {
  const [date, setDate] = useState("");
  const [period, setPeriod] = useState("");
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState("");

  // ✅ Dummy attendance data
  const attendanceData = [
    { regd: "22CSE001", name: "Aditya Kumar", status: "Present", period: "1", subject: "Maths", date: "2025-02-02" },
    { regd: "22CSE002", name: "Priya Singh", status: "Absent", period: "1", subject: "Maths", date: "2025-02-02" },
    { regd: "22CSE003", name: "Rahul Verma", status: "Present", period: "2", subject: "DBMS", date: "2025-02-02" },
    { regd: "22ECE002", name: "Varun B", status: "Present", period: "2", subject: "DBMS", date: "2025-02-02" },
    { regd: "22ECE003", name: "Sandhya M", status: "Absent", period: "3", subject: "OS", date: "2025-02-03" },
  ];

  // ✅ Filter logic
  const filtered = attendanceData.filter((rec) => {
    return (
      (date ? rec.date === date : true) &&
      (period ? rec.period === period : true) &&
      (subject ? rec.subject === subject : true) &&
      (search
        ? rec.name.toLowerCase().includes(search.toLowerCase()) ||
          rec.regd.toLowerCase().includes(search.toLowerCase())
        : true)
    );
  });

  // ✅ Summary
  const presentCount = filtered.filter((x) => x.status === "Present").length;
  const absentCount = filtered.length - presentCount;

  return (
    <div>
      <h1 className="section-title">View Attendance</h1>

      {/* Filters Card */}
      <div className="glass-card mb-6 space-y-4">

        {/* Date */}
        <div>
          <label className="text-sm font-medium text-slate-600">Select Date</label>
          <input
            type="date"
            className="input mt-1"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Period + Subject */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium text-slate-600">Period</label>
            <select
              className="input mt-1"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="">All Periods</option>
              <option value="1">Period 1</option>
              <option value="2">Period 2</option>
              <option value="3">Period 3</option>
              <option value="4">Period 4</option>
              <option value="5">Period 5</option>
            </select>
          </div>

          <div className="w-full md:w-1/2">
            <label className="text-sm font-medium text-slate-600">Subject</label>
            <select
              className="input mt-1"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">All Subjects</option>
              <option value="Maths">Maths</option>
              <option value="DBMS">DBMS</option>
              <option value="OS">Operating Systems</option>
              <option value="CN">Computer Networks</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div>
          <label className="text-sm font-medium text-slate-600">Search Student</label>
          <input
            type="text"
            className="input mt-1"
            placeholder="Search by name or regd no"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Summary */}
      {filtered.length > 0 && (
        <div className="mb-4 flex gap-4">
          <div className="card-soft text-center w-40 bg-green-50">
            <p className="text-green-600 font-semibold text-lg">{presentCount}</p>
            <p className="text-sm text-green-700">Present</p>
          </div>

          <div className="card-soft text-center w-40 bg-red-50">
            <p className="text-red-600 font-semibold text-lg">{absentCount}</p>
            <p className="text-sm text-red-700">Absent</p>
          </div>
        </div>
      )}

      {/* Attendance Table */}
      <div className="card-soft overflow-x-auto">
        <table className="table-modern w-full">
          <thead>
            <tr>
              <th>Regd No</th>
              <th>Name</th>
              <th>Period</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-slate-500">
                  No records found
                </td>
              </tr>
            ) : (
              filtered.map((rec, index) => (
                <tr key={index}>
                  <td>{rec.regd}</td>
                  <td>{rec.name}</td>
                  <td>{rec.period}</td>
                  <td>{rec.subject}</td>
                  <td>{rec.date}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        rec.status === "Present"
                          ? "bg-green-500"
                          : "bg-red-500"
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

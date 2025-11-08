import React, { useState } from "react";

// ✅ Dummy Students List
const students = [
  { id: 1, regd: "22CSE001", name: "Aditya Kumar" },
  { id: 2, regd: "22CSE002", name: "Priya Singh" },
  { id: 3, regd: "22CSE003", name: "Rahul Verma" },
  { id: 4, regd: "22ECE001", name: "Keerthi Rao" },
  { id: 5, regd: "22ECE002", name: "Varun B" },
  { id: 6, regd: "22ECE003", name: "Sandhya M" },
];

export default function AttendanceList() {
  const [period, setPeriod] = useState("");
  const [attendance, setAttendance] = useState({}); // Store present/absent status

  const handleStatusToggle = (id) => {
    setAttendance(prev => ({
      ...prev,
      [id]: prev[id] === "Present" ? "Absent" : "Present"
    }));
  };

  const handleSubmit = () => {
    if (!period) return alert("Please select period");

    console.log("SUBMITTED ATTENDANCE:");
    console.table(attendance);

    alert("✅ Attendance submitted successfully!");
  };

  return (
    <div>
      <h1 className="section-title">Attendance List</h1>

      {/* ---------- PERIOD SELECTION ---------- */}
      <div className="glass-card mb-5 flex flex-col md:flex-row items-center gap-4">

        <select
          className="input w-full md:w-60"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="">Select Period</option>
          <option value="1">Period 1</option>
          <option value="2">Period 2</option>
          <option value="3">Period 3</option>
          <option value="4">Period 4</option>
          <option value="5">Period 5</option>
          <option value="6">Period 6</option>
        </select>

        <button
          onClick={handleSubmit}
          className="btn-primary px-6 py-3 rounded-xl"
        >
          Submit Attendance
        </button>
      </div>

      {/* ---------- STUDENT TABLE ---------- */}
      {!period ? (
        <div className="text-center text-[#6B21A8] mt-10">
          Please select a period to mark attendance.
        </div>
      ) : (
        <div className="card-soft overflow-x-auto animate-fade-in">
          <table className="table-modern w-full">
            <thead>
              <tr>
                <th>Regd No</th>
                <th>Name</th>
                <th>Status</th>
                <th>Mark</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => {
                const status = attendance[student.id] || "Absent"; // Default Absent

                return (
                  <tr key={student.id}>
                    <td>{student.regd}</td>
                    <td>{student.name}</td>

                    {/* ✅ Status Text */}
                    <td
                      className={
                        status === "Present"
                          ? "text-green-600 font-semibold"
                          : "text-red-600 font-semibold"
                      }
                    >
                      {status}
                    </td>

                    {/* ✅ Toggle Button */}
                    <td>
                      <button
                        onClick={() => handleStatusToggle(student.id)}
                        className={`px-4 py-1 rounded-lg text-white 
                          ${status === "Present"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                          }`}
                      >
                        {status === "Present" ? "Present" : "Absent"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

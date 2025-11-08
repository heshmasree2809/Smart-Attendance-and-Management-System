import React from "react";
import QRCode from "react-qr-code";

export default function IDCard() {
  // ✅ Dummy student data (later replace with API)
  const student = {
    name: "Aditya Kumar",
    gender: "male",     // change 'female' to show 👧
    regd: "22CSE001",
    department: "CSE",
    year: "III",
    section: "A",
    email: "aditya.kumar@scaams.edu",
  };

  // ✅ Auto avatar (Emoji Profile)
  const avatar = student.gender === "male" ? "👦" : "👧";

  return (
    <div>
      <h1 className="section-title">Student ID Card</h1>

      <div className="glass-card max-w-md mx-auto text-center p-6">

        {/* Avatar */}
        <div className="text-6xl mb-4">
          {avatar}
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-[#4C1D95]">
          {student.name}
        </h2>

        {/* Registration Number */}
        <p className="text-slate-600 mt-1">
          Regd No: <span className="font-semibold">{student.regd}</span>
        </p>

        {/* Department / Year / Section */}
        <div className="mt-3 space-y-1">
          <p className="text-slate-700">
            Department: <span className="font-semibold">{student.department}</span>
          </p>

          <p className="text-slate-700">
            Year: <span className="font-semibold">{student.year}</span>
          </p>

          <p className="text-slate-700">
            Section: <span className="font-semibold">{student.section}</span>
          </p>
        </div>

        {/* Email */}
        <p className="text-slate-500 mt-3">
          {student.email}
        </p>

        {/* QR Code */}
        <div className="mt-5 flex justify-center">
          <div className="bg-white p-3 rounded-xl shadow-md">
            <QRCode
              value={student.regd}
              size={120}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

// models/Attendance.js
import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    regdNo: String,
    classId: String,
    period: String,
    status: { type: String, default: "present" },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", AttendanceSchema);

// controllers/attendanceController.js
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import dayjs from "dayjs";

// Faculty generates QR payload (you already generate QR on frontend)
// We can still provide a helper endpoint if needed.
export const generateQR = async (req, res) => {
  // (Optional) You can validate class/period or sign payload
  const { classId, period } = req.body;
  if (!classId || !period) return res.status(400).json({ error: "classId & period required" });
  const payload = `classId=${encodeURIComponent(classId)}&period=${encodeURIComponent(period)}&ts=${Date.now()}`;
  res.json({ payload });
};

// Student submits after scan
export const markAttendance = async (req, res) => {
  try {
    const { regdNo, classId, period } = req.body;
    if (!regdNo || !classId || !period) {
      return res.status(400).json({ error: "regdNo, classId, period required" });
    }

    // Try to associate student by rollNo if exists:
    const student = await User.findOne({ rollNo: regdNo, role: "student" });
    const faculty = req.user?.role === "faculty" ? req.user.id : null; // if faculty marks
    const record = await Attendance.create({
      regdNo,
      classId,
      period: String(period),
      status: "present",
      student: student?._id || null,
      faculty: faculty || null,
      timestamp: new Date(),
    });

    res.json({ message: "Attendance marked", record });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// For student (their own records)
export const getByStudent = async (req, res) => {
  const me = await User.findById(req.user.id);
  if (!me || me.role !== "student") return res.status(403).json({ error: "Forbidden" });
  const list = await Attendance.find({ $or: [{ student: me._id }, { regdNo: me.rollNo }] }).sort({ timestamp: -1 });
  res.json(list);
};

// For faculty (all records, optionally filter by classId or date)
export const getByFaculty = async (req, res) => {
  const { classId, date } = req.query;
  const q = {};
  if (classId) q.classId = classId;
  if (date) {
    const start = dayjs(date).startOf("day").toDate();
    const end = dayjs(date).endOf("day").toDate();
    q.timestamp = { $gte: start, $lte: end };
  }
  const list = await Attendance.find(q).sort({ timestamp: -1 });
  res.json(list);
};

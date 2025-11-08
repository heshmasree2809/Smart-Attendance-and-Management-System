// controllers/studentController.js
import Assignment from "../models/Assignment.js";
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";

export const myAttendance = async (req, res) => {
  const me = await User.findById(req.user.id);
  const list = await Attendance.find({ $or: [{ student: me._id }, { regdNo: me.rollNo }] }).sort({ timestamp: -1 });
  res.json(list);
};

export const myAssignments = async (_req, res) => {
  const list = await Assignment.find().sort({ createdAt: -1 });
  res.json(list);
};

// Mock marks — replace with real marks collection if needed
export const myMarks = async (_req, res) => {
  res.json([
    { subject: "OS", internal: 24, external: 58, total: 82 },
    { subject: "DBMS", internal: 20, external: 64, total: 84 },
    { subject: "CN", internal: 22, external: 60, total: 82 },
  ]);
};

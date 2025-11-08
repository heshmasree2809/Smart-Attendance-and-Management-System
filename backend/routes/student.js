// routes/student.js
import express from "express";
import auth from "../middleware/auth.js";
import Assignment from "../models/Assignment.js";
import Attendance from "../models/Attendance.js";
import Mark from "../models/Mark.js";
import Timetable from "../models/Timetable.js";

const router = express.Router();

router.get("/assignments", auth, async (_req, res) => {
  const list = await Assignment.find().select("-submissions").sort({ createdAt: -1 });
  res.json(list);
});

router.get("/attendance", auth, async (req, res) => {
  const rows = await Attendance.find({ student: req.user.id }).sort({ timestamp: -1 });
  res.json(rows);
});

router.get("/marks", auth, async (req, res) => {
  const list = await Mark.find({ student: req.user.id }).populate("course", "code name");
  res.json(list);
});

router.get("/timetable", auth, async (req, res) => {
  const t = await Timetable.findOne({ student: req.user.id }).populate("week.slots.course", "code name");
  res.json(t || { week: [] });
});

export default router;

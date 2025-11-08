// routes/attendance.js
import express from "express";
import auth from "../middleware/auth.js";
import Attendance from "../models/Attendance.js";
import User from "../models/User.js";
import Course from "../models/Course.js";

const router = express.Router();

/**
 * Faculty: mark attendance for a list of students
 * body: { date?, period, courseCode, present: [{regdNo}], absent: [{regdNo}] }
 */
router.post("/mark", auth, async (req, res) => {
  try {
    if (req.user.role !== "faculty") return res.status(403).json({ message: "Forbidden" });

    const { period, courseCode, present = [], absent = [], date } = req.body;
    if (!period || !courseCode) return res.status(400).json({ message: "period and courseCode are required" });

    const course = await Course.findOne({ code: courseCode });
    if (!course) return res.status(404).json({ message: "Course not found" });

    const stamp = date ? new Date(date) : new Date();

    // upsert per regdNo (so repeat marking fixes mistake for that period/date/course)
    const ops = [];
    const mark = async (regdNo, status) => {
      const student = await User.findOne({ role: "student", regdNo });
      if (!student) return;
      ops.push({
        updateOne: {
          filter: { regdNo, period, classId: courseCode, date: stamp.toISOString().slice(0,10) },
          update: {
            $set: {
              regdNo,
              classId: courseCode,
              period: String(period),
              status,
              student: student._id,
              faculty: req.user.id,
              timestamp: stamp
            }
          },
          upsert: true
        }
      });
    };

    for (const s of present) await mark(s.regdNo || s, "present");
    for (const s of absent)  await mark(s.regdNo || s, "absent");

    if (ops.length) await Attendance.bulkWrite(ops);

    return res.json({ message: "Attendance saved", updates: ops.length });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Faculty: list attendance with filters
 * query: date=YYYY-MM-DD&period=&courseCode=
 */
router.get("/", auth, async (req, res) => {
  try {
    const { date, period, courseCode } = req.query;
    const filter = {};
    if (date) filter.date = date;
    if (period) filter.period = String(period);
    if (courseCode) filter.classId = courseCode;

    const records = await Attendance.find(filter).sort({ timestamp: -1 });
    res.json(records);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * Student: my daily/overall summary
 */
router.get("/student/summary", auth, async (req, res) => {
  try {
    if (req.user.role !== "student") return res.status(403).json({ message: "Forbidden" });

    // pull by student id
    const mine = await Attendance.find({ student: req.user.id });
    const total = mine.length;
    const present = mine.filter(x => x.status === "present").length;

    // subject/course wise
    const byCourse = {};
    for (const r of mine) {
      byCourse[r.classId] ??= { total: 0, present: 0 };
      byCourse[r.classId].total++;
      if (r.status === "present") byCourse[r.classId].present++;
    }

    res.json({
      total,
      present,
      percentage: total ? Math.round((present / total) * 100) : 0,
      byCourse
    });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

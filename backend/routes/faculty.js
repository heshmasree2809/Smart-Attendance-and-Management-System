// routes/faculty.js
import express from "express";
import auth from "../middleware/auth.js";
import Attendance from "../models/Attendance.js";
import Mark from "../models/Mark.js";
import Course from "../models/Course.js";
import User from "../models/User.js";

const router = express.Router();

/** quick “my courses” — demo: all courses in my department (if stored) */
router.get("/courses", auth, async (req, res) => {
  if (req.user.role !== "faculty") return res.status(403).json({ message: "Forbidden" });

  const me = await User.findById(req.user.id);
  const list = await Course.find(me?.department ? { department: me.department } : {});
  res.json(list);
});

/** attendance listing (same as /attendance but scoped if you like) */
router.get("/attendance", auth, async (_req, res) => {
  const list = await Attendance.find().sort({ timestamp: -1 }).limit(500);
  res.json(list);
});

/** marks entry: upsert for many students */
router.post("/marks/upsert", auth, async (req, res) => {
  try {
    const { courseCode, rows } = req.body; // rows: [{ studentId, internal, external }]
    const course = await Course.findOne({ code: courseCode });
    if (!course) return res.status(404).json({ message: "Course not found" });

    for (const r of rows) {
      await Mark.findOneAndUpdate(
        { student: r.studentId, course: course._id },
        { $set: { internal: r.internal ?? 0, external: r.external ?? 0 } },
        { upsert: true }
      );
    }
    res.json({ message: "Marks saved", count: rows.length });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

// routes/admin.js
import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Department from "../models/Department.js";
import Course from "../models/Course.js";
import Assignment from "../models/Assignment.js";
import Attendance from "../models/Attendance.js";

const router = express.Router();

router.get("/stats", auth, async (_req, res) => {
  const [students, faculty, courses, assignments, attendance] = await Promise.all([
    User.countDocuments({ role: "student" }),
    User.countDocuments({ role: "faculty" }),
    Course.countDocuments(),
    Assignment.countDocuments(),
    Attendance.countDocuments()
  ]);
  res.json({ students, faculty, courses, assignments, attendance });
});

/** basic CRUD — Users (create minimal) */
router.get("/users", auth, async (_req, res) => {
  const list = await User.find().select("-password").limit(500);
  res.json(list);
});

router.post("/users", auth, async (req, res) => {
  const created = await User.create(req.body);
  res.json(created);
});

router.delete("/users/:id", auth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});

/** Departments */
router.get("/departments", auth, async (_req, res) => {
  res.json(await Department.find());
});
router.post("/departments", auth, async (req, res) => {
  res.json(await Department.create(req.body));
});

/** Courses */
router.get("/courses", auth, async (_req, res) => {
  res.json(await Course.find());
});
router.post("/courses", auth, async (req, res) => {
  res.json(await Course.create(req.body));
});

export default router;

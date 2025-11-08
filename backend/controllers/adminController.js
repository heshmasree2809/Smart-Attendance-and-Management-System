// controllers/adminController.js
import User from "../models/User.js";
import Department from "../models/Department.js";
import Course from "../models/Course.js";
import Notice from "../models/Notice.js";
import bcrypt from "bcryptjs";

export const stats = async (req, res) => {
  const totalStudents = await User.countDocuments({ role: "student" });
  const totalFaculty = await User.countDocuments({ role: "faculty" });
  const totalDepartments = await Department.countDocuments();
  const activeCourses = await Course.countDocuments();
  res.json({ totalStudents, totalFaculty, totalDepartments, activeCourses });
};

// Users
export const allUsers = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

export const createUser = async (req, res) => {
  const { name, email, password, role, rollNo, year, department } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: "Email exists" });
  const hash = await bcrypt.hash(password || "Pass@123", 10);
  const user = await User.create({ name, email, password: hash, role, rollNo, year, department });
  res.json({ message: "Created", user });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const payload = { ...req.body };
  if (payload.password) payload.password = await bcrypt.hash(payload.password, 10);
  const user = await User.findByIdAndUpdate(id, payload, { new: true }).select("-password");
  res.json({ message: "Updated", user });
};

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// Departments
export const getDepartments = async (req, res) => res.json(await Department.find());
export const createDepartment = async (req, res) => res.json(await Department.create(req.body));
export const updateDepartment = async (req, res) => res.json(await Department.findByIdAndUpdate(req.params.id, req.body, { new: true }));
export const deleteDepartment = async (req, res) => { await Department.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); };

// Courses
export const getCourses = async (req, res) => res.json(await Course.find());
export const createCourse = async (req, res) => res.json(await Course.create(req.body));
export const updateCourse = async (req, res) => res.json(await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }));
export const deleteCourse = async (req, res) => { await Course.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); };

// Notices
export const getNotices = async (req, res) => res.json(await Notice.find().sort({ createdAt: -1 }));
export const createNotice = async (req, res) => res.json(await Notice.create(req.body));
export const updateNotice = async (req, res) => res.json(await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true }));
export const deleteNotice = async (req, res) => { await Notice.findByIdAndDelete(req.params.id); res.json({ message: "Deleted" }); };

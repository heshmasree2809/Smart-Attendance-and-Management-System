// controllers/facultyController.js
import Attendance from "../models/Attendance.js";
import Assignment from "../models/Assignment.js";

export const facultyAttendance = async (req, res) => {
  const list = await Attendance.find().sort({ timestamp: -1 });
  res.json(list);
};

export const facultyAssignments = async (req, res) => {
  const list = await Assignment.find({ faculty: req.user.id }).sort({ createdAt: -1 });
  res.json(list);
};

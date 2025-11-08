// controllers/assignmentController.js
import Assignment from "../models/Assignment.js";
import User from "../models/User.js";

export const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, courseCode, courseName } = req.body;
    const files = (req.files || []).map((f) => `/uploads/${f.filename}`);

    const assignment = await Assignment.create({
      title,
      description,
      dueDate,
      course: { code: courseCode, name: courseName },
      faculty: req.user.id,
      attachments: files,
    });

    res.json({ message: "Created", assignment });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const allFacultyAssignments = async (req, res) => {
  const list = await Assignment.find({ faculty: req.user.id }).sort({ createdAt: -1 });
  res.json(list);
};

export const allStudentAssignments = async (req, res) => {
  // You can filter by student's year/department if stored in User
  const list = await Assignment.find().sort({ createdAt: -1 });
  res.json(list);
};

export const submitAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await User.findById(req.user.id);
    if (!student || student.role !== "student") return res.status(403).json({ error: "Forbidden" });

    const files = (req.files || []).map((f) => `/uploads/${f.filename}`);
    const { text } = req.body;

    const assignment = await Assignment.findById(id);
    if (!assignment) return res.status(404).json({ error: "Not found" });

    assignment.submissions.push({
      student: student._id,
      regdNo: student.rollNo,
      files,
      text: text || "",
      submittedAt: new Date(),
    });

    await assignment.save();
    res.json({ message: "Submitted", assignment });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const gradeSubmission = async (req, res) => {
  const { id } = req.params; // assignment id
  const { regdNo, marks, remarks } = req.body;

  const assignment = await Assignment.findById(id);
  if (!assignment) return res.status(404).json({ error: "Not found" });

  const sub = assignment.submissions.find((s) => s.regdNo === regdNo);
  if (!sub) return res.status(404).json({ error: "Submission not found" });

  sub.marks = marks;
  sub.remarks = remarks;
  await assignment.save();
  res.json({ message: "Graded", assignment });
};

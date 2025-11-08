// routes/assignments.js
import express from "express";
import multer from "multer";
import path from "path";
import auth from "../middleware/auth.js";
import Assignment from "../models/Assignment.js";

const router = express.Router();

// simple local uploads folder
const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, "uploads"),
  filename: (_, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

/** Faculty: create assignment */
router.post("/", auth, upload.array("attachments", 5), async (req, res) => {
  try {
    if (req.user.role !== "faculty") return res.status(403).json({ message: "Forbidden" });

    const { title, description, dueDate, courseCode, courseName } = req.body;
    const files = (req.files || []).map(f => `/uploads/${path.basename(f.path)}`);

    const doc = await Assignment.create({
      title, description, dueDate,
      course: { code: courseCode, name: courseName },
      faculty: req.user.id,
      attachments: files
    });

    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

/** Faculty: list my assignments */
router.get("/faculty", auth, async (req, res) => {
  if (req.user.role !== "faculty") return res.status(403).json({ message: "Forbidden" });
  const list = await Assignment.find({ faculty: req.user.id }).sort({ createdAt: -1 });
  res.json(list);
});

/** Student: list all assignments (could filter by section/course later) */
router.get("/student", auth, async (_req, res) => {
  const list = await Assignment.find().select("-submissions").sort({ createdAt: -1 });
  res.json(list);
});

/** Student: submit assignment (text or files) */
router.post("/:id/submit", auth, upload.array("files", 5), async (req, res) => {
  try {
    if (req.user.role !== "student") return res.status(403).json({ message: "Forbidden" });
    const { text, regdNo } = req.body;
    const files = (req.files || []).map(f => `/uploads/${path.basename(f.path)}`);

    const doc = await Assignment.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          submissions: {
            student: req.user.id,
            regdNo,
            files,
            text,
            submittedAt: new Date()
          }
        }
      },
      { new: true }
    );
    res.json(doc);
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

/** Faculty: view submissions */
router.get("/:id/submissions", auth, async (req, res) => {
  if (req.user.role !== "faculty") return res.status(403).json({ message: "Forbidden" });
  const a = await Assignment.findById(req.params.id).populate("submissions.student", "name email regdNo");
  res.json(a?.submissions || []);
});

/** Faculty: grade a submission */
router.post("/:id/grade", auth, async (req, res) => {
  try {
    const { regdNo, marks, remarks } = req.body;
    const a = await Assignment.findById(req.params.id);
    if (!a) return res.status(404).json({ message: "Not found" });

    const sub = a.submissions.find(s => s.regdNo === regdNo);
    if (!sub) return res.status(404).json({ message: "Submission not found" });

    sub.marks = Number(marks ?? 0);
    sub.remarks = remarks || "";
    await a.save();

    res.json({ message: "Graded", submission: sub });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

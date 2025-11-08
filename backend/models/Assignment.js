// models/Assignment.js
import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    dueDate: String,
    course: { code: String, name: String },
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    attachments: [String], // file URLs
    submissions: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        regdNo: String,
        files: [String],
        text: String,
        submittedAt: Date,
        marks: Number,
        remarks: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", AssignmentSchema);

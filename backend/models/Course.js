// models/Course.js
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    code: { type: String, unique: true },
    name: String,
    department: String,
    year: String,
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);

// models/Department.js
import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema(
  { name: { type: String, unique: true }, code: String },
  { timestamps: true }
);

export default mongoose.model("Department", DepartmentSchema);

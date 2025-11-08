// models/Notice.js
import mongoose from "mongoose";

const NoticeSchema = new mongoose.Schema(
  {
    title: String,
    message: String,
    audience: { type: String, enum: ["all", "students", "faculty", "admin"], default: "all" },
  },
  { timestamps: true }
);

export default mongoose.model("Notice", NoticeSchema);

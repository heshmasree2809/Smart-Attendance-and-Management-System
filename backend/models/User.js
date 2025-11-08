import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "faculty", "admin"], required: true },

    // Student fields
    regdNo: String,
    department: String,
    year: String,
    section: String,

    // Faculty fields
    facultyId: String,

    // Admin fields (optional)
    adminId: String
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);

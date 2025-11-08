// server.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import attendanceRoutes from "./routes/attendance.js";
import assignmentRoutes from "./routes/assignments.js";
import adminRoutes from "./routes/admin.js";
import studentRoutes from "./routes/student.js";
import facultyRoutes from "./routes/faculty.js";

const app = express();
dotenv.config();
connectDB();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// serve uploads (assignment files)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API prefix
app.use("/api/auth", authRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/faculty", facultyRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ SCAAMS API running http://localhost:${PORT}`));

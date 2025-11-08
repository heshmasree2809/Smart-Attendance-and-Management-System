// backend/scripts/seedUsers.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const users = [
  // ----- Faculty -----
  {
    name: "Dr. Anil Reddy",
    email: "anil.reddy@vignan.ac.in",
    password: "pass123",
    role: "faculty",
    facultyId: "FAC001",
    department: "CSE"
  },
  {
    name: "Prof. Kavya Sharma",
    email: "kavya.sharma@vignan.ac.in",
    password: "pass123",
    role: "faculty",
    facultyId: "FAC002",
    department: "CSE"
  },

  // ----- Students -----
  {
    name: "Priya Sharma",
    email: "student1@vignan.ac.in",
    password: "pass123",
    role: "student",
    regdNo: "21FA04001",
    department: "CSE",
    year: "II",
    section: "A"
  },
  {
    name: "Rahul Verma",
    email: "student2@vignan.ac.in",
    password: "pass123",
    role: "student",
    regdNo: "21FA04002",
    department: "CSE",
    year: "II",
    section: "A"
  },
  {
    name: "Keerthi Rao",
    email: "student3@vignan.ac.in",
    password: "pass123",
    role: "student",
    regdNo: "21ECE04001",
    department: "ECE",
    year: "II",
    section: "B"
  }
];

async function seedDB() {
  try {
    console.log("⏳ Connecting...");
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected! Clearing old users...");
    await User.deleteMany({});

    for (let u of users) {
      u.password = await bcrypt.hash(u.password, 10);
      await User.create(u);
      console.log("✅ Inserted:", u.email);
    }

    console.log("🎉 Done seeding users!");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

seedDB();

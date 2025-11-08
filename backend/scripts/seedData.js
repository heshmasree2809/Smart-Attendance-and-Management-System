// scripts/seedData.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User.js";
import Course from "../models/Course.js";
import Department from "../models/Department.js";
import Mark from "../models/Mark.js";
import Attendance from "../models/Attendance.js";
import Timetable from "../models/Timetable.js";

dotenv.config();

const MONGO = process.env.MONGO_URI;

function rand(arr){ return arr[Math.floor(Math.random()*arr.length)]; }

async function main() {
  console.log("⏳ Connecting...");
  await mongoose.connect(MONGO);
  console.log("✅ Connected");

  // wipe optional
  await Promise.all([
    Course.deleteMany({}),
    Department.deleteMany({}),
    Mark.deleteMany({}),
    Attendance.deleteMany({}),
    Timetable.deleteMany({})
  ]);

  // keep existing users (since you already hashed). Or create a few if none:
  const usersCount = await User.countDocuments();
  if (usersCount === 0) {
    const pwd = await bcrypt.hash("pass123", 10);
    const deps = ["CSE","ECE","EEE","MECH"];
    const bulk = [];

    // 10 faculty
    for (let i=1;i<=10;i++){
      bulk.push({
        name:`Faculty ${i}`, email:`faculty${i}@vignan.ac.in`, password: pwd,
        role:"faculty", facultyId:`FAC${String(i).padStart(3,"0")}`, department: rand(deps)
      });
    }
    // 60 students
    for (let i=1;i<=60;i++){
      const dept = rand(deps);
      bulk.push({
        name:`Student ${i}`, email:`student${i}@vignan.ac.in`, password: pwd,
        role:"student", regdNo:`22${dept}${String(i).padStart(3,"0")}`,
        department: dept, year: String( (i%4)+1 ), section: ["A","B","C"][i%3]
      });
    }
    await User.insertMany(bulk);
    console.log("👥 Seeded users (minimal) =", bulk.length);
  } else {
    console.log("👥 Keeping existing users =", usersCount);
  }

  // Departments
  const depDocs = await Department.insertMany([
    { name: "Computer Science & Engineering", code: "CSE" },
    { name: "Electronics & Communication",  code: "ECE" },
    { name: "Electrical & Electronics",     code: "EEE" }
  ]);
  console.log("🏢 Departments:", depDocs.length);

  // Courses
  const courseDocs = await Course.insertMany([
    { code: "CSE101", name: "Operating Systems",     department: "CSE", year: "3" },
    { code: "CSE102", name: "Database Systems",      department: "CSE", year: "3" },
    { code: "CSE103", name: "Computer Networks",     department: "CSE", year: "3" },
    { code: "ECE201", name: "Digital Electronics",   department: "ECE", year: "2" },
  ]);
  console.log("📚 Courses:", courseDocs.length);

  // Timetable (attach for first 20 students)
  const first20 = await User.find({ role:"student" }).limit(20);
  for (const stu of first20) {
    await Timetable.create({
      student: stu._id,
      week: [
        { day: "Mon", slots: [{ time:"10:00-11:00", course: courseDocs[0]._id, room:"A-301" }]},
        { day: "Tue", slots: [{ time:"09:00-10:00", course: courseDocs[1]._id, room:"B-105" }]},
        { day: "Wed", slots: [{ time:"12:00-01:00", course: courseDocs[2]._id, room:"C-204" }]}
      ]
    });
  }
  console.log("🗓️ Timetables:", first20.length);

  // Marks for first 20 students across 3 CSE courses
  for (const stu of first20) {
    for (const c of courseDocs.slice(0,3)) {
      await Mark.create({
        student: stu._id, course: c._id,
        internal: Math.floor(Math.random()*25),
        external: Math.floor(Math.random()*75)
      });
    }
  }
  console.log("📊 Marks:", first20.length*3);

  // Attendance (last 7 days for first 20 students, for CSE101)
  const cse101 = courseDocs[0];
  const today = new Date();
  const docs = [];
  for (let d=0; d<7; d++){
    const day = new Date(today); day.setDate(today.getDate()-d);
    const dateStr = day.toISOString().slice(0,10);
    for (const stu of first20) {
      docs.push({
        regdNo: stu.regdNo,
        classId: cse101.code,
        period: String( (d%5)+1 ),
        status: Math.random() < 0.85 ? "present" : "absent",
        student: stu._id,
        timestamp: new Date(dateStr+"T10:00:00Z"),
        date: dateStr
      });
    }
  }
  await Attendance.insertMany(docs);
  console.log("🧾 Attendance rows:", docs.length);

  await mongoose.disconnect();
  console.log("✅ Seed complete");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});

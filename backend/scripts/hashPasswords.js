import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

console.log("⏳ Connecting to MongoDB...");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected");

    const users = await User.find();

    for (let user of users) {
      if (!user.password.startsWith("$2a$")) {
        const hashed = await bcrypt.hash(user.password, 10);
        user.password = hashed;
        await user.save();
        console.log("✅ Updated Password:", user.email);
      }
    }

    console.log("🎉 All passwords hashed successfully");
    process.exit();
  })
  .catch(err => console.log("❌ Error:", err));

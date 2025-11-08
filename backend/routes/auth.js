import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, role } = req.body;

    console.log("LOGIN REQUEST:", req.body);

    // ✅ Find user only by email and role
    const user = await User.findOne({ email, role });

    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ NO PASSWORD CHECK (TEMPORARY FIX)
    // Allows login without validating password
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Success",
      token,
      user,
    });

  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;

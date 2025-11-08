// middleware/auth.js
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: "No token" });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, role, email } from your login
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

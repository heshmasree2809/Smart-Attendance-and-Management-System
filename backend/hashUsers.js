import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGO_URI = "YOUR_ATLAS_URL_HERE";

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ Error:", err));

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  password: String,
  regdno: String,
  department: String,
  year: String,
  section: String
}, { collection: "users" });

const User = mongoose.model("User", UserSchema);

async function hashPasswords() {
  const users = await User.find({});

  for (const u of users) {
    if (!u.password.startsWith("$2b$")) {
      const hashed = await bcrypt.hash(u.password, 10);
      u.password = hashed;
      await u.save();
      console.log(`✅ Updated: ${u.email}`);
    }
  }

  console.log("🎉 All passwords hashed!");
  mongoose.disconnect();
}

hashPasswords();

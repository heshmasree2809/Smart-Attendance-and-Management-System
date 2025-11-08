import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authAPI } from "../../services/api.js";
  // ✅ IMPORTANT

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await authAPI.login({ email, password, role });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("scaams_user", JSON.stringify(res.data.user));

      toast.success("Login Successful ✅");
      navigate(`/${role}/dashboard`);

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
      bg-gradient-to-br from-[#F5F3FF] via-[#EDE9FE] to-[#F3E8FF] p-4">

      <form onSubmit={submit} className="glass-card w-full max-w-md animate-pop">
        <h1 className="text-4xl font-semibold text-center text-[#4C1D95] mb-3">
          Welcome Back
        </h1>

        <div className="space-y-4">
          <input
            type="email"
            className="input"
            placeholder="Enter Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="input"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="admin">Admin</option>
          </select>

          <button className="btn-primary w-full mt-2 py-3 text-base rounded-xl">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

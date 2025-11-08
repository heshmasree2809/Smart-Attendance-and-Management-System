import axios from "axios";


const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ---------- AUTH ----------
export const authAPI = {
  login: (data) => API.post("/auth/login", data),
};

// ---------- STUDENT ----------
export const studentAPI = {
  attendance: () => API.get("/student/attendance"),
  marks: () => API.get("/student/marks"),
  assignments: () => API.get("/student/assignments"),
};

// ---------- FACULTY ----------
export const facultyAPI = {
  generateQR: (payload) => API.post("/faculty/generate-qr", payload),
  attendanceList: () => API.get("/faculty/attendance"),
  assignments: () => API.get("/faculty/assignments"),
};

// ---------- ADMIN ----------
export const adminAPI = {
  getDashboardStats: () => API.get("/admin/stats"),
  getUsers: () => API.get("/admin/users"),
};

export default API;

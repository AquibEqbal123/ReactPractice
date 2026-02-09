import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem("admin_token");
  const employeeToken = localStorage.getItem("employee_token");

  let tokenToSend = null;

  try {
    // 🧠 Prefer admin token if API is admin-only
    if (config.url.startsWith("/dashboard") ||
        config.url.startsWith("/employees") ||
        config.url.startsWith("/departments") ||
        config.url.startsWith("/announcements") ||   // ✅ ADD THIS
        config.url.startsWith("/leaves") && config.method === "get") {
      tokenToSend = adminToken;
    } 
    // 👨‍💼 Employee APIs
    else {
      tokenToSend = employeeToken;
    }

    // fallback
    if (!tokenToSend) {
      tokenToSend = adminToken || employeeToken;
    }

    if (tokenToSend) {
      config.headers.Authorization = `Bearer ${tokenToSend}`;
    }
  } catch (err) {
    console.error("Token error", err);
  }

  return config;
});

export default axiosInstance;

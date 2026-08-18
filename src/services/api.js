// src/services/api.js
import axios from "axios";

const API_BASE_URL = "http://localhost/in%20jsesus%20name/backend/auth-file";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const authAPI = {
  // Login with role detection
  login: (username, password) => api.post("/login.php", { username, password }),

  // Register with role
  register: (userData) => api.post("/register.php", userData),

  // Get current user
  getCurrentUser: (userId) =>
    api.get(`/get-current-user.php?user_id=${userId}`),

  // Logout
  logout: () => api.post("/logout.php"),
};

export const adminAPI = {
  // Get all users (admin only)
  getAllUsers: () => api.get("/get-users.php"),

  // Update user type (admin only)
  updateUserType: (userId, userType) =>
    api.put("/update-user-type.php", { user_id: userId, user_type: userType }),
};

export default api;

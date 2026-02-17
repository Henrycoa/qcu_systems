// src/services/authService.js
import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:8000";

// Create axios instance for API calls
const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get CSRF token
const getCSRFToken = async () => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/accounts/api/csrf-token/`,
      {
        withCredentials: true,
      }
    );
    return response.data.csrfToken;
  } catch (error) {
    console.error("Failed to get CSRF token:", error);
    throw error;
  }
};

class AuthService {
  // Test backend connection
  async testConnection() {
    try {
      const csrfToken = await getCSRFToken();
      return {
        success: true,
        csrfToken,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Login
  async login(username, password) {
    try {
      // Get CSRF token first
      const csrfToken = await getCSRFToken();

      // Make login request
      const response = await api.post(
        "/accounts/api/login/",
        {
          username,
          password,
        },
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );

      return {
        success: true,
        user: response.data.user,
        csrfToken: csrfToken,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || error.message || "Login failed",
      };
    }
  }

  // Check authentication status
  async checkAuth() {
    try {
      const response = await api.get("/accounts/api/check-auth/");
      return response.data;
    } catch (error) {
      return {
        authenticated: false,
        error: error.message,
      };
    }
  }

  // Logout
  async logout() {
    try {
      const csrfToken = await getCSRFToken();
      const response = await api.post(
        "/accounts/api/logout/",
        {},
        {
          headers: {
            "X-CSRFToken": csrfToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Logout failed";
    }
  }
}

export default new AuthService();

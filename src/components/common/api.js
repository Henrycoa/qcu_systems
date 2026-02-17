
import axios from "axios";

// Backend URL configuration
const BACKEND_URL = "http://127.0.0.1:8000";

// Create axios instance
const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for CSRF token
api.interceptors.request.use(
  async (config) => {
    // Skip CSRF for token endpoint
    if (config.method === "get" && config.url.includes("csrf-token")) {
      return config;
    }

    let csrfToken = localStorage.getItem("csrfToken");

    // Fetch new token if needed
    if (
      !csrfToken ||
      ["post", "put", "patch", "delete"].includes(config.method)
    ) {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/accounts/api/csrf-token/`,
          {
            withCredentials: true,
          }
        );
        csrfToken = response.data.csrfToken;
        localStorage.setItem("csrfToken", csrfToken);
      } catch (error) {
        console.error("Failed to get CSRF token:", error);
      }
    }

    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem("user");
      localStorage.removeItem("csrfToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

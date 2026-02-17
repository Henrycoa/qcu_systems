// App.js (UPDATED VERSION)
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/pages/Login.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";
import Calendar from "./components/pages/calendar.jsx";
import QCHealthPermitLanding from "./components/pages/landing_page/LandingPage.jsx";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem("user");
      const csrfToken = localStorage.getItem("csrfToken");

      if (storedUser && csrfToken) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleLoginSuccess = (userData, csrfToken) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("csrfToken", csrfToken);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("csrfToken");
  };

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          // AUTHENTICATED ROUTES (Dashboard, etc.)
          <div className="flex min-h-screen bg-gray-50">
            <Sidebar
              isVisible={sidebarVisible}
              onNavigate={handleNavigate}
              activePage={activePage}
            />

            <div
              className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
              style={{
                marginLeft: sidebarVisible ? "0" : "-288px",
                width: sidebarVisible ? "calc(100% - 288px)" : "100%",
              }}
            >
              <Header
                onToggleSidebar={toggleSidebar}
                sidebarVisible={sidebarVisible}
                user={user}
                onLogout={handleLogout}
              />

              <main className="flex-1 p-4 md:p-6 overflow-auto">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                  <Route path="/login" element={<Navigate to="/dashboard" />} />

                  <Route path="/profile" element={<div>Profile Page</div>} />
                  <Route path="/tasks" element={<div>Tasks Page</div>} />
                  <Route path="/forms" element={<div>Forms Page</div>} />
                  <Route path="/tables" element={<div>Tables Page</div>} />
                  <Route path="/pages" element={<div>Pages Page</div>} />
                  <Route path="/messages" element={<div>Messages Page</div>} />
                  <Route path="/inbox" element={<div>Inbox Page</div>} />
                  <Route path="/invoice" element={<div>Invoice Page</div>} />
                  <Route path="/charts" element={<div>Charts Page</div>} />
                  <Route path="/auth" element={<div>Auth Page</div>} />

                  {/* ADDED: Landing Page accessible even when authenticated */}
                  <Route
                    path="/health-permit"
                    element={<QCHealthPermitLanding />}
                  />
                </Routes>
              </main>
            </div>
          </div>
        ) : (
          // UNAUTHENTICATED ROUTES (Public Pages)
          <Routes>
            <Route path="/" element={<QCHealthPermitLanding />} />
            <Route
              path="/login"
              element={<Login onLoginSuccess={handleLoginSuccess} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;

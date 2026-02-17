import React, { useState } from 'react';
import { 
  Search, 
  Sun, 
  Moon, 
  Bell, 
  ChevronDown,
  User,
  Settings,
  LogOut,
  RefreshCw
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({ onToggleSidebar, sidebarVisible, onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'User' };
  const userInitial = user?.username?.charAt(0).toUpperCase() || 'U';

  // Sign out function
  const handleSignOut = () => {
    // Clear all authentication data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('csrfToken');
    localStorage.removeItem('isAuthenticated');
    
    // Clear any other related data
    localStorage.clear();
    
    // Call parent logout handler if provided
    if (onLogout) {
      onLogout();
    }
    
    // Close profile dropdown
    setShowProfile(false);
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-30 h-[80px] flex items-center justify-between border-b border-gray-100 bg-white px-6">
      {/* Left Side - Menu Toggle + Title */}
      <div className="flex items-center gap-5">
        {/* Animated Hamburger Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          aria-label="Toggle Sidebar"
        >
          <div className="w-6 h-[18px] flex flex-col justify-between">
            <span 
              className={`block h-[2px] w-6 bg-[#2a3547] rounded-full transition-all duration-500 ease-in-out ${
                sidebarVisible ? '' : 'rotate-45 translate-y-2'
              }`}
            />
            <span 
              className={`block h-[2px] w-6 bg-[#2a3547] rounded-full transition-all duration-500 ease-in-out ${
                sidebarVisible ? '' : 'opacity-0'
              }`}
            />
            <span 
              className={`block h-[2px] w-6 bg-[#2a3547] rounded-full transition-all duration-500 ease-in-out ${
                sidebarVisible ? '' : '-rotate-45 -translate-y-2'
              }`}
            />
          </div>
        </button>

        {/* Page Title */}
        <div className="hidden lg:block">
          <div className="text-xl font-bold text-[#2a3547]">Dashboard</div>
          <p className="text-xs text-[#7c8fac] mt-0.5">Welcome, {user?.username || 'User'}!</p>
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="ml-auto flex items-center gap-2">
        {/* Search Input */}
        <div className="hidden lg:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7c8fac]" />
            <input
              type="text"
              placeholder="Search"
              className="w-[280px] pl-10 pr-4 py-2.5 bg-[#eef2ff] border border-[#e0e7ff] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1e4db7] focus:border-transparent text-[#2a3547] placeholder:text-[#7c8fac]"
            />
          </div>
        </div>

        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="w-10 h-10 flex items-center justify-center hover:bg-[#eef2ff] rounded-lg transition-colors"
          title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <Moon className="w-5 h-5 text-[#2a3547]" /> : <Sun className="w-5 h-5 text-[#2a3547]" />}
        </button>

        {/* Refresh Button */}
        <button 
          onClick={() => window.location.reload()}
          className="w-10 h-10 flex items-center justify-center hover:bg-[#eef2ff] rounded-lg transition-colors"
          title="Refresh page"
        >
          <RefreshCw className="w-5 h-5 text-[#2a3547]" />
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfile(false);
            }}
            className="relative w-10 h-10 flex items-center justify-center hover:bg-[#eef2ff] rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-[#2a3547]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-20">
                <div className="p-4 border-b border-gray-100">
                  <span className="text-sm font-semibold text-[#2a3547]">Notifications</span>
                </div>
                <div className="p-4 text-center text-sm text-[#7c8fac]">
                  No new notifications
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile */}
        <div className="relative ml-2">
          <button 
            onClick={() => {
              setShowProfile(!showProfile);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-3 pr-2 py-2 hover:bg-[#eef2ff] rounded-lg transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a56db] to-[#1e4db7] flex items-center justify-center text-white font-semibold text-sm">
              {userInitial}
            </div>
            <span className="hidden xl:block text-sm font-medium text-[#2a3547]">{user?.username || 'User'}</span>
            <ChevronDown className="hidden xl:block w-4 h-4 text-[#7c8fac]" />
          </button>

          {showProfile && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowProfile(false)} />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20">
                <div className="p-4 border-b border-gray-100">
                  <h6 className="text-sm font-semibold text-[#2a3547]">{user?.username || 'User'}</h6>
                  <span className="text-xs text-[#7c8fac]">
                    {user?.email || 'user@example.com'}
                  </span>
                </div>
                <div className="py-2">
                  <button 
                    onClick={() => navigate('/profile')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#2a3547] hover:bg-[#eef2ff]"
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </button>
                  <button 
                    onClick={() => navigate('/settings')}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#2a3547] hover:bg-[#eef2ff]"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Account Settings</span>
                  </button>
                  <hr className="my-2 border-gray-100" />
                  <button 
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
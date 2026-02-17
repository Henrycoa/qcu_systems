import React, { useState } from 'react';
import axios from 'axios';
import loginBgImage from '../../assets/images/tao.png';
import logoDark from '../../assets/images/logo-dark.svg';

// Import local icons or use fallback
// Kung wala kang local icons, maglagay ka muna ng placeholder o SVG inline

const Login = ({ onLoginSuccess }) => {
  const BACKEND_URL = 'http://127.0.0.1:8000';
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const getCSRFToken = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/accounts/api/csrf-token/`, {
        withCredentials: true
      });
      return response.data.csrfToken;
    } catch (error) {
      console.error('Failed to get CSRF token:', error);
      throw error;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const csrfToken = await getCSRFToken();
      
      const response = await axios.post(`${BACKEND_URL}/accounts/api/login/`, {
        username,
        password
      }, {
        headers: {
          'X-CSRFToken': csrfToken,
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      
      return {
        success: true,
        user: response.data.user,
        csrfToken: csrfToken
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || 'Invalid username or password'
      };
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (loginMessage) setLoginMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username.trim() || !formData.password) {
      setLoginMessage('⚠️ Please enter both username and password');
      return;
    }
    
    setLoading(true);
    setLoginMessage('');

    try {
      const result = await handleLogin(formData.username, formData.password);
      
      if (result.success) {
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('csrfToken', result.csrfToken);
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
        
        setLoginMessage('✅ Login successful! Redirecting...');
        
        if (onLoginSuccess) {
          setTimeout(() => {
            onLoginSuccess(result.user, result.csrfToken);
          }, 1500);
        }
        
      } else {
        setLoginMessage(`❌ ${result.error}`);
      }
    } catch (error) {
      setLoginMessage(`❌ Connection error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Inline SVG icons as fallback
  const GoogleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.68 8.18182C15.68 7.61455 15.6291 7.06909 15.5345 6.54545H8V9.64364H12.3055C12.1164 10.64 11.5491 11.4836 10.6982 12.0764V14.0691H13.2945C14.8073 12.6691 15.68 10.6182 15.68 8.18182Z" fill="#4285F4"/>
      <path d="M8 16C10.16 16 11.9709 15.2873 13.2945 14.0691L10.6982 12.0764C9.98545 12.5764 9.06545 12.8727 8 12.8727C5.92 12.8727 4.15273 11.4836 3.52 9.6H0.858182V11.6473C2.17455 14.2691 4.87273 16 8 16Z" fill="#34A853"/>
      <path d="M3.52 9.6C3.36 9.12727 3.26545 8.62545 3.26545 8.10545C3.26545 7.58545 3.36 7.08364 3.52 6.61091V4.56364H0.858182C0.312727 5.65818 0 6.89091 0 8.10545C0 9.32 0.312727 10.5527 0.858182 11.6473L3.52 9.6Z" fill="#FBBC05"/>
      <path d="M8 3.32727C9.17455 3.32727 10.2291 3.74182 11.0582 4.56L13.3527 2.26545C11.9673 0.956364 10.16 0 8 0C4.87273 0 2.17455 1.73091 0.858182 4.56364L3.52 6.61091C4.15273 4.72727 5.92 3.32727 8 3.32727Z" fill="#EA4335"/>
    </svg>
  );

  const FacebookIcon = () => (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M24.5 12.25C24.5 5.49 19.01 0 12.25 0S0 5.49 0 12.25C0 18.36 4.48 23.4 10.34 24.33V15.8H7.25V12.25H10.34V9.55C10.34 6.51 12.16 4.82 14.93 4.82C16.24 4.82 17.62 5.04 17.62 5.04V8.06H16.11C14.62 8.06 14.16 8.99 14.16 9.94V12.25H17.47L16.95 15.8H14.16V24.33C20.02 23.4 24.5 18.36 24.5 12.25Z" fill="#4267B2"/>
    </svg>
  );

  return (
    <div className="flex min-h-screen bg-[#fafbfb] font-['DM_Sans','Helvetica','Arial',sans-serif]">
      {/* Left Panel with Gradient Background */}
      <div className="hidden lg:flex lg:w-7/12 xl:w-8/12 relative">
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite'
          }}
        />
        
        {/* CSS for gradient animation */}
        <style jsx>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
        
        <div className="relative z-10 w-full flex flex-col">
          {/* Logo at top */}
          <div className="px-6 py-6">
            <a href="/" className="block h-[70px] w-[120px] overflow-hidden">
              <img 
                src={logoDark} 
                alt="logo"
                className="h-full w-full text-transparent"
                width={106}
                height={70}
              />
            </a>
          </div>
          
          {/* Centered Illustration */}
          <div className="flex-1 flex items-center justify-center h-[calc(100vh-75px)]">
            <img 
              src={loginBgImage} 
              alt="background"
              className="w-full max-w-[500px] max-h-[500px] text-transparent object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-5/12 xl:w-4/12 flex items-center justify-center p-8">
        <div className="w-full max-w-[400px] p-8">
          {/* Welcome Section */}
          <div className="mb-3">
            <h1 className="text-[1.3125rem] font-bold text-[#11142d] mb-1">
              Welcome to flexy
            </h1>
            <p className="text-base text-[#777e89]">
              Your Admin Dashboard
            </p>
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-2 mb-3" style={{ marginTop: '24px' }}>
            <button
              type="button"
              onClick={() => console.log('Google sign in')}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 border border-[#e9e9e9] text-[#11142d] py-[7px] px-[21px] rounded-[9px] text-[15px] font-medium hover:text-[#1e4db7] hover:border-[#1e4db7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minWidth: '0' }}
            >
              <div className="w-4 h-4 flex items-center justify-center mr-1">
                <GoogleIcon />
              </div>
              <span className="hidden sm:inline whitespace-nowrap">Sign in with </span>
              Google
            </button>
            
            <button
              type="button"
              onClick={() => console.log('Facebook sign in')}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 border border-[#e9e9e9] text-[#11142d] py-[7px] px-[21px] rounded-[9px] text-[15px] font-medium hover:text-[#1e4db7] hover:border-[#1e4db7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minWidth: '0' }}
            >
              <div className="w-6 h-6 flex items-center justify-center mr-1">
                <FacebookIcon />
              </div>
              <span className="hidden sm:inline whitespace-nowrap">Sign in with </span>
              FB
            </button>
          </div>

          {/* Divider */}
          <div className="my-3">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-[#e9e9e9] border-t-solid border-l-solid"></div>
              <span className="flex-shrink mx-4 text-[#777e89] text-[0.875rem] font-normal px-4 py-0 relative">
                or sign in with
              </span>
              <div className="flex-grow border-t border-[#e9e9e9] border-t-solid border-l-solid"></div>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-0">
            {/* Username Field */}
            <div className="mb-5">
              <label 
                htmlFor="username"
                className="block text-[#11142d] font-medium text-base mb-1"
                style={{ marginTop: '25px', marginBottom: '5px' }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter username"
                className="w-full px-[14px] py-3 text-base border border-[#DFE5EF] rounded-[9px] focus:outline-none focus:border-[#1e4db7] focus:border-2 hover:border-[#1e4db7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ height: 'auto' }}
              />
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label 
                htmlFor="password"
                className="block text-[#11142d] font-medium text-base mb-1"
                style={{ marginTop: '25px', marginBottom: '5px' }}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                placeholder="Enter password"
                className="w-full px-[14px] py-3 text-base border border-[#DFE5EF] rounded-[9px] focus:outline-none focus:border-[#1e4db7] focus:border-2 hover:border-[#1e4db7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ height: 'auto' }}
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-between items-center my-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="w-5 h-5 text-[#1e4db7] border-[#777e89] rounded focus:ring-[#1e4db7] mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ 
                    marginLeft: '-11px', 
                    marginRight: '16px', 
                    padding: '9px', 
                    borderRadius: '50%' 
                  }}
                />
                <span className="text-[#11142d] text-base">Remember this Device</span>
              </label>
              
              <a 
                href="/auth/auth1/forgot-password"
                className="text-[#1e4db7] font-medium text-base hover:underline disabled:opacity-50"
              >
                Forgot Password ?
              </a>
            </div>

            {/* Error/Success Message */}
            {loginMessage && (
              <div className={`p-3 rounded-[9px] text-center text-sm mb-2 ${
                loginMessage.includes('✅') 
                  ? 'bg-[#d4edda] text-[#155724] border border-[#c3e6cb]' 
                  : 'bg-[#f8d7da] text-[#721c24] border border-[#f5c6cb]'
              }`}>
                {loginMessage}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e4db7] text-white text-[15px] font-medium py-[8px] px-6 rounded-[9px] hover:bg-[#173f98] disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
              style={{ height: 'auto' }}
            >
              {loading && (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          {/* Create Account Link */}
          <div className="flex items-center mt-3" style={{ marginTop: '24px' }}>
            <span className="text-[#777e89] text-[0.875rem] font-medium mr-2">
              New to flexy?
            </span>
            <a
              href="/auth/auth1/register"
              className="text-[#1e4db7] text-[0.875rem] font-medium hover:underline"
              style={{ marginLeft: '8px' }}
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
// src/components/pages/landing_page/components/forms/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Key, AlertCircle, User } from 'lucide-react';

const InputWrapper = ({ label, icon: Icon, error, children }) => (
  <div className="space-y-2 text-left">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
      {Icon && <Icon className={`w-3.5 h-3.5 ${error ? 'text-red-500' : 'text-[#243ead]'}`} />}
      {label}
    </label>
    {children}
    {error && (
      <p className="text-red-500 text-xs font-bold flex items-center gap-1 animate-pulse">
        <AlertCircle className="w-3 h-3" /> {error}
      </p>
    )}
  </div>
);

const Login = ({ onLoginSuccess, onBack, onSwitchToRegister }) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (loginMessage) setLoginMessage('');
  };

  const handleLogin = async (username, password) => {
    try {
      // ✅ GAMITIN ANG CORS PROXY PARA MA-BYPASS ANG CORS
      const url = 'https://cors-anywhere.herokuapp.com/https://qcu.infinityfreeapp.com/backend/auth-file/login.php';
      console.log('🔄 Attempting login to:', url);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password })
      });
      
      const data = await response.json();
      console.log('✅ Login response:', data);
      
      if (data.status === 1 && data.success) {
        return {
          success: true,
          user: data.data.user,
          message: data.message
        };
      } else {
        return {
          success: false,
          error: data.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      return {
        success: false,
        error: 'Cannot connect to server. Please check your internet connection.'
      };
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginMessage('');

    try {
      const result = await handleLogin(formData.username, formData.password);
      
      if (result.success) {
        const user = result.user;
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('user_type', user.user_type);
        
        setLoginMessage('✅ Login successful! Redirecting...');
        
        if (onLoginSuccess) {
          onLoginSuccess(user);
        }
        
        setTimeout(() => {
          if (user.user_type === 'admin' || user.user_type === 'staff') {
            console.log('🔵 Redirecting to Admin Dashboard');
            navigate('/admin-dashboard');
          } else {
            console.log('🟢 Redirecting to User Dashboard');
            navigate('/dashboard');
          }
        }, 1000);
        
      } else {
        setLoginMessage(`❌ ${result.error}`);
        setErrors({ general: result.error });
      }
    } catch (error) {
      setLoginMessage(`❌ ${error.message}`);
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-[#243ead]">
          <Lock className="w-8 h-8" />
        </div>
        
        <div className="text-left">
          <h2 className="text-3xl font-black text-gray-900 uppercase italic leading-tight mb-2">Secure Access</h2>
          <p className="text-gray-500 font-medium mb-8">Please sign in to your account to continue.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {loginMessage && (
            <div className={`p-4 rounded-2xl text-sm font-bold ${loginMessage.includes('✅') ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
              <div className="flex items-center gap-2">
                {loginMessage.includes('✅') ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">✓</div>
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                {loginMessage}
              </div>
            </div>
          )}
          
          <InputWrapper label="Username or Email" icon={User} error={errors.username}>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username or email"
              className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800"
              disabled={isLoading}
              autoComplete="username"
            />
          </InputWrapper>

          <InputWrapper label="Password" icon={Key} error={errors.password}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
              className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800"
              disabled={isLoading}
              autoComplete="current-password"
            />
          </InputWrapper>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-2 bg-[#243ead] text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-blue-100 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:-translate-y-0 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Signing In...</span>
              </>
            ) : (
              'Sign In'
            )}
          </button>

          <div className="pt-4 text-center">
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-xs font-black uppercase text-[#243ead] tracking-tighter hover:underline"
              disabled={isLoading}
            >
              Don't have an account? Register Here
            </button>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-2 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-600 transition-all"
            disabled={isLoading}
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
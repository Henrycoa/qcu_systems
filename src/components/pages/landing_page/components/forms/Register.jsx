// src/components/pages/landing_page/components/forms/Register.jsx
import React, { useState } from 'react';
import { 
  ArrowLeft, User, Mail, Lock, Eye, EyeOff, 
  Phone, MapPin, UserCheck, AlertCircle, CheckCircle 
} from 'lucide-react';

const Register = ({ onRegisterSuccess, onBack, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    address: '',
    password: '',
    confirmPassword: '',
    gender: 'female'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost/in%20jsesus%20name/backend/auth-file/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_fname: formData.firstName,
          user_lname: formData.lastName,
          user_email: formData.email,
          user_address: formData.address,
          user_number: formData.mobileNumber,
          user_password: formData.password,
          gender: formData.gender,
          user_type: 'user'
        })
      });

      const result = await response.json();

      if (result.status === 1) {
        setSuccess(true);
        setError('');
        setTimeout(() => {
          if (onSwitchToLogin) {
            onSwitchToLogin();
          }
        }, 1500);
      } else {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-2xl w-full">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-gray-400 hover:text-gray-600 mb-6 text-sm font-bold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <UserCheck className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-[#243ead] uppercase italic">Create Account</h2>
          <p className="text-gray-500 text-sm mt-2">Register to access QC Health services</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium mb-4 border border-red-100 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-xl text-sm font-medium mb-4 border border-emerald-100 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
            Registration successful! Redirecting to login...
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase text-gray-500 block mb-1.5">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all text-gray-800"
                  placeholder="First Name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase text-gray-500 block mb-1.5">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all text-gray-800"
                  placeholder="Last Name"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-gray-500 block mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all text-gray-800"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-gray-500 block mb-1.5">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="tel"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all text-gray-800"
                placeholder="09123456789"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-gray-500 block mb-1.5">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-4 top-4 w-4 h-4 text-gray-400" />
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="2"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all text-gray-800 resize-none"
                placeholder="Quezon City, Philippines"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase text-gray-500 block mb-1.5">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all text-gray-800"
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase text-gray-500 block mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all text-gray-800"
                  placeholder="Min 6 characters"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-black uppercase text-gray-500 block mb-1.5">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-11 pr-12 py-3 bg-gray-50 border-2 rounded-xl outline-none focus:border-[#243ead] transition-all text-gray-800"
                  placeholder="Confirm password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3.5 bg-[#243ead] text-white font-black uppercase text-sm rounded-xl hover:bg-[#1a2f8a] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#243ead]/20 mt-2"
          >
            {loading ? 'Creating Account...' : success ? 'Success!' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-[#243ead] font-bold hover:underline transition-colors"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
import React, { useState } from 'react';
import { 
  Lock, 
  Key, 
  Mail, 
  User, 
  UserPlus, 
  ArrowLeft 
} from 'lucide-react';

// --- SUB-COMPONENT ---
const InputWrapper = ({ label, icon: Icon, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
      {Icon && <Icon className="w-3.5 h-3.5 text-[#243ead]" />}
      {label}
    </label>
    {children}
  </div>
);

// --- MAIN COMPONENT ---
const AuthScreen = ({ onLoginSuccess, onBack }) => {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 animate-in fade-in zoom-in duration-500">
        
        {/* Icon Header */}
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-[#243ead]">
          {isRegisterMode ? <UserPlus className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
        </div>
        
        {/* Titles */}
        <h2 className="text-3xl font-black text-gray-900 uppercase italic leading-tight mb-2">
          {isRegisterMode ? "Create Account" : "Secure Access"}
        </h2>
        <p className="text-gray-500 font-medium mb-8">
          {isRegisterMode 
            ? "Register to QC e-Services to start your application." 
            : "Please sign in to your account to continue."}
        </p>
        
        {/* Form Fields */}
        <div className="space-y-4">
          {isRegisterMode && (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <InputWrapper label="Full Name" icon={User}>
                <input 
                  type="text" 
                  placeholder="Juana Dela Cruz" 
                  className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800" 
                />
              </InputWrapper>
            </div>
          )}
          
          <InputWrapper label="Email Address" icon={Mail}>
            <input 
              type="email" 
              placeholder="example@email.com" 
              className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800" 
            />
          </InputWrapper>

          <InputWrapper label="Password" icon={Key}>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800" 
            />
          </InputWrapper>

          {/* Action Button */}
          <button 
            onClick={onLoginSuccess} 
            className="w-full py-4 mt-2 bg-[#243ead] text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-blue-100 hover:-translate-y-1 transition-all"
          >
            {isRegisterMode ? "Register & Continue" : "Sign In with QC ID"}
          </button>

          {/* Toggle Login/Register */}
          <div className="pt-4 text-center">
            <button 
              onClick={() => setIsRegisterMode(!isRegisterMode)}
              className="text-xs font-black uppercase text-[#243ead] tracking-tighter hover:underline"
            >
              {isRegisterMode ? "Already have an account? Login" : "Don't have an account? Register Here"}
            </button>
          </div>

          {/* Back Button */}
          <button 
            onClick={onBack} 
            className="w-full py-2 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-600 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
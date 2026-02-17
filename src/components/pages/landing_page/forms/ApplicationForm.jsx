import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, CheckCircle, FileText, 
  Upload, ShieldCheck, User, MapPin, Mail, Phone, 
  AlertCircle, Briefcase, Lock, Key, UserPlus 
} from 'lucide-react';

// --- SHARED SUB-COMPONENTS ---

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

const DocumentItem = ({ doc, subtext, onFileSelect, file }) => (
  <div className={`group relative flex items-center justify-between p-5 border-2 border-dashed rounded-2xl transition-all cursor-pointer ${file ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200 hover:border-[#243ead] hover:bg-blue-50/50'}`}>
    <div className="flex items-center gap-4 text-left">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${file ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-[#243ead]'}`}>
        <FileText className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-gray-900 leading-none truncate">{file ? file.name : doc}</h4>
        <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold tracking-tighter">
          {file ? 'File Uploaded' : subtext}
        </p>
      </div>
    </div>
    <label className="cursor-pointer ml-4">
      <input type="file" className="hidden" onChange={(e) => onFileSelect(doc, e.target.files[0])} />
      <div className={`p-3 shadow-sm rounded-xl border border-gray-100 transition-all ${file ? 'bg-emerald-600 text-white' : 'bg-white text-[#243ead] group-hover:bg-[#243ead] group-hover:text-white'}`}>
        {file ? <CheckCircle className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
      </div>
    </label>
  </div>
);

// --- MAIN COMPONENT ---

const ApplicationForm = ({ selectedPermit, onSubmitSuccess, onBack }) => {
  // Authentication & View States
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  // Form States
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [files, setFiles] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    address: '',
    industry: 'non-food',
    agreeToTerms: false
  });

  // Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (docType, file) => {
    setFiles(prev => ({ ...prev, [docType]: file }));
    if (errors.files) setErrors(prev => ({ ...prev, files: '' }));
  };

  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
      if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
    }
    if (step === 2) {
      if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Required";
      if (!formData.address.trim()) newErrors.address = "Complete address is required";
    }
    if (step === 3) {
      if (!files['Chest X-ray']) newErrors.files = "X-ray result is mandatory";
    }
    if (step === 4) {
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "Certify info correctness";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = () => {
    if (validateStep()) {
      const generatedRef = 'REF-QC-' + Math.random().toString(36).toUpperCase().substr(2, 6);
      onSubmitSuccess(generatedRef, formData);
    }
  };

  // --- 1. LOGIN / REGISTER VIEW (IPAPAKITA KUNG HINDI PA LOGGED IN) ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-[#243ead]">
            {isRegisterMode ? <UserPlus className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
          </div>
          
          <div className="text-left">
            <h2 className="text-3xl font-black text-gray-900 uppercase italic leading-tight mb-2">
              {isRegisterMode ? "Create Account" : "Secure Access"}
            </h2>
            <p className="text-gray-500 font-medium mb-8">
              {isRegisterMode 
                ? "Register to QC e-Services to start your application." 
                : "Please sign in to your account to continue."}
            </p>
          </div>
          
          <div className="space-y-4">
            {isRegisterMode && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <InputWrapper label="Full Name" icon={User}>
                  <input type="text" placeholder="Juana Dela Cruz" className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800" />
                </InputWrapper>
              </div>
            )}
            
            <InputWrapper label="Email Address" icon={Mail}>
              <input type="email" placeholder="example@email.com" className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800" />
            </InputWrapper>

            <InputWrapper label="Password" icon={Key}>
              <input type="password" placeholder="••••••••" className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800" />
            </InputWrapper>

            <button 
              onClick={() => setIsLoggedIn(true)} 
              className="w-full py-4 mt-2 bg-[#243ead] text-white font-black uppercase text-xs tracking-widest rounded-2xl shadow-xl shadow-blue-100 hover:-translate-y-1 transition-all"
            >
              {isRegisterMode ? "Register & Continue" : "Sign In with QC ID"}
            </button>

            <div className="pt-4 text-center">
              <button 
                onClick={() => setIsRegisterMode(!isRegisterMode)}
                className="text-xs font-black uppercase text-[#243ead] tracking-tighter hover:underline"
              >
                {isRegisterMode ? "Already have an account? Login" : "Don't have an account? Register Here"}
              </button>
            </div>

            <button 
              onClick={onBack} 
              className="w-full py-2 text-gray-400 font-black uppercase text-[10px] tracking-widest hover:text-gray-600 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. ACTUAL FORM VIEW (IPAPAKITA KAPAG LOGGED IN NA) ---
  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-left">
      <div className="bg-[#243ead] pt-12 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <button onClick={onBack} className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 font-black uppercase text-xs tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Cancel Application
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter mb-4 uppercase italic">
            QC Health <br/><span className="text-blue-300">Service Portal</span>
          </h1>
          <p className="text-blue-100/70 text-lg font-medium italic tracking-tight">Step {step} of 4</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-16">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
          <div className="flex w-full h-2 bg-gray-100">
            <div className="h-full bg-gradient-to-r from-blue-400 to-[#243ead] transition-all duration-500" style={{ width: `${(step / 4) * 100}%` }} />
          </div>

          <div className="p-8 md:p-12">
            <div className="min-h-[350px]">
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputWrapper label="First Name *" icon={User} error={errors.firstName}>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800" />
                    </InputWrapper>
                    <InputWrapper label="Last Name *" icon={User} error={errors.lastName}>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800" />
                    </InputWrapper>
                  </div>
                  <InputWrapper label="Email Address *" icon={Mail} error={errors.email}>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] font-bold text-gray-800" />
                  </InputWrapper>
                  <InputWrapper label="Work Category *" icon={Briefcase}>
                    <select name="industry" value={formData.industry} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] font-bold text-gray-800 appearance-none">
                      <option value="non-food">Non-Food Handler</option>
                      <option value="food">Food Handler</option>
                    </select>
                  </InputWrapper>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <InputWrapper label="Mobile Number *" icon={Phone} error={errors.mobileNumber}>
                    <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] font-bold text-gray-800" />
                  </InputWrapper>
                  <InputWrapper label="Complete QC Address *" icon={MapPin} error={errors.address}>
                    <textarea name="address" value={formData.address} onChange={handleInputChange} rows="4" className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] font-bold text-gray-800 resize-none" />
                  </InputWrapper>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <div className="grid grid-cols-1 gap-4">
                    <DocumentItem doc="Chest X-ray" subtext="Valid for 1 year" file={files['Chest X-ray']} onFileSelect={handleFileChange} />
                    <DocumentItem doc="Stool Exam" subtext="Valid for 6 months" file={files['Stool Exam']} onFileSelect={handleFileChange} />
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100">
                    <h3 className="text-sm font-black text-[#243ead] uppercase tracking-widest mb-6 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5" /> Summary
                    </h3>
                    <p className="font-bold text-gray-900 text-lg uppercase">{formData.firstName} {formData.lastName}</p>
                    <p className="text-sm text-gray-500 uppercase">{formData.industry}</p>
                  </div>
                  <label className="flex items-start gap-4 cursor-pointer p-6 bg-slate-50 rounded-2xl">
                    <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} className="mt-1 w-6 h-6 rounded-lg text-[#243ead]" />
                    <span className="text-xs text-gray-500 font-medium">I certify that all info is authentic.</span>
                  </label>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12 mt-12 border-t border-gray-100">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="w-full sm:w-auto px-8 py-4 text-gray-400 font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-gray-50 rounded-2xl transition-all">
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
              )}
              <div className="flex w-full sm:w-auto gap-4 ml-auto">
                {step < 4 ? (
                  <button type="button" onClick={handleNextStep} className="w-full sm:w-auto px-10 py-4 bg-[#243ead] text-white font-black uppercase text-xs rounded-2xl shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button type="button" onClick={handleFinalSubmit} className="w-full sm:w-auto px-10 py-4 bg-emerald-600 text-white font-black uppercase text-xs rounded-2xl shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                    Submit Application <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
// src/components/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, User, Building2, HeartPulse, UtensilsCrossed, 
  Droplets, RefreshCw, Stethoscope, GraduationCap, 
  Sparkles, ArrowRight, Shield, FileText, Calendar,
  MapPin, ClipboardCheck, Award, Star, HelpCircle, Phone,
  Menu, X, Home, Settings, Bell, ChevronUp, ArrowLeft,
  CheckCircle, AlertCircle, Upload, Briefcase, Mail,
  LayoutDashboard, ListChecks, FileCheck, Send, UserCheck,
  Clock, Check, AlertTriangle, Circle, File, Image, XCircle,
  BookOpen, Clipboard, Trophy, Download, RotateCcw, 
  ChevronDown, ChevronRight, MoreVertical, Table
} from 'lucide-react';

// ✅ Import separated components
import CertificateView from './CertificateView';
import ExamView from './ExamView';
import ExamResultView from './ExamResultView';

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  
  const [selectedService, setSelectedService] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [hiddenCardsVisible, setHiddenCardsVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  // ✅ Exam state
  const [showExam, setShowExam] = useState(false);
  const [examQuestions, setExamQuestions] = useState([]);
  const [examAnswers, setExamAnswers] = useState({});
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [examScore, setExamScore] = useState(0);
  const [examLoading, setExamLoading] = useState(false);
  
  // ✅ Certificate state
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState(null);
  
  // ✅ Application status
  const [applicationStatus, setApplicationStatus] = useState(null);
  const [allApplications, setAllApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  
  // ✅ Continue Modal
  const [showContinueModal, setShowContinueModal] = useState(false);
  
  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState({
    validId: null,
    barangayClearance: null,
    medicalCertificate: null,
    idPicture: null,
    cedula: null
  });
  const [fileErrors, setFileErrors] = useState({});
  
  // Form Data
  const [formData, setFormData] = useState({
    firstName: user?.user_fname || '',
    lastName: user?.user_lname || '',
    email: user?.user_email || '',
    mobileNumber: '',
    address: '',
    businessName: '',
    businessType: 'food',
    purpose: ''
  });

  // ✅ SCROLL STATE
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // ✅ Check application status on load
  useEffect(() => {
    const checkApplicationStatus = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        console.log('ℹ️ No user logged in');
        setLoadingApplications(false);
        return;
      }

      try {
        console.log('🔍 Checking application status for user...');
        setLoadingApplications(true);
        
        const response = await fetch('http://localhost/in%20jsesus%20name/backend/auth-file/get-my-applications.php', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        console.log('📡 Response status:', response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('📊 Applications response:', result);
        
        if (result.status === 1 && result.data && result.data.length > 0) {
          console.log('✅ Found', result.data.length, 'applications');
          setAllApplications(result.data);
          const latest = result.data[0];
          setApplicationStatus(latest);
          
          // ✅ Check if approved and no exam yet
          if (latest.status === 'approved' && !latest.exam_taken) {
            setShowExam(true);
            fetchExamQuestions();
          }
          
          // ✅ Check if exam passed and no certificate yet
          if (latest.exam_passed && !latest.certificate_issued) {
            fetchCertificate(latest.id);
          }
        } else {
          console.log('ℹ️ No applications found');
          setAllApplications([]);
        }
      } catch (error) {
        console.error('❌ Error checking status:', error);
        setAllApplications([]);
      } finally {
        setLoadingApplications(false);
      }
    };
    
    checkApplicationStatus();
  }, []);

  // ✅ Fetch exam questions
  const fetchExamQuestions = async () => {
    setExamLoading(true);
    try {
      const response = await fetch('http://localhost/in%20jsesus%20name/backend/auth-file/get-exam-questions.php', {
        credentials: 'include'
      });
      const result = await response.json();
      if (result.status === 1) {
        setExamQuestions(result.data);
      }
    } catch (error) {
      console.error('Error fetching exam:', error);
    } finally {
      setExamLoading(false);
    }
  };

  // ✅ Fetch certificate
  const fetchCertificate = async (applicationId) => {
    try {
      const response = await fetch(`http://localhost/in%20jsesus%20name/backend/auth-file/get-certificate.php?application_id=${applicationId}`, {
        credentials: 'include'
      });
      const result = await response.json();
      if (result.status === 1) {
        setCertificateData(result.data);
        setShowCertificate(true);
      }
    } catch (error) {
      console.error('Error fetching certificate:', error);
    }
  };

  // ✅ Handle exam answer select
  const handleExamAnswer = (questionIndex, answer) => {
    setExamAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  };

  // ✅ Submit exam
  const submitExam = async () => {
    if (Object.keys(examAnswers).length < examQuestions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    try {
      const response = await fetch('http://localhost/in%20jsesus%20name/backend/auth-file/submit-exam.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          application_id: applicationStatus?.id,
          answers: examAnswers
        })
      });
      
      const result = await response.json();
      if (result.status === 1) {
        setExamScore(result.score);
        setExamSubmitted(true);
      } else {
        alert('Error submitting exam: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Network error. Please try again.');
    }
  };

  // ✅ Generate certificate
  const generateCertificate = async (score) => {
    try {
      const response = await fetch('http://localhost/in%20jsesus%20name/backend/auth-file/generate-certificate.php', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          application_id: applicationStatus?.id,
          score: score
        })
      });
      
      const result = await response.json();
      if (result.status === 1) {
        setCertificateData(result.data);
        setShowCertificate(true);
      } else {
        alert('Error generating certificate: ' + result.message);
      }
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Network error. Please try again.');
    }
  };

  // ✅ Download certificate
  const downloadCertificate = () => {
    window.print();
  };

  // ✅ Resume Exam
  const handleResumeExam = (appId) => {
    const app = allApplications.find(a => a.id === appId);
    if (app) {
      setApplicationStatus(app);
      setShowExam(true);
      fetchExamQuestions();
      setShowContinueModal(false);
    }
  };

  // ✅ Resume Certificate
  const handleResumeCertificate = (appId) => {
    const app = allApplications.find(a => a.id === appId);
    if (app) {
      setApplicationStatus(app);
      fetchCertificate(appId);
      setShowContinueModal(false);
    }
  };

  // ✅ Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);
      setShowBackToTop(scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ Input Wrapper
  const InputWrapper = ({ label, icon: Icon, error, children, required }) => (
    <div className="space-y-2 text-left">
      <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
        {Icon && <Icon className={`w-3.5 h-3.5 ${error ? 'text-red-500' : 'text-[#243ead]'}`} />}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs font-bold flex items-center gap-1 animate-pulse">
          <AlertCircle className="w-3 h-3" /> {error}
        </p>
      )}
    </div>
  );

  // ✅ File Upload Component
  const FileUpload = ({ label, id, accept = "image/*,.pdf", required = false, onFileChange, error }) => {
    const [fileName, setFileName] = useState('');
    const [preview, setPreview] = useState(null);

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
        onFileChange(id, file);
      }
    };

    const handleRemove = () => {
      setFileName('');
      setPreview(null);
      onFileChange(id, null);
      document.getElementById(id).value = '';
    };

    const handleUploadClick = () => {
      document.getElementById(id).click();
    };

    return (
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
          <Upload className="w-3.5 h-3.5 text-[#243ead]" />
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        <input
          type="file"
          id={id}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        
        {!fileName ? (
          <div 
            onClick={handleUploadClick}
            className="w-full px-5 py-6 bg-gray-50 border-2 border-dashed rounded-2xl border-gray-300 hover:border-[#243ead] hover:bg-blue-50/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 text-gray-500 group"
          >
            <div className="w-14 h-14 bg-[#243ead]/10 rounded-2xl flex items-center justify-center group-hover:bg-[#243ead]/20 transition-all">
              <Upload className="w-7 h-7 text-[#243ead] group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-center">
              <p className="text-sm font-bold text-gray-700">Click to upload</p>
              <p className="text-xs text-gray-400">or drag and drop</p>
              <p className="text-[10px] text-gray-400 mt-1">JPG, PNG, PDF (Max 5MB)</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4 p-4 bg-gray-50 border-2 rounded-2xl border-emerald-200">
            {preview && preview.startsWith('data:image') ? (
              <img src={preview} alt="Preview" className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200" />
            ) : (
              <div className="w-16 h-16 bg-[#243ead]/10 rounded-xl flex items-center justify-center">
                <File className="w-8 h-8 text-[#243ead]" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">{fileName}</p>
              <p className="text-xs text-gray-400">File uploaded successfully</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => document.getElementById(id).click()}
                className="p-2 text-[#243ead] hover:bg-blue-50 rounded-lg transition-all"
                title="Change file"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Remove file"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
        {error && (
          <p className="text-red-500 text-xs font-bold flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> {error}
          </p>
        )}
      </div>
    );
  };

  // ✅ SERVICES
  const services = [
    { 
      id: 'health-permit', 
      label: 'QC Health Permit', 
      icon: <Shield />, 
      isPopular: true, 
      aosDelay: 100,
      description: 'Apply for health certificate and sanitary permit'
    },
    { 
      id: 'barangay-clearance', 
      label: 'Barangay Clearance', 
      icon: <Building2 />, 
      isPopular: true, 
      aosDelay: 200,
      description: 'Request barangay clearance for employment'
    },
    { 
      id: 'indigency-cert', 
      label: 'Certificate of Indigency', 
      icon: <HeartPulse />, 
      isPopular: false, 
      aosDelay: 300,
      description: 'Apply for certificate of indigency for assistance'
    },
    { 
      id: 'business-permit', 
      label: 'Business Permit', 
      icon: <UtensilsCrossed />, 
      isPopular: false, 
      aosDelay: 400,
      description: 'Apply for business permit and license'
    },
    { 
      id: 'residency-cert', 
      label: 'Certificate of Residency', 
      icon: <Droplets />, 
      isPopular: false, 
      aosDelay: 500,
      description: 'Request certificate of residency'
    },
    { 
      id: 'appointment', 
      label: 'Book Appointment', 
      icon: <Calendar />, 
      isPopular: false, 
      aosDelay: 600,
      description: 'Schedule appointment with barangay staff'
    }
  ];

  // ✅ HIDDEN SERVICES
  const hiddenServices = [
    { id: 'tracking', label: 'Track Request', icon: <Stethoscope /> },
    { id: 'support', label: 'Request Assistance', icon: <GraduationCap /> }
  ];

  // ✅ PERMIT CARD COMPONENT
  const PermitCard = ({ type, onClick }) => {
    return (
      <div className="relative group perspective-1000">
        <button 
          className="w-full text-left no-underline block" 
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
        >
          <div className="relative w-full h-[190px] flex flex-col items-center justify-between p-6 border-[3px] border-solid border-[#243ead] rounded-xl transition-all duration-150 hover:shadow-[0_24px_56px_rgba(36,62,173,0.2)] cursor-pointer overflow-visible bg-white">
            
            <div className="absolute inset-0 bg-gradient-to-br from-[#243ead]/0 via-blue-400/0 to-[#243ead]/0 group-hover:from-[#243ead]/5 group-hover:via-blue-400/5 group-hover:to-[#243ead]/5 transition-all duration-200 rounded-xl"></div>
            
            {type.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#243ead] text-white px-5 py-1.5 rounded-full text-[10px] uppercase font-bold shadow-[0_8px_24px_rgba(36,62,173,0.4)] z-20">
                Popular
              </div>
            )}
            
            <div className="relative w-full h-[95px] flex items-center justify-center z-10 mt-2">
              <div className="w-full h-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {React.cloneElement(type.icon, { 
                  size: "100%", 
                  strokeWidth: 1.5,
                  className: "text-[#243ead] drop-shadow-sm" 
                })}
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-1 w-full">
              <p className="text-sm font-bold text-[#1a1a1a] text-center m-0 group-hover:text-[#243ead] transition-colors">
                {type.label}
              </p>
              <ArrowRight className="w-5 h-5 text-[#243ead] opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" />
            </div>

          </div>
        </button>
      </div>
    );
  };

  const handleServiceSelect = (serviceId) => {
    setSelectedService(serviceId);
    setShowApplication(true);
    setStep(1);
    setFormSubmitted(false);
    setSubmitError('');
    setUploadedFiles({
      validId: null,
      barangayClearance: null,
      medicalCertificate: null,
      idPicture: null,
      cedula: null
    });
    setFileErrors({});
  };

  const handleBack = () => {
    setShowApplication(false);
    setSelectedService(null);
    setStep(1);
    setFormSubmitted(false);
    setSubmitError('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (fieldId, file) => {
    setUploadedFiles(prev => ({ ...prev, [fieldId]: file }));
    if (file) {
      setFileErrors(prev => ({ ...prev, [fieldId]: '' }));
    }
  };

  const handleNextStep = () => {
    if (step === 2) {
      const errors = {};
      const requiredFiles = ['validId', 'barangayClearance', 'medicalCertificate', 'idPicture', 'cedula'];
      let hasError = false;
      
      requiredFiles.forEach(field => {
        if (!uploadedFiles[field]) {
          errors[field] = 'Please upload this required document';
          hasError = true;
        }
      });
      
      if (hasError) {
        setFileErrors(errors);
        alert('Please upload all required documents before proceeding.');
        return;
      }
    }
    
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ✅ SUBMIT TO BACKEND WITH FILES
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const formDataToSend = new FormData();
      
      formDataToSend.append('service_type', selectedService);
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('mobileNumber', formData.mobileNumber);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('businessName', formData.businessName);
      formDataToSend.append('businessType', formData.businessType);
      formDataToSend.append('purpose', formData.purpose);
      
      if (uploadedFiles.validId) formDataToSend.append('valid_id', uploadedFiles.validId);
      if (uploadedFiles.barangayClearance) formDataToSend.append('barangay_clearance', uploadedFiles.barangayClearance);
      if (uploadedFiles.medicalCertificate) formDataToSend.append('medical_certificate', uploadedFiles.medicalCertificate);
      if (uploadedFiles.idPicture) formDataToSend.append('id_picture', uploadedFiles.idPicture);
      if (uploadedFiles.cedula) formDataToSend.append('cedula', uploadedFiles.cedula);

      const url = 'http://localhost/in%20jsesus%20name/backend/auth-file/submit-application.php';
      console.log('📤 Submitting application with files to:', url);

      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        body: formDataToSend
      });

      const result = await response.json();
      console.log('✅ Submit response:', result);

      if (result.status === 1 && result.success) {
        setReferenceNumber(result.reference_no);
        setFormSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSubmitError(result.message || 'Failed to submit application. Please try again.');
        alert('❌ Error: ' + (result.message || 'Failed to submit'));
      }
    } catch (error) {
      console.error('❌ Submit error:', error);
      setSubmitError('Network error. Please check your connection.');
      alert('❌ Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ SIDEBAR PROGRESS STEPS
  const steps = [
    { id: 1, label: 'Personal Information', icon: <User className="w-4 h-4" />, status: step > 1 ? 'completed' : step === 1 ? 'current' : 'pending' },
    { id: 2, label: 'Upload Requirements', icon: <Upload className="w-4 h-4" />, status: step > 2 ? 'completed' : step === 2 ? 'current' : 'pending' },
    { id: 3, label: 'Review & Submit', icon: <FileCheck className="w-4 h-4" />, status: step === 3 ? 'current' : 'pending' }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // --- LOGOUT HANDLER ---
  const handleLogout = () => {
    fetch('http://localhost/in%20jsesus%20name/backend/auth-file/logout.php', {
      method: 'POST',
      credentials: 'include'
    }).catch(() => {});
    
    localStorage.removeItem('user');
    localStorage.removeItem('user_type');
    
    if (onLogout) {
      onLogout();
    }
    
    navigate('/');
  };

  // ✅ Get status badge
  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      approved: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      rejected: 'bg-red-100 text-red-700 border-red-200'
    };
    const icons = {
      pending: <Clock className="w-3 h-3" />,
      approved: <CheckCircle className="w-3 h-3" />,
      rejected: <XCircle className="w-3 h-3" />
    };
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border ${styles[status] || 'bg-gray-100'}`}>
        {icons[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // ✅ Get service label
  const getServiceLabel = (type) => {
    const labels = {
      'health-permit': 'QC Health Permit',
      'barangay-clearance': 'Barangay Clearance',
      'indigency-cert': 'Certificate of Indigency',
      'business-permit': 'Business Permit',
      'residency-cert': 'Certificate of Residency',
      'appointment': 'Book Appointment',
      'tracking': 'Track Request',
      'support': 'Request Assistance'
    };
    return labels[type] || type;
  };

  // --- RENDER VIEWS ---
  
  // ✅ EXAM VIEW
  if (showExam && !examSubmitted) {
    return (
      <ExamView 
        examQuestions={examQuestions}
        examAnswers={examAnswers}
        examLoading={examLoading}
        handleExamAnswer={handleExamAnswer}
        submitExam={submitExam}
      />
    );
  }

  // ✅ EXAM RESULTS VIEW
  if (examSubmitted) {
    return (
      <ExamResultView 
        examScore={examScore}
        totalQuestions={examQuestions.length}
        onViewCertificate={() => {
          setExamSubmitted(false);
          setShowExam(false);
          generateCertificate(examScore);
        }}
      />
    );
  }

  // ✅ CERTIFICATE VIEW
  if (showCertificate && certificateData) {
    return (
      <CertificateView 
        certificateData={certificateData}
        onDownload={downloadCertificate}
        onBack={() => {
          setShowCertificate(false);
          navigate('/');
        }}
      />
    );
  }

  // --- SUCCESS VIEW ---
  if (formSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 pb-24 font-sans text-left">
        <div className="bg-[#243ead] pt-12 pb-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex justify-between items-start">
              <button onClick={handleBack} className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-8 font-black uppercase text-xs tracking-widest">
                <ArrowLeft className="w-4 h-4" /> Back to Services
              </button>
              <div className="flex items-center gap-4">
                <span className="text-white font-bold">{user?.user_fname || user?.username}</span>
                <button onClick={handleLogout} className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-black uppercase hover:bg-white/20 transition-all">
                  Logout
                </button>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter mb-4 uppercase italic">
              Application <br/><span className="text-blue-300">Submitted!</span>
            </h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 -mt-16">
          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Successful!</h2>
            <p className="text-gray-500 mb-6">Your application with all requirements has been submitted and is now pending review.</p>
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <p className="text-sm text-gray-500">Reference Number</p>
              <p className="text-2xl font-bold text-[#243ead]">{referenceNumber}</p>
              <p className="text-xs text-gray-400 mt-2">Status: <span className="text-yellow-600 font-bold">PENDING</span></p>
              <p className="text-xs text-gray-400 mt-1">Documents uploaded: ✅ 5/5</p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={handleBack} className="px-6 py-3 bg-[#243ead] text-white font-bold rounded-xl hover:bg-[#1a2f8a] transition-all">
                Apply for Another Service
              </button>
              <button onClick={() => window.print()} className="px-6 py-3 border-2 border-[#243ead] text-[#243ead] font-bold rounded-xl hover:bg-[#243ead] hover:text-white transition-all">
                Print Confirmation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- APPLICATION FORM VIEW ---
  if (showApplication && selectedService) {
    const service = services.find(s => s.id === selectedService);
    
    return (
      <div className="min-h-screen bg-slate-50 font-sans text-left">
        <div className="bg-[#243ead] pt-8 pb-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-center">
              <button onClick={handleBack} className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors font-black uppercase text-xs tracking-widest">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="flex items-center gap-4">
                <span className="text-white font-bold text-sm hidden sm:block">{user?.user_fname || user?.username}</span>
                <button onClick={handleLogout} className="px-3 py-1.5 bg-white/10 text-white rounded-xl text-xs font-black uppercase hover:bg-white/20 transition-all">
                  Logout
                </button>
                <button onClick={toggleSidebar} className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg">
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white leading-none tracking-tighter mt-6 uppercase italic">
              {service.label}
            </h1>
            <p className="text-blue-100/70 text-sm font-medium italic tracking-tight mt-1">Complete all steps and upload requirements</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-8">
          <div className="flex flex-col md:flex-row gap-6">
            
            <div className={`md:w-72 ${sidebarOpen ? 'block' : 'hidden md:block'} flex-shrink-0`}>
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <ListChecks className="w-5 h-5 text-[#243ead]" />
                  <h3 className="text-sm font-black uppercase text-gray-700 tracking-wider">Application Progress</h3>
                </div>
                
                <div className="space-y-4">
                  {steps.map((s, index) => (
                    <div key={s.id} className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
                          ${s.status === 'completed' ? 'bg-emerald-500 text-white' : ''}
                          ${s.status === 'current' ? 'bg-[#243ead] text-white ring-4 ring-[#243ead]/20' : ''}
                          ${s.status === 'pending' ? 'bg-gray-200 text-gray-400' : ''}
                        `}>
                          {s.status === 'completed' ? <Check className="w-4 h-4" /> : s.id}
                        </div>
                        {index < steps.length - 1 && (
                          <div className={`w-0.5 h-10 mt-1 transition-all duration-300
                            ${s.status === 'completed' ? 'bg-emerald-500' : ''}
                            ${s.status === 'current' ? 'bg-[#243ead]' : ''}
                            ${s.status === 'pending' ? 'bg-gray-200' : ''}
                          `} />
                        )}
                      </div>
                      <div className="pt-1">
                        <p className={`
                          text-sm font-bold transition-colors duration-300
                          ${s.status === 'completed' ? 'text-emerald-600' : ''}
                          ${s.status === 'current' ? 'text-[#243ead]' : ''}
                          ${s.status === 'pending' ? 'text-gray-400' : ''}
                        `}>
                          {s.label}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                          {s.status === 'completed' ? '✓ Done' : s.status === 'current' ? 'In Progress' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span className="font-bold text-[#243ead]">{Math.round((step / 3) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#243ead] to-blue-400 transition-all duration-500 rounded-full" style={{ width: `${(step / 3) * 100}%` }} />
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Shield className="w-4 h-4 text-[#243ead]" />
                    <span className="font-medium">{service.label}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="min-h-[400px]">
                    {/* STEP 1 */}
                    {step === 1 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                        <p className="text-gray-500 text-sm">Fill in your personal details</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <InputWrapper label="First Name" icon={User} required>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter your first name" className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800 focus:bg-white" />
                          </InputWrapper>
                          <InputWrapper label="Last Name" icon={User} required>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter your last name" className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800 focus:bg-white" />
                          </InputWrapper>
                        </div>
                        <InputWrapper label="Email Address" icon={Mail} required>
                          <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="your@email.com" className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800 focus:bg-white" />
                        </InputWrapper>
                        <InputWrapper label="Mobile Number" icon={Phone} required>
                          <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} placeholder="09123456789" className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800 focus:bg-white" />
                        </InputWrapper>
                        <InputWrapper label="Complete Address" icon={MapPin} required>
                          <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" placeholder="Quezon City, Philippines" className="w-full px-5 py-4 bg-gray-50 border-2 rounded-2xl outline-none border-transparent focus:border-[#243ead] transition-all font-bold text-gray-800 resize-none focus:bg-white" />
                        </InputWrapper>
                      </div>
                    )}

                    {/* STEP 2 - Upload Requirements */}
                    {step === 2 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-bold text-gray-900">Upload Requirements</h3>
                        <p className="text-gray-500 text-sm">Click on each box to upload your documents</p>
                        
                        <div className="grid grid-cols-1 gap-6">
                          <FileUpload 
                            label="Valid ID (Driver's License, Passport, PRC ID)" 
                            id="validId"
                            required
                            onFileChange={handleFileChange}
                            error={fileErrors.validId}
                          />
                          <FileUpload 
                            label="Barangay Clearance" 
                            id="barangayClearance"
                            required
                            onFileChange={handleFileChange}
                            error={fileErrors.barangayClearance}
                          />
                          <FileUpload 
                            label="Medical Certificate / Chest X-ray" 
                            id="medicalCertificate"
                            required
                            onFileChange={handleFileChange}
                            error={fileErrors.medicalCertificate}
                          />
                          <FileUpload 
                            label="2x2 ID Picture (recent)" 
                            id="idPicture"
                            required
                            onFileChange={handleFileChange}
                            error={fileErrors.idPicture}
                          />
                          <FileUpload 
                            label="Community Tax Certificate (Cedula)" 
                            id="cedula"
                            required
                            onFileChange={handleFileChange}
                            error={fileErrors.cedula}
                          />
                        </div>
                        
                        <div className="bg-blue-50/50 rounded-3xl p-4 border border-blue-100">
                          <p className="text-xs text-blue-600 font-medium flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            Accepted formats: JPG, PNG, PDF (Max 5MB per file)
                          </p>
                        </div>
                      </div>
                    )}

                    {/* STEP 3 - Review & Submit */}
                    {step === 3 && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="text-xl font-bold text-gray-900">Review & Submit</h3>
                        <p className="text-gray-500 text-sm">Review your application and submit</p>
                        
                        <div className="bg-blue-50/50 rounded-3xl p-6 border border-blue-100">
                          <h4 className="text-sm font-black text-[#243ead] uppercase tracking-widest mb-4">Application Summary</h4>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-bold">Name:</span> {formData.firstName} {formData.lastName}</p>
                            <p><span className="font-bold">Email:</span> {formData.email}</p>
                            <p><span className="font-bold">Mobile:</span> {formData.mobileNumber}</p>
                            <p><span className="font-bold">Address:</span> {formData.address}</p>
                            <p><span className="font-bold">Business:</span> {formData.businessName || 'N/A'}</p>
                            <p><span className="font-bold">Type:</span> {formData.businessType}</p>
                            <p><span className="font-bold">Purpose:</span> {formData.purpose}</p>
                          </div>
                        </div>

                        <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100">
                          <h4 className="text-sm font-black text-emerald-600 uppercase tracking-widest mb-4">Uploaded Documents</h4>
                          <div className="space-y-2 text-sm">
                            {Object.keys(uploadedFiles).map(key => (
                              <p key={key} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                                <span className="text-xs text-gray-400">✓ Uploaded</span>
                              </p>
                            ))}
                          </div>
                        </div>

                        <label className="flex items-start gap-4 cursor-pointer p-6 bg-slate-50 rounded-2xl">
                          <input type="checkbox" className="mt-1 w-6 h-6 rounded-lg text-[#243ead]" />
                          <span className="text-xs text-gray-500 font-medium">
                            I certify that all information provided and documents uploaded are true and correct to the best of my knowledge.
                          </span>
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12 mt-12 border-t border-gray-100">
                    {step > 1 && (
                      <button onClick={handlePrevStep} className="w-full sm:w-auto px-8 py-4 text-gray-400 font-black uppercase text-xs flex items-center justify-center gap-2 hover:bg-gray-50 rounded-2xl transition-all">
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    )}
                    <div className="flex w-full sm:w-auto gap-4 ml-auto">
                      {step < 3 ? (
                        <button onClick={handleNextStep} className="w-full sm:w-auto px-10 py-4 bg-[#243ead] text-white font-black uppercase text-xs rounded-2xl shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3">
                          Continue <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button 
                          onClick={handleSubmit} 
                          disabled={isSubmitting}
                          className="w-full sm:w-auto px-10 py-4 bg-emerald-600 text-white font-black uppercase text-xs rounded-2xl shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit Application <CheckCircle className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {submitError && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
                      <AlertCircle className="w-4 h-4 inline mr-2" />
                      {submitError}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- MAIN DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-slate-50 pb-24 font-sans text-left">
      
      {/* ✅ TOP BAR - Continue Application */}
      {allApplications.length > 0 && (
        <div className="sticky top-0 z-50 bg-[#243ead] text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-200">Continue Application</p>
                <p className="text-sm font-bold">
                  {allApplications.filter(a => a.status === 'approved' || a.status === 'pending').length} pending/approved application(s)
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowContinueModal(true)}
              className="px-5 py-2 bg-white text-[#243ead] font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              Continue
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ✅ CONTINUE MODAL */}
      {showContinueModal && (
        <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-[#243ead]" />
                  Continue Application
                </h3>
                <p className="text-sm text-gray-500">Select an application to continue</p>
              </div>
              <button
                onClick={() => setShowContinueModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-xl"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {allApplications.length === 0 ? (
                <div className="text-center py-12 text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No applications found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {allApplications.map((app) => {
                    const isPending = app.status === 'pending';
                    const isApproved = app.status === 'approved';
                    const isRejected = app.status === 'rejected';
                    const hasExam = app.exam_taken === 1 || app.exam_taken === true;
                    const hasCert = app.certificate_issued === 1 || app.certificate_issued === true;
                    
                    let statusColor = 'bg-gray-100 text-gray-600';
                    let statusText = 'Unknown';
                    let actionText = 'View';
                    let actionHandler = () => {};
                    
                    if (isPending) {
                      statusColor = 'bg-yellow-100 text-yellow-700';
                      statusText = 'Pending Review';
                      actionText = 'View Status';
                      actionHandler = () => {
                        setShowContinueModal(false);
                        alert('Your application is pending review. Please wait for admin approval.');
                      };
                    } else if (isApproved && !hasExam) {
                      statusColor = 'bg-green-100 text-green-700';
                      statusText = 'Approved - Take Exam';
                      actionText = 'Take Exam';
                      actionHandler = () => handleResumeExam(app.id);
                    } else if (isApproved && hasExam && !hasCert) {
                      statusColor = 'bg-blue-100 text-blue-700';
                      statusText = 'Exam Passed - View Certificate';
                      actionText = 'View Certificate';
                      actionHandler = () => handleResumeCertificate(app.id);
                    } else if (isApproved && hasExam && hasCert) {
                      statusColor = 'bg-emerald-100 text-emerald-700';
                      statusText = 'Completed ✅';
                      actionText = 'View Certificate';
                      actionHandler = () => handleResumeCertificate(app.id);
                    } else if (isRejected) {
                      statusColor = 'bg-red-100 text-red-700';
                      statusText = 'Rejected';
                      actionText = 'Apply Again';
                      actionHandler = () => {
                        setShowContinueModal(false);
                        setApplicationStatus(null);
                      };
                    }
                    
                    return (
                      <div key={app.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-[#243ead] transition-all flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-sm font-bold text-[#243ead]">{app.reference_no}</span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${statusColor}`}>
                              {statusText}
                            </span>
                            {isApproved && hasExam && hasCert && (
                              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                                ✓ Certificate Ready
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {app.service_type?.replace(/-/g, ' ').toUpperCase()} • 
                            Submitted: {app.created_at ? new Date(app.created_at).toLocaleDateString() : 'N/A'}
                          </p>
                          {app.admin_remarks && (
                            <p className="text-xs text-red-500 mt-1">Remarks: {app.admin_remarks}</p>
                          )}
                        </div>
                        <button
                          onClick={actionHandler}
                          className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                            isPending ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' :
                            isRejected ? 'bg-red-500 text-white hover:bg-red-600' :
                            isApproved && !hasExam ? 'bg-[#243ead] text-white hover:bg-[#1a2f8a]' :
                            isApproved && hasExam && !hasCert ? 'bg-blue-500 text-white hover:bg-blue-600' :
                            'bg-emerald-500 text-white hover:bg-emerald-600'
                          }`}
                        >
                          {isPending ? (
                            <> <Clock className="w-3 h-3" /> {actionText} </>
                          ) : isRejected ? (
                            <> <RotateCcw className="w-3 h-3" /> {actionText} </>
                          ) : isApproved && !hasExam ? (
                            <> <BookOpen className="w-3 h-3" /> {actionText} </>
                          ) : isApproved && hasExam && !hasCert ? (
                            <> <FileCheck className="w-3 h-3" /> {actionText} </>
                          ) : (
                            <> <Trophy className="w-3 h-3" /> {actionText} </>
                          )}
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-100">
              <button
                onClick={() => setShowContinueModal(false)}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="bg-[#243ead] pt-12 pb-32">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-between items-start">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-black text-white leading-none tracking-tighter mb-4 uppercase italic">
                QC Health <br/><span className="text-blue-300">Service Portal</span>
              </h1>
              <p className="text-blue-100/70 text-lg font-medium italic tracking-tight">
                Welcome back, {user?.user_fname || user?.username || 'User'}!
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-white font-bold hidden sm:block">
                {user?.user_fname || user?.username}
              </span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-white/10 text-white rounded-xl text-xs font-black uppercase hover:bg-white/20 transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-4xl mx-auto px-6 -mt-16">
        
        {/* ✅ MY APPLICATIONS TABLE */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#243ead]/10 rounded-xl flex items-center justify-center">
                  <Table className="w-5 h-5 text-[#243ead]" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">My Applications</h2>
                  <p className="text-xs text-gray-500">Track the status of your applications</p>
                </div>
              </div>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-3 h-3" />
                Refresh
              </button>
            </div>

            {loadingApplications ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-[#243ead] border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-400 font-medium">Loading applications...</p>
              </div>
            ) : allApplications.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-400 font-bold text-lg">No applications yet</p>
                <p className="text-gray-300 text-sm">Apply for a service to get started</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">Reference #</th>
                      <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider hidden md:table-cell">Service</th>
                      <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider">Status</th>
                      <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider hidden lg:table-cell">Date</th>
                      <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 tracking-wider text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allApplications.map((app) => (
                      <tr key={app.id} className="border-b border-gray-50 hover:bg-gray-50/70 transition-colors">
                        <td className="px-4 py-4">
                          <span className="text-sm font-bold text-[#243ead]">{app.reference_no}</span>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell">
                          <span className="text-sm text-gray-600">{getServiceLabel(app.service_type)}</span>
                        </td>
                        <td className="px-4 py-4">{getStatusBadge(app.status)}</td>
                        <td className="px-4 py-4 hidden lg:table-cell">
                          <div className="text-sm text-gray-500">
                            {app.created_at ? new Date(app.created_at).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            }) : 'N/A'}
                          </div>
                          <div className="text-xs text-gray-400">
                            {app.created_at ? new Date(app.created_at).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            }) : ''}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-center">
                          {app.status === 'pending' ? (
                            <span className="text-xs text-yellow-600 font-medium">Waiting for review</span>
                          ) : app.status === 'approved' && !app.exam_taken ? (
                            <button
                              onClick={() => handleResumeExam(app.id)}
                              className="px-4 py-2 bg-[#243ead] text-white rounded-xl text-xs font-bold hover:bg-[#1a2f8a] transition-all flex items-center gap-1 mx-auto"
                            >
                              <BookOpen className="w-3 h-3" />
                              Take Exam
                            </button>
                          ) : app.status === 'approved' && app.exam_taken && !app.certificate_issued ? (
                            <button
                              onClick={() => handleResumeCertificate(app.id)}
                              className="px-4 py-2 bg-blue-500 text-white rounded-xl text-xs font-bold hover:bg-blue-600 transition-all flex items-center gap-1 mx-auto"
                            >
                              <FileCheck className="w-3 h-3" />
                              View Certificate
                            </button>
                          ) : app.status === 'approved' && app.exam_taken && app.certificate_issued ? (
                            <button
                              onClick={() => handleResumeCertificate(app.id)}
                              className="px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-600 transition-all flex items-center gap-1 mx-auto"
                            >
                              <Trophy className="w-3 h-3" />
                              Certificate Ready
                            </button>
                          ) : app.status === 'rejected' ? (
                            <span className="text-xs text-red-600 font-medium">Rejected</span>
                          ) : null}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl border border-gray-100">
            <div className="text-3xl font-bold text-[#243ead]">10,000+</div>
            <p className="text-gray-500 text-sm">Citizens This Month</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl border border-gray-100">
            <div className="text-3xl font-bold text-[#243ead]">98%</div>
            <p className="text-gray-500 text-sm">Satisfaction Rate</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl border border-gray-100">
            <div className="text-3xl font-bold text-[#243ead]">3-5 Days</div>
            <p className="text-gray-500 text-sm">Processing Time</p>
          </div>
          <div className="bg-white rounded-2xl p-6 text-center shadow-xl border border-gray-100">
            <div className="text-3xl font-bold text-[#243ead]">24/7</div>
            <p className="text-gray-500 text-sm">Online Access</p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#243ead] mb-4 uppercase">
              Barangay Services Online
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Request documents, book appointments, and track your applications easily.
            </p>
          </div>

          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
              {services.map((service) => (
                <PermitCard 
                  key={service.id} 
                  type={service} 
                  onClick={() => handleServiceSelect(service.id)} 
                />
              ))}
            </div>
          </div>

          {/* View More Services */}
          {!hiddenCardsVisible ? (
            <div className="text-center mt-12">
              <button
                onClick={() => setHiddenCardsVisible(true)}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#243ead] text-white font-black uppercase text-xs rounded-2xl shadow-xl hover:-translate-y-1 transition-all"
              >
                <Sparkles className="w-5 h-5" />
                View More Services
              </button>
            </div>
          ) : (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid gap-6 grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
                {hiddenServices.map((service) => (
                  <PermitCard 
                    key={service.id} 
                    type={service} 
                    onClick={() => console.log('Request:', service.id)} 
                  />
                ))}
                <div className="relative w-full h-[190px] flex flex-col items-center justify-center p-6 border-[3px] border-dashed border-gray-300 rounded-xl hover:border-[#243ead] group transition-all cursor-pointer bg-white">
                  <div className="w-10 h-10 text-gray-400 group-hover:text-[#243ead] mb-3 transition-colors">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <p className="text-xs font-bold text-gray-500 group-hover:text-[#243ead] text-center">
                    Request Other Service
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Support Section */}
          <div className="mt-12 bg-[#243ead] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Need Help with Your Request?
              </h3>
              <p className="text-blue-100 mb-8 text-lg">
                Our barangay staff are ready to assist you.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-[#243ead] font-bold rounded-xl hover:bg-blue-50 transition-all">
                  <HelpCircle className="w-5 h-5 inline mr-2" />
                  Help Center
                </button>
                <a href="tel:09123456789" className="px-8 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-all">
                  <Phone className="w-5 h-5 inline mr-2" />
                  Call Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-200 pt-8">
          <p>© 2026 QUEZON CITY GOVERNMENT. LUNGSOD QUEZON.</p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="hover:text-gray-600 cursor-pointer">Terms</span>
            <span className="hover:text-gray-600 cursor-pointer">Privacy</span>
            <span className="hover:text-gray-600 cursor-pointer">Accessibility</span>
          </div>
        </div>

      </div>

      {/* BACK TO TOP BUTTON */}
      <button
        onClick={scrollToTop}
        className={`
          fixed bottom-8 right-8 z-50 p-3 bg-[#243ead] text-white rounded-full shadow-lg hover:bg-[#1a2f8a] transition-all duration-300
          ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
        `}
      >
        <ChevronUp className="w-6 h-6" />
      </button>

    </div>
  );
};

export default Dashboard;
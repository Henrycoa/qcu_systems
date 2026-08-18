// src/components/pages/landing_page/LandingPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import FeaturesSection from './components/FeaturesSection';
import RequirementsSection from './components/RequirementsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';
import Register from './components/forms/Register';
import Login from './components/forms/Login';
import ApplicationForm from './components/forms/ApplicationForm';
import SuccessPage from './components/forms/SuccessPage';
import ChatSupport from './components/ChatSupport';

// ✅ Import Dashboard (User) and AdminDashboard
import Dashboard from '../Dashboard';
import AdminDashboard from './components/pages/admin/AdminDashboard';

const useWaveAnimation = () => {
  const [waveActive, setWaveActive] = useState(false);
  const sectionRefs = useRef({});

  const triggerWaveAnimation = (sectionId) => {
    setWaveActive(true);
    const wave = document.createElement('div');
    wave.className = 'wave-animation';
    wave.style.cssText = `
      position: fixed; top: 50%; left: 50%; width: 0; height: 0;
      border-radius: 50%; background-color: rgba(36, 62, 173, 0.2);
      transform: translate(-50%, -50%); z-index: 9999; pointer-events: none;
    `;
    document.body.appendChild(wave);
    
    const duration = 800;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      if (progress < 1) {
        wave.style.width = `${progress * 300}vw`;
        wave.style.height = `${progress * 300}vw`;
        wave.style.opacity = `${1 - progress}`;
        requestAnimationFrame(animate);
      } else {
        if (document.body.contains(wave)) document.body.removeChild(wave);
        setWaveActive(false);
        sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    requestAnimationFrame(animate);
  };

  return { waveActive, triggerWaveAnimation, sectionRefs };
};

const QCHealthPermitLanding = () => {
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState('health');
  const [formData, setFormData] = useState(null); 
  const [referenceNumber, setReferenceNumber] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const { waveActive, triggerWaveAnimation, sectionRefs } = useWaveAnimation();

  // Check if user is logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setUserType(parsedUser.user_type || 'user');
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Error parsing user data:', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000, once: false, mirror: true, offset: 100 });
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setUserType(userData.user_type || 'user');
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('user_type', userData.user_type);
    setShowRegister(false);
    setShowLogin(false);
    setShowForm(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUserType(null);
    localStorage.removeItem('user');
    localStorage.removeItem('user_type');
  };

  const handleApplyNow = (permitType = 'health') => {
    setSelectedPermit(permitType);
    setShowForm(true);
    setShowRegister(false);
    setShowLogin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterNow = () => {
    setShowRegister(true);
    setShowForm(false);
    setShowLogin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginNow = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setApplicationSubmitted(false);
    setShowForm(false);
    setShowRegister(false);
    setShowLogin(false);
    setFormData(null);
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleSubmitSuccess = (refNum, data) => {
    if (data) {
      setReferenceNumber(refNum);
      setFormData(data);
      setApplicationSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToSection = (sectionId) => triggerWaveAnimation(sectionId);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // --- RENDERING ---

  // ✅ LOGGED IN - Check user type
  if (isLoggedIn && user) {
    if (userType === 'admin' || userType === 'staff') {
      return <AdminDashboard user={user} onLogout={handleLogout} />;
    }
    return <Dashboard user={user} onLogout={handleLogout} />;
  }

  // ✅ LOGIN VIEW
  if (showLogin) {
    return (
      <>
        <Login 
          onLoginSuccess={handleLoginSuccess}
          onBack={handleBackToHome}
          onSwitchToRegister={handleRegisterNow}
        />
        <ChatSupport />
      </>
    );
  }

  // ✅ REGISTER VIEW
  if (showRegister) {
    return (
      <>
        <Register 
          onRegisterSuccess={handleRegisterSuccess}
          onBack={handleBackToHome}
          onSwitchToLogin={handleLoginNow}
        />
        <ChatSupport />
      </>
    );
  }

  // ✅ SUCCESS VIEW
  if (applicationSubmitted && formData) {
    return (
      <>
        <SuccessPage 
          referenceNumber={referenceNumber} 
          formData={formData} 
          onBackToHome={handleBackToHome} 
        />
        <ChatSupport />
      </>
    );
  }

  // ✅ FORM VIEW
  if (showForm) {
    return (
      <>
        <ApplicationForm 
          selectedPermit={selectedPermit} 
          onSubmitSuccess={handleSubmitSuccess} 
          onBack={handleBackToHome} 
        />
        <ChatSupport />
      </>
    );
  }

  // ✅ LANDING PAGE VIEW
  return (
    <div className="min-h-screen bg-white overflow-hidden relative selection:bg-blue-100">
      <button
        onClick={scrollToTop}
        className={`fixed bottom-24 right-6 z-[90] w-12 h-12 bg-[#243ead] text-white rounded-xl shadow-lg flex items-center justify-center transition-all duration-300 transform ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        } hover:bg-[#1a2e82] hover:-translate-y-1 active:scale-95`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {waveActive && (
        <div className="fixed inset-0 z-[9998] pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#243ead]/10 to-transparent animate-pulse"></div>
        </div>
      )}

      <ChatSupport />

      <Navigation 
        onApplyNow={() => handleApplyNow('health')} 
        onRegisterNow={handleRegisterNow}
        onLoginNow={handleLoginNow}
        scrollToSection={scrollToSection}
      />
      
      <main>
        <div ref={el => sectionRefs.current.hero = el}>
          <HeroSection 
            onApplyNow={handleApplyNow} 
            onRegisterNow={handleRegisterNow}
            onLoginNow={handleLoginNow}
            scrollToSection={scrollToSection} 
          />
        </div>
        <div ref={el => sectionRefs.current.services = el}>
          <ServicesSection onApplyNow={handleApplyNow} scrollToSection={scrollToSection} />
        </div>
        <div ref={el => sectionRefs.current.features = el}>
          <FeaturesSection scrollToSection={scrollToSection} />
        </div>
        <div ref={el => sectionRefs.current.requirements = el}>
          <RequirementsSection onApplyNow={handleApplyNow} scrollToSection={scrollToSection} />
        </div>
        <div ref={el => sectionRefs.current.testimonials = el}>
          <TestimonialsSection scrollToSection={scrollToSection} />
        </div>
        <div ref={el => sectionRefs.current.faq = el}>
          <FAQSection onApplyNow={handleApplyNow} />
        </div>
        <div ref={el => sectionRefs.current.cta = el}>
          <CTASection onApplyNow={handleApplyNow} scrollToSection={scrollToSection} />
        </div>
      </main>

      <FooterSection onApplyNow={handleApplyNow} scrollToSection={scrollToSection} />
    </div>
  );
};

export default QCHealthPermitLanding;
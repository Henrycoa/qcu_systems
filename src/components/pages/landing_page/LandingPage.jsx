// src/components/pages/landing_page/LandingPage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ChevronUp } from 'lucide-react'; 
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import FeaturesSection from './components/FeaturesSection';
import RequirementsSection from './components/RequirementsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import CTASection from './components/CTASection';
import FooterSection from './components/FooterSection';
import ApplicationForm from './forms/ApplicationForm';
import SuccessPage from './forms/SuccessPage';
import ChatSupport from './components/ChatSupport';
import AOS from 'aos';
import 'aos/dist/aos.css';

/**
 * 1. HOOK DEFINITION
 */
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

/**
 * 2. MAIN COMPONENT
 */
const QCHealthPermitLanding = () => {
  const [showForm, setShowForm] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [selectedPermit, setSelectedPermit] = useState('health');
  
  // FIX: Gawing null ang default para madaling i-check kung may laman na
  const [formData, setFormData] = useState(null); 
  const [referenceNumber, setReferenceNumber] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const { waveActive, triggerWaveAnimation, sectionRefs } = useWaveAnimation();

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

  const handleApplyNow = (permitType = 'health') => {
    setSelectedPermit(permitType);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setApplicationSubmitted(false);
    setShowForm(false);
    setFormData(null); // Reset para malinis ang state
  };

  // FIX: Siguraduhin na ang data ay hindi null bago mag-switch ng view
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

  // --- RENDERING LOGIC ---

  // SUCCESS VIEW (With safety check)
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

  // FORM VIEW
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

  // LANDING PAGE VIEW
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

      <Navigation onApplyNow={() => handleApplyNow('health')} scrollToSection={scrollToSection} />
      
      <main>
        <div ref={el => sectionRefs.current.hero = el}><HeroSection onApplyNow={handleApplyNow} scrollToSection={scrollToSection} /></div>
        <div ref={el => sectionRefs.current.services = el}><ServicesSection onApplyNow={handleApplyNow} scrollToSection={scrollToSection} /></div>
        <div ref={el => sectionRefs.current.features = el}><FeaturesSection scrollToSection={scrollToSection} /></div>
        <div ref={el => sectionRefs.current.requirements = el}><RequirementsSection onApplyNow={handleApplyNow} scrollToSection={scrollToSection} /></div>
        <div ref={el => sectionRefs.current.testimonials = el}><TestimonialsSection scrollToSection={scrollToSection} /></div>
        <div ref={el => sectionRefs.current.faq = el}><FAQSection onApplyNow={handleApplyNow} /></div>
        <div ref={el => sectionRefs.current.cta = el}><CTASection onApplyNow={handleApplyNow} scrollToSection={scrollToSection} /></div>
      </main>

      <FooterSection onApplyNow={handleApplyNow} scrollToSection={scrollToSection} />
    </div>
  );
};

export default QCHealthPermitLanding;
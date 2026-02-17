// src/components/pages/landing_page/components/HeroSlider.jsx
import React, { useState, useEffect, forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';

const HeroSlider = forwardRef(({ onApplyNow, scrollToSection }, ref) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: "GET YOUR",
      subtitle: "QC HEALTH PERMIT",
      tagline: "Online with Ease!",
      cta: "APPLY NOW"
    },
    {
      id: 2,
      title: "BEST FEELING!",
      subtitle: "APPROVED ang",
      tagline: "PERMIT kooo!",
      cta: "VIEW TESTIMONIALS"
    },
    {
      id: 3,
      title: "FAST & SECURE",
      subtitle: "ONLINE PROCESS",
      tagline: "Government Approved!",
      cta: "LEARN MORE"
    },
    {
      id: 4,
      title: "24/7",
      subtitle: "ONLINE SUPPORT",
      tagline: "We're Here to Help!",
      cta: "GET HELP"
    }
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section 
      ref={ref}
      className="relative w-full"
      data-aos="fade-in"
    >
      <div className="w-full relative z-10">
        <div className="w-full">
          <div className="relative w-full aspect-[430/493] sm:aspect-[768/248] lg:aspect-[1024/330] xl:aspect-[1920/600] overflow-hidden">
            {/* Background with EXACT same #243ead color */}
            <div className="absolute inset-0 w-full h-full bg-[#243ead]">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="navGrid" width="80" height="80" patternUnits="userSpaceOnUse">
                      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="2"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#navGrid)" />
                </svg>
              </div>
              
              {/* Blue accent elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
              
              {/* Text Overlay - matching navigation style */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#243ead]/90 via-[#243ead]/70 to-transparent flex items-center">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                  <div className="max-w-2xl">
                    <div className="text-white">
                      {/* Title with same styling */}
                      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                        <span className="block text-3xl md:text-4xl font-semibold mb-2 text-blue-200 tracking-wider">
                          {currentSlideData.title}
                        </span>
                        <span className="block text-5xl md:text-6xl lg:text-7xl font-black tracking-tight drop-shadow-lg">
                          {currentSlideData.subtitle}
                        </span>
                        <span className="block text-3xl md:text-4xl font-bold mt-6 text-yellow-300 animate-pulse drop-shadow-lg">
                          {currentSlideData.tagline}
                        </span>
                      </h1>
                      
                      {/* CTA Button - matching navigation style */}
                      <button
                        onClick={() => onApplyNow('health')}
                        className="mt-8 px-8 py-4 bg-white text-[#243ead] font-bold rounded-xl hover:bg-blue-50 transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] transform hover:scale-105 shadow-2xl hover:shadow-xl flex items-center justify-center gap-3 group"
                        style={{ 
                          fontWeight: 600,
                          lineHeight: '24px'
                        }}
                      >
                        {currentSlideData.cta}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Indicators - EXACT same as navigation */}
            <div 
              className="absolute bottom-[clamp(16px,3vw,24px)] left-1/2 -translate-x-1/2 flex gap-[clamp(8px,1.5vw,12px)] z-20"
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="transition-all duration-150 border-none cursor-pointer p-0 bg-transparent group focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#243ead] rounded-full"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentSlide === index}
                >
                  <div 
                    className={`rounded-full transition-all duration-150 ${
                      currentSlide === index 
                        ? 'w-[clamp(36px,8vw,48px)] h-[clamp(10px,2vw,12px)] bg-white shadow-[0_2px_8px_rgba(255,255,255,0.6)]' 
                        : 'w-[clamp(10px,2vw,12px)] h-[clamp(10px,2vw,12px)] bg-white/60 hover:bg-white/80'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Add a subtle wave at the bottom for smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden -mb-1">
        <svg className="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
          <path 
            className="text-white"
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
            opacity=".25"
          />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection('services')}
        data-aos="fade-up"
        data-aos-delay="700"
      >
        <div className="flex flex-col items-center gap-2 group">
          <span className="text-sm text-white/80 group-hover:text-white transition-colors font-medium">Explore Services</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1 group-hover:border-white transition-colors">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce mx-auto"></div>
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSlider.displayName = 'HeroSlider';
export default HeroSlider;
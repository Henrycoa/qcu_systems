import React, { useState, useEffect, forwardRef } from 'react';
import { ArrowRight, } from 'lucide-react';

const HeroSlider = forwardRef(({ onApplyNow, scrollToSection }, ref) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔥 UPDATED SLIDES (Barangay System)
  const slides = [
    {
      id: 1,
      title: "SMART BARANGAY",
      subtitle: "SERVICES ONLINE",
      tagline: "Skip the Lines. Go Digital.",
      cta: "GET STARTED"
    },
    {
      id: 2,
      title: "REQUEST YOUR",
      subtitle: "DOCUMENTS ONLINE",
      tagline: "Fast • Easy • Convenient",
      cta: "REQUEST NOW"
    },
    {
      id: 3,
      title: "BOOK YOUR",
      subtitle: "APPOINTMENT",
      tagline: "Choose Your Schedule",
      cta: "BOOK NOW"
    },
    {
      id: 4,
      title: "TRACK YOUR",
      subtitle: "REQUEST STATUS",
      tagline: "Real-Time Updates",
      cta: "TRACK NOW"
    }
  ];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // 🔥 SMART CTA HANDLER
  const handleCTA = () => {
    switch (currentSlide) {
      case 0:
        onApplyNow?.('register');
        break;
      case 1:
        scrollToSection?.('services');
        break;
      case 2:
        scrollToSection?.('appointment');
        break;
      case 3:
        scrollToSection?.('tracking');
        break;
      default:
        break;
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section ref={ref} className="relative w-full">
      <div className="relative w-full aspect-[430/560] sm:aspect-[768/340] lg:aspect-[1024/420] xl:aspect-[1920/680] overflow-hidden flex flex-col justify-between">

        {/* 🔥 BACKGROUND */}
        <div className="absolute inset-0 bg-[#243ead] z-0">

          {/* Pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path d="M 80 0 L 0 0 0 80" fill="none" stroke="white" strokeWidth="2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Accent blobs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* 🔥 CONTENT CONTAINER */}
        <div className="relative z-10 flex-1 flex items-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl text-white">

              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                <span className="block text-blue-200 text-2xl md:text-3xl mb-2">
                  {currentSlideData.title}
                </span>

                <span className="block text-5xl md:text-6xl">
                  {currentSlideData.subtitle}
                </span>

                <span className="block mt-4 text-yellow-300 text-2xl md:text-3xl animate-pulse">
                  {currentSlideData.tagline}
                </span>
              </h1>

              {/* 🔥 CTA BUTTON */}
              <button
                onClick={handleCTA}
                className="mt-8 px-8 py-4 bg-white text-[#243ead] font-bold rounded-xl hover:bg-blue-50 transition transform hover:scale-105 shadow-xl flex items-center gap-3 group"
              >
                {currentSlideData.cta}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>

            </div>
          </div>
        </div>

        {/* 🔥 BOTTOM CONTROLS (Naka-center pareho sa ibaba: Tuldok sa itaas ng mouse icon) */}
        <div className="relative z-10 w-full pb-5 pt-3 px-6 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-[#243ead]/80 to-transparent">
          
          {/* DOT INDICATORS (Gitna) */}
          <div className="flex gap-3">
            {slides.map((_, index) => (
              <button key={index} onClick={() => goToSlide(index)} aria-label={`Go to slide ${index + 1}`}>
                <div className={`rounded-full transition-all ${
                  currentSlide === index
                    ? 'w-10 h-3 bg-white'
                    : 'w-3 h-3 bg-white/60'
                }`} />
              </button>
            ))}
          </div>

          {/* MOUSE SCROLL INDICATOR (Nakalagay sa gitna sa ilalim ng mga tuldok) */}
          {/* <div 
            className="flex items-center gap-2 text-white/75 hover:text-white transition-colors cursor-pointer group"
            onClick={() => scrollToSection?.('services')}
          >
            <span className="text-[10px] font-medium uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
              Scroll Down
            </span>
            <Mouse className="w-4 h-4 text-white animate-bounce group-hover:scale-110 transition-transform" />
          </div> */}

        </div>

      </div>
    </section>
  );
});

HeroSlider.displayName = 'HeroSlider';
export default HeroSlider;
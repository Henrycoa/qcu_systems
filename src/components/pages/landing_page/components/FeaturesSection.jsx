import React, { forwardRef } from 'react';
import { Clock, Globe, ShieldCheck, Truck, Sparkles } from 'lucide-react';

const FeaturesSection = forwardRef(({ scrollToSection }, ref) => {
  const features = [
    {
      icon: <Clock />,
      title: 'FAST PROCESSING',
      description: 'Get your barangay documents approved quickly without long queues.',
      aosDelay: 100
    },
    {
      icon: <Globe />,
      title: '100% ONLINE',
      description: 'Request documents and book appointments anytime, anywhere.',
      aosDelay: 200
    },
    {
      icon: <ShieldCheck />,
      title: 'SECURE SYSTEM',
      description: 'Your personal data is protected with secure system handling.',
      aosDelay: 300
    },
    {
      icon: <Truck />,
      title: 'SCHEDULE PICKUP',
      description: 'Choose your preferred schedule — no waiting lines.',
      aosDelay: 400
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* BACKGROUND BLOBS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#243ead]/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#243ead]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* 🔥 HEADER (MAKAPAL) */}
        <div 
          className="text-center max-w-3xl mx-auto mb-20" 
          data-aos="fade-up"
          data-aos-once="true"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#243ead]/15 text-[#243ead] text-xs font-extrabold uppercase tracking-[0.2em] mb-5 border border-[#243ead]/30 shadow">
            <Sparkles className="w-4 h-4" />
            BARANGAY DIGITAL SYSTEM
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
            NO MORE PILA.<br />
            <span className="text-[#243ead] drop-shadow-lg">
              ONLINE NA LAHAT.
            </span>
          </h2>

          <div className="w-28 h-2 bg-[#243ead] mx-auto rounded-full mb-8"></div>

          <p className="text-lg text-gray-600 font-semibold">
            Request documents, schedule appointments, and track status — all in one platform.
          </p>
        </div>
        
        {/* 🔥 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative group p-10 rounded-3xl border border-gray-100 bg-white hover:border-[#243ead]/40 hover:shadow-[0_25px_60px_rgba(36,62,173,0.2)] transition-all duration-500 cursor-pointer overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={feature.aosDelay}
              data-aos-once="true"
              onClick={() => scrollToSection('services')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#243ead]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="w-20 h-20 rounded-2xl bg-[#243ead] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-[0_15px_30px_rgba(36,62,173,0.4)]">
                {React.cloneElement(feature.icon, { 
                    className: "w-10 h-10 text-white stroke-[2.5px]" 
                })}
              </div>

              <h3 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-[#243ead] transition-colors uppercase tracking-wide">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed font-medium text-sm">
                {feature.description}
              </p>

              <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#243ead] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* 🔥 FOOTER */}
        <div 
          className="mt-24 text-center" 
          data-aos="fade-up"
          data-aos-once="true"
        >
          <p className="text-[#243ead] font-extrabold text-sm uppercase tracking-[0.3em] animate-pulse">
            OFFICIAL BARANGAY ONLINE SERVICE
          </p>
        </div>

      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';
export default FeaturesSection;
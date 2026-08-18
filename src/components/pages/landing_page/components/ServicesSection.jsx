import React, { forwardRef, useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  HeartPulse, 
  Droplets, 
  UtensilsCrossed, 
  RefreshCw, 
  Building2, 
  Stethoscope, 
  GraduationCap,
  Mouse
} from 'lucide-react';

const PermitCard = ({ type, onClick }) => {
  return (
    <div 
      className="relative group perspective-1000"
      data-aos="fade-up"
      data-aos-delay={type.aosDelay}
    >
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

const ServicesSection = forwardRef(({ onApplyNow, scrollToSection }, ref) => {
  const [hiddenCardsVisible, setHiddenCardsVisible] = useState(false);

  const permitTypes = [
    { id: 'clearance', label: 'Barangay Clearance', icon: <Building2 />, isPopular: true,aosDelay: 100 },
    { id: 'indigency', label: 'Certificate of Indigency', icon: <HeartPulse />, aosDelay: 200 },
    { id: 'business', label: 'Business Permit', icon: <UtensilsCrossed />, aosDelay: 300 },
    { id: 'residency', label: 'Certificate of Residency', icon: <Droplets />, aosDelay: 400 },
    { id: 'appointment', label: 'Book Appointment', icon: <RefreshCw />, aosDelay: 500 }
  ];

  const hiddenPermitTypes = [
    { id: 'tracking', label: 'Track Request', icon: <Stethoscope /> },
    { id: 'support', label: 'Request Assistance', icon: <GraduationCap /> }
  ];

  return (
    <section ref={ref} className="relative pt-20 pb-16 bg-gray-50/30" data-aos="fade-up">
      
      {/* 🔥 SCROLL DOWN INDICATOR SA PINAKA-TAAS AT GITNA (Center-Top) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
        <div 
          className="flex items-center gap-2 text-[#243ead]/75 hover:text-[#243ead] transition-colors cursor-pointer group bg-white/90 border border-[#243ead]/20 px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm"
          onClick={() => scrollToSection?.('next-section-id')}
        >
          <span className="text-[10px] font-medium uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
            Scroll Down
          </span>
          <Mouse className="w-4 h-4 text-[#243ead] animate-bounce group-hover:scale-110 transition-transform" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#243ead] mb-4 uppercase">
            Barangay Services Online
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Request documents, book appointments, and track your applications easily.
          </p>
        </div>
        
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {permitTypes.map((type) => (
              <PermitCard key={type.id} type={type} onClick={() => onApplyNow(type.id)} />
            ))}
          </div>
        </div>

        {!hiddenCardsVisible ? (
          <div className="text-center mt-12">
            <button
              onClick={() => setHiddenCardsVisible(true)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#243ead] text-white font-bold rounded-xl hover:bg-[#1a2f8a] transition-all shadow-lg hover:shadow-[#243ead]/30"
            >
              <Sparkles className="w-5 h-5" />
              View More Services
            </button>
          </div>
        ) : (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-w-6xl mx-auto">
              {hiddenPermitTypes.map((type) => (
                <PermitCard key={type.id} type={type} onClick={() => onApplyNow(type.id)} />
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

        <div className="mt-20 bg-[#243ead] rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need Help with Your Request?
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Our barangay staff are ready to assist you.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('faq')} 
                className="px-8 py-3 bg-white text-[#243ead] font-bold rounded-xl hover:bg-blue-50"
              >
                Help Center
              </button>
              <a 
                href="tel:09123456789" 
                className="px-8 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600"
              >
                Call Support
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
});

ServicesSection.displayName = 'ServicesSection';
export default ServicesSection;
import React, { forwardRef } from 'react';
import { ArrowRight, Waves, PhoneCall } from 'lucide-react';

const CTASection = forwardRef(({ onApplyNow, scrollToSection }, ref) => {
  return (
    <section 
      ref={ref}
      /* BINAGO: Mula gradient na bright blue, ginawang solid #243ead para match sa Top Bar */
      className="py-16 md:py-24 bg-[#243ead] text-white relative overflow-hidden"
    >
      {/* Optional: Subtle Overlay para hindi masyadong flat pero iisang kulay pa rin */}
      <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Idinagdag: data-aos-once="true" */}
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight" data-aos="fade-up" data-aos-once="true">
            Ready to Get Your Permit?
          </h2>
          {/* Idinagdag: data-aos-once="true" */}
          <p className="text-xl text-blue-100/90 mb-10 font-medium" data-aos="fade-up" data-aos-delay="100" data-aos-once="true">
            Join thousands of satisfied applicants who've streamlined their permit process
          </p>
          
          {/* Idinagdag: data-aos-once="true" */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center" data-aos="fade-up" data-aos-delay="200" data-aos-once="true">
            <button
              onClick={() => onApplyNow('health')}
              /* BINAGO: text-blue-700 -> text-[#243ead] */
              className="px-8 py-4 bg-white text-[#243ead] font-black rounded-xl hover:scale-105 transition-all shadow-2xl shadow-black/20 group"
            >
              <span className="flex items-center justify-center gap-3">
                Start Application Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </button>
            
            <button
              onClick={() => scrollToSection('requirements')}
              className="px-8 py-4 border-2 border-white/30 text-white font-black rounded-xl hover:bg-white/10 hover:border-white transition-all transform hover:scale-105 group"
            >
              <span className="flex items-center justify-center gap-3">
                View Requirements
                <Waves className="w-5 h-5 group-hover:animate-pulse" />
              </span>
            </button>
          </div>
          
          {/* Idinagdag: data-aos-once="true" */}
          <div className="mt-10 flex items-center justify-center gap-2 text-blue-100/80 font-bold" data-aos="fade-up" data-aos-delay="300" data-aos-once="true">
            <PhoneCall className="w-5 h-5" />
            <p className="text-sm">
              Need assistance? Call (02) 8988-4242 • Mon-Fri 8AM-5PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';
export default CTASection;
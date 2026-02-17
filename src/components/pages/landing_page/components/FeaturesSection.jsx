import React, { forwardRef } from 'react';
import { Clock, Globe, ShieldCheck, Truck, Sparkles } from 'lucide-react';

const FeaturesSection = forwardRef(({ scrollToSection }, ref) => {
  const features = [
    {
      icon: <Clock />,
      title: 'Fast Processing',
      description: 'Get your permits approved within 3-7 business days through our priority lane.',
      aosDelay: 100
    },
    {
      icon: <Globe />,
      title: '100% Online',
      description: 'Zero physical contact. Apply, submit, and pay from the comfort of your home.',
      aosDelay: 200
    },
    {
      icon: <ShieldCheck />,
      title: 'Data Privacy',
      description: 'Secured by government-grade encryption to keep your personal records safe.',
      aosDelay: 300
    },
    {
      icon: <Truck />,
      title: 'Doorstep Delivery',
      description: 'Choose to have your physical certificates delivered via our official couriers.',
      aosDelay: 400
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-20 md:py-32 bg-white relative overflow-hidden"
    >
      {/* Background Decorative Blobs - Using the brand blue */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] bg-[#243ead]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] bg-[#243ead]/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20" data-aos="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#243ead]/10 text-[#243ead] text-xs font-black uppercase tracking-widest mb-4 border border-[#243ead]/20 shadow-sm">
            <Sparkles className="w-4 h-4" />
            QC Government Advantage
          </div>
          <h2 className="font-['Poppins',_sans-serif] text-3xl md:text-5xl font-black text-gray-900 mb-6 leading-tight uppercase tracking-tight">
            SERVICE REIMAGINED FOR THE <span className="text-[#243ead]">DIGITAL AGE</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#243ead] mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-500 font-medium">
            We've eliminated the bureaucracy to provide every QC citizen with a seamless, efficient, and 100% digital service experience.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="relative group p-8 rounded-3xl border border-gray-100 bg-white hover:border-[#243ead]/30 hover:shadow-[0_20px_50px_rgba(36,62,173,0.1)] transition-all duration-500 cursor-pointer overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={feature.aosDelay}
              onClick={() => scrollToSection('requirements')}
            >
              {/* Card Hover Background Wash */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#243ead]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Icon Container - Uniform Brand Blue */}
              <div className="w-16 h-16 rounded-2xl bg-[#243ead] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-[0_10px_20px_rgba(36,62,173,0.3)]">
                {React.cloneElement(feature.icon, { 
                    className: "w-8 h-8 text-white stroke-[2px]" 
                })}
              </div>

              {/* Content */}
              <h3 className="font-['Poppins',_sans-serif] text-xl font-black text-gray-900 mb-3 group-hover:text-[#243ead] transition-colors uppercase tracking-tight">
                {feature.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium text-sm">
                {feature.description}
              </p>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#243ead] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          ))}
        </div>

        {/* Call to Action Footer */}
        <div className="mt-20 text-center" data-aos="fade-up">
          <p className="text-[#243ead] font-black text-sm uppercase tracking-[0.2em] animate-pulse">
            Officially verified by the city health department
          </p>
        </div>
      </div>
    </section>
  );
});

FeaturesSection.displayName = 'FeaturesSection';
export default FeaturesSection;
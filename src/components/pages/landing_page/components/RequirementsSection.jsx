import React, { forwardRef } from 'react';
import { FileText, Upload, CreditCard, FileCheck, ArrowRight, Shield } from 'lucide-react';

const RequirementsSection = forwardRef(({ onApplyNow }, ref) => {
  const requirements = [
    'Valid Government Issued ID',
    'Barangay Health Clearance',
    'Community Tax Certificate (Cedula)',
    'Business Permit (if applicable)',
    'Recent 2x2 Digital Photo',
    'Proof of Address / Billing'
  ];

  const processSteps = [
    { 
      icon: <FileText className="w-6 h-6" />, 
      title: 'Fill Online Form', 
      desc: 'Complete the digital application with your personal details.' 
    },
    { 
      icon: <Upload className="w-6 h-6" />, 
      title: 'Upload Documents', 
      desc: 'Scan and attach the required documents listed on the left.' 
    },
    { 
      icon: <CreditCard className="w-6 h-6" />, 
      title: 'Secure Payment', 
      desc: 'Pay the processing fees via Gcash, Maya, or Credit Card.' 
    },
    { 
      icon: <FileCheck className="w-6 h-6" />, 
      title: 'Digital Approval', 
      desc: 'Download your e-Permit or wait for doorstep delivery.' 
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-24 bg-[#f8faff] relative overflow-hidden"
    >
      {/* Subtle Background Branding */}
      <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none">
        <Shield className="w-96 h-96 text-[#243ead]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
          
          {/* Left Column: Requirements */}
          {/* Idinagdag: data-aos-once="true" */}
          <div data-aos="fade-right" data-aos-once="true">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#243ead]/10 text-[#243ead] text-xs font-black uppercase tracking-widest mb-6">
              Checklist
            </div>
            <h2 className="font-['Poppins',_sans-serif] text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">
              REQUIRED <span className="text-[#243ead]">DOCUMENTS</span>
            </h2>
            <p className="text-lg text-gray-600 mb-10 font-medium">
              Please ensure you have digital copies (PDF or JPEG) of the following before starting your application.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {requirements.map((req, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-blue-50 shadow-sm hover:shadow-md hover:border-[#243ead]/30 transition-all group cursor-default"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  data-aos-once="true" // Idagdag: data-aos-once="true"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#243ead] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#243ead]/20 group-hover:scale-110 transition-transform">
                    <span className="text-white font-black text-sm">{index + 1}</span>
                  </div>
                  <span className="text-gray-700 font-bold text-sm uppercase tracking-tight">{req}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column: Process Card */}
          {/* Idinagdag: data-aos-once="true" */}
          <div 
            className="relative bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(36,62,173,0.1)] border border-blue-50 p-8 md:p-12" 
            data-aos="fade-left"
            data-aos-once="true"
          >
            {/* Decorative Header for the Card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-2 bg-[#243ead] rounded-b-full"></div>

            <h3 className="font-['Poppins',_sans-serif] text-2xl font-black text-gray-900 mb-10 text-center uppercase tracking-tight">
              APPLICATION <span className="text-[#243ead]">PROCESS</span>
            </h3>
            
            <div className="space-y-10 relative">
              {/* Vertical Connector Line */}
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#243ead] to-blue-50 hidden md:block"></div>

              {processSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-6 group relative z-10"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  data-aos-once="true" // Idagdag: data-aos-once="true"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#243ead] flex items-center justify-center text-white shadow-xl group-hover:rotate-6 transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-gray-900 group-hover:text-[#243ead] transition-colors uppercase tracking-tight text-lg">
                      {step.title}
                    </h4>
                    <p className="text-gray-500 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* CTA Button */}
            <button
              onClick={() => onApplyNow('health')}
              className="w-full mt-12 py-5 bg-[#243ead] text-white font-black rounded-2xl hover:bg-[#1a2f8a] transition-all hover:shadow-[0_15px_30px_rgba(36,62,173,0.4)] hover:-translate-y-1 flex items-center justify-center gap-3 group uppercase tracking-widest text-sm"
            >
              Start Application
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            
            <div className="flex items-center justify-center gap-2 mt-6">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <p className="text-gray-400 font-bold text-xs uppercase tracking-tighter">
                 System Operational & Secure
               </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

RequirementsSection.displayName = 'RequirementsSection';
export default RequirementsSection;
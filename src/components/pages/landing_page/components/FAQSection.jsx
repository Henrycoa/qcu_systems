import React, { forwardRef } from 'react';
import { HelpCircle, ChevronRight, MessageCircle } from 'lucide-react';

const FAQSection = forwardRef(({ onApplyNow }, ref) => {
  const faqs = [
    {
      q: 'How long does it take to process the application?',
      a: "Health Certificates take 3-5 working days, while Sanitary Permits usually take 5-7 working days depending on the inspection schedule."
    },
    {
      q: 'Can I apply for multiple permits at once?',
      a: 'Yes. Our system allows you to manage multiple applications under one account, though each permit type requires its own set of documents.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We support all major digital payments including GCash, Maya, ShopeePay, and Credit/Debit cards via our secure payment gateway.'
    },
    {
      q: 'Is my personal information secure?',
      a: 'Absolutely. We utilize 256-bit bank-level encryption and strictly follow the Data Privacy Act of 2012 to ensure your records are protected.'
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-24 bg-[#f8faff] border-t border-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          
          {/* Section Header */}
          {/* Idinagdag: data-aos-once="true" */}
          <div className="text-center mb-20" data-aos="fade-up" data-aos-once="true">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#243ead]/10 text-[#243ead] text-xs font-black uppercase tracking-widest mb-4">
              <HelpCircle className="w-4 h-4" />
              Support Center
            </div>
            <h2 className="font-['Poppins',_sans-serif] text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">
              FREQUENTLY ASKED <span className="text-[#243ead]">QUESTIONS</span>
            </h2>
            <p className="text-lg text-gray-500 font-medium max-w-2xl mx-auto">
              Everything you need to know about the QC Health Permit digital application process.
            </p>
          </div>
          
          {/* FAQ Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-[2rem] p-8 border border-transparent hover:border-[#243ead]/20 hover:shadow-[0_20px_40px_rgba(36,62,173,0.05)] transition-all duration-300 cursor-pointer group"
                data-aos="fade-up"
                data-aos-delay={index * 50}
                data-aos-once="true" // Idagdag: data-aos-once="true"
                onClick={() => onApplyNow('health')}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#243ead]/5 flex items-center justify-center shrink-0 group-hover:bg-[#243ead] transition-colors duration-300">
                    <ChevronRight className="w-5 h-5 text-[#243ead] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-lg mb-3 leading-tight uppercase tracking-tighter group-hover:text-[#243ead] transition-colors">
                      {faq.q}
                    </h3>
                    <p className="text-gray-500 font-medium leading-relaxed text-sm">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Support CTA */}
          {/* Idinagdag: data-aos-once="true" */}
          <div 
            className="mt-16 p-8 rounded-[2.5rem] bg-[#243ead] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_20px_40px_rgba(36,62,173,0.3)]"
            data-aos="zoom-in"
            data-aos-once="true"
          >
            <div className="flex items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-black text-xl uppercase tracking-tight">Still have questions?</h4>
                <p className="text-blue-100 font-medium">Our support team is ready to assist you with your permit needs.</p>
              </div>
            </div>
            <button 
              onClick={() => onApplyNow('contact')}
              className="px-8 py-4 bg-white text-[#243ead] font-black rounded-xl hover:bg-blue-50 transition-all uppercase tracking-widest text-sm shrink-0 shadow-lg"
            >
              Contact Support
            </button>
          </div>

        </div>
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';
export default FAQSection;
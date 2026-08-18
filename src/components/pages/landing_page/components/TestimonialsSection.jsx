import React, { forwardRef } from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

const TestimonialsSection = forwardRef(({ scrollToSection }, ref) => {
  const testimonials = [
    {
      name: 'Maria Santos',
      role: 'Restaurant Owner',
      comment: 'Ang bilis ng processing! 3 days lang may digital health permit na ako. Napaka-efficient ng bagong system.',
      rating: 5,
      date: '2 weeks ago',
      avatar: 'MS',
      aosDelay: 100
    },
    {
      name: 'Juan Dela Cruz',
      role: 'Food Stall Operator',
      comment: 'Very convenient dahil online na lahat. Hindi ko na kailangang iwan ang pwesto ko para pumila sa City Hall.',
      rating: 5,
      date: '1 month ago',
      avatar: 'JD',
      aosDelay: 200
    },
    {
      name: 'Andrea Lopez',
      role: 'Cafe Manager',
      comment: 'Professional at secure ang portal. Madali ring i-upload ang documents gamit ang cellphone. Highly recommended!',
      rating: 5,
      date: '3 weeks ago',
      avatar: 'AL',
      aosDelay: 300
    }
  ];

  return (
    <section 
      ref={ref}
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">
        {/* Header Section */}
        {/* Idinagdag: data-aos-once="true" */}
        <div 
          className="text-center max-w-3xl mx-auto mb-20" 
          data-aos="fade-up"
          data-aos-once="true"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#243ead]/10 text-[#243ead] text-xs font-black uppercase tracking-[0.2em] mb-4">
            Citizen Feedback
          </div>
          <h2 className="font-['Poppins',_sans-serif] text-3xl md:text-5xl font-black text-gray-900 mb-6 uppercase tracking-tight">
            TRUSTED BY <span className="text-[#243ead]">THOUSANDS</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#243ead] mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-500 font-medium">
            Join the growing number of Quezon City business owners experiencing a faster, more transparent permit application.
          </p>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-[2rem] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(36,62,173,0.1)] transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between"
              data-aos="fade-up"
              data-aos-delay={testimonial.aosDelay}
              data-aos-once="true" // Idagdag: data-aos-once="true"
              onClick={() => scrollToSection('hero')}
            >
              {/* Quote Icon Background */}
              <Quote className="absolute top-8 right-8 w-12 h-12 text-[#243ead]/5 group-hover:text-[#243ead]/10 transition-colors" />

              <div>
                {/* Rating Stars - Unified Brand Color */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? "text-[#243ead] fill-[#243ead]" : "text-gray-200"}`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-8 font-medium leading-relaxed italic relative z-10">
                  "{testimonial.comment}"
                </p>
              </div>
              
              <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                {/* Avatar with Brand Gradient */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#243ead] to-[#1a2f8a] flex items-center justify-center text-white font-black shadow-lg shadow-[#243ead]/20 group-hover:rotate-3 transition-transform">
                  {testimonial.avatar}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-black text-gray-900 truncate uppercase tracking-tighter text-sm">
                      {testimonial.name}
                    </h4>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-[#243ead] text-[10px] font-black uppercase tracking-widest">{testimonial.role}</p>
                  <p className="text-gray-400 text-[10px] mt-0.5 font-bold">{testimonial.date}</p>
                </div>
              </div>

              {/* Bottom Decorative Accent */}
              <div className="absolute bottom-6 right-8 w-8 h-1 bg-[#243ead]/20 rounded-full group-hover:w-16 transition-all duration-500"></div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        {/* Idinagdag: data-aos-once="true" */}
        <div 
          className="mt-16 text-center" 
          data-aos="fade-up"
          data-aos-once="true"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
              ))}
            </div>
            <p className="text-gray-500 text-sm font-bold">
              Join <span className="text-[#243ead]">10,000+</span> citizens applying this month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

TestimonialsSection.displayName = 'TestimonialsSection';
export default TestimonialsSection;
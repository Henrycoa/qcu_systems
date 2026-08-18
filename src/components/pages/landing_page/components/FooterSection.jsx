import React from 'react';
import { FileText, Phone, Mail, MapPin, Facebook, Globe, ShieldCheck } from 'lucide-react';

const FooterSection = ({ onApplyNow, scrollToSection }) => {
  const permitTypes = [
    { id: 'health', label: 'Health Certificate' },
    { id: 'sanitary', label: 'Sanitary Permit' },
    { id: 'foodhandler', label: "Food Handler's Certificate" }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0f1d] text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Accent Line at the Top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#243ead] to-transparent opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Identity */}
          {/* Idinagdag: data-aos-once="true" */}
          <div data-aos="fade-right" data-aos-once="true">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#243ead] flex items-center justify-center shadow-lg shadow-[#243ead]/20">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-['Poppins',_sans-serif] font-black text-xl tracking-tighter leading-none">
                  QC <span className="text-[#243ead]">HEALTH</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Government Portal
                </div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              The official digital gateway for Quezon City Health Department services. Streamlining bureaucracy through innovation.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#243ead] transition-all group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
              <a 
                href="/" 
                className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-[#243ead] transition-all group"
              >
                <Globe className="w-5 h-5 text-gray-400 group-hover:text-white" />
              </a>
            </div>
          </div>
          
          {/* Quick Links / Services */}
          {/* Idinagdag: data-aos-once="true" */}
          <div data-aos="fade-up" data-aos-delay="100" data-aos-once="true">
            <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-8 text-white">Services</h4>
            <ul className="space-y-4">
              {permitTypes.map((type) => (
                <li key={type.id}>
                  <button
                    onClick={() => onApplyNow(type.id)}
                    className="text-gray-400 hover:text-[#243ead] transition-all text-sm font-bold flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#243ead] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {type.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Information */}
          {/* Idinagdag: data-aos-once="true" */}
          <div data-aos="fade-up" data-aos-delay="200" data-aos-once="true">
            <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-8 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 group cursor-pointer" onClick={() => scrollToSection('faq')}>
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-[#243ead]/20 group-hover:text-[#243ead] transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold mt-1.5">(02) 8988-4242</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-[#243ead]/20 group-hover:text-[#243ead] transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold mt-1.5 break-all">healthoffice@quezoncity.gov.ph</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 group">
                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 group-hover:bg-[#243ead]/20 group-hover:text-[#243ead] transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold mt-1.5">QC Health Office, Quezon City Hall Compound</span>
              </li>
            </ul>
          </div>
          
          {/* Security & Hours */}
          {/* Idinagdag: data-aos-once="true" */}
          <div data-aos="fade-left" data-aos-delay="300" data-aos-once="true">
            <h4 className="font-black text-sm uppercase tracking-[0.2em] mb-8 text-white">Data Privacy</h4>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="w-5 h-5 text-[#243ead]" />
                <span className="text-xs font-black uppercase tracking-widest text-white">NPC Registered</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed font-medium">
                Your data is protected by the Data Privacy Act of 2012. All transactions are encrypted and secured.
              </p>
            </div>
            <div className="mt-6 text-[11px] text-gray-400 font-bold uppercase tracking-widest flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              Server Status: Operational
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] text-center md:text-left">
            © {currentYear} QUEZON CITY GOVERNMENT. LUNGSOD QUEZON.
          </p>
          <div className="flex gap-8">
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">Terms</button>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">Privacy</button>
            <button className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors">Accessibility</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
// src/components/pages/landing_page/components/Navigation.jsx
import React, { useState, useEffect } from 'react';
import { 
  X, ArrowRight, Home, Package, FileCheck, 
  Users, LayoutGrid, Menu, LogOut, User
} from 'lucide-react';

const Logo = ({ onClick, isScrolled = false }) => {
  return (
    <div onClick={onClick} className="flex items-center gap-3 cursor-pointer transition-all duration-500">
      <div className="relative shrink-0">
        <div className={`w-10 h-10 rounded-xl bg-[#243ead] flex items-center justify-center shadow-lg border-2 border-white/20 transition-transform duration-500 ${isScrolled ? 'scale-110' : ''}`}>
          <div className="flex flex-col items-center text-white leading-none">
            <span className="text-sm font-black">QC</span>
            <div className="w-3 h-0.5 bg-white mt-0.5"></div>
            <span className="text-[8px] font-semibold mt-0.5">HP</span>
          </div>
        </div>
      </div>
      <div className={`text-left transition-all duration-500 overflow-hidden 
        ${isScrolled ? 'max-md:w-0 max-md:opacity-0 w-auto opacity-100' : 'w-auto opacity-100'}`}>
        <div className="font-bold text-sm md:text-lg leading-tight whitespace-nowrap text-white">
          QC Health Permit
        </div>
      </div>
    </div>
  );
};

const Navigation = ({ onApplyNow, scrollToSection, onRegisterNow, onLoginNow }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setCurrentUser(parsed);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Error parsing user:', e);
        localStorage.removeItem('user');
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Package },
    { id: 'requirements', label: 'Requirements', icon: FileCheck },
    { id: 'testimonials', label: 'Testimonials', icon: Users },
    { id: 'faq', label: 'FAQ', icon: LayoutGrid }
  ];

  const handleAction = (id) => {
    setActiveNav(id);
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    fetch('http://localhost/in%20jsesus%20name/backend/auth-file/logout.php', {
      method: 'POST',
      credentials: 'include'
    }).catch(() => {});
    
    localStorage.removeItem('user');
    localStorage.removeItem('user_type');
    setIsLoggedIn(false);
    setCurrentUser(null);
    window.location.reload();
  };

  return (
    <>
      {/* --- TOP HEADER --- */}
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 flex items-center 
        ${isScrolled 
          ? 'h-16 bg-[#243ead] md:shadow-lg max-md:bg-transparent max-md:shadow-none' 
          : 'h-20 bg-transparent shadow-none'}`}>
        
        <div className="flex items-center justify-between w-full max-w-7xl mx-auto px-6">
          <Logo onClick={() => handleAction('hero')} isScrolled={isScrolled} />
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Requirements', 'FAQ'].map((item) => (
              <button key={item} onClick={() => handleAction(item.toLowerCase())}
                className="bg-transparent border-none text-xs font-black uppercase tracking-widest cursor-pointer text-white/90 hover:text-white transition-colors">
                {item}
              </button>
            ))}

            {/* ✅ LOGGED IN - Show user info + Logout */}
            {isLoggedIn && currentUser ? (
              <>
                <span className="text-white text-sm font-bold flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {currentUser?.first_name || currentUser?.username || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/80 hover:bg-red-600 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                {/* ✅ NOT LOGGED IN - Show Register + Login + Apply Now */}
                <button
                  onClick={onRegisterNow}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Register
                </button>
                <button
                  onClick={onLoginNow}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => onApplyNow?.()}
                  className="px-6 py-2 rounded-xl font-bold bg-white text-[#243ead] border-none cursor-pointer hover:scale-105 transition-all shadow-md"
                >
                  Apply Now
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button onClick={() => setIsMobileMenuOpen(true)}
            className={`md:hidden p-2 rounded-full border-none cursor-pointer transition-all
              ${isScrolled ? 'bg-[#243ead] text-white shadow-lg' : 'bg-white/10 text-white'}`}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed inset-0 z-[2000] md:hidden transition-all ${isMobileMenuOpen ? 'visible' : 'invisible'}`}>
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setIsMobileMenuOpen(false)} />
        <div className={`absolute top-0 right-0 w-64 h-full bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-6 flex justify-between items-center border-b">
            <span className="font-black text-[#243ead]">MENU</span>
            <X className="text-gray-400 cursor-pointer" onClick={() => setIsMobileMenuOpen(false)} />
          </div>
          <div className="py-4">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => handleAction(item.id)} className="w-full flex items-center gap-4 px-8 py-4 bg-transparent border-none text-gray-600 font-bold hover:bg-gray-50 text-left">
                <item.icon className="w-5 h-5 text-[#243ead]" /> {item.label}
              </button>
            ))}

            {/* ✅ Mobile Menu - Auth Section */}
            <div className="border-t border-gray-100 mt-4 pt-4 px-8 space-y-2">
              {isLoggedIn && currentUser ? (
                <>
                  <div className="text-sm font-bold text-gray-700 flex items-center gap-2 py-2">
                    <User className="w-4 h-4 text-[#243ead]" />
                    {currentUser?.first_name || currentUser?.username || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 bg-red-500 text-white rounded-xl text-xs font-bold hover:bg-red-600 transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { onRegisterNow?.(); setIsMobileMenuOpen(false); }}
                    className="w-full px-4 py-3 bg-[#243ead] text-white rounded-xl text-xs font-bold hover:bg-[#1a2e82] transition-all"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => { onLoginNow?.(); setIsMobileMenuOpen(false); }}
                    className="w-full px-4 py-3 bg-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-300 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { onApplyNow?.(); setIsMobileMenuOpen(false); }}
                    className="w-full px-4 py-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all"
                  >
                    Apply Now
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* --- MOBILE BOTTOM NAV --- */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-[1000] px-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-full border border-blue-50 shadow-2xl flex items-center justify-around p-2 max-w-[400px] mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button key={item.id} onClick={() => handleAction(item.id)} className="relative flex items-center justify-center w-12 h-12 bg-transparent border-none cursor-pointer">
                {isActive && <div className="absolute inset-0 bg-[#243ead] rounded-full shadow-lg animate-[scaleIn_0.2s_ease-out]" />}
                <div className="relative z-10"><Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} /></div>
              </button>
            );
          })}
          <div className="w-[1px] h-6 bg-gray-100" />
          <button onClick={() => onApplyNow?.()} className="w-10 h-10 rounded-full bg-[#243ead] flex items-center justify-center shadow-lg border-none cursor-pointer active:scale-90 transition-transform">
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;
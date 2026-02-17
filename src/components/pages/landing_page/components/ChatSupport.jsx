import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, Headset, Minus } from 'lucide-react';

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, type: 'bot', text: 'Mabuhay! Welcome to QC Health Support. How can we help you today?' }
  ]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = { id: Date.now(), type: 'user', text: message };
    setChatHistory(prev => [...prev, userMsg]);
    setMessage('');

    setTimeout(() => {
      const botMsg = { 
        id: Date.now() + 1, 
        type: 'bot', 
        text: "Salamat! Ang aming representative ay makikipag-ugnayan sa inyo sandali. Ang inyong Ticket ID ay #QC-HELP-" + Math.floor(Math.random() * 1000)
      };
      setChatHistory(prev => [...prev, botMsg]);
    }, 1000);
  };

  return (
    /* DITO ANG MAGIC: 
       'hidden' = default na nakatago (mobile)
       'md:block' = lilitaw lang kapag medium screen (768px) pataas 
    */
    <div className="hidden md:block fixed bottom-6 right-6 z-[100] font-['Poppins',_sans-serif]">
      
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#243ead] text-white rounded-full shadow-[0_8px_32px_rgba(36,62,173,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        >
          <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0a0f1d]"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] h-[500px] bg-[#11192e] border border-white/10 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          
          {/* Header */}
          <div className="bg-[#243ead] p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Headset className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest leading-none">QC Support</h4>
                <p className="text-[10px] text-blue-200 mt-1 flex items-center gap-1 font-bold">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Online Now
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Minus className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-[#0a0f1d] to-[#11192e]">
            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-xs font-medium leading-relaxed ${
                  msg.type === 'user' 
                    ? 'bg-[#243ead] text-white rounded-tr-none shadow-lg' 
                    : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-[#0e1629] border-t border-white/5 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#243ead] transition-all"
            />
            <button 
              type="submit"
              className="w-10 h-10 bg-[#243ead] text-white rounded-xl flex items-center justify-center hover:bg-blue-600 active:scale-95 transition-all shadow-lg shadow-blue-900/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatSupport;
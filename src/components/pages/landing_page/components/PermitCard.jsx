// src/components/pages/landing_page/components/PermitCard.jsx
import React from 'react';
import { BadgeCheck, Shield, Utensils, Check } from 'lucide-react';

const PermitCard = ({ type, onClick }) => {
  const getIcon = (id) => {
    switch(id) {
      case 'health': return <BadgeCheck className="w-5 h-5" />;
      case 'sanitary': return <Shield className="w-5 h-5" />;
      case 'foodhandler': return <Utensils className="w-5 h-5" />;
      default: return <BadgeCheck className="w-5 h-5" />;
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2 cursor-pointer"
      data-aos="fade-up"
      data-aos-delay={type.aosDelay}
      onClick={onClick}
    >
      <div className={`h-2 bg-gradient-to-r ${type.color}`}></div>
      <div className="p-8">
        <div className={`w-14 h-14 rounded-xl ${type.bgColor} flex items-center justify-center mb-6 transform hover:rotate-12 transition-transform`}>
          <div className={type.iconColor}>
            {getIcon(type.id)}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{type.label}</h3>
        <p className="text-gray-600 mb-6">{type.description}</p>
        
        <div className="mb-8">
          {type.features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-3" data-aos="fade-right" data-aos-delay={idx * 100}>
              <Check className="w-5 h-5 text-emerald-500" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-100 pt-8">
          <div className="flex justify-between items-center mb-6">
            <div data-aos="fade-right">
              <div className="text-2xl font-bold text-gray-900">{type.fee}</div>
              <div className="text-sm text-gray-500">Application Fee</div>
            </div>
            <div className="text-right" data-aos="fade-left">
              <div className="font-semibold text-gray-900">{type.processingDays}</div>
              <div className="text-sm text-gray-500">Processing Time</div>
            </div>
          </div>
          
          <button className={`w-full py-3 bg-gradient-to-r ${type.color} text-white font-medium rounded-lg hover:opacity-90 transition-all hover:scale-105`}>
            Apply for {type.label}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermitCard;
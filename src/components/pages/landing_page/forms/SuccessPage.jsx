import React from 'react';
// Tinanggal ang mga unused icons para sa malinis na build
import { 
  CheckCircle, 
  Home, 
  Printer, 
  Clock 
} from 'lucide-react';

const SuccessPage = ({ referenceNumber, formData, onBackToHome }) => {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20 font-sans">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          
          {/* Main Card */}
          <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden print:shadow-none print:border-none">
            <div className="p-8 md:p-12">
              <div className="text-center">
                {/* Success Icon */}
                <div className="w-20 h-20 bg-emerald-500 rounded-3xl rotate-12 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-100">
                  <CheckCircle className="w-10 h-10 text-white -rotate-12" />
                </div>
                
                <h1 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
                  Application Received!
                </h1>
                <p className="text-gray-500 font-medium mb-10 max-w-sm mx-auto">
                  Mabuhay! Your QC Health Certificate application is now being validated by our health officers.
                </p>

                {/* Reference Box */}
                <div className="relative group mb-10">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#243ead] to-blue-400 rounded-3xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
                  <div className="relative bg-blue-50/50 border border-blue-100 rounded-[2rem] p-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#243ead] mb-2 block">
                      Transaction Reference Number
                    </span>
                    <p className="text-3xl md:text-4xl font-black text-[#243ead] font-mono tracking-tighter">
                      {referenceNumber}
                    </p>
                  </div>
                </div>

                {/* NEXT STEPS TIMELINE */}
                <div className="text-left mb-10 space-y-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 ml-2">What happens next?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold text-[#243ead]">1</div>
                      <p className="text-sm font-bold text-gray-700">Wait for Document Validation (1-2 days)</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-60">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold text-gray-400">2</div>
                      <p className="text-sm font-medium text-gray-600">Pay the Health Fee via QC Pay Easy</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 opacity-60">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs font-bold text-gray-400">3</div>
                      <p className="text-sm font-medium text-gray-600">Download & Print your Digital Certificate</p>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 gap-4 mb-10 text-left">
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Applicant</p>
                    <p className="font-bold text-gray-800 text-sm truncate">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Status</p>
                    <p className="font-bold text-amber-600 text-sm flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Pending
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 print:hidden">
                  <button
                    onClick={() => window.print()}
                    className="w-full py-4 bg-gray-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                  >
                    <Printer className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Print Confirmation
                  </button>
                  <button
                    onClick={onBackToHome}
                    className="w-full py-4 bg-white border-2 border-gray-100 text-gray-600 font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Home className="w-4 h-4" />
                    Return Home
                  </button>
                </div>
                
                {/* Print-only Footer */}
                <div className="hidden print:block mt-10 text-[10px] text-gray-400 italic">
                  This is an official system-generated confirmation from the Quezon City Health Office (QCE).
                  <br/>Date: {new Date().toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div className="mt-12 text-center print:hidden">
            <p className="text-sm text-gray-400 font-medium">
              A copy of this confirmation was sent to <br/>
              <span className="text-gray-900 font-bold">{formData.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
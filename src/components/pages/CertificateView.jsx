import React from 'react';
import { Shield, Download, FileCheck, Award } from 'lucide-react';

const CertificateView = ({ certificateData, onBack, onDownload }) => {
  if (!certificateData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#243ead] border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">Loading certificate...</p>
        </div>
      </div>
    );
  }

  // Get current date for release date if not provided
  const releaseDate = certificateData.release_date ? new Date(certificateData.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-slate-100 py-12 font-sans print:py-0 print:bg-white" id="certificate-container">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Certificate Paper Sheet */}
        <div className="bg-white rounded-xl shadow-2xl border-2 border-gray-300 overflow-hidden p-8 md:p-14 relative print:shadow-none print:border-none">
          
          {/* Subtle Watermark Background */}
          <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
            <Shield className="w-[500px] h-[500px] text-[#243ead]" />
          </div>

          {/* Official Header with Dual Logos */}
          <div className="flex items-center justify-between border-b-2 border-[#243ead] pb-6 mb-8">
            {/* Left Logo (Placeholder or QC Seal) */}
            <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-full border border-gray-200">
              <Shield className="w-12 h-12 text-[#243ead]" />
            </div>

            {/* Center Header Text */}
            <div className="text-center flex-grow px-4">
              <h2 className="text-sm md:text-base font-semibold text-gray-700 uppercase tracking-wide">
                Republic of the Philippines
              </h2>
              <h1 className="text-base md:text-lg font-bold text-gray-900 uppercase tracking-wide">
                Quezon City
              </h1>
              <h3 className="text-lg md:text-xl font-extrabold text-[#243ead] uppercase tracking-wider mt-0.5">
                Quezon City Health Department
              </h3>
            </div>

            {/* Right Logo (Health Department Logo Placeholder) */}
            <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-50 rounded-full border border-gray-200">
              <Award className="w-12 h-12 text-[#243ead]" />
            </div>
          </div>

          {/* Certificate Main Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-wide uppercase">
              Digital Health Certificate
            </h1>
            <p className="text-xs md:text-sm text-gray-600 mt-2">
              In Accordance with the Provision of <span className="font-semibold underline">PD 856</span> and <span className="font-semibold underline">Ordinance No. SP-2503 S-2016</span>
            </p>
          </div>

          {/* Certificate Body Content */}
          <div className="space-y-6">
            
            {/* Health Certificate Number Banner */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Health Certificate Number: </span>
              <span className="text-lg md:text-xl font-bold text-[#243ead] tracking-wider ml-2">
                {certificateData.certificate_no || 'HC-2024-001'}
              </span>
            </div>

            {/* Personal Information Grid (Strict Official Look) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 py-2 px-2">
              <div className="border-b border-dashed border-gray-200 pb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Name</p>
                <p className="text-base md:text-lg font-bold text-gray-900 uppercase mt-0.5">
                  {certificateData.user_fname} {certificateData.user_lname}
                </p>
              </div>

              <div className="border-b border-dashed border-gray-200 pb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Age</p>
                <p className="text-base md:text-lg font-bold text-gray-900 mt-0.5">
                  {certificateData.age || 'N/A'}
                </p>
              </div>

              <div className="border-b border-dashed border-gray-200 pb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Date of Birth</p>
                <p className="text-base md:text-lg font-bold text-gray-900 mt-0.5">
                  {certificateData.birthdate || 'N/A'}
                </p>
              </div>

              <div className="border-b border-dashed border-gray-200 pb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Gender</p>
                <p className="text-base md:text-lg font-bold text-gray-900 uppercase mt-0.5">
                  {certificateData.gender || 'N/A'}
                </p>
              </div>

              <div className="border-b border-dashed border-gray-200 pb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Nationality</p>
                <p className="text-base md:text-lg font-bold text-gray-900 uppercase mt-0.5">
                  {certificateData.nationality || 'Filipino'}
                </p>
              </div>

              <div className="border-b border-dashed border-gray-200 pb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Date Approved</p>
                <p className="text-base md:text-lg font-bold text-gray-900 mt-0.5">
                  {certificateData.issue_date ? new Date(certificateData.issue_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) : 'N/A'}
                </p>
              </div>

              <div className="md:col-span-2 border-b border-dashed border-gray-200 pb-2">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Home Address</p>
                <p className="text-base md:text-lg font-bold text-gray-900 uppercase mt-0.5">
                  {certificateData.address || 'N/A'}
                </p>
              </div>
            </div>

            {/* Bottom Section: Signatory and QR Codes aligned side by side */}
            <div className="mt-12 pt-6 grid grid-cols-1 md:grid-cols-2 items-end gap-6">
              
              {/* Doctor's Signature Area */}
              <div className="text-left space-y-3">
                <div className="w-full max-w-xs">
                  {/* Digital Signature line or space */}
                  <div className="border-b-2 border-gray-800 pb-1 mb-1">
                    <p className="font-serif italic text-sm text-blue-900 font-semibold">
                      {certificateData.doctor_signature_text || ''}
                    </p>
                  </div>
                  <p className="text-xs md:text-sm font-bold text-gray-900 uppercase">
                    {certificateData.doctor_name || 'ESPERANZA ANITA N. ESCANO-ARIAS MD, MPH'}
                  </p>
                  <p className="text-[11px] text-gray-600 font-medium tracking-tight">
                    OIC - QUEZON CITY HEALTH DEPARTMENT
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-gray-500">
                    Date of Release: <span className="font-bold text-gray-800">{releaseDate}</span>
                  </p>
                </div>
              </div>

              {/* QR Codes Area (E-Services & Online Validation) */}
              <div className="flex justify-start md:justify-end gap-4">
                {/* QR 1 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-white border border-gray-300 p-1 rounded shadow-sm flex items-center justify-center">
                    {/* Palitan mo nalang ng actual QR image element kung meron */}
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white text-[9px] font-mono">
                      QR CODE
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium block mt-1">E-Services QR</span>
                </div>

                {/* QR 2 */}
                <div className="text-center">
                  <div className="w-20 h-20 bg-white border border-gray-300 p-1 rounded shadow-sm flex items-center justify-center">
                    {/* Palitan mo nalang ng actual QR image element kung meron */}
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center text-white text-[9px] font-mono">
                      QR CODE
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 font-medium block mt-1">Online Validation</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Action Buttons (Hidden when printing) */}
        <div className="flex flex-wrap gap-4 justify-center mt-8 print:hidden">
          <button
            onClick={onDownload}
            className="px-6 py-3 bg-[#243ead] text-white font-bold rounded-xl hover:bg-[#1a2f8a] transition-all flex items-center gap-2 shadow-lg"
          >
            <Download className="w-4 h-4" />
            Download Certificate
          </button>
          <button
            onClick={onBack}
            className="px-6 py-3 border-2 border-[#243ead] text-[#243ead] font-bold rounded-xl hover:bg-[#243ead] hover:text-white transition-all flex items-center gap-2 bg-white"
          >
            <FileCheck className="w-4 h-4" />
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default CertificateView;
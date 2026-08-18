// src/components/pages/ExamResultView.jsx
import React from 'react';
import { Trophy, FileCheck, Award } from 'lucide-react';

const ExamResultView = ({ examScore, totalQuestions, onViewCertificate }) => {
  const passed = examScore >= 5; // 5/10 to pass

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 uppercase italic mb-2">Exam Completed!</h2>
          <div className="mb-4">
            <p className="text-gray-500">Your score</p>
            <p className="text-5xl font-black text-[#243ead]">{examScore}</p>
            <p className="text-sm text-gray-400">out of {totalQuestions}</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <p className="text-sm text-gray-500">Status</p>
            <p className={`text-xl font-bold ${passed ? 'text-emerald-600' : 'text-red-600'}`}>
              {passed ? '✅ PASSED' : '❌ FAILED'}
            </p>
            {passed && (
              <p className="text-xs text-gray-400 mt-1">You have successfully passed the examination.</p>
            )}
          </div>
          {passed ? (
            <button
              onClick={onViewCertificate}
              className="px-8 py-4 bg-[#243ead] text-white font-black uppercase text-sm rounded-2xl hover:bg-[#1a2f8a] transition-all flex items-center justify-center gap-3 mx-auto"
            >
              <FileCheck className="w-5 h-5" />
              View Certificate
            </button>
          ) : (
            <div className="p-4 bg-red-50 rounded-2xl border border-red-200">
              <p className="text-sm text-red-600 font-medium">You need at least 5/10 to pass.</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 px-6 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all"
              >
                Retry Exam
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamResultView;
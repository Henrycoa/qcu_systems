// src/components/pages/ExamView.jsx
import React from 'react';
import { BookOpen, Clipboard, Clock } from 'lucide-react';

const ExamView = ({ 
  examQuestions, 
  examAnswers, 
  examLoading, 
  handleExamAnswer, 
  submitExam 
}) => {
  const answeredCount = Object.keys(examAnswers).length;
  const totalQuestions = examQuestions.length;

  return (
    <div className="min-h-screen bg-slate-50 py-12 font-sans">
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-[#243ead]" />
            </div>
            <h2 className="text-2xl font-black text-gray-900 uppercase italic">Health Permit Examination</h2>
            <p className="text-gray-500 text-sm mt-2">Answer all 10 questions to proceed</p>
            <div className="mt-2 flex items-center justify-center gap-4 text-xs">
              <span className="text-gray-400">
                Progress: {answeredCount} / {totalQuestions} answered
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {answeredCount === totalQuestions ? '✅ Ready to submit' : 'Answer all questions'}
              </span>
            </div>
          </div>

          {examLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-[#243ead] border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Loading questions...</p>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {examQuestions.map((q, index) => (
                  <div key={q.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <p className="text-sm font-bold text-gray-900 mb-3">
                      {index + 1}. {q.question}
                    </p>
                    <div className="space-y-2">
                      {['a', 'b', 'c', 'd'].map((option) => (
                        <label key={option} className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-xl border border-gray-200 hover:border-[#243ead] transition-all">
                          <input
                            type="radio"
                            name={`question_${index}`}
                            value={option}
                            checked={examAnswers[index] === option}
                            onChange={() => handleExamAnswer(index, option)}
                            className="w-4 h-4 text-[#243ead] focus:ring-[#243ead]"
                          />
                          <span className="text-sm text-gray-700">
                            {option.toUpperCase()}. {q[`option_${option}`]}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={submitExam}
                disabled={answeredCount < totalQuestions}
                className={`w-full mt-8 py-4 font-black uppercase text-sm rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl ${
                  answeredCount === totalQuestions
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                }`}
              >
                <Clipboard className="w-5 h-5" />
                {answeredCount === totalQuestions ? 'Submit Exam' : `Answer ${totalQuestions - answeredCount} more question(s)`}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamView;
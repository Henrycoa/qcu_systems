// src/components/forms/Quiz.jsx
import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, AlertCircle, ArrowRight, 
  ArrowLeft, Award, Star, Trophy, User, Users,
  Heart, Brain, Shield, Sparkles
} from 'lucide-react';

const Quiz = ({ user, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // ✅ FEMALE QUESTIONS
  const femaleQuestions = [
    {
      id: 1,
      question: 'What is the recommended daily water intake for adults?',
      options: ['6-8 glasses', '10-12 glasses', '4-5 glasses', '15+ glasses'],
      correct: 0
    },
    {
      id: 2,
      question: 'How often should women get a Pap smear?',
      options: ['Every year', 'Every 3 years', 'Every 5 years', 'Only when pregnant'],
      correct: 1
    },
    {
      id: 3,
      question: 'What is the normal range for blood pressure?',
      options: ['120/80', '140/90', '100/60', '160/100'],
      correct: 0
    },
    {
      id: 4,
      question: 'How much sleep is recommended for adults?',
      options: ['4-5 hours', '6-7 hours', '7-9 hours', '10+ hours'],
      correct: 2
    },
    {
      id: 5,
      question: 'What is a healthy BMI range?',
      options: ['15-18', '18.5-24.9', '25-30', '30-35'],
      correct: 1
    }
  ];

  // ✅ MALE QUESTIONS
  const maleQuestions = [
    {
      id: 1,
      question: 'What is the recommended daily protein intake for active males?',
      options: ['30g', '50g', '100g', '150g'],
      correct: 2
    },
    {
      id: 2,
      question: 'How often should men get their cholesterol checked?',
      options: ['Every year', 'Every 5 years', 'Every 10 years', 'Only when sick'],
      correct: 1
    },
    {
      id: 3,
      question: 'What is the normal range for blood pressure?',
      options: ['120/80', '140/90', '100/60', '160/100'],
      correct: 0
    },
    {
      id: 4,
      question: 'How much sleep is recommended for adults?',
      options: ['4-5 hours', '6-7 hours', '7-9 hours', '10+ hours'],
      correct: 2
    },
    {
      id: 5,
      question: 'What is a healthy BMI range?',
      options: ['15-18', '18.5-24.9', '25-30', '30-35'],
      correct: 1
    }
  ];

  // Select questions based on gender
  const questions = user?.gender === 'female' ? femaleQuestions : maleQuestions;
  const totalQuestions = questions.length;

  const handleSelectAnswer = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      let correct = 0;
      for (let i = 0; i < totalQuestions; i++) {
        if (selectedAnswers[i] === questions[i].correct) {
          correct++;
        }
      }
      setScore(correct);
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  // --- RESULTS VIEW ---
  if (showResults) {
    const passed = score >= totalQuestions * 0.6; // 60% to pass
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100 text-center">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-emerald-100' : 'bg-red-100'}`}>
            {passed ? (
              <Trophy className="w-12 h-12 text-emerald-600" />
            ) : (
              <XCircle className="w-12 h-12 text-red-600" />
            )}
          </div>
          
          <h2 className="text-3xl font-black text-gray-900 uppercase italic mb-4">
            {passed ? 'Congratulations!' : 'Keep Learning!'}
          </h2>
          <p className="text-gray-600 mb-4">
            You scored <span className="font-bold text-[#243ead]">{score}</span> out of {totalQuestions}
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Score</span>
              <span className={`text-2xl font-bold ${passed ? 'text-emerald-600' : 'text-red-600'}`}>
                {Math.round((score / totalQuestions) * 100)}%
              </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${passed ? 'bg-emerald-500' : 'bg-red-500'}`}
                style={{ width: `${(score / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={handleRetry}
              className="px-6 py-3 border-2 border-[#243ead] text-[#243ead] font-bold rounded-xl hover:bg-[#243ead] hover:text-white transition-all"
            >
              Retry Quiz
            </button>
            <button 
              onClick={onComplete}
              className="px-6 py-3 bg-[#243ead] text-white font-bold rounded-xl hover:bg-[#1a2f8a] transition-all flex items-center gap-2"
            >
              Complete <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- QUIZ VIEW ---
  const question = questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-gray-100">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            {user?.gender === 'female' ? (
              <Heart className="w-6 h-6 text-pink-500" />
            ) : (
              <Brain className="w-6 h-6 text-blue-500" />
            )}
            <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              {user?.gender === 'female' ? "Women's Health" : "Men's Health"} Quiz
            </span>
          </div>
          <span className="text-sm font-bold text-[#243ead]">
            {currentQuestion + 1} / {totalQuestions}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#243ead] to-blue-400 transition-all duration-500 rounded-full"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="font-bold text-[#243ead]">Question {currentQuestion + 1}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{question.question}</h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index;
            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(currentQuestion, index)}
                className={`
                  w-full text-left p-4 border-2 rounded-2xl transition-all duration-200
                  ${isSelected ? 'border-[#243ead] bg-[#243ead]/5' : 'border-gray-200 hover:border-[#243ead] hover:bg-gray-50'}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`
                    w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold
                    ${isSelected ? 'border-[#243ead] bg-[#243ead] text-white' : 'border-gray-300 text-gray-400'}
                  `}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium text-gray-800">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-2 text-gray-400 font-bold uppercase text-xs hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!hasAnswered}
            className="flex items-center gap-2 px-6 py-3 bg-[#243ead] text-white font-bold uppercase text-xs rounded-xl hover:bg-[#1a2f8a] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {currentQuestion === totalQuestions - 1 ? 'Submit' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
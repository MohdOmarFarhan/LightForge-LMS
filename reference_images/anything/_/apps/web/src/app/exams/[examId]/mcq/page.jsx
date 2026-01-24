"use client";

import { useState } from "react";
import {
  GraduationCap,
  Clock,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle2,
  Circle,
  Send,
  AlertCircle,
  Grid3x3,
} from "lucide-react";

export default function MCQExamPage({ params }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showGrid, setShowGrid] = useState(false);

  // Mock MCQ data
  const mcqData = {
    title: "Multiple Choice Questions",
    totalQuestions: 30,
    duration: "45 minutes",
    questions: Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      question: `What is the derivative of the function f(x) = ${i + 1}x² + ${i}x - 5 with respect to x?`,
      options: [
        { label: "A", text: `${2 * (i + 1)}x + ${i}` },
        { label: "B", text: `${i + 1}x² + ${i}` },
        { label: "C", text: `${i + 1}x + 5` },
        { label: "D", text: `${2 * (i + 1)}x - ${i}` },
      ],
      selectedAnswer: null,
      flagged: false,
    })),
  };

  const [questions, setQuestions] = useState(mcqData.questions);
  const currentQ = questions[currentQuestion];

  const handleAnswer = (optionLabel) => {
    const updated = [...questions];
    updated[currentQuestion].selectedAnswer = optionLabel;
    setQuestions(updated);
  };

  const handleFlag = () => {
    const updated = [...questions];
    updated[currentQuestion].flagged = !updated[currentQuestion].flagged;
    setQuestions(updated);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleQuestionJump = (index) => {
    setCurrentQuestion(index);
    setShowGrid(false);
  };

  const answeredCount = questions.filter(
    (q) => q.selectedAnswer !== null,
  ).length;
  const flaggedCount = questions.filter((q) => q.flagged).length;
  const unansweredCount = questions.length - answeredCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#E0F2FE] dark:from-[#0D1117] dark:via-[#0A0E14] dark:to-[#0D1929] font-inter">
      {/* Top Bar */}
      <div className="bg-white dark:bg-[#1E1E1E] border-b border-[#E2E8F0] dark:border-[#2A2A2A] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-xl text-[#0A1929] dark:text-white">
                  {mcqData.title}
                </h1>
                <p className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Question {currentQuestion + 1} of {mcqData.totalQuestions}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#F8FAFC] dark:bg-[#0A0E14] border border-[#E2E8F0] dark:border-[#2A2A2A] rounded-lg hover:bg-[#E3F2FD] dark:hover:bg-[#0066FF]/10 transition-colors duration-200"
              >
                <Grid3x3 size={18} className="text-[#0066FF]" />
                <span className="font-onest text-sm font-medium text-[#0A1929] dark:text-white">
                  Question Grid
                </span>
              </button>
              <div className="flex items-center space-x-2 px-4 py-2 bg-[#FEF3C7] dark:bg-[#F59E0B]/10 rounded-lg border border-[#F59E0B]/30">
                <Clock size={18} className="text-[#F59E0B]" />
                <span className="font-mono font-bold text-[#F59E0B]">
                  42:15
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar - Stats */}
          <div className="lg:col-span-1 space-y-4">
            {/* Progress Card */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] p-6 shadow-sm">
              <h3 className="font-montserrat font-bold text-lg text-[#0A1929] dark:text-white mb-4">
                Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF]">
                      Answered
                    </span>
                    <span className="font-montserrat font-bold text-[#10B981]">
                      {answeredCount}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#E2E8F0] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full transition-all duration-300"
                      style={{
                        width: `${(answeredCount / questions.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF]">
                      Unanswered
                    </span>
                    <span className="font-montserrat font-bold text-[#F59E0B]">
                      {unansweredCount}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-[#E2E8F0] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F59E0B] to-[#FBBF24] rounded-full transition-all duration-300"
                      style={{
                        width: `${(unansweredCount / questions.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF]">
                      Flagged
                    </span>
                    <span className="font-montserrat font-bold text-[#EF4444]">
                      {flaggedCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-2xl p-6 text-white shadow-lg">
              <div className="text-center">
                <p className="font-onest text-sm text-white/80 mb-1">
                  Completion
                </p>
                <p className="font-montserrat font-bold text-4xl mb-2">
                  {Math.round((answeredCount / questions.length) * 100)}%
                </p>
                <p className="font-onest text-xs text-white/70">
                  {answeredCount} of {questions.length} questions
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] p-6 shadow-sm">
              <h3 className="font-montserrat font-bold text-sm text-[#0A1929] dark:text-white mb-3">
                Legend
              </h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center">
                    <CheckCircle2 size={16} className="text-white" />
                  </div>
                  <span className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                    Answered
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 border-2 border-[#E2E8F0] dark:border-[#2A2A2A] rounded-lg"></div>
                  <span className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                    Not Answered
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-[#EF4444] rounded-lg flex items-center justify-center">
                    <Flag size={16} className="text-white" />
                  </div>
                  <span className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                    Flagged
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Question Grid Overlay */}
            {showGrid && (
              <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] p-6 shadow-lg mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-montserrat font-bold text-lg text-[#0A1929] dark:text-white">
                    All Questions
                  </h3>
                  <button
                    onClick={() => setShowGrid(false)}
                    className="text-sm font-onest text-[#64748B] hover:text-[#0066FF] transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-10 gap-2">
                  {questions.map((q, idx) => (
                    <button
                      key={q.id}
                      onClick={() => handleQuestionJump(idx)}
                      className={`w-12 h-12 rounded-lg font-montserrat font-bold text-sm transition-all duration-200 transform hover:scale-110 ${
                        idx === currentQuestion
                          ? "bg-[#0066FF] text-white ring-2 ring-[#0066FF] ring-offset-2"
                          : q.flagged
                            ? "bg-[#EF4444] text-white"
                            : q.selectedAnswer
                              ? "bg-[#10B981] text-white"
                              : "bg-[#F8FAFC] dark:bg-[#0A0E14] text-[#64748B] border border-[#E2E8F0] dark:border-[#2A2A2A]"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Question Card */}
            <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] shadow-lg overflow-hidden">
              {/* Question Header */}
              <div className="bg-gradient-to-r from-[#F8FAFC] to-white dark:from-[#0A0E14] dark:to-[#1E1E1E] border-b border-[#E2E8F0] dark:border-[#2A2A2A] px-8 py-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-lg flex items-center justify-center">
                        <span className="font-montserrat font-bold text-white">
                          {currentQuestion + 1}
                        </span>
                      </div>
                      <div>
                        <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                          Question {currentQuestion + 1} of {questions.length}
                        </p>
                        <p className="font-montserrat font-bold text-sm text-[#0A1929] dark:text-white">
                          Select the correct answer
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleFlag}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                      currentQ.flagged
                        ? "bg-[#EF4444] text-white"
                        : "bg-[#F8FAFC] dark:bg-[#0A0E14] text-[#64748B] hover:bg-[#FEF2F2] hover:text-[#EF4444]"
                    }`}
                  >
                    <Flag size={16} />
                    <span className="font-onest text-sm font-medium">
                      {currentQ.flagged ? "Flagged" : "Flag"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Question Body */}
              <div className="px-8 py-8">
                <p className="font-onest text-lg text-[#0A1929] dark:text-white leading-relaxed mb-8">
                  {currentQ.question}
                </p>

                {/* Options */}
                <div className="space-y-4">
                  {currentQ.options.map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleAnswer(option.label)}
                      className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.01] ${
                        currentQ.selectedAnswer === option.label
                          ? "border-[#0066FF] bg-[#E3F2FD] dark:bg-[#0066FF]/10 shadow-md"
                          : "border-[#E2E8F0] dark:border-[#2A2A2A] bg-[#F8FAFC] dark:bg-[#0A0E14] hover:border-[#0066FF]/50"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                            currentQ.selectedAnswer === option.label
                              ? "bg-[#0066FF] text-white"
                              : "bg-white dark:bg-[#1E1E1E] border-2 border-[#E2E8F0] dark:border-[#2A2A2A] text-[#64748B]"
                          }`}
                        >
                          {currentQ.selectedAnswer === option.label ? (
                            <CheckCircle2 size={24} />
                          ) : (
                            <span className="font-montserrat font-bold text-lg">
                              {option.label}
                            </span>
                          )}
                        </div>
                        <span
                          className={`font-onest text-base transition-colors duration-200 ${
                            currentQ.selectedAnswer === option.label
                              ? "text-[#0066FF] font-semibold"
                              : "text-[#0A1929] dark:text-white"
                          }`}
                        >
                          {option.text}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Footer */}
              <div className="bg-gradient-to-r from-[#F8FAFC] to-white dark:from-[#0A0E14] dark:to-[#1E1E1E] border-t border-[#E2E8F0] dark:border-[#2A2A2A] px-8 py-6">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePrevious}
                    disabled={currentQuestion === 0}
                    className={`px-6 py-3 rounded-xl font-onest font-semibold flex items-center space-x-2 transition-all duration-200 ${
                      currentQuestion === 0
                        ? "bg-[#F8FAFC] dark:bg-[#0A0E14] text-[#CBD5E1] cursor-not-allowed"
                        : "bg-white dark:bg-[#1E1E1E] border-2 border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0A1929] dark:text-white hover:border-[#0066FF] hover:shadow-md"
                    }`}
                  >
                    <ChevronLeft size={20} />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center space-x-3">
                    {currentQuestion === questions.length - 1 ? (
                      <button className="px-8 py-3 bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#059669] hover:to-[#10B981] text-white font-bold rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] font-onest">
                        <Send size={20} />
                        <span>Submit MCQ</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleNext}
                        className="px-6 py-3 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-bold rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] font-onest"
                      >
                        <span>Next</span>
                        <ChevronRight size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Warning Message */}
            {unansweredCount > 0 &&
              currentQuestion === questions.length - 1 && (
                <div className="mt-6 bg-[#FEF3C7] dark:bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4 flex items-start space-x-3">
                  <AlertCircle
                    size={20}
                    className="text-[#F59E0B] flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="font-onest font-semibold text-sm text-[#92400E] dark:text-[#FBBF24]">
                      You have {unansweredCount} unanswered question
                      {unansweredCount !== 1 ? "s" : ""}
                    </p>
                    <p className="font-onest text-xs text-[#92400E] dark:text-[#FBBF24] mt-1">
                      You can still submit, but we recommend reviewing all
                      questions first.
                    </p>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

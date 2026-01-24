import { useState } from "react";
import {
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Circle,
  AlertCircle,
  BarChart3,
} from "lucide-react";

export default function MCQExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Mock questions data
  const questions = [
    {
      id: 1,
      question: "What is the derivative of f(x) = x³ + 2x² - 5x + 3?",
      options: [
        { id: "a", text: "3x² + 4x - 5" },
        { id: "b", text: "3x² + 2x - 5" },
        { id: "c", text: "x² + 4x - 5" },
        { id: "d", text: "3x³ + 4x² - 5x" },
      ],
    },
    {
      id: 2,
      question:
        "Which of the following is the correct formula for integration by parts?",
      options: [
        { id: "a", text: "∫u dv = uv - ∫v du" },
        { id: "b", text: "∫u dv = uv + ∫v du" },
        { id: "c", text: "∫u dv = u/v - ∫v du" },
        { id: "d", text: "∫u dv = uv - ∫u dv" },
      ],
    },
    {
      id: 3,
      question: "What is lim(x→0) (sin x)/x?",
      options: [
        { id: "a", text: "0" },
        { id: "b", text: "1" },
        { id: "c", text: "∞" },
        { id: "d", text: "Does not exist" },
      ],
    },
    // Add more questions as needed
  ];

  const totalQuestions = 50; // Mock total
  const timeRemaining = "54:32";

  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const toggleFlag = (questionId) => {
    setFlagged((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const navigateQuestion = (index) => {
    setCurrentQuestion(index);
  };

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = flagged.size;

  return (
    <div className="min-h-screen bg-[#0F1419] text-white">
      {/* Header */}
      <div className="border-b border-[#1F2937] bg-[#161B22] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-white">
                Advanced Mathematics - Calculus II
              </h1>
              <p className="text-[#9CA3AF] text-xs md:text-sm">
                MCQ Section • {totalQuestions} Questions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-3 md:px-4 py-2 bg-[#DC2626]/10 border border-[#DC2626] rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#DC2626]" />
                  <span className="text-sm font-bold text-[#DC2626]">
                    {timeRemaining}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowSubmitModal(true)}
                className="px-4 md:px-6 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg font-semibold text-sm transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Question Card */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="px-4 py-2 bg-[#0D6EFD] text-white rounded-lg font-bold text-lg">
                    Q{currentQuestion + 1}
                  </span>
                  <div>
                    <p className="text-[#9CA3AF] text-xs">
                      Question {currentQuestion + 1} of {totalQuestions}
                    </p>
                    <p className="text-[#6B7280] text-xs mt-1">1 mark</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleFlag(questions[currentQuestion]?.id)}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    flagged.has(questions[currentQuestion]?.id)
                      ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                      : "bg-[#1F2937] text-[#9CA3AF] hover:text-[#F59E0B]"
                  }`}
                >
                  <Flag
                    size={20}
                    fill={
                      flagged.has(questions[currentQuestion]?.id)
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h2 className="text-lg md:text-xl text-white leading-relaxed">
                  {questions[currentQuestion]?.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentQuestion]?.options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() =>
                      handleAnswerSelect(
                        questions[currentQuestion].id,
                        option.id,
                      )
                    }
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      answers[questions[currentQuestion].id] === option.id
                        ? "border-[#0D6EFD] bg-[#0D6EFD]/10"
                        : "border-[#1F2937] hover:border-[#374151] bg-[#0F1419]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          answers[questions[currentQuestion].id] === option.id
                            ? "border-[#0D6EFD] bg-[#0D6EFD]"
                            : "border-[#374151]"
                        }`}
                      >
                        {answers[questions[currentQuestion].id] ===
                          option.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <span className="text-[#9CA3AF] text-xs mr-2">
                          {option.id.toUpperCase()}.
                        </span>
                        <span className="text-white">{option.text}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  navigateQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  currentQuestion === 0
                    ? "bg-[#1F2937] text-[#6B7280] cursor-not-allowed"
                    : "bg-[#1F2937] text-white hover:bg-[#374151]"
                }`}
              >
                <ChevronLeft size={18} />
                Previous
              </button>

              <div className="hidden md:block text-center">
                <p className="text-[#9CA3AF] text-sm">
                  Question {currentQuestion + 1} of {totalQuestions}
                </p>
              </div>

              <button
                onClick={() =>
                  navigateQuestion(
                    Math.min(totalQuestions - 1, currentQuestion + 1),
                  )
                }
                disabled={currentQuestion === totalQuestions - 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  currentQuestion === totalQuestions - 1
                    ? "bg-[#1F2937] text-[#6B7280] cursor-not-allowed"
                    : "bg-[#0D6EFD] text-white hover:bg-[#0B5ED7]"
                }`}
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 size={16} className="text-[#0D6EFD]" />
                Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#22C55E]" />
                    <span className="text-sm text-[#9CA3AF]">Answered</span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {answeredCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Circle size={16} className="text-[#6B7280]" />
                    <span className="text-sm text-[#9CA3AF]">Unanswered</span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {unansweredCount}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Flag size={16} className="text-[#F59E0B]" />
                    <span className="text-sm text-[#9CA3AF]">Flagged</span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {flaggedCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Question Grid */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">
                All Questions
              </h3>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({ length: totalQuestions }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => navigateQuestion(index)}
                    className={`aspect-square rounded-lg font-semibold text-xs transition-all duration-200 ${
                      currentQuestion === index
                        ? "bg-[#0D6EFD] text-white ring-2 ring-[#0D6EFD] ring-offset-2 ring-offset-[#161B22]"
                        : answers[index + 1]
                          ? "bg-[#22C55E] text-white hover:bg-[#16A34A]"
                          : flagged.has(index + 1)
                            ? "bg-[#F59E0B] text-white hover:bg-[#D97706]"
                            : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Legend</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#0D6EFD] rounded"></div>
                  <span className="text-xs text-[#9CA3AF]">Current</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#22C55E] rounded"></div>
                  <span className="text-xs text-[#9CA3AF]">Answered</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#F59E0B] rounded"></div>
                  <span className="text-xs text-[#9CA3AF]">Flagged</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#1F2937] rounded"></div>
                  <span className="text-xs text-[#9CA3AF]">Not Answered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={24} className="text-[#F59E0B]" />
              <h2 className="text-xl font-bold text-white">
                Submit MCQ Section?
              </h2>
            </div>
            <p className="text-[#9CA3AF] mb-6">
              You have answered {answeredCount} out of {totalQuestions}{" "}
              questions.
              {unansweredCount > 0 &&
                ` ${unansweredCount} questions remain unanswered.`}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 px-6 py-3 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all duration-200"
              >
                Review
              </button>
              <button className="flex-1 px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg font-semibold transition-all duration-200">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

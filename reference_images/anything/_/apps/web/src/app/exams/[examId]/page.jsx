"use client";

import { useState } from "react";
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  Circle,
  ArrowRight,
  FileText,
  BookOpen,
  PenTool,
  AlertCircle,
  Trophy,
  Send,
} from "lucide-react";

export default function ExamHubPage({ params }) {
  // Mock exam data
  const examData = {
    title: "Advanced Mathematics - Calculus II",
    course: "Mathematics",
    duration: "180 minutes",
    totalMarks: 100,
    instructions: [
      "Read all questions carefully before attempting",
      "Answer all sections to complete the exam",
      "Once submitted, answers cannot be changed",
      "Upload clear images for written answers",
      "Ensure proper lighting when taking photos",
      "Internet connection required throughout the exam",
    ],
    parts: [
      {
        id: "mcq",
        type: "MCQ",
        title: "Multiple Choice Questions",
        icon: FileText,
        questions: 30,
        marks: 30,
        duration: "45 minutes",
        description: "30 objective questions with 4 options each",
        completed: false,
      },
      {
        id: "cq",
        type: "CQ",
        title: "Creative Questions",
        icon: BookOpen,
        questions: 8,
        marks: 40,
        duration: "60 minutes",
        description: "2 stems with 4 questions each",
        completed: false,
      },
      {
        id: "descriptive",
        type: "Descriptive",
        title: "Descriptive Questions",
        icon: PenTool,
        questions: 3,
        marks: 30,
        duration: "75 minutes",
        description: "Essay-type comprehensive answers",
        completed: false,
      },
    ],
  };

  const [parts, setParts] = useState(examData.parts);
  const [examStarted, setExamStarted] = useState(false);

  const completedParts = parts.filter((p) => p.completed).length;
  const totalParts = parts.length;
  const allCompleted = completedParts === totalParts;

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
                  {examData.title}
                </h1>
                <p className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  {examData.course} • {examData.totalMarks} marks •{" "}
                  {examData.duration}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                  Progress
                </p>
                <p className="font-montserrat font-bold text-lg text-[#0066FF]">
                  {completedParts}/{totalParts} Parts
                </p>
              </div>
              {!allCompleted && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-lg">
                  <Clock size={18} className="text-[#0066FF]" />
                  <span className="font-mono font-bold text-[#0066FF]">
                    02:59:45
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        {!examStarted && (
          <div className="mb-8 bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="font-montserrat font-bold text-3xl mb-3">
                  Welcome to Your Exam
                </h2>
                <p className="font-onest text-lg text-white/90 mb-6 max-w-2xl">
                  This exam consists of {totalParts} parts. You can complete
                  them in any order. Make sure to read all instructions
                  carefully before starting.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Trophy size={20} />
                    <span className="font-onest">
                      Total: {examData.totalMarks} marks
                    </span>
                  </div>
                  <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                  <div className="flex items-center space-x-2">
                    <Clock size={20} />
                    <span className="font-onest">
                      Duration: {examData.duration}
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border-2 border-white/20">
                  <GraduationCap size={64} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions Section */}
        {!examStarted && (
          <div className="mb-8 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] p-8 shadow-sm">
            <div className="flex items-start space-x-3 mb-6">
              <div className="w-10 h-10 bg-[#FEF3C7] dark:bg-[#F59E0B]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-[#F59E0B]" />
              </div>
              <div>
                <h3 className="font-montserrat font-bold text-xl text-[#0A1929] dark:text-white mb-2">
                  Important Instructions
                </h3>
                <p className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Please read these carefully before beginning your exam
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-3 pl-13">
              {examData.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-3 group">
                  <div className="w-6 h-6 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#0066FF] transition-colors duration-200">
                    <span className="font-bold text-xs text-[#0066FF] group-hover:text-white">
                      {index + 1}
                    </span>
                  </div>
                  <p className="font-onest text-sm text-[#0A1929] dark:text-white">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-[#E2E8F0] dark:border-[#2A2A2A]">
              <button
                onClick={() => setExamStarted(true)}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/40 transform hover:scale-[1.02] active:scale-[0.98] font-onest"
              >
                <span>I Understand, Start Exam</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Exam Parts Grid */}
        {examStarted && (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {parts.map((part) => {
                const Icon = part.icon;
                return (
                  <div
                    key={part.id}
                    className={`bg-white dark:bg-[#1E1E1E] rounded-2xl border-2 ${
                      part.completed
                        ? "border-[#10B981] dark:border-[#10B981]"
                        : "border-[#E2E8F0] dark:border-[#2A2A2A]"
                    } p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-14 h-14 ${
                          part.completed
                            ? "bg-gradient-to-br from-[#10B981] to-[#34D399]"
                            : "bg-gradient-to-br from-[#0066FF] to-[#00D4FF]"
                        } rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <Icon size={28} className="text-white" />
                      </div>
                      {part.completed ? (
                        <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#E8F5E9] dark:bg-[#10B981]/10 rounded-full">
                          <CheckCircle2 size={16} className="text-[#10B981]" />
                          <span className="font-onest text-xs font-semibold text-[#10B981]">
                            Completed
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#FEF3C7] dark:bg-[#F59E0B]/10 rounded-full">
                          <Circle size={16} className="text-[#F59E0B]" />
                          <span className="font-onest text-xs font-semibold text-[#F59E0B]">
                            Pending
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <h3 className="font-montserrat font-bold text-xl text-[#0A1929] dark:text-white mb-2">
                      {part.title}
                    </h3>
                    <p className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF] mb-4">
                      {part.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="bg-[#F8FAFC] dark:bg-[#0A0E14] rounded-lg p-3 text-center">
                        <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF] mb-1">
                          Questions
                        </p>
                        <p className="font-montserrat font-bold text-lg text-[#0A1929] dark:text-white">
                          {part.questions}
                        </p>
                      </div>
                      <div className="bg-[#F8FAFC] dark:bg-[#0A0E14] rounded-lg p-3 text-center">
                        <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF] mb-1">
                          Marks
                        </p>
                        <p className="font-montserrat font-bold text-lg text-[#0A1929] dark:text-white">
                          {part.marks}
                        </p>
                      </div>
                      <div className="bg-[#F8FAFC] dark:bg-[#0A0E14] rounded-lg p-3 text-center">
                        <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF] mb-1">
                          Time
                        </p>
                        <p className="font-montserrat font-bold text-sm text-[#0A1929] dark:text-white">
                          {part.duration.split(" ")[0]}m
                        </p>
                      </div>
                    </div>

                    {/* Action Button */}
                    {part.completed ? (
                      <button className="w-full py-3 px-4 bg-[#F8FAFC] dark:bg-[#0A0E14] border-2 border-[#10B981] text-[#10B981] font-semibold rounded-xl transition-all duration-200 hover:bg-[#E8F5E9] dark:hover:bg-[#10B981]/10 flex items-center justify-center space-x-2 font-onest">
                        <CheckCircle2 size={18} />
                        <span>Review Answers</span>
                      </button>
                    ) : (
                      <button className="w-full py-3 px-4 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-bold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 font-onest">
                        <span>Start {part.type}</span>
                        <ArrowRight size={18} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Final Submit Section */}
            {allCompleted && (
              <div className="bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-2xl p-8 text-white shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center border-2 border-white/30">
                      <Trophy size={32} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-montserrat font-bold text-2xl mb-2">
                        All Parts Completed!
                      </h3>
                      <p className="font-onest text-white/90 text-lg">
                        You've completed all sections. Review your answers or
                        submit your exam.
                      </p>
                      <p className="font-onest text-sm text-white/80 mt-2">
                        ⚠️ Once submitted, you cannot make any changes
                      </p>
                    </div>
                  </div>
                  <button className="px-8 py-4 bg-white text-[#10B981] font-bold rounded-xl transition-all duration-200 hover:bg-[#F8FAFC] shadow-lg hover:shadow-xl transform hover:scale-[1.05] active:scale-[0.95] flex items-center space-x-2 font-onest">
                    <Send size={20} />
                    <span>Submit Exam</span>
                  </button>
                </div>
              </div>
            )}

            {/* Progress Bar */}
            {!allCompleted && (
              <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-montserrat font-bold text-lg text-[#0A1929] dark:text-white">
                      Exam Progress
                    </h4>
                    <p className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF]">
                      Complete all parts to submit your exam
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-montserrat font-bold text-2xl text-[#0066FF]">
                      {Math.round((completedParts / totalParts) * 100)}%
                    </p>
                    <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                      {completedParts} of {totalParts} complete
                    </p>
                  </div>
                </div>
                <div className="w-full h-3 bg-[#E2E8F0] dark:bg-[#2A2A2A] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] rounded-full transition-all duration-500"
                    style={{ width: `${(completedParts / totalParts) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

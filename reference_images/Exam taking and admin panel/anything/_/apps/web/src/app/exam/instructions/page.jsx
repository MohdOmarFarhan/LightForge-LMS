import { useState } from "react";
import {
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Upload,
  ArrowRight,
  ChevronRight,
  CheckCheck,
} from "lucide-react";

export default function ExamInstructionsPage() {
  // Mock exam data - in real app this would come from props/API
  const [examData] = useState({
    title: "Advanced Mathematics - Calculus II",
    subject: "Mathematics",
    totalTime: "120 minutes",
    parts: {
      mcq: {
        available: true,
        completed: false,
        questions: 50,
        timeLimit: "60 minutes",
        marks: 50,
      },
      cq: {
        available: true,
        completed: false,
        stems: 5,
        questions: 20,
        timeLimit: "45 minutes",
        marks: 40,
      },
      descriptive: {
        available: true,
        completed: false,
        questions: 2,
        timeLimit: "30 minutes",
        marks: 20,
      },
    },
    instructions: [
      "Read each question carefully before answering",
      "You must complete one section before moving to another",
      "For written answers (CQ/Descriptive), write on paper and upload clear images",
      "Ensure your uploaded images are legible and properly oriented",
      "Once you submit a section, you cannot go back to change answers",
      "Complete all sections before final submission",
      "Internet connectivity is required throughout the exam",
    ],
  });

  const [completedParts, setCompletedParts] = useState({
    mcq: false,
    cq: false,
    descriptive: false,
  });

  const allPartsCompleted =
    completedParts.mcq && completedParts.cq && completedParts.descriptive;
  const anyPartCompleted =
    completedParts.mcq || completedParts.cq || completedParts.descriptive;

  return (
    <div className="min-h-screen bg-[#0F1419] text-white">
      {/* Header */}
      <div className="border-b border-[#1F2937] bg-[#161B22]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-[#0D6EFD] text-white text-xs font-semibold rounded-full">
                  {examData.subject}
                </span>
                {anyPartCompleted && (
                  <span className="px-3 py-1 bg-[#16A34A]/20 text-[#22C55E] text-xs font-semibold rounded-full flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    In Progress
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">
                {examData.title}
              </h1>
              <p className="text-[#9CA3AF] text-sm">
                Total Duration: {examData.totalTime} • Total Marks:{" "}
                {examData.parts.mcq.marks +
                  examData.parts.cq.marks +
                  examData.parts.descriptive.marks}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <div className="px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg">
                <div className="flex items-center gap-2 text-[#9CA3AF]">
                  <Clock size={18} className="text-[#0D6EFD]" />
                  <span className="text-sm font-medium">
                    Time Remaining: 115:42
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Instructions Card */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={20} className="text-[#F59E0B]" />
                <h2 className="text-xl font-bold text-white">
                  Exam Instructions
                </h2>
              </div>
              <div className="space-y-3">
                {examData.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                    <p className="text-[#D1D5DB] text-sm leading-relaxed">
                      {instruction}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exam Sections */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <BookOpen size={20} className="text-[#0D6EFD]" />
                Exam Sections
              </h2>

              {/* MCQ Section */}
              {examData.parts.mcq.available && (
                <div
                  className={`bg-[#161B22] border ${completedParts.mcq ? "border-[#16A34A]" : "border-[#1F2937]"} rounded-xl p-6 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">
                          Multiple Choice Questions (MCQ)
                        </h3>
                        {completedParts.mcq && (
                          <span className="px-2 py-1 bg-[#16A34A]/20 text-[#22C55E] text-xs font-semibold rounded flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            Completed
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">
                            Questions
                          </p>
                          <p className="text-white font-semibold">
                            {examData.parts.mcq.questions}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">
                            Time Limit
                          </p>
                          <p className="text-white font-semibold">
                            {examData.parts.mcq.timeLimit}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Marks</p>
                          <p className="text-white font-semibold">
                            {examData.parts.mcq.marks}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Type</p>
                          <p className="text-white font-semibold">MCQ</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={completedParts.mcq}
                    className={`w-full md:w-auto px-6 py-3 ${
                      completedParts.mcq
                        ? "bg-[#1F2937] text-[#6B7280] cursor-not-allowed"
                        : "bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white"
                    } rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2`}
                  >
                    {completedParts.mcq ? (
                      <>
                        <CheckCheck size={18} />
                        Section Completed
                      </>
                    ) : (
                      <>
                        Start MCQ Section
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* CQ Section */}
              {examData.parts.cq.available && (
                <div
                  className={`bg-[#161B22] border ${completedParts.cq ? "border-[#16A34A]" : "border-[#1F2937]"} rounded-xl p-6 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">
                          Creative Questions (CQ)
                        </h3>
                        {completedParts.cq && (
                          <span className="px-2 py-1 bg-[#16A34A]/20 text-[#22C55E] text-xs font-semibold rounded flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-[#9CA3AF] text-sm mb-3">
                        {examData.parts.cq.stems} stems with{" "}
                        {examData.parts.cq.questions} questions total
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Stems</p>
                          <p className="text-white font-semibold">
                            {examData.parts.cq.stems}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">
                            Time Limit
                          </p>
                          <p className="text-white font-semibold">
                            {examData.parts.cq.timeLimit}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Marks</p>
                          <p className="text-white font-semibold">
                            {examData.parts.cq.marks}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Format</p>
                          <p className="text-white font-semibold flex items-center gap-1">
                            <Upload size={14} />
                            Written
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={completedParts.cq}
                    className={`w-full md:w-auto px-6 py-3 ${
                      completedParts.cq
                        ? "bg-[#1F2937] text-[#6B7280] cursor-not-allowed"
                        : "bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white"
                    } rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2`}
                  >
                    {completedParts.cq ? (
                      <>
                        <CheckCheck size={18} />
                        Section Completed
                      </>
                    ) : (
                      <>
                        Start CQ Section
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Descriptive Section */}
              {examData.parts.descriptive.available && (
                <div
                  className={`bg-[#161B22] border ${completedParts.descriptive ? "border-[#16A34A]" : "border-[#1F2937]"} rounded-xl p-6 transition-all duration-300`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white">
                          Descriptive Questions
                        </h3>
                        {completedParts.descriptive && (
                          <span className="px-2 py-1 bg-[#16A34A]/20 text-[#22C55E] text-xs font-semibold rounded flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-[#9CA3AF] text-sm mb-3">
                        Detailed written answers required
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">
                            Questions
                          </p>
                          <p className="text-white font-semibold">
                            {examData.parts.descriptive.questions}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">
                            Time Limit
                          </p>
                          <p className="text-white font-semibold">
                            {examData.parts.descriptive.timeLimit}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Marks</p>
                          <p className="text-white font-semibold">
                            {examData.parts.descriptive.marks}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#9CA3AF] text-xs mb-1">Format</p>
                          <p className="text-white font-semibold flex items-center gap-1">
                            <Upload size={14} />
                            Written
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    disabled={completedParts.descriptive}
                    className={`w-full md:w-auto px-6 py-3 ${
                      completedParts.descriptive
                        ? "bg-[#1F2937] text-[#6B7280] cursor-not-allowed"
                        : "bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white"
                    } rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2`}
                  >
                    {completedParts.descriptive ? (
                      <>
                        <CheckCheck size={18} />
                        Section Completed
                      </>
                    ) : (
                      <>
                        Start Descriptive Section
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Exam Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#9CA3AF]">
                      Overall Completion
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {Math.round(
                        (((completedParts.mcq ? 1 : 0) +
                          (completedParts.cq ? 1 : 0) +
                          (completedParts.descriptive ? 1 : 0)) /
                          3) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                  <div className="w-full bg-[#1F2937] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#0D6EFD] to-[#0B5ED7] h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${(((completedParts.mcq ? 1 : 0) + (completedParts.cq ? 1 : 0) + (completedParts.descriptive ? 1 : 0)) / 3) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#1F2937] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {completedParts.mcq ? (
                        <CheckCircle2 size={16} className="text-[#22C55E]" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-[#374151] rounded-full"></div>
                      )}
                      <span
                        className={`text-sm ${completedParts.mcq ? "text-[#22C55E]" : "text-[#9CA3AF]"}`}
                      >
                        MCQ
                      </span>
                    </div>
                    <span className="text-xs text-[#6B7280]">
                      {examData.parts.mcq.marks} marks
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {completedParts.cq ? (
                        <CheckCircle2 size={16} className="text-[#22C55E]" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-[#374151] rounded-full"></div>
                      )}
                      <span
                        className={`text-sm ${completedParts.cq ? "text-[#22C55E]" : "text-[#9CA3AF]"}`}
                      >
                        CQ
                      </span>
                    </div>
                    <span className="text-xs text-[#6B7280]">
                      {examData.parts.cq.marks} marks
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {completedParts.descriptive ? (
                        <CheckCircle2 size={16} className="text-[#22C55E]" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-[#374151] rounded-full"></div>
                      )}
                      <span
                        className={`text-sm ${completedParts.descriptive ? "text-[#22C55E]" : "text-[#9CA3AF]"}`}
                      >
                        Descriptive
                      </span>
                    </div>
                    <span className="text-xs text-[#6B7280]">
                      {examData.parts.descriptive.marks} marks
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Card */}
            {allPartsCompleted && (
              <div className="bg-gradient-to-br from-[#16A34A] to-[#15803D] border border-[#22C55E] rounded-xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={20} className="text-white" />
                  <h3 className="text-lg font-bold text-white">
                    Ready to Submit
                  </h3>
                </div>
                <p className="text-white/90 text-sm mb-4">
                  You've completed all sections. Review your answers or submit
                  your exam.
                </p>
                <button className="w-full px-6 py-3 bg-white hover:bg-gray-100 text-[#16A34A] rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                  Submit Exam
                  <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* Quick Tips */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                  <p className="text-[#9CA3AF] text-xs">
                    Complete sections in any order you prefer
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                  <p className="text-[#9CA3AF] text-xs">
                    Upload clear, well-lit images for written answers
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                  <p className="text-[#9CA3AF] text-xs">
                    Keep track of time for each section
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

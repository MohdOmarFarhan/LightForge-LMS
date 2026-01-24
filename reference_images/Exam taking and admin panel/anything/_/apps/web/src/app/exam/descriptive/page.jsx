import { useState } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  CheckCircle2,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";

export default function DescriptiveExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [uploads, setUploads] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Explain the fundamental theorem of calculus and its applications in solving real-world problems. Provide at least three detailed examples demonstrating how this theorem bridges differential and integral calculus.",
      marks: 15,
      suggestedPages: "3-4 pages",
    },
    {
      id: 2,
      text: "Derive the formula for the volume of a solid of revolution using the disk method. Then, apply this method to find the volume of a sphere with radius R, showing all steps of your derivation.",
      marks: 15,
      suggestedPages: "3-4 pages",
    },
  ];

  const totalQuestions = questions.length;
  const timeRemaining = "24:18";

  const handleFileUpload = (questionId, files) => {
    const fileArray = Array.from(files);
    setUploads((prev) => ({
      ...prev,
      [questionId]: [...(prev[questionId] || []), ...fileArray],
    }));
  };

  const removeFile = (questionId, fileIndex) => {
    setUploads((prev) => ({
      ...prev,
      [questionId]: prev[questionId].filter((_, index) => index !== fileIndex),
    }));
  };

  const getUploadedFiles = (questionId) => uploads[questionId] || [];
  const getTotalUploads = () =>
    Object.values(uploads).reduce((sum, files) => sum + files.length, 0);

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
                Descriptive Section • {totalQuestions} Questions
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
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
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
                    <p className="text-[#6B7280] text-xs mt-1">
                      {questions[currentQuestion]?.marks} marks •{" "}
                      {questions[currentQuestion]?.suggestedPages}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-lg md:text-xl text-white leading-relaxed">
                  {questions[currentQuestion]?.text}
                </h2>
              </div>

              <div className="bg-[#0D6EFD]/10 border border-[#0D6EFD] rounded-xl p-4 mb-6">
                <p className="text-sm text-[#0D6EFD]">
                  <strong>Instructions:</strong> Write your answer on paper,
                  then upload clear images of your work below.
                </p>
              </div>

              <div>
                <label className="block">
                  <div className="border-2 border-dashed border-[#374151] hover:border-[#0D6EFD] rounded-xl p-8 cursor-pointer transition-all duration-200 bg-[#0F1419]">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(
                          questions[currentQuestion].id,
                          e.target.files,
                        )
                      }
                    />
                    <div className="flex flex-col items-center gap-3">
                      <Upload size={32} className="text-[#0D6EFD]" />
                      <div className="text-center">
                        <p className="text-base text-white font-semibold mb-1">
                          Upload Answer Images
                        </p>
                        <p className="text-sm text-[#9CA3AF]">
                          Click to browse or drag and drop multiple images
                        </p>
                        <p className="text-xs text-[#6B7280] mt-2">
                          Supported formats: JPG, PNG • Max 10MB per image
                        </p>
                      </div>
                    </div>
                  </div>
                </label>

                {getUploadedFiles(questions[currentQuestion].id).length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <ImageIcon size={16} className="text-[#0D6EFD]" />
                      Uploaded Images (
                      {getUploadedFiles(questions[currentQuestion].id).length})
                    </h3>
                    {getUploadedFiles(questions[currentQuestion].id).map(
                      (file, fileIndex) => (
                        <div
                          key={fileIndex}
                          className="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg hover:bg-[#374151] transition-all duration-200"
                        >
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 bg-[#0F1419] rounded-lg flex items-center justify-center">
                              <ImageIcon size={20} className="text-[#0D6EFD]" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-white font-medium truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-[#9CA3AF]">
                                {(file.size / 1024).toFixed(2)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              removeFile(
                                questions[currentQuestion].id,
                                fileIndex,
                              )
                            }
                            className="p-2 hover:bg-[#DC2626]/20 rounded-lg transition-all duration-200"
                          >
                            <X size={18} className="text-[#DC2626]" />
                          </button>
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }
                disabled={currentQuestion === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${currentQuestion === 0 ? "bg-[#1F2937] text-[#6B7280] cursor-not-allowed" : "bg-[#1F2937] text-white hover:bg-[#374151]"}`}
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
                  setCurrentQuestion(
                    Math.min(totalQuestions - 1, currentQuestion + 1),
                  )
                }
                disabled={currentQuestion === totalQuestions - 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${currentQuestion === totalQuestions - 1 ? "bg-[#1F2937] text-[#6B7280] cursor-not-allowed" : "bg-[#0D6EFD] text-white hover:bg-[#0B5ED7]"}`}
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">
                Upload Progress
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#9CA3AF]">Total Uploads</span>
                  <span className="text-sm font-bold text-white">
                    {getTotalUploads()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#9CA3AF]">Questions</span>
                  <span className="text-sm font-bold text-white">
                    {totalQuestions}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">
                All Questions
              </h3>
              <div className="space-y-2">
                {questions.map((q, index) => {
                  const hasUploads = getUploadedFiles(q.id).length > 0;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestion(index)}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${currentQuestion === index ? "bg-[#0D6EFD] text-white" : hasUploads ? "bg-[#22C55E]/20 text-[#22C55E] hover:bg-[#22C55E]/30" : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">
                          Question {index + 1}
                        </span>
                        {hasUploads && currentQuestion !== index && (
                          <CheckCircle2 size={16} />
                        )}
                      </div>
                      <p className="text-xs opacity-75 mt-1">{q.marks} marks</p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                  <p className="text-xs text-[#9CA3AF]">
                    Write in clear, legible handwriting
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                  <p className="text-xs text-[#9CA3AF]">
                    Show all working and steps
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                  <p className="text-xs text-[#9CA3AF]">
                    Upload images in correct order
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-8 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={24} className="text-[#F59E0B]" />
              <h2 className="text-xl font-bold text-white">
                Submit Descriptive Section?
              </h2>
            </div>
            <p className="text-[#9CA3AF] mb-6">
              You have uploaded {getTotalUploads()} images for {totalQuestions}{" "}
              questions. Make sure all images are clear and in order.
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

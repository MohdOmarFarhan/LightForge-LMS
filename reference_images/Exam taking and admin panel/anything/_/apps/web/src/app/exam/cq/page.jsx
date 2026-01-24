import { useState } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  CheckCircle2,
  Image as ImageIcon,
  FileText,
  AlertCircle,
} from "lucide-react";

export default function CQExamPage() {
  const [currentStem, setCurrentStem] = useState(0);
  const [uploads, setUploads] = useState({});
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Mock CQ data
  const stems = [
    {
      id: 1,
      title: "Stem 1: Projectile Motion",
      passage:
        "A ball is thrown from the top of a building with an initial velocity of 20 m/s at an angle of 30° above the horizontal. The building has a height of 45 meters. Assume g = 10 m/s² and air resistance is negligible.",
      questions: [
        {
          id: "a",
          text: "Calculate the time taken for the ball to reach the ground.",
          marks: 3,
        },
        {
          id: "b",
          text: "Determine the horizontal distance traveled by the ball.",
          marks: 3,
        },
        {
          id: "c",
          text: "Find the velocity of the ball just before it hits the ground.",
          marks: 2,
        },
        {
          id: "d",
          text: "Sketch the trajectory of the ball and label key points.",
          marks: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Stem 2: Thermodynamics",
      passage:
        "An ideal gas undergoes a cyclic process consisting of two isothermal processes and two adiabatic processes. The gas starts at pressure P₁ = 2 atm, volume V₁ = 1 L, and temperature T₁ = 300 K.",
      questions: [
        {
          id: "a",
          text: "Draw the P-V diagram for the complete cycle.",
          marks: 3,
        },
        {
          id: "b",
          text: "Calculate the work done during the isothermal expansion.",
          marks: 3,
        },
        { id: "c", text: "Determine the efficiency of the cycle.", marks: 2 },
        {
          id: "d",
          text: "Explain the energy transformations in each process.",
          marks: 2,
        },
      ],
    },
    // Add more stems as needed
  ];

  const totalStems = 5; // Mock total
  const timeRemaining = "38:15";

  const handleFileUpload = (stemId, questionId, files) => {
    const fileArray = Array.from(files);
    const key = `${stemId}-${questionId}`;

    setUploads((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), ...fileArray],
    }));
  };

  const removeFile = (stemId, questionId, fileIndex) => {
    const key = `${stemId}-${questionId}`;
    setUploads((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, index) => index !== fileIndex),
    }));
  };

  const getUploadedFiles = (stemId, questionId) => {
    const key = `${stemId}-${questionId}`;
    return uploads[key] || [];
  };

  const getTotalUploads = () => {
    return Object.values(uploads).reduce((sum, files) => sum + files.length, 0);
  };

  const totalQuestions = stems.reduce(
    (sum, stem) => sum + stem.questions.length,
    0,
  );

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
                Creative Questions • {totalStems} Stems • {totalQuestions}{" "}
                Questions
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
            {/* Stem Card */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {stems[currentStem]?.title}
                  </h2>
                  <p className="text-[#9CA3AF] text-sm">
                    Stem {currentStem + 1} of {totalStems}
                  </p>
                </div>
                <span className="px-4 py-2 bg-[#0D6EFD] text-white rounded-lg font-bold">
                  S{currentStem + 1}
                </span>
              </div>

              {/* Passage */}
              <div className="bg-[#0F1419] border border-[#1F2937] rounded-xl p-6 mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={18} className="text-[#0D6EFD]" />
                  <h3 className="text-sm font-bold text-white">Passage</h3>
                </div>
                <p className="text-[#D1D5DB] leading-relaxed">
                  {stems[currentStem]?.passage}
                </p>
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {stems[currentStem]?.questions.map((question, qIndex) => {
                  const uploadedFiles = getUploadedFiles(
                    stems[currentStem].id,
                    question.id,
                  );

                  return (
                    <div
                      key={question.id}
                      className="border border-[#1F2937] rounded-xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-[#1F2937] text-white rounded font-semibold text-sm">
                              {question.id.toUpperCase()}
                            </span>
                            <span className="text-xs text-[#9CA3AF]">
                              {question.marks} marks
                            </span>
                          </div>
                          <p className="text-white text-base md:text-lg">
                            {question.text}
                          </p>
                        </div>
                      </div>

                      {/* Upload Area */}
                      <div className="mt-4">
                        <label className="block">
                          <div className="border-2 border-dashed border-[#374151] hover:border-[#0D6EFD] rounded-xl p-6 cursor-pointer transition-all duration-200 bg-[#0F1419]">
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(
                                  stems[currentStem].id,
                                  question.id,
                                  e.target.files,
                                )
                              }
                            />
                            <div className="flex flex-col items-center gap-2">
                              <Upload size={24} className="text-[#0D6EFD]" />
                              <p className="text-sm text-white font-medium">
                                Upload Answer Images
                              </p>
                              <p className="text-xs text-[#9CA3AF]">
                                Click to browse or drag and drop
                              </p>
                            </div>
                          </div>
                        </label>

                        {/* Uploaded Files */}
                        {uploadedFiles.length > 0 && (
                          <div className="mt-4 space-y-2">
                            {uploadedFiles.map((file, fileIndex) => (
                              <div
                                key={fileIndex}
                                className="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg"
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <ImageIcon
                                    size={18}
                                    className="text-[#0D6EFD]"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white truncate">
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
                                      stems[currentStem].id,
                                      question.id,
                                      fileIndex,
                                    )
                                  }
                                  className="p-1 hover:bg-[#374151] rounded transition-all duration-200"
                                >
                                  <X size={16} className="text-[#DC2626]" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStem(Math.max(0, currentStem - 1))}
                disabled={currentStem === 0}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  currentStem === 0
                    ? "bg-[#1F2937] text-[#6B7280] cursor-not-allowed"
                    : "bg-[#1F2937] text-white hover:bg-[#374151]"
                }`}
              >
                <ChevronLeft size={18} />
                Previous Stem
              </button>

              <div className="hidden md:block text-center">
                <p className="text-[#9CA3AF] text-sm">
                  Stem {currentStem + 1} of {totalStems}
                </p>
              </div>

              <button
                onClick={() =>
                  setCurrentStem(Math.min(totalStems - 1, currentStem + 1))
                }
                disabled={currentStem === totalStems - 1}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
                  currentStem === totalStems - 1
                    ? "bg-[#1F2937] text-[#6B7280] cursor-not-allowed"
                    : "bg-[#0D6EFD] text-white hover:bg-[#0B5ED7]"
                }`}
              >
                Next Stem
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">
                Upload Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#9CA3AF]">
                      Total Uploads
                    </span>
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

                <div className="pt-4 border-t border-[#1F2937]">
                  <p className="text-xs text-[#9CA3AF] mb-2">
                    Upload answer images for each question
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-[#0D6EFD]/10 border border-[#0D6EFD] rounded-lg">
                    <Upload size={14} className="text-[#0D6EFD]" />
                    <span className="text-xs text-[#0D6EFD]">
                      Images will be reviewed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stem Navigator */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">All Stems</h3>
              <div className="space-y-2">
                {Array.from({ length: totalStems }).map((_, index) => {
                  const stemHasUploads = stems[index]?.questions.some(
                    (q) => getUploadedFiles(stems[index].id, q.id).length > 0,
                  );

                  return (
                    <button
                      key={index}
                      onClick={() => setCurrentStem(index)}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                        currentStem === index
                          ? "bg-[#0D6EFD] text-white"
                          : stemHasUploads
                            ? "bg-[#22C55E]/20 text-[#22C55E] hover:bg-[#22C55E]/30"
                            : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">
                          Stem {index + 1}
                        </span>
                        {stemHasUploads && currentStem !== index && (
                          <CheckCircle2 size={16} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tips */}
            <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Tips</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                  <p className="text-xs text-[#9CA3AF]">
                    Write clearly on paper
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                  <p className="text-xs text-[#9CA3AF]">
                    Upload well-lit images
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                  <p className="text-xs text-[#9CA3AF]">
                    Check orientation before upload
                  </p>
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
                Submit CQ Section?
              </h2>
            </div>
            <p className="text-[#9CA3AF] mb-6">
              You have uploaded {getTotalUploads()} images for {totalQuestions}{" "}
              questions across {totalStems} stems. Make sure all images are
              clear and readable.
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

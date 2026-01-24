"use client";

import { useState } from "react";
import {
  GraduationCap,
  Clock,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Send,
  FileImage,
  AlertCircle,
} from "lucide-react";

export default function DescriptiveExamPage({ params }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [uploadedImages, setUploadedImages] = useState({});

  const descriptiveData = {
    title: "Descriptive Questions",
    totalQuestions: 3,
    questions: [
      {
        id: 1,
        question:
          "Derive the formula for the volume of a sphere using integration. Start with the equation of a circle, rotate it around an axis, and use the disk method to find the volume. Show all steps and explain your reasoning.",
        marks: 10,
        timeRecommendation: "25 minutes",
      },
      {
        id: 2,
        question:
          "Explain the Fundamental Theorem of Calculus in detail. Include both parts of the theorem, provide examples for each part, and discuss the significance of this theorem in connecting differentiation and integration.",
        marks: 10,
        timeRecommendation: "25 minutes",
      },
      {
        id: 3,
        question:
          "A water tank in the shape of an inverted cone has a height of 12 meters and a radius of 4 meters at the top. Water is flowing out of a hole at the bottom at a rate of 2 cubic meters per minute. At what rate is the water level dropping when the water is 8 meters deep? Set up and solve the related rates problem, showing all work.",
        marks: 10,
        timeRecommendation: "25 minutes",
      },
    ],
  };

  const currentQ = descriptiveData.questions[currentQuestion];
  const currentImages = uploadedImages[currentQ.id] || [];

  const handleImageUpload = (files) => {
    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setUploadedImages({
      ...uploadedImages,
      [currentQ.id]: [...currentImages, ...newImages],
    });
  };

  const removeImage = (index) => {
    const updated = [...currentImages];
    updated.splice(index, 1);
    setUploadedImages({ ...uploadedImages, [currentQ.id]: updated });
  };

  const answeredCount = Object.keys(uploadedImages).filter(
    (k) => uploadedImages[k]?.length > 0,
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#E0F2FE] dark:from-[#0D1117] dark:via-[#0A0E14] dark:to-[#0D1929] font-inter">
      <div className="bg-white dark:bg-[#1E1E1E] border-b border-[#E2E8F0] dark:border-[#2A2A2A] sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap size={24} className="text-white" />
              </div>
              <div>
                <h1 className="font-montserrat font-bold text-xl text-[#0A1929] dark:text-white">
                  {descriptiveData.title}
                </h1>
                <p className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Question {currentQuestion + 1} of{" "}
                  {descriptiveData.totalQuestions} • {answeredCount}/
                  {descriptiveData.totalQuestions} answered
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-[#FEF3C7] dark:bg-[#F59E0B]/10 rounded-lg border border-[#F59E0B]/30">
              <Clock size={18} className="text-[#F59E0B]" />
              <span className="font-mono font-bold text-[#F59E0B]">
                1:12:45
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid gap-6">
          <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-[#F8FAFC] to-white dark:from-[#0A0E14] dark:to-[#1E1E1E] border-b border-[#E2E8F0] dark:border-[#2A2A2A] px-8 py-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-xl flex items-center justify-center shadow-lg">
                      <span className="font-montserrat font-bold text-white text-xl">
                        {currentQuestion + 1}
                      </span>
                    </div>
                    <div>
                      <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                        Question {currentQuestion + 1} of{" "}
                        {descriptiveData.totalQuestions}
                      </p>
                      <p className="font-montserrat font-bold text-sm text-[#0A1929] dark:text-white">
                        Upload images of your handwritten answer
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                      Marks
                    </p>
                    <p className="font-montserrat font-bold text-lg text-[#0066FF]">
                      {currentQ.marks}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                      Time
                    </p>
                    <p className="font-montserrat font-bold text-sm text-[#F59E0B]">
                      {currentQ.timeRecommendation}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#E3F2FD] dark:bg-[#0066FF]/5 rounded-xl p-4 border border-[#0066FF]/20">
                <p className="font-onest text-base text-[#0A1929] dark:text-white leading-relaxed">
                  {currentQ.question}
                </p>
              </div>
            </div>

            <div className="px-8 py-8">
              <div className="mb-6">
                <div className="flex items-start space-x-3 p-4 bg-[#FEF3C7] dark:bg-[#F59E0B]/10 rounded-lg border border-[#F59E0B]/30 mb-6">
                  <AlertCircle
                    size={20}
                    className="text-[#F59E0B] flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="font-onest font-semibold text-sm text-[#92400E] dark:text-[#FBBF24] mb-1">
                      Important Guidelines
                    </p>
                    <ul className="font-onest text-xs text-[#92400E] dark:text-[#FBBF24] space-y-1">
                      <li>• Write your answer clearly on paper</li>
                      <li>• Take clear, well-lit photos of each page</li>
                      <li>• Upload pages in order</li>
                      <li>• Ensure all text is readable</li>
                    </ul>
                  </div>
                </div>

                <label className="block cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />
                  <div className="border-2 border-dashed border-[#0066FF]/40 rounded-2xl p-12 bg-gradient-to-br from-[#E3F2FD] to-[#DBEAFE] dark:from-[#0066FF]/5 dark:to-[#0052CC]/5 hover:from-[#BBDEFB] hover:to-[#BFDBFE] dark:hover:from-[#0066FF]/10 dark:hover:to-[#0052CC]/10 transition-all duration-200 text-center group">
                    <div className="w-20 h-20 bg-white dark:bg-[#1E1E1E] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <Upload size={40} className="text-[#0066FF]" />
                    </div>
                    <p className="font-montserrat font-bold text-lg text-[#0066FF] mb-2">
                      Click to upload answer images
                    </p>
                    <p className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF] mb-1">
                      PNG, JPG or JPEG (max 10MB per file)
                    </p>
                    <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                      You can upload multiple pages at once
                    </p>
                  </div>
                </label>
              </div>

              {currentImages.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-montserrat font-bold text-lg text-[#0A1929] dark:text-white">
                      Uploaded Pages ({currentImages.length})
                    </h3>
                    <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#E8F5E9] dark:bg-[#10B981]/10 rounded-full">
                      <FileImage size={16} className="text-[#10B981]" />
                      <span className="font-onest text-xs font-semibold text-[#10B981]">
                        {currentImages.length}{" "}
                        {currentImages.length === 1 ? "page" : "pages"}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {currentImages.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute top-2 left-2 z-10 w-8 h-8 bg-[#0066FF] rounded-full flex items-center justify-center">
                          <span className="font-montserrat font-bold text-sm text-white">
                            {idx + 1}
                          </span>
                        </div>
                        <img
                          src={img.url}
                          alt={`Page ${idx + 1}`}
                          className="w-full h-64 object-cover rounded-xl border-2 border-[#E2E8F0] dark:border-[#2A2A2A] group-hover:border-[#0066FF] transition-colors duration-200"
                        />
                        <button
                          onClick={() => removeImage(idx)}
                          className="absolute top-2 right-2 w-8 h-8 bg-[#EF4444] hover:bg-[#DC2626] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                        >
                          <X size={16} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-xl p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <p className="font-onest text-xs text-white truncate">
                            {img.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-[#F8FAFC] to-white dark:from-[#0A0E14] dark:to-[#1E1E1E] border-t border-[#E2E8F0] dark:border-[#2A2A2A] px-8 py-6">
              <div className="flex items-center justify-between">
                <button
                  onClick={() =>
                    currentQuestion > 0 &&
                    setCurrentQuestion(currentQuestion - 1)
                  }
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
                  <div className="flex items-center space-x-2">
                    {descriptiveData.questions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          idx === currentQuestion
                            ? "bg-[#0066FF] w-8"
                            : uploadedImages[idx + 1]?.length > 0
                              ? "bg-[#10B981]"
                              : "bg-[#E2E8F0] dark:bg-[#2A2A2A]"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {currentQuestion === descriptiveData.questions.length - 1 ? (
                    <button className="px-8 py-3 bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#059669] hover:to-[#10B981] text-white font-bold rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] font-onest">
                      <Send size={20} />
                      <span>Submit Descriptive</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
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
        </div>
      </div>
    </div>
  );
}

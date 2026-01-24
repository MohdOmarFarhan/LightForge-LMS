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
  Image as ImageIcon,
  FileImage,
} from "lucide-react";

export default function CQExamPage({ params }) {
  const [currentStem, setCurrentStem] = useState(0);
  const [uploadedImages, setUploadedImages] = useState({});

  const cqData = {
    title: "Creative Questions",
    totalStems: 2,
    stems: [
      {
        id: 1,
        passage:
          "Consider a particle moving in a straight line. Its position at time t is given by s(t) = t³ - 6t² + 9t + 1, where s is in meters and t is in seconds. The particle starts from rest at t = 0.",
        questions: [
          { id: 1, text: "Find the velocity function v(t) of the particle." },
          { id: 2, text: "Determine when the particle is at rest." },
          { id: 3, text: "Find the acceleration function a(t)." },
          {
            id: 4,
            text: "Calculate the total distance traveled in the first 3 seconds.",
          },
        ],
      },
      {
        id: 2,
        passage:
          "A cylindrical tank with radius 5 meters is being filled with water at a constant rate of 2 cubic meters per minute. The height of the water level is h(t) meters at time t minutes.",
        questions: [
          { id: 1, text: "Express the volume V in terms of height h." },
          {
            id: 2,
            text: "Find the rate at which the water level is rising (dh/dt).",
          },
          {
            id: 3,
            text: "How long will it take to fill the tank to a height of 10 meters?",
          },
          {
            id: 4,
            text: "If the tank has a leak that drains 0.5 m³/min, find the new filling rate.",
          },
        ],
      },
    ],
  };

  const currentStemData = cqData.stems[currentStem];

  const handleImageUpload = (stemId, questionId, files) => {
    const key = `${stemId}-${questionId}`;
    const existingImages = uploadedImages[key] || [];
    const newImages = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setUploadedImages({
      ...uploadedImages,
      [key]: [...existingImages, ...newImages],
    });
  };

  const removeImage = (stemId, questionId, index) => {
    const key = `${stemId}-${questionId}`;
    const images = uploadedImages[key] || [];
    images.splice(index, 1);
    setUploadedImages({ ...uploadedImages, [key]: images });
  };

  const getAnsweredCount = () => {
    let count = 0;
    cqData.stems.forEach((stem) => {
      stem.questions.forEach((q) => {
        const key = `${stem.id}-${q.id}`;
        if (uploadedImages[key]?.length > 0) count++;
      });
    });
    return count;
  };

  const totalQuestions = cqData.stems.reduce(
    (acc, s) => acc + s.questions.length,
    0,
  );
  const answeredCount = getAnsweredCount();

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
                  {cqData.title}
                </h1>
                <p className="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Stem {currentStem + 1} of {cqData.totalStems} •{" "}
                  {answeredCount}/{totalQuestions} answered
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-[#FEF3C7] dark:bg-[#F59E0B]/10 rounded-lg border border-[#F59E0B]/30">
              <Clock size={18} className="text-[#F59E0B]" />
              <span className="font-mono font-bold text-[#F59E0B]">57:30</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] p-6 shadow-sm h-fit sticky top-24">
            <div className="mb-4">
              <h3 className="font-montserrat font-bold text-sm text-[#0A1929] dark:text-white mb-2">
                Stem {currentStem + 1}
              </h3>
              <div className="bg-gradient-to-r from-[#F8FAFC] to-white dark:from-[#0A0E14] dark:to-[#1E1E1E] rounded-xl p-4 border border-[#E2E8F0] dark:border-[#2A2A2A]">
                <p className="font-onest text-sm text-[#0A1929] dark:text-white leading-relaxed">
                  {currentStemData.passage}
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-montserrat font-bold text-xs text-[#64748B] dark:text-[#9CA3AF] mb-3 uppercase">
                Progress
              </h4>
              <div className="space-y-2">
                {currentStemData.questions.map((q) => {
                  const key = `${currentStemData.id}-${q.id}`;
                  const hasAnswer = uploadedImages[key]?.length > 0;
                  return (
                    <div key={q.id} className="flex items-center space-x-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          hasAnswer
                            ? "bg-[#10B981]"
                            : "bg-[#E2E8F0] dark:bg-[#2A2A2A]"
                        }`}
                      >
                        <span
                          className={`font-montserrat font-bold text-xs ${
                            hasAnswer ? "text-white" : "text-[#64748B]"
                          }`}
                        >
                          {q.id}
                        </span>
                      </div>
                      <span className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                        Question {q.id}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() =>
                  currentStem > 0 && setCurrentStem(currentStem - 1)
                }
                disabled={currentStem === 0}
                className={`w-full px-4 py-3 rounded-lg font-onest font-semibold text-sm transition-all duration-200 ${
                  currentStem === 0
                    ? "bg-[#F8FAFC] dark:bg-[#0A0E14] text-[#CBD5E1] cursor-not-allowed"
                    : "bg-white dark:bg-[#0A0E14] border-2 border-[#E2E8F0] dark:border-[#2A2A2A] text-[#0A1929] dark:text-white hover:border-[#0066FF]"
                }`}
              >
                Previous Stem
              </button>
              {currentStem < cqData.stems.length - 1 ? (
                <button
                  onClick={() => setCurrentStem(currentStem + 1)}
                  className="w-full px-4 py-3 bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-bold rounded-lg transition-all duration-200 font-onest"
                >
                  Next Stem
                </button>
              ) : (
                <button className="w-full px-4 py-3 bg-gradient-to-r from-[#10B981] to-[#34D399] hover:from-[#059669] hover:to-[#10B981] text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 font-onest">
                  <Send size={18} />
                  <span>Submit CQ</span>
                </button>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {currentStemData.questions.map((question) => {
              const key = `${currentStemData.id}-${question.id}`;
              const images = uploadedImages[key] || [];
              return (
                <div
                  key={question.id}
                  className="bg-white dark:bg-[#1E1E1E] rounded-2xl border border-[#E2E8F0] dark:border-[#2A2A2A] shadow-sm overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-[#F8FAFC] to-white dark:from-[#0A0E14] dark:to-[#1E1E1E] border-b border-[#E2E8F0] dark:border-[#2A2A2A] px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-lg flex items-center justify-center">
                        <span className="font-montserrat font-bold text-white">
                          {question.id}
                        </span>
                      </div>
                      <div>
                        <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                          Question {question.id}
                        </p>
                        <p className="font-montserrat font-bold text-sm text-[#0A1929] dark:text-white">
                          Upload your written answer
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="font-onest text-base text-[#0A1929] dark:text-white mb-6">
                      {question.text}
                    </p>

                    <div className="mb-4">
                      <label className="block cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(
                              currentStemData.id,
                              question.id,
                              e.target.files,
                            )
                          }
                        />
                        <div className="border-2 border-dashed border-[#0066FF]/30 rounded-xl p-8 bg-[#E3F2FD] dark:bg-[#0066FF]/5 hover:bg-[#BBDEFB] dark:hover:bg-[#0066FF]/10 transition-colors duration-200 text-center">
                          <Upload
                            size={32}
                            className="text-[#0066FF] mx-auto mb-3"
                          />
                          <p className="font-onest font-semibold text-sm text-[#0066FF] mb-1">
                            Click to upload images
                          </p>
                          <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                            PNG, JPG or JPEG (max 10MB each)
                          </p>
                        </div>
                      </label>
                    </div>

                    {images.length > 0 && (
                      <div className="grid grid-cols-2 gap-4">
                        {images.map((img, idx) => (
                          <div key={idx} className="relative group">
                            <img
                              src={img.url}
                              alt={img.name}
                              className="w-full h-48 object-cover rounded-lg border-2 border-[#E2E8F0] dark:border-[#2A2A2A]"
                            />
                            <button
                              onClick={() =>
                                removeImage(
                                  currentStemData.id,
                                  question.id,
                                  idx,
                                )
                              }
                              className="absolute top-2 right-2 w-8 h-8 bg-[#EF4444] hover:bg-[#DC2626] rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              <X size={16} />
                            </button>
                            <div className="absolute bottom-2 left-2 right-2 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
                              <p className="font-onest text-xs text-white truncate">
                                {img.name}
                              </p>
                            </div>
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
      </div>
    </div>
  );
}

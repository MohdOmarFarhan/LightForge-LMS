"use client";
import { useState } from "react";
import { ArrowLeft, Save, Plus, X } from "lucide-react";

export default function AddQuestionPage() {
  const [questionType, setQuestionType] = useState("mcq");
  const [mcqOptions, setMcqOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(0);

  const handleAddOption = () => {
    setMcqOptions([...mcqOptions, ""]);
  };

  const handleRemoveOption = (index) => {
    if (mcqOptions.length > 2) {
      setMcqOptions(mcqOptions.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...mcqOptions];
    newOptions[index] = value;
    setMcqOptions(newOptions);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => (window.location.href = "/admin/questions")}
        className="inline-flex items-center gap-2 text-[#0D6EFD] hover:text-[#0B5ED7] transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-semibold">Back to Questions</span>
      </button>

      <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6 md:p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Add New Question</h1>

        <form className="space-y-6">
          {/* Basic Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Class */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Class <span className="text-[#DC2626]">*</span>
              </label>
              <select className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors">
                <option value="">Select Class</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Subject <span className="text-[#DC2626]">*</span>
              </label>
              <select className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors">
                <option value="">Select Subject</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
              </select>
            </div>

            {/* Paper */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Paper <span className="text-[#DC2626]">*</span>
              </label>
              <select className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors">
                <option value="">Select Paper</option>
                <option value="paper1">Paper 1</option>
                <option value="paper2">Paper 2</option>
              </select>
            </div>

            {/* Chapter */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Chapter <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Calculus, Thermodynamics"
                className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors"
              />
            </div>

            {/* Module */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Module/Topic
              </label>
              <input
                type="text"
                placeholder="e.g., Derivatives, Heat Transfer"
                className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Difficulty Level
              </label>
              <select className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-semibold text-white mb-3">
              Question Type <span className="text-[#DC2626]">*</span>
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setQuestionType("mcq")}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  questionType === "mcq"
                    ? "bg-[#0D6EFD] text-white"
                    : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                }`}
              >
                MCQ
              </button>
              <button
                type="button"
                onClick={() => setQuestionType("cq")}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  questionType === "cq"
                    ? "bg-[#0D6EFD] text-white"
                    : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                }`}
              >
                CQ (Creative)
              </button>
              <button
                type="button"
                onClick={() => setQuestionType("descriptive")}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  questionType === "descriptive"
                    ? "bg-[#0D6EFD] text-white"
                    : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                }`}
              >
                Descriptive
              </button>
            </div>
          </div>

          {/* Question Content */}
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {questionType === "cq" ? "Stem/Passage" : "Question"}{" "}
              <span className="text-[#DC2626]">*</span>
            </label>
            <textarea
              rows={6}
              placeholder={
                questionType === "cq"
                  ? "Enter the stem or passage..."
                  : "Enter your question here..."
              }
              className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors resize-none"
            ></textarea>
          </div>

          {/* MCQ Options */}
          {questionType === "mcq" && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-semibold text-white">
                  Answer Options <span className="text-[#DC2626]">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="flex items-center gap-2 px-3 py-1 bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-lg text-sm font-semibold transition-all duration-200"
                >
                  <Plus size={16} />
                  Add Option
                </button>
              </div>
              <div className="space-y-3">
                {mcqOptions.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={correctOption === index}
                      onChange={() => setCorrectOption(index)}
                      className="w-5 h-5 text-[#0D6EFD]"
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleOptionChange(index, e.target.value)
                      }
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      className="flex-1 px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors"
                    />
                    {mcqOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="p-2 hover:bg-[#DC2626]/20 rounded-lg transition-all duration-200"
                      >
                        <X size={20} className="text-[#DC2626]" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#9CA3AF] mt-2">
                Select the radio button to mark the correct answer
              </p>
            </div>
          )}

          {/* CQ Sub-questions */}
          {questionType === "cq" && (
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Sub-questions <span className="text-[#DC2626]">*</span>
              </label>
              <div className="space-y-4">
                {["a", "b", "c", "d"].map((letter) => (
                  <div key={letter}>
                    <label className="block text-xs font-semibold text-[#9CA3AF] mb-2">
                      Question {letter.toUpperCase()}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={`Enter sub-question ${letter.toUpperCase()}...`}
                      className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors resize-none"
                    ></textarea>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Marks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Marks <span className="text-[#DC2626]">*</span>
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g., 5"
                className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                Time (minutes)
              </label>
              <input
                type="number"
                min="1"
                placeholder="e.g., 3"
                className="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => (window.location.href = "/admin/questions")}
              className="flex-1 px-6 py-3 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-[#16A34A]/30 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Save size={20} />
              Save Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

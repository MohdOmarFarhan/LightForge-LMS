"use client";
import { useState } from "react";
import { Plus, Search, Filter, FileQuestion, TrendingUp } from "lucide-react";

export default function QuestionsPage() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  const questionStats = [
    {
      type: "MCQ",
      count: 1245,
      class11: 645,
      class12: 600,
      color: "bg-[#0D6EFD]",
    },
    {
      type: "CQ",
      count: 856,
      class11: 428,
      class12: 428,
      color: "bg-[#16A34A]",
    },
    {
      type: "Descriptive",
      count: 412,
      class11: 206,
      class12: 206,
      color: "bg-[#F59E0B]",
    },
  ];

  const subjectStats = [
    { subject: "Mathematics", mcq: 425, cq: 286, descriptive: 145, total: 856 },
    { subject: "Physics", mcq: 398, cq: 294, descriptive: 132, total: 824 },
    { subject: "Chemistry", mcq: 422, cq: 276, descriptive: 135, total: 833 },
  ];

  const recentQuestions = [
    {
      id: "Q2513",
      type: "MCQ",
      subject: "Mathematics",
      chapter: "Calculus",
      class: 12,
      addedBy: "Admin",
      date: "2 hours ago",
    },
    {
      id: "Q2512",
      type: "CQ",
      subject: "Physics",
      chapter: "Thermodynamics",
      class: 12,
      addedBy: "Admin",
      date: "5 hours ago",
    },
    {
      id: "Q2511",
      type: "Descriptive",
      subject: "Chemistry",
      chapter: "Organic",
      class: 11,
      addedBy: "Admin",
      date: "1 day ago",
    },
    {
      id: "Q2510",
      type: "MCQ",
      subject: "Mathematics",
      chapter: "Algebra",
      class: 11,
      addedBy: "Admin",
      date: "1 day ago",
    },
    {
      id: "Q2509",
      type: "CQ",
      subject: "Physics",
      chapter: "Mechanics",
      class: 12,
      addedBy: "Admin",
      date: "2 days ago",
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header with Add Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Question Bank</h1>
          <p className="text-[#9CA3AF]">
            Manage and organize your question database
          </p>
        </div>
        <button
          onClick={() => (window.location.href = "/admin/questions/add")}
          className="px-6 py-3 bg-gradient-to-r from-[#0D6EFD] to-[#0B5ED7] hover:shadow-lg hover:shadow-[#0D6EFD]/30 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 justify-center"
        >
          <Plus size={20} />
          Add Question
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {questionStats.map((stat) => (
          <div
            key={stat.type}
            className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
              >
                <FileQuestion size={24} className="text-white" />
              </div>
              <TrendingUp size={20} className="text-[#22C55E]" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">{stat.count}</h3>
            <p className="text-sm text-[#9CA3AF] mb-3">{stat.type} Questions</p>
            <div className="flex items-center gap-4 text-xs text-[#9CA3AF]">
              <span>
                Class 11:{" "}
                <span className="text-white font-semibold">{stat.class11}</span>
              </span>
              <span>
                Class 12:{" "}
                <span className="text-white font-semibold">{stat.class12}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter size={20} className="text-[#0D6EFD]" />
          <h3 className="text-lg font-bold text-white">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Class Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#9CA3AF] mb-2">
              Class
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedClass("all")}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  selectedClass === "all"
                    ? "bg-[#0D6EFD] text-white"
                    : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedClass("11")}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  selectedClass === "11"
                    ? "bg-[#0D6EFD] text-white"
                    : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                }`}
              >
                Class 11
              </button>
              <button
                onClick={() => setSelectedClass("12")}
                className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  selectedClass === "12"
                    ? "bg-[#0D6EFD] text-white"
                    : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                }`}
              >
                Class 12
              </button>
            </div>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#9CA3AF] mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors"
            >
              <option value="all">All Subjects</option>
              <option value="mathematics">Mathematics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-semibold text-[#9CA3AF] mb-2">
              Question Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors"
            >
              <option value="all">All Types</option>
              <option value="mcq">MCQ</option>
              <option value="cq">CQ</option>
              <option value="descriptive">Descriptive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subject-wise Breakdown */}
      <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">
          Subject-wise Breakdown
        </h3>
        <div className="space-y-4">
          {subjectStats.map((subject) => (
            <div key={subject.subject} className="p-4 bg-[#0F1419] rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base font-semibold text-white">
                  {subject.subject}
                </h4>
                <span className="text-sm font-bold text-[#0D6EFD]">
                  {subject.total} total
                </span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-[#9CA3AF] mb-1">MCQ</p>
                  <p className="text-lg font-bold text-white">{subject.mcq}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF] mb-1">CQ</p>
                  <p className="text-lg font-bold text-white">{subject.cq}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF] mb-1">Descriptive</p>
                  <p className="text-lg font-bold text-white">
                    {subject.descriptive}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Questions */}
      <div className="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#1F2937]">
          <h3 className="text-lg font-bold text-white">
            Recently Added Questions
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1F2937]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  Subject
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  Chapter
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  Added
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2937]">
              {recentQuestions.map((question) => (
                <tr
                  key={question.id}
                  className="hover:bg-[#1F2937] transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-semibold text-[#0D6EFD]">
                      {question.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        question.type === "MCQ"
                          ? "bg-[#0D6EFD]/20 text-[#0D6EFD]"
                          : question.type === "CQ"
                            ? "bg-[#16A34A]/20 text-[#22C55E]"
                            : "bg-[#F59E0B]/20 text-[#F59E0B]"
                      }`}
                    >
                      {question.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-white">
                      {question.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#9CA3AF]">
                      {question.chapter}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-[#1F2937] text-white rounded-lg text-sm font-semibold">
                      Class {question.class}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-[#9CA3AF]">
                      {question.date}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

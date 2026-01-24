"use client";
import { useState } from "react";
import { Search, Filter, Download, Eye, TrendingUp } from "lucide-react";

export default function StudentsPage() {
  const [selectedClass, setSelectedClass] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const students = [
    {
      id: "241073",
      name: "Arif Rahman",
      class: 11,
      avgScore: 85.5,
      exams: 12,
      lastActive: "2 hours ago",
      status: "active",
    },
    {
      id: "241074",
      name: "Fatima Khan",
      class: 11,
      avgScore: 92.3,
      exams: 15,
      lastActive: "1 hour ago",
      status: "active",
    },
    {
      id: "241075",
      name: "Samiul Haque",
      class: 12,
      avgScore: 78.9,
      exams: 18,
      lastActive: "5 mins ago",
      status: "active",
    },
    {
      id: "241076",
      name: "Nusrat Jahan",
      class: 12,
      avgScore: 88.7,
      exams: 16,
      lastActive: "20 mins ago",
      status: "active",
    },
    {
      id: "241077",
      name: "Rafiq Ahmed",
      class: 11,
      avgScore: 75.2,
      exams: 10,
      lastActive: "3 hours ago",
      status: "active",
    },
    {
      id: "241078",
      name: "Sadia Islam",
      class: 12,
      avgScore: 91.5,
      exams: 20,
      lastActive: "10 mins ago",
      status: "active",
    },
    {
      id: "241079",
      name: "Tariq Hassan",
      class: 11,
      avgScore: 82.1,
      exams: 13,
      lastActive: "1 day ago",
      status: "active",
    },
    {
      id: "241080",
      name: "Ayesha Begum",
      class: 12,
      avgScore: 87.3,
      exams: 17,
      lastActive: "30 mins ago",
      status: "active",
    },
  ];

  const filteredStudents = students
    .filter((student) => {
      if (selectedClass === "all") return true;
      return student.class === parseInt(selectedClass);
    })
    .filter((student) => {
      if (!searchQuery) return true;
      return (
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.id.includes(searchQuery)
      );
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  const classStats = {
    all: students.length,
    11: students.filter((s) => s.class === 11).length,
    12: students.filter((s) => s.class === 12).length,
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <p className="text-sm text-[#9CA3AF] mb-1">Total Students</p>
          <p className="text-3xl font-bold text-white">{classStats.all}</p>
        </div>
        <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <p className="text-sm text-[#9CA3AF] mb-1">Class 11 Students</p>
          <p className="text-3xl font-bold text-white">{classStats[11]}</p>
        </div>
        <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <p className="text-sm text-[#9CA3AF] mb-1">Class 12 Students</p>
          <p className="text-3xl font-bold text-white">{classStats[12]}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Filter size={20} className="text-[#9CA3AF]" />
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedClass("all")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  selectedClass === "all"
                    ? "bg-[#0D6EFD] text-white"
                    : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                }`}
              >
                All Classes
              </button>
              <button
                onClick={() => setSelectedClass("11")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  selectedClass === "11"
                    ? "bg-[#0D6EFD] text-white"
                    : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                }`}
              >
                Class 11
              </button>
              <button
                onClick={() => setSelectedClass("12")}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  selectedClass === "12"
                    ? "bg-[#0D6EFD] text-white"
                    : "bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]"
                }`}
              >
                Class 12
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
              />
              <input
                type="text"
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors"
              />
            </div>
            <button className="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1F2937] border-b border-[#374151]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Student ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Class
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Avg Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Exams Taken
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2937]">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-[#1F2937] transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-mono font-semibold text-[#0D6EFD]">
                      #{student.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] rounded-lg flex items-center justify-center text-white font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-white">
                        {student.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 bg-[#1F2937] text-white rounded-lg text-sm font-semibold">
                      Class {student.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        {student.avgScore}%
                      </span>
                      <TrendingUp size={14} className="text-[#22C55E]" />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#9CA3AF]">
                      {student.exams} exams
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#9CA3AF]">
                      {student.lastActive}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        (window.location.href = `/admin/students/${student.id}`)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-lg text-sm font-semibold transition-all duration-200"
                    >
                      <Eye size={16} />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-[#9CA3AF]">No students found</p>
          </div>
        )}
      </div>
    </div>
  );
}

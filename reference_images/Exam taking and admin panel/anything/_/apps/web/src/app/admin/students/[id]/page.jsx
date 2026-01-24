"use client";
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Award,
  Target,
  Clock,
} from "lucide-react";

export default function StudentPerformancePage({ params }) {
  // Mock student data
  const student = {
    id: params.id,
    name: "Arif Rahman",
    email: "arif.rahman@example.com",
    phone: "+880 1712-345678",
    class: 12,
    section: "A",
    rollNo: "15",
    joinDate: "Jan 15, 2024",
    avgScore: 85.5,
    rank: 12,
    totalExams: 18,
    attendanceRate: 94.5,
  };

  const examResults = [
    {
      exam: "Mathematics - Calculus II",
      date: "Jan 20, 2026",
      score: 92,
      total: 100,
      rank: 8,
    },
    {
      exam: "Physics - Thermodynamics",
      date: "Jan 15, 2026",
      score: 85,
      total: 100,
      rank: 15,
    },
    {
      exam: "Chemistry - Organic",
      date: "Jan 10, 2026",
      score: 88,
      total: 100,
      rank: 12,
    },
    {
      exam: "Mathematics - Algebra",
      date: "Dec 28, 2025",
      score: 78,
      total: 100,
      rank: 22,
    },
    {
      exam: "Physics - Mechanics",
      date: "Dec 20, 2025",
      score: 90,
      total: 100,
      rank: 10,
    },
    {
      exam: "Chemistry - Inorganic",
      date: "Dec 15, 2025",
      score: 82,
      total: 100,
      rank: 18,
    },
  ];

  const performanceData = [
    { month: "Aug", score: 75 },
    { month: "Sep", score: 78 },
    { month: "Oct", score: 82 },
    { month: "Nov", score: 80 },
    { month: "Dec", score: 85 },
    { month: "Jan", score: 88 },
  ];

  const subjectPerformance = [
    { subject: "Mathematics", avgScore: 87.5, exams: 6, trend: "up" },
    { subject: "Physics", avgScore: 85.2, exams: 6, trend: "up" },
    { subject: "Chemistry", avgScore: 83.8, exams: 6, trend: "down" },
  ];

  const maxScore = Math.max(...performanceData.map((d) => d.score));

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => (window.location.href = "/admin/students")}
        className="inline-flex items-center gap-2 text-[#0D6EFD] hover:text-[#0B5ED7] transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="font-semibold">Back to Students</span>
      </button>

      {/* Student Info Card */}
      <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div className="w-24 h-24 bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] rounded-xl flex items-center justify-center text-white text-4xl font-bold flex-shrink-0">
            {student.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  {student.name}
                </h1>
                <p className="text-[#9CA3AF] font-mono">
                  Student ID: #{student.id}
                </p>
              </div>
              <div className="flex gap-2 mt-4 md:mt-0">
                <span className="px-4 py-2 bg-[#0D6EFD]/20 text-[#0D6EFD] rounded-lg font-semibold">
                  Class {student.class} - Section {student.section}
                </span>
                <span className="px-4 py-2 bg-[#16A34A]/20 text-[#22C55E] rounded-lg font-semibold">
                  Roll: {student.rollNo}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-[#9CA3AF]" />
                <span className="text-sm text-white">{student.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-[#9CA3AF]" />
                <span className="text-sm text-white">{student.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-[#9CA3AF]" />
                <span className="text-sm text-white">
                  Joined {student.joinDate}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#0D6EFD]/20 rounded-lg flex items-center justify-center">
              <Target size={20} className="text-[#0D6EFD]" />
            </div>
            <p className="text-sm text-[#9CA3AF]">Average Score</p>
          </div>
          <p className="text-3xl font-bold text-white">{student.avgScore}%</p>
        </div>
        <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#16A34A]/20 rounded-lg flex items-center justify-center">
              <Award size={20} className="text-[#22C55E]" />
            </div>
            <p className="text-sm text-[#9CA3AF]">Class Rank</p>
          </div>
          <p className="text-3xl font-bold text-white">#{student.rank}</p>
        </div>
        <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-[#F59E0B]" />
            </div>
            <p className="text-sm text-[#9CA3AF]">Total Exams</p>
          </div>
          <p className="text-3xl font-bold text-white">{student.totalExams}</p>
        </div>
        <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#8B5CF6]/20 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-[#8B5CF6]" />
            </div>
            <p className="text-sm text-[#9CA3AF]">Attendance</p>
          </div>
          <p className="text-3xl font-bold text-white">
            {student.attendanceRate}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">
            Performance Trend
          </h2>
          <div className="space-y-4">
            {performanceData.map((data, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-[#9CA3AF]">
                    {data.month}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {data.score}%
                  </span>
                </div>
                <div className="w-full bg-[#1F2937] rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-[#0D6EFD] to-[#0B5ED7] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(data.score / maxScore) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance */}
        <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">
            Subject Performance
          </h2>
          <div className="space-y-4">
            {subjectPerformance.map((subject, index) => (
              <div key={index} className="p-4 bg-[#0F1419] rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-white">
                    {subject.subject}
                  </h3>
                  <TrendingUp
                    size={16}
                    className={
                      subject.trend === "up"
                        ? "text-[#22C55E]"
                        : "text-[#DC2626]"
                    }
                    style={{
                      transform:
                        subject.trend === "down" ? "rotate(180deg)" : "none",
                    }}
                  />
                </div>
                <p className="text-2xl font-bold text-white mb-1">
                  {subject.avgScore}%
                </p>
                <p className="text-xs text-[#9CA3AF]">
                  {subject.exams} exams taken
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exam Results Table */}
      <div className="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
        <div className="p-6 border-b border-[#1F2937]">
          <h2 className="text-lg font-bold text-white">Exam History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1F2937]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  Exam
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  Score
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  Percentage
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase">
                  Rank
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F2937]">
              {examResults.map((result, index) => {
                const percentage = (result.score / result.total) * 100;
                return (
                  <tr
                    key={index}
                    className="hover:bg-[#1F2937] transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        {result.exam}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-[#9CA3AF]">
                        {result.date}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-semibold text-white">
                        {result.score}/{result.total}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-[#1F2937] rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              percentage >= 90
                                ? "bg-[#22C55E]"
                                : percentage >= 75
                                  ? "bg-[#0D6EFD]"
                                  : percentage >= 60
                                    ? "bg-[#F59E0B]"
                                    : "bg-[#DC2626]"
                            }`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-white">
                          {percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-[#0D6EFD]/20 text-[#0D6EFD] rounded-lg text-sm font-semibold">
                        #{result.rank}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

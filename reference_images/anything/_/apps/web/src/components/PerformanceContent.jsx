"use client";

import { TrendingUp, Award, Target, Calendar } from "lucide-react";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample exam data with marks
const examData = [
  {
    id: 1,
    subject: "Physics",
    title: "Mid Term Physics",
    date: "2026-01-15",
    dateLabel: "Jan 15",
    totalMarks: 100,
    obtainedMarks: 88,
    percentage: 88,
    grade: "A+",
  },
  {
    id: 2,
    subject: "Chemistry",
    title: "Chapter 3-5 Chemistry",
    date: "2026-01-18",
    dateLabel: "Jan 18",
    totalMarks: 100,
    obtainedMarks: 82,
    percentage: 82,
    grade: "A",
  },
  {
    id: 3,
    subject: "Mathematics",
    title: "Calculus Fundamentals",
    date: "2026-01-20",
    dateLabel: "Jan 20",
    totalMarks: 100,
    obtainedMarks: 95,
    percentage: 95,
    grade: "A+",
  },
  {
    id: 4,
    subject: "Physics",
    title: "Mechanics Quiz",
    date: "2026-01-10",
    dateLabel: "Jan 10",
    totalMarks: 50,
    obtainedMarks: 42,
    percentage: 84,
    grade: "A",
  },
  {
    id: 5,
    subject: "Biology",
    title: "Cell Biology Test",
    date: "2026-01-12",
    dateLabel: "Jan 12",
    totalMarks: 100,
    obtainedMarks: 78,
    percentage: 78,
    grade: "B+",
  },
  {
    id: 6,
    subject: "Mathematics",
    title: "Algebra Assessment",
    date: "2026-01-08",
    dateLabel: "Jan 8",
    totalMarks: 100,
    obtainedMarks: 91,
    percentage: 91,
    grade: "A+",
  },
];

const subjects = ["All", "Physics", "Chemistry", "Mathematics", "Biology"];

const subjectColors = {
  Physics: "#0066FF",
  Chemistry: "#10B981",
  Mathematics: "#F59E0B",
  Biology: "#8B5CF6",
};

function StatCard({ icon: Icon, title, value, subtitle, accentColor }) {
  return (
    <div
      className="relative p-5 rounded-xl border border-[#E9EDF3] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
      style={{
        borderLeftWidth: "3px",
        borderLeftColor: accentColor,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Icon size={20} color={accentColor} className="mr-2" />
            <span className="font-montserrat font-medium text-sm text-[#64748B] dark:text-[#9CA3AF]">
              {title}
            </span>
          </div>
          <div className="font-poppins font-bold text-3xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-1">
            {value}
          </div>
          <div className="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">
            {subtitle}
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E9EDF3] dark:border-[#2A2A2A] rounded-lg p-3 shadow-lg">
        <p className="font-montserrat font-semibold text-sm text-[#0B0F1A] dark:text-[#E5E7EB] mb-1">
          {data.title}
        </p>
        <p className="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF] mb-2">
          {data.date}
        </p>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: data.color }}
          ></div>
          <p className="font-inter text-sm text-[#0B0F1A] dark:text-[#E5E7EB]">
            <span className="font-semibold">{data.percentage}%</span>
            <span className="text-[#64748B] dark:text-[#9CA3AF] ml-1">
              ({data.obtainedMarks}/{data.totalMarks})
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
}

export default function PerformanceContent() {
  const [selectedSubject, setSelectedSubject] = useState("All");

  // Filter exams based on selected subject
  const filteredExams =
    selectedSubject === "All"
      ? examData
      : examData.filter((exam) => exam.subject === selectedSubject);

  // Sort by date for chart
  const sortedExams = [...filteredExams].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  // Prepare chart data
  const chartData = sortedExams.map((exam) => ({
    ...exam,
    color: subjectColors[exam.subject],
  }));

  // Calculate stats
  const totalExams = filteredExams.length;
  const averageScore =
    totalExams > 0
      ? Math.round(
          filteredExams.reduce((sum, exam) => sum + exam.percentage, 0) /
            totalExams,
        )
      : 0;
  const highestScore =
    totalExams > 0
      ? Math.max(...filteredExams.map((exam) => exam.percentage))
      : 0;
  const lowestScore =
    totalExams > 0
      ? Math.min(...filteredExams.map((exam) => exam.percentage))
      : 0;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-3xl md:text-4xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-2">
          Performance Analytics 📊
        </h1>
        <p className="font-inter text-base text-[#64748B] dark:text-[#9CA3AF]">
          Track your exam performance and identify areas for improvement
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <StatCard
          icon={Award}
          title="Average Score"
          value={`${averageScore}%`}
          subtitle={`Across ${totalExams} exam${totalExams !== 1 ? "s" : ""}`}
          accentColor="#0066FF"
        />
        <StatCard
          icon={TrendingUp}
          title="Highest Score"
          value={`${highestScore}%`}
          subtitle="Best performance"
          accentColor="#10B981"
        />
        <StatCard
          icon={Target}
          title="Lowest Score"
          value={`${lowestScore}%`}
          subtitle="Room for improvement"
          accentColor="#F59E0B"
        />
        <StatCard
          icon={Calendar}
          title="Total Exams"
          value={totalExams}
          subtitle="Completed assessments"
          accentColor="#8B5CF6"
        />
      </div>

      {/* Subject Filter */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-lg font-montserrat font-semibold text-sm transition-all duration-200 ${
                selectedSubject === subject
                  ? "bg-[#0066FF] text-white shadow-md"
                  : "bg-white dark:bg-[#1E1E1E] text-[#64748B] dark:text-[#9CA3AF] border border-[#E9EDF3] dark:border-[#2A2A2A] hover:border-[#0066FF] dark:hover:border-[#0066FF]"
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9EDF3] dark:border-[#2A2A2A] p-6 mb-8">
        <h2 className="font-poppins font-bold text-xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-6">
          Performance Over Time
        </h2>
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#E9EDF3"
                className="dark:stroke-[#2A2A2A]"
              />
              <XAxis
                dataKey="dateLabel"
                stroke="#64748B"
                style={{
                  fontSize: "12px",
                  fontFamily: "Inter",
                }}
              />
              <YAxis
                stroke="#64748B"
                style={{
                  fontSize: "12px",
                  fontFamily: "Inter",
                }}
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="percentage"
                stroke="#0066FF"
                strokeWidth={3}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  return (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={6}
                      fill={payload.color}
                      stroke="white"
                      strokeWidth={2}
                    />
                  );
                }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Exam Marks Table */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9EDF3] dark:border-[#2A2A2A] overflow-hidden">
        <div className="p-6 border-b border-[#E9EDF3] dark:border-[#2A2A2A]">
          <h2 className="font-poppins font-bold text-xl text-[#0B0F1A] dark:text-[#E5E7EB]">
            All Exam Results
          </h2>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8FAFC] dark:bg-[#0D1117]">
              <tr>
                <th className="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Exam
                </th>
                <th className="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Subject
                </th>
                <th className="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Date
                </th>
                <th className="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Marks
                </th>
                <th className="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Percentage
                </th>
                <th className="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedExams.map((exam, index) => (
                <tr
                  key={exam.id}
                  className={`${
                    index !== sortedExams.length - 1
                      ? "border-b border-[#E9EDF3] dark:border-[#2A2A2A]"
                      : ""
                  } hover:bg-[#F8FAFC] dark:hover:bg-[#0D1117] transition-colors`}
                >
                  <td className="px-6 py-4">
                    <div className="font-inter font-medium text-sm text-[#0B0F1A] dark:text-[#E5E7EB]">
                      {exam.title}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full font-montserrat font-semibold text-xs text-white"
                      style={{
                        backgroundColor: subjectColors[exam.subject],
                      }}
                    >
                      {exam.subject}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                      {new Date(exam.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-inter font-medium text-sm text-[#0B0F1A] dark:text-[#E5E7EB]">
                      {exam.obtainedMarks}/{exam.totalMarks}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-[#E9EDF3] dark:bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{
                            width: `${exam.percentage}%`,
                            backgroundColor: subjectColors[exam.subject],
                          }}
                        ></div>
                      </div>
                      <span className="font-inter font-semibold text-sm text-[#0B0F1A] dark:text-[#E5E7EB] min-w-[45px]">
                        {exam.percentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full font-montserrat font-semibold text-xs ${
                        exam.grade === "A+" || exam.grade === "A"
                          ? "bg-[#D1FAE5] text-[#065F46] dark:bg-[#065F46] dark:text-[#D1FAE5]"
                          : exam.grade === "B+" || exam.grade === "B"
                            ? "bg-[#FEF3C7] text-[#92400E] dark:bg-[#92400E] dark:text-[#FEF3C7]"
                            : "bg-[#FEE2E2] text-[#991B1B] dark:bg-[#991B1B] dark:text-[#FEE2E2]"
                      }`}
                    >
                      {exam.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {sortedExams.map((exam, index) => (
            <div
              key={exam.id}
              className={`p-4 ${
                index !== sortedExams.length - 1
                  ? "border-b border-[#E9EDF3] dark:border-[#2A2A2A]"
                  : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-inter font-semibold text-sm text-[#0B0F1A] dark:text-[#E5E7EB] mb-1">
                    {exam.title}
                  </h3>
                  <p className="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">
                    {new Date(exam.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className="inline-flex items-center px-2 py-1 rounded-full font-montserrat font-semibold text-xs text-white"
                  style={{
                    backgroundColor: subjectColors[exam.subject],
                  }}
                >
                  {exam.subject}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Marks:
                </span>
                <span className="font-inter font-semibold text-sm text-[#0B0F1A] dark:text-[#E5E7EB]">
                  {exam.obtainedMarks}/{exam.totalMarks}
                </span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Percentage:
                </span>
                <span className="font-inter font-semibold text-sm text-[#0B0F1A] dark:text-[#E5E7EB]">
                  {exam.percentage}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                  Grade:
                </span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full font-montserrat font-semibold text-xs ${
                    exam.grade === "A+" || exam.grade === "A"
                      ? "bg-[#D1FAE5] text-[#065F46] dark:bg-[#065F46] dark:text-[#D1FAE5]"
                      : exam.grade === "B+" || exam.grade === "B"
                        ? "bg-[#FEF3C7] text-[#92400E] dark:bg-[#92400E] dark:text-[#FEF3C7]"
                        : "bg-[#FEE2E2] text-[#991B1B] dark:bg-[#991B1B] dark:text-[#FEE2E2]"
                  }`}
                >
                  {exam.grade}
                </span>
              </div>
              <div className="mt-3">
                <div className="bg-[#E9EDF3] dark:bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${exam.percentage}%`,
                      backgroundColor: subjectColors[exam.subject],
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

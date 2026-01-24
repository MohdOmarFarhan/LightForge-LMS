"use client";

import { useState, useMemo } from "react";
import {
  Trophy,
  Medal,
  Crown,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
} from "lucide-react";

// Sample student data
const initialStudents = [
  {
    id: "241073",
    name: "Alexis Sanchez",
    exams: 12,
    totalMarks: 1020,
    avgMarks: 85,
    isCurrentUser: true,
  },
  {
    id: "241001",
    name: "Emma Watson",
    exams: 15,
    totalMarks: 1425,
    avgMarks: 95,
  },
  {
    id: "241045",
    name: "Liam Chen",
    exams: 14,
    totalMarks: 1274,
    avgMarks: 91,
  },
  {
    id: "241089",
    name: "Sofia Rodriguez",
    exams: 13,
    totalMarks: 1157,
    avgMarks: 89,
  },
  {
    id: "241012",
    name: "Noah Williams",
    exams: 16,
    totalMarks: 1392,
    avgMarks: 87,
  },
  {
    id: "241056",
    name: "Olivia Brown",
    exams: 12,
    totalMarks: 1008,
    avgMarks: 84,
  },
  {
    id: "241098",
    name: "Ethan Davis",
    exams: 14,
    totalMarks: 1190,
    avgMarks: 85,
  },
  {
    id: "241034",
    name: "Ava Martinez",
    exams: 15,
    totalMarks: 1350,
    avgMarks: 90,
  },
  {
    id: "241067",
    name: "James Taylor",
    exams: 13,
    totalMarks: 1053,
    avgMarks: 81,
  },
  {
    id: "241023",
    name: "Isabella Anderson",
    exams: 12,
    totalMarks: 996,
    avgMarks: 83,
  },
  {
    id: "241078",
    name: "Lucas Thomas",
    exams: 14,
    totalMarks: 1106,
    avgMarks: 79,
  },
  {
    id: "241091",
    name: "Mia Jackson",
    exams: 15,
    totalMarks: 1275,
    avgMarks: 85,
  },
  {
    id: "241015",
    name: "Benjamin White",
    exams: 13,
    totalMarks: 1040,
    avgMarks: 80,
  },
  {
    id: "241042",
    name: "Charlotte Harris",
    exams: 16,
    totalMarks: 1344,
    avgMarks: 84,
  },
  {
    id: "241086",
    name: "Henry Martin",
    exams: 12,
    totalMarks: 924,
    avgMarks: 77,
  },
];

export default function LeaderboardContent() {
  const [sortBy, setSortBy] = useState("rank");
  const [sortDirection, setSortDirection] = useState("asc");

  // Sort students based on selected criteria
  const sortedStudents = useMemo(() => {
    const students = [...initialStudents];

    students.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "rank":
          comparison = b.avgMarks - a.avgMarks; // Higher avg = better rank
          break;
        case "id":
          comparison = a.id.localeCompare(b.id);
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "totalMarks":
          comparison = a.totalMarks - b.totalMarks;
          break;
        case "avgMarks":
          comparison = a.avgMarks - b.avgMarks;
          break;
        case "exams":
          comparison = a.exams - b.exams;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return students;
  }, [sortBy, sortDirection]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection(field === "rank" ? "asc" : "asc");
    }
  };

  const getRankByAverage = (student) => {
    const ranked = [...initialStudents].sort((a, b) => b.avgMarks - a.avgMarks);
    return ranked.findIndex((s) => s.id === student.id) + 1;
  };

  const topThree = useMemo(() => {
    return [...initialStudents]
      .sort((a, b) => b.avgMarks - a.avgMarks)
      .slice(0, 3);
  }, []);

  const SortButton = ({ field, children }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center space-x-1 hover:text-[#0066FF] dark:hover:text-[#3B82F6] transition-colors focus:outline-none group"
    >
      <span>{children}</span>
      <ArrowUpDown
        size={14}
        className={`${
          sortBy === field
            ? "text-[#0066FF] dark:text-[#3B82F6]"
            : "text-[#8B93A3] dark:text-[#6B7280] opacity-0 group-hover:opacity-100"
        } transition-opacity`}
      />
    </button>
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-montserrat font-bold text-2xl md:text-3xl text-[#0A1929] dark:text-white">
            Leaderboard
          </h1>
          <p className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] mt-1">
            See how you rank among your peers
          </p>
        </div>
        <Trophy className="text-[#F59E0B] dark:text-[#FBBF24]" size={32} />
      </div>

      {/* Top 3 Podium */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-sm border border-[#E9EDF3] dark:border-[#2A2A2A]">
        <h2 className="font-montserrat font-semibold text-lg text-[#0A1929] dark:text-white mb-6">
          Top Performers
        </h2>

        <div className="flex items-end justify-center gap-4 md:gap-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center flex-1 max-w-[140px]">
            <div className="relative mb-3">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#9CA3AF] to-[#6B7280] flex items-center justify-center text-white font-montserrat font-bold text-lg md:text-xl shadow-lg">
                {topThree[1]?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#9CA3AF] dark:bg-[#6B7280] rounded-full flex items-center justify-center shadow-md">
                <Medal size={18} className="text-white" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] dark:from-[#374151] dark:to-[#4B5563] rounded-xl p-4 w-full text-center">
              <div className="text-3xl font-bold text-[#6B7280] dark:text-[#9CA3AF] mb-1">
                2
              </div>
              <h3 className="font-onest font-semibold text-sm text-[#0A1929] dark:text-white mb-1 truncate">
                {topThree[1]?.name}
              </h3>
              <p className="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF]">
                {topThree[1]?.avgMarks}% avg
              </p>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center flex-1 max-w-[160px] -mt-6">
            <div className="relative mb-3">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white font-montserrat font-bold text-xl md:text-2xl shadow-xl ring-4 ring-[#FEF3C7] dark:ring-[#92400E]">
                {topThree[0]?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#F59E0B] dark:bg-[#D97706] rounded-full flex items-center justify-center shadow-lg">
                <Crown size={22} className="text-white" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] dark:from-[#92400E] dark:to-[#B45309] rounded-xl p-5 w-full text-center shadow-md">
              <div className="text-4xl font-bold text-[#D97706] dark:text-[#FDE68A] mb-1">
                1
              </div>
              <h3 className="font-onest font-semibold text-sm text-[#0A1929] dark:text-white mb-1 truncate">
                {topThree[0]?.name}
              </h3>
              <p className="font-inter text-xs text-[#78350F] dark:text-[#FEF3C7]">
                {topThree[0]?.avgMarks}% avg
              </p>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center flex-1 max-w-[140px]">
            <div className="relative mb-3">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#CD7F32] to-[#8B5A2B] flex items-center justify-center text-white font-montserrat font-bold text-lg md:text-xl shadow-lg">
                {topThree[2]?.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#CD7F32] dark:bg-[#8B5A2B] rounded-full flex items-center justify-center shadow-md">
                <Medal size={18} className="text-white" />
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] dark:from-[#78350F] dark:to-[#92400E] rounded-xl p-4 w-full text-center">
              <div className="text-3xl font-bold text-[#8B5A2B] dark:text-[#FDE68A] mb-1">
                3
              </div>
              <h3 className="font-onest font-semibold text-sm text-[#0A1929] dark:text-white mb-1 truncate">
                {topThree[2]?.name}
              </h3>
              <p className="font-inter text-xs text-[#505B6B] dark:text-[#FEF3C7]">
                {topThree[2]?.avgMarks}% avg
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Controls */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl p-4 shadow-sm border border-[#E9EDF3] dark:border-[#2A2A2A]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-onest text-sm text-[#505B6B] dark:text-[#9CA3AF] mr-2">
            Sort by:
          </span>
          <button
            onClick={() => handleSort("rank")}
            className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-colors ${
              sortBy === "rank"
                ? "bg-[#0066FF] text-white"
                : "bg-[#F3F4F6] dark:bg-[#262626] text-[#505B6B] dark:text-[#9CA3AF] hover:bg-[#E5E7EB] dark:hover:bg-[#374151]"
            }`}
          >
            Rank
          </button>
          <button
            onClick={() => handleSort("name")}
            className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-colors ${
              sortBy === "name"
                ? "bg-[#0066FF] text-white"
                : "bg-[#F3F4F6] dark:bg-[#262626] text-[#505B6B] dark:text-[#9CA3AF] hover:bg-[#E5E7EB] dark:hover:bg-[#374151]"
            }`}
          >
            Name
          </button>
          <button
            onClick={() => handleSort("id")}
            className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-colors ${
              sortBy === "id"
                ? "bg-[#0066FF] text-white"
                : "bg-[#F3F4F6] dark:bg-[#262626] text-[#505B6B] dark:text-[#9CA3AF] hover:bg-[#E5E7EB] dark:hover:bg-[#374151]"
            }`}
          >
            Student ID
          </button>
          <button
            onClick={() => handleSort("totalMarks")}
            className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-colors ${
              sortBy === "totalMarks"
                ? "bg-[#0066FF] text-white"
                : "bg-[#F3F4F6] dark:bg-[#262626] text-[#505B6B] dark:text-[#9CA3AF] hover:bg-[#E5E7EB] dark:hover:bg-[#374151]"
            }`}
          >
            Total Marks
          </button>
          <button
            onClick={() => handleSort("avgMarks")}
            className={`px-4 py-2 rounded-lg font-inter text-sm font-medium transition-colors ${
              sortBy === "avgMarks"
                ? "bg-[#0066FF] text-white"
                : "bg-[#F3F4F6] dark:bg-[#262626] text-[#505B6B] dark:text-[#9CA3AF] hover:bg-[#E5E7EB] dark:hover:bg-[#374151]"
            }`}
          >
            Avg Marks
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-[#E9EDF3] dark:border-[#2A2A2A] overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F7F9FC] dark:bg-[#262626] border-b border-[#E9EDF3] dark:border-[#2A2A2A]">
              <tr>
                <th className="px-6 py-4 text-left">
                  <SortButton field="rank">
                    <span className="font-onest font-semibold text-xs uppercase text-[#505B6B] dark:text-[#9CA3AF]">
                      Rank
                    </span>
                  </SortButton>
                </th>
                <th className="px-6 py-4 text-left">
                  <SortButton field="name">
                    <span className="font-onest font-semibold text-xs uppercase text-[#505B6B] dark:text-[#9CA3AF]">
                      Student Name
                    </span>
                  </SortButton>
                </th>
                <th className="px-6 py-4 text-left">
                  <SortButton field="id">
                    <span className="font-onest font-semibold text-xs uppercase text-[#505B6B] dark:text-[#9CA3AF]">
                      Student ID
                    </span>
                  </SortButton>
                </th>
                <th className="px-6 py-4 text-left">
                  <SortButton field="exams">
                    <span className="font-onest font-semibold text-xs uppercase text-[#505B6B] dark:text-[#9CA3AF]">
                      Exams
                    </span>
                  </SortButton>
                </th>
                <th className="px-6 py-4 text-left">
                  <SortButton field="totalMarks">
                    <span className="font-onest font-semibold text-xs uppercase text-[#505B6B] dark:text-[#9CA3AF]">
                      Total Marks
                    </span>
                  </SortButton>
                </th>
                <th className="px-6 py-4 text-left">
                  <SortButton field="avgMarks">
                    <span className="font-onest font-semibold text-xs uppercase text-[#505B6B] dark:text-[#9CA3AF]">
                      Avg Marks
                    </span>
                  </SortButton>
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedStudents.map((student, index) => {
                const actualRank = getRankByAverage(student);
                const isCurrentUser = student.isCurrentUser;

                return (
                  <tr
                    key={student.id}
                    className={`border-b border-[#E9EDF3] dark:border-[#2A2A2A] transition-colors ${
                      isCurrentUser
                        ? "bg-[#E3F2FD] dark:bg-[#0066FF] dark:bg-opacity-10"
                        : "hover:bg-[#F7F9FC] dark:hover:bg-[#262626]"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {actualRank === 1 && (
                          <Crown size={18} className="text-[#F59E0B]" />
                        )}
                        {actualRank === 2 && (
                          <Medal size={18} className="text-[#9CA3AF]" />
                        )}
                        {actualRank === 3 && (
                          <Medal size={18} className="text-[#CD7F32]" />
                        )}
                        <span className="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                          #{actualRank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white font-montserrat font-semibold text-xs">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <div className="font-onest font-medium text-sm text-[#0A1929] dark:text-white">
                            {student.name}
                            {isCurrentUser && (
                              <span className="ml-2 text-xs text-[#0066FF] dark:text-[#3B82F6]">
                                (You)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF]">
                        {student.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-inter text-sm text-[#0A1929] dark:text-white">
                        {student.exams}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                        {student.totalMarks}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                          {student.avgMarks}%
                        </span>
                        {student.avgMarks >= 90 && (
                          <TrendingUp size={16} className="text-[#10B981]" />
                        )}
                        {student.avgMarks < 80 && (
                          <TrendingDown size={16} className="text-[#EF4444]" />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-[#E9EDF3] dark:divide-[#2A2A2A]">
          {sortedStudents.map((student) => {
            const actualRank = getRankByAverage(student);
            const isCurrentUser = student.isCurrentUser;

            return (
              <div
                key={student.id}
                className={`p-4 ${
                  isCurrentUser
                    ? "bg-[#E3F2FD] dark:bg-[#0066FF] dark:bg-opacity-10"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex flex-col items-center">
                      {actualRank === 1 && (
                        <Crown size={20} className="text-[#F59E0B] mb-1" />
                      )}
                      {actualRank === 2 && (
                        <Medal size={20} className="text-[#9CA3AF] mb-1" />
                      )}
                      {actualRank === 3 && (
                        <Medal size={20} className="text-[#CD7F32] mb-1" />
                      )}
                      <span className="font-inter font-bold text-lg text-[#0A1929] dark:text-white">
                        #{actualRank}
                      </span>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white font-montserrat font-semibold text-sm">
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-onest font-semibold text-sm text-[#0A1929] dark:text-white">
                        {student.name}
                        {isCurrentUser && (
                          <span className="ml-1 text-xs text-[#0066FF] dark:text-[#3B82F6]">
                            (You)
                          </span>
                        )}
                      </h3>
                      <p className="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF]">
                        ID: {student.id}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-3">
                    <p className="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF] mb-1">
                      Exams
                    </p>
                    <p className="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                      {student.exams}
                    </p>
                  </div>
                  <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-3">
                    <p className="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF] mb-1">
                      Total
                    </p>
                    <p className="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                      {student.totalMarks}
                    </p>
                  </div>
                  <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-3">
                    <p className="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF] mb-1">
                      Average
                    </p>
                    <div className="flex items-center space-x-1">
                      <p className="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                        {student.avgMarks}%
                      </p>
                      {student.avgMarks >= 90 && (
                        <TrendingUp size={14} className="text-[#10B981]" />
                      )}
                      {student.avgMarks < 80 && (
                        <TrendingDown size={14} className="text-[#EF4444]" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

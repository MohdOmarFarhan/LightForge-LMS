"use client";
import { useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Filter,
} from "lucide-react";

const examsData = [
  {
    id: 1,
    title: "Advanced Mathematics - Calculus II",
    subject: "Mathematics",
    date: "Jan 25, 2026",
    time: "10:00 AM - 12:00 PM",
    duration: "120 min",
    status: "upcoming",
    totalQuestions: 50,
    mcq: 30,
    cq: 15,
    descriptive: 5,
    totalMarks: 100,
    isPrepared: true,
  },
  {
    id: 2,
    title: "Physics - Quantum Mechanics Final",
    subject: "Physics",
    date: "Jan 28, 2026",
    time: "2:00 PM - 4:00 PM",
    duration: "120 min",
    status: "upcoming",
    totalQuestions: 45,
    mcq: 25,
    cq: 12,
    descriptive: 8,
    totalMarks: 100,
    isPrepared: false,
  },
  {
    id: 3,
    title: "Computer Science - Data Structures",
    subject: "Computer Science",
    date: "Jan 30, 2026",
    time: "9:00 AM - 11:00 AM",
    duration: "120 min",
    status: "upcoming",
    totalQuestions: 60,
    mcq: 40,
    cq: 15,
    descriptive: 5,
    totalMarks: 100,
    isPrepared: true,
  },
  {
    id: 4,
    title: "English Literature - Modern Poetry",
    subject: "English",
    date: "Jan 20, 2026",
    time: "10:00 AM - 12:00 PM",
    duration: "120 min",
    status: "completed",
    totalQuestions: 35,
    mcq: 20,
    cq: 10,
    descriptive: 5,
    totalMarks: 100,
    score: 88,
  },
  {
    id: 5,
    title: "Chemistry - Organic Reactions",
    subject: "Chemistry",
    date: "Jan 18, 2026",
    time: "2:00 PM - 4:00 PM",
    duration: "120 min",
    status: "completed",
    totalQuestions: 50,
    mcq: 30,
    cq: 15,
    descriptive: 5,
    totalMarks: 100,
    score: 82,
  },
  {
    id: 6,
    title: "Biology - Cell Biology Midterm",
    subject: "Biology",
    date: "Jan 15, 2026",
    time: "9:00 AM - 11:00 AM",
    duration: "120 min",
    status: "completed",
    totalQuestions: 45,
    mcq: 25,
    cq: 15,
    descriptive: 5,
    totalMarks: 100,
    score: 91,
  },
];

function ExamCard({ exam }) {
  const getStatusConfig = () => {
    switch (exam.status) {
      case "upcoming":
        return {
          bgColor: "bg-[#E3F2FD] dark:bg-[#1A2744]",
          textColor: "text-[#0066FF] dark:text-[#2196F3]",
          icon: AlertCircle,
          label: "Upcoming",
        };
      case "completed":
        return {
          bgColor: "bg-[#E8F5E9] dark:bg-[#1A3A2B]",
          textColor: "text-[#10B981] dark:text-[#34D399]",
          icon: CheckCircle,
          label: "Completed",
        };
      case "inprogress":
        return {
          bgColor: "bg-[#FFF3E0] dark:bg-[#3D2B1A]",
          textColor: "text-[#F59E0B] dark:text-[#FBBF24]",
          icon: Clock,
          label: "In Progress",
        };
      default:
        return {
          bgColor: "bg-gray-100 dark:bg-gray-800",
          textColor: "text-gray-600 dark:text-gray-400",
          icon: XCircle,
          label: "Unknown",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-all duration-200 ease-out hover:shadow-md dark:hover:shadow-lg hover:-translate-y-0.5">
      {/* Header Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {/* Subject Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#E3F2FD] dark:bg-[#1A2744] mb-3">
            <span className="font-inter text-xs font-medium text-[#0066FF] dark:text-[#2196F3] transition-colors duration-200">
              {exam.subject}
            </span>
          </div>

          {/* Exam Title */}
          <h3 className="font-montserrat font-bold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-2 leading-tight transition-colors duration-200">
            {exam.title}
          </h3>

          {/* Date and Time Info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#6D7A8B] dark:text-[#9CA3AF] transition-colors duration-200">
            <div className="flex items-center gap-1.5">
              <Calendar
                size={16}
                className="text-[#6D7A8B] dark:text-[#9CA3AF]"
              />
              <span className="font-inter">{exam.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-[#6D7A8B] dark:text-[#9CA3AF]" />
              <span className="font-inter">{exam.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-inter font-medium">
                Duration: {exam.duration}
              </span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg ${statusConfig.bgColor}`}
        >
          <StatusIcon size={16} className={statusConfig.textColor} />
          <span
            className={`font-inter text-xs font-medium ${statusConfig.textColor}`}
          >
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#E7ECF3] dark:bg-[#2A2A2A] my-4"></div>

      {/* Question Breakdown Section */}
      <div className="mb-5">
        <h4 className="font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF] mb-3 transition-colors duration-200">
          Question Breakdown
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Total Questions */}
          <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-3 transition-colors duration-200">
            <div className="font-poppins font-bold text-xl text-[#0066FF] dark:text-[#2196F3] mb-0.5">
              {exam.totalQuestions}
            </div>
            <div className="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">
              Total Questions
            </div>
          </div>

          {/* MCQ */}
          <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-3 transition-colors duration-200">
            <div className="font-poppins font-bold text-xl text-[#10B981] dark:text-[#34D399] mb-0.5">
              {exam.mcq}
            </div>
            <div className="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">
              MCQ
            </div>
          </div>

          {/* CQ (Creative Questions) */}
          <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-3 transition-colors duration-200">
            <div className="font-poppins font-bold text-xl text-[#F59E0B] dark:text-[#FBBF24] mb-0.5">
              {exam.cq}
            </div>
            <div className="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">
              CQ
            </div>
          </div>

          {/* Descriptive */}
          <div className="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-3 transition-colors duration-200">
            <div className="font-poppins font-bold text-xl text-[#8B5CF6] dark:text-[#A78BFA] mb-0.5">
              {exam.descriptive}
            </div>
            <div className="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">
              Descriptive
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Score or Preparation Status */}
        <div className="flex items-center gap-2">
          {exam.status === "completed" ? (
            <div className="flex items-center gap-2">
              <span className="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                Score:
              </span>
              <span className="font-poppins font-bold text-lg text-[#10B981] dark:text-[#34D399]">
                {exam.score}/{exam.totalMarks}
              </span>
            </div>
          ) : (
            <>
              {exam.isPrepared && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8F5E9] dark:bg-[#1A3A2B]">
                  <CheckCircle
                    size={14}
                    className="text-[#10B981] dark:text-[#34D399]"
                  />
                  <span className="font-inter text-xs font-medium text-[#10B981] dark:text-[#34D399]">
                    Preparation Complete
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Action Button */}
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0047B3] text-white font-inter font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-50">
          {exam.status === "completed" ? "View Results" : "Start Exam"}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function ExamsContent() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredExams = examsData.filter((exam) => {
    if (activeTab === "all") return true;
    return exam.status === activeTab;
  });

  const getTabCount = (status) => {
    if (status === "all") return examsData.length;
    return examsData.filter((exam) => exam.status === status).length;
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="font-poppins font-bold text-3xl md:text-4xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-2 transition-colors duration-200">
          My Exams
        </h1>
        <p className="font-inter text-base text-[#64748B] dark:text-[#9CA3AF] transition-colors duration-200">
          Browse and manage all your examinations
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-5 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-poppins font-bold text-2xl text-[#0066FF] dark:text-[#2196F3] mb-1">
                {getTabCount("upcoming")}
              </div>
              <div className="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                Upcoming Exams
              </div>
            </div>
            <div className="w-12 h-12 bg-[#E3F2FD] dark:bg-[#1A2744] rounded-lg flex items-center justify-center">
              <AlertCircle
                size={24}
                className="text-[#0066FF] dark:text-[#2196F3]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-5 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-poppins font-bold text-2xl text-[#10B981] dark:text-[#34D399] mb-1">
                {getTabCount("completed")}
              </div>
              <div className="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                Completed Exams
              </div>
            </div>
            <div className="w-12 h-12 bg-[#E8F5E9] dark:bg-[#1A3A2B] rounded-lg flex items-center justify-center">
              <CheckCircle
                size={24}
                className="text-[#10B981] dark:text-[#34D399]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-5 transition-colors duration-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-poppins font-bold text-2xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-1">
                {getTabCount("all")}
              </div>
              <div className="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                Total Exams
              </div>
            </div>
            <div className="w-12 h-12 bg-[#F7F9FC] dark:bg-[#262626] rounded-lg flex items-center justify-center">
              <Filter
                size={24}
                className="text-[#64748B] dark:text-[#9CA3AF]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-2 mb-6 transition-colors duration-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-6 py-2.5 rounded-lg font-inter font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40 ${
              activeTab === "all"
                ? "bg-[#0066FF] text-white"
                : "bg-transparent text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]"
            }`}
          >
            All Exams ({getTabCount("all")})
          </button>
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-6 py-2.5 rounded-lg font-inter font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40 ${
              activeTab === "upcoming"
                ? "bg-[#0066FF] text-white"
                : "bg-transparent text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]"
            }`}
          >
            Upcoming ({getTabCount("upcoming")})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-2.5 rounded-lg font-inter font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40 ${
              activeTab === "completed"
                ? "bg-[#0066FF] text-white"
                : "bg-transparent text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]"
            }`}
          >
            Completed ({getTabCount("completed")})
          </button>
        </div>
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => <ExamCard key={exam.id} exam={exam} />)
        ) : (
          <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-12 text-center transition-colors duration-200">
            <div className="w-16 h-16 bg-[#F7F9FC] dark:bg-[#262626] rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle
                size={32}
                className="text-[#64748B] dark:text-[#9CA3AF]"
              />
            </div>
            <h3 className="font-montserrat font-semibold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-2">
              No exams found
            </h3>
            <p className="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
              There are no exams in this category yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

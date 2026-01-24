import { Calendar, Clock, BookOpen, CheckCircle } from "lucide-react";

const examsData = [
  {
    id: 1,
    title: "Advanced Mathematics - Calculus II",
    subject: "Mathematics",
    date: "Jan 25, 2026",
    time: "10:00 AM - 12:00 PM",
    duration: "120 min",
    status: "upcoming",
    questions: 50,
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
    questions: 45,
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
    questions: 60,
    isPrepared: true,
  },
];

function ExamCard({ exam }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-5 transition-all duration-200 ease-out hover:shadow-sm dark:hover:shadow-lg hover:-translate-y-0.5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left Block - Exam Info */}
        <div className="flex-1">
          {/* Subject Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#E3F2FD] dark:bg-[#1A2744] mb-2">
            <span className="font-inter text-xs font-medium text-[#0066FF] dark:text-[#2196F3] transition-colors duration-200">
              {exam.subject}
            </span>
          </div>

          {/* Exam Title */}
          <h3 className="font-montserrat font-bold text-base text-[#04111C] dark:text-[#E5E7EB] mb-2 leading-tight transition-colors duration-200">
            {exam.title}
          </h3>

          {/* Exam Meta */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#6D7A8B] dark:text-[#9CA3AF] transition-colors duration-200">
            <div className="flex items-center gap-1">
              <Calendar
                size={14}
                className="text-[#6D7A8B] dark:text-[#9CA3AF]"
              />
              <span className="font-inter">{exam.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} className="text-[#6D7A8B] dark:text-[#9CA3AF]" />
              <span className="font-inter">{exam.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen
                size={14}
                className="text-[#6D7A8B] dark:text-[#9CA3AF]"
              />
              <span className="font-inter">{exam.questions} questions</span>
            </div>
          </div>
        </div>

        {/* Right Block - Actions */}
        <div className="flex items-center gap-3">
          {/* Preparation Status */}
          {exam.isPrepared && (
            <div className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#E8F5E9] dark:bg-[#1A3A2B]">
              <CheckCircle
                size={16}
                className="text-[#10B981] dark:text-[#34D399]"
              />
              <span className="font-inter text-xs font-medium text-[#10B981] dark:text-[#34D399]">
                Ready
              </span>
            </div>
          )}

          {/* Start Button */}
          <button className="px-6 py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0047B3] text-white font-inter font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-50">
            Review
          </button>
        </div>
      </div>
    </div>
  );
}

export default function UpcomingExams() {
  return (
    <section className="w-full">
      {/* Container with background */}
      <div className="max-w-[1280px] mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-montserrat text-xl font-bold text-[#04111C] dark:text-[#E5E7EB] transition-colors duration-200 mb-1">
              Upcoming Exams
            </h2>
            <p className="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] transition-colors duration-200">
              Stay on top of your scheduled assessments
            </p>
          </div>
          <button className="px-4 py-2 rounded-lg text-sm font-inter font-medium bg-[#E3F2FD] bg-opacity-70 text-[#0066FF] dark:bg-[#1A2744] dark:bg-opacity-80 dark:text-[#2196F3] hover:bg-[#BBDEFB] hover:text-[#0052CC] dark:hover:bg-[#1E3A5A] dark:hover:text-[#1976D2] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-50">
            View All Exams
          </button>
        </div>

        {/* Exams List */}
        <div className="space-y-4">
          {examsData.map((exam) => (
            <ExamCard key={exam.id} exam={exam} />
          ))}
        </div>
      </div>
    </section>
  );
}

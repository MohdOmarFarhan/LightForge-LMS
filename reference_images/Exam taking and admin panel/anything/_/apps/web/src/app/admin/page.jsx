import {
  Users,
  FileQuestion,
  FileText,
  ClipboardCheck,
  TrendingUp,
  UserCheck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      name: "Total Students",
      value: "1,247",
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "bg-[#0D6EFD]",
    },
    {
      name: "Questions Bank",
      value: "3,456",
      change: "+245",
      trend: "up",
      icon: FileQuestion,
      color: "bg-[#16A34A]",
    },
    {
      name: "Active Exams",
      value: "23",
      change: "-3",
      trend: "down",
      icon: FileText,
      color: "bg-[#F59E0B]",
    },
    {
      name: "Pending Reviews",
      value: "145",
      change: "+28",
      trend: "up",
      icon: ClipboardCheck,
      color: "bg-[#DC2626]",
    },
    {
      name: "Pending Approvals",
      value: "34",
      change: "+12",
      trend: "up",
      icon: UserCheck,
      color: "bg-[#8B5CF6]",
    },
    {
      name: "Avg Performance",
      value: "78.5%",
      change: "+2.4%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-[#10B981]",
    },
  ];

  const recentActivity = [
    {
      student: "Arif Rahman",
      action: "Submitted exam",
      exam: "Mathematics - Calculus II",
      time: "5 mins ago",
      class: "Class 12",
    },
    {
      student: "Fatima Khan",
      action: "Requested approval",
      exam: "New Registration",
      time: "12 mins ago",
      class: "Class 11",
    },
    {
      student: "Samiul Haque",
      action: "Completed exam",
      exam: "Physics - Thermodynamics",
      time: "28 mins ago",
      class: "Class 12",
    },
    {
      student: "Nusrat Jahan",
      action: "Started exam",
      exam: "Chemistry - Organic",
      time: "1 hour ago",
      class: "Class 11",
    },
  ];

  const upcomingExams = [
    {
      name: "Advanced Mathematics Final",
      class: "Class 12",
      date: "Jan 25, 2026",
      time: "10:00 AM",
      students: 145,
    },
    {
      name: "Physics Mid-term",
      class: "Class 11",
      date: "Jan 26, 2026",
      time: "2:00 PM",
      students: 178,
    },
    {
      name: "Chemistry Practical",
      class: "Class 12",
      date: "Jan 27, 2026",
      time: "9:00 AM",
      students: 132,
    },
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6 hover:border-[#374151] transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-semibold ${
                    stat.trend === "up" ? "text-[#22C55E]" : "text-[#DC2626]"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-[#9CA3AF]">{stat.name}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 bg-[#0F1419] rounded-lg hover:bg-[#1F2937] transition-all duration-200"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {activity.student.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold text-white">
                      {activity.student}
                    </p>
                    <span className="px-2 py-0.5 bg-[#1F2937] text-[#9CA3AF] rounded text-xs">
                      {activity.class}
                    </span>
                  </div>
                  <p className="text-sm text-[#9CA3AF]">
                    {activity.action} • {activity.exam}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Upcoming Exams</h3>
          <div className="space-y-4">
            {upcomingExams.map((exam, index) => (
              <div
                key={index}
                className="p-4 bg-[#0F1419] rounded-lg border border-[#1F2937] hover:border-[#0D6EFD] transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="text-base font-semibold text-white mb-1">
                      {exam.name}
                    </h4>
                    <span className="px-2 py-1 bg-[#0D6EFD]/20 text-[#0D6EFD] rounded text-xs font-semibold">
                      {exam.class}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-white">
                      {exam.date}
                    </p>
                    <p className="text-xs text-[#9CA3AF]">{exam.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#9CA3AF]">
                  <Users size={14} />
                  <span>{exam.students} students enrolled</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] rounded-lg hover:shadow-lg hover:shadow-[#0D6EFD]/20 transition-all duration-200">
            <FileText size={24} className="text-white mb-2" />
            <p className="text-sm font-semibold text-white">Create Exam</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-[#16A34A] to-[#15803D] rounded-lg hover:shadow-lg hover:shadow-[#16A34A]/20 transition-all duration-200">
            <FileQuestion size={24} className="text-white mb-2" />
            <p className="text-sm font-semibold text-white">Add Question</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg hover:shadow-lg hover:shadow-[#F59E0B]/20 transition-all duration-200">
            <ClipboardCheck size={24} className="text-white mb-2" />
            <p className="text-sm font-semibold text-white">Review Answers</p>
          </button>
          <button className="p-4 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/20 transition-all duration-200">
            <UserCheck size={24} className="text-white mb-2" />
            <p className="text-sm font-semibold text-white">Approvals</p>
          </button>
        </div>
      </div>
    </div>
  );
}

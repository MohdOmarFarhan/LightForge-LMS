import { FileText, TrendingUp, Trophy, ArrowRight } from "lucide-react";

const statsData = [
  {
    id: "exams",
    title: "Upcoming Exams",
    value: "3",
    icon: FileText,
    bgColor: "bg-[#E3F2FD] dark:bg-[#1A2744]",
    borderColor: "border-[#0066FF] dark:border-[#2196F3]",
    accentColor: "#0066FF",
    darkAccentColor: "#2196F3",
    textColor: "text-[#0066FF] dark:text-[#2196F3]",
    hoverBorderColor: "hover:border-[#0052CC] dark:hover:border-[#1976D2]",
    description: "Next exam in 2 days",
  },
  {
    id: "performance",
    title: "Average Score",
    value: "85%",
    icon: TrendingUp,
    bgColor: "bg-[#E8F5E9] dark:bg-[#1A3A2B]",
    borderColor: "border-[#10B981] dark:border-[#34D399]",
    accentColor: "#10B981",
    darkAccentColor: "#34D399",
    textColor: "text-[#10B981] dark:text-[#34D399]",
    hoverBorderColor: "hover:border-[#059669] dark:hover:border-[#22C55E]",
    description: "Improved by 5% this month",
  },
  {
    id: "leaderboard",
    title: "Your Rank",
    value: "#8",
    icon: Trophy,
    bgColor: "bg-[#FFF3E0] dark:bg-[#3D2B1A]",
    borderColor: "border-[#F59E0B] dark:border-[#FBBF24]",
    accentColor: "#F59E0B",
    darkAccentColor: "#FBBF24",
    textColor: "text-[#F59E0B] dark:text-[#FBBF24]",
    hoverBorderColor: "hover:border-[#D97706] dark:hover:border-[#F59E0B]",
    description: "Out of 150 students",
  },
];

function DecorativeOverlay({ accentColor, darkAccentColor, cardId }) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[14px] pointer-events-none">
      {/* Top-left arc */}
      <svg
        className="absolute -top-2 -left-2 w-16 h-16"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 56 C8 31, 31 8, 56 8"
          stroke={accentColor}
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
          className="dark:hidden"
        />
        <path
          d="M2 60 C2 29, 29 2, 60 2"
          stroke={accentColor}
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
          className="dark:hidden"
        />
        <path
          d="M8 56 C8 31, 31 8, 56 8"
          stroke={darkAccentColor}
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
          className="hidden dark:block"
        />
        <path
          d="M2 60 C2 29, 29 2, 60 2"
          stroke={darkAccentColor}
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
          className="hidden dark:block"
        />
      </svg>

      {/* Bottom-right arc */}
      <svg
        className="absolute -bottom-2 -right-2 w-16 h-16 rotate-180"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 56 C8 31, 31 8, 56 8"
          stroke={accentColor}
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
          className="dark:hidden"
        />
        <path
          d="M2 60 C2 29, 29 2, 60 2"
          stroke={accentColor}
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
          className="dark:hidden"
        />
        <path
          d="M8 56 C8 31, 31 8, 56 8"
          stroke={darkAccentColor}
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
          className="hidden dark:block"
        />
        <path
          d="M2 60 C2 29, 29 2, 60 2"
          stroke={darkAccentColor}
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
          className="hidden dark:block"
        />
      </svg>
    </div>
  );
}

function StatCard({ stat }) {
  const IconComponent = stat.icon;

  return (
    <div
      className={`
        relative min-h-[140px] p-5 rounded-[14px] border transition-all duration-200 ease-out cursor-pointer
        ${stat.bgColor} ${stat.borderColor} ${stat.hoverBorderColor}
        hover:shadow-sm hover:-translate-y-0.5
        focus:outline-none focus:ring-2 focus:ring-offset-2
        dark:hover:shadow-lg
      `}
      style={{
        "--focus-ring-color": stat.accentColor,
        boxShadow: "var(--card-shadow, none)",
      }}
      tabIndex={0}
      role="button"
      onMouseEnter={(e) => {
        const isDark = document.documentElement.classList.contains("dark");
        e.currentTarget.style.setProperty(
          "--card-shadow",
          isDark
            ? "rgba(255,255,255,0.05) 0px 2px 8px 0px"
            : "rgba(0,0,0,0.05) 0px 2px 6px 0px",
        );
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.setProperty("--card-shadow", "none");
      }}
      onFocus={(e) => {
        const isDark = document.documentElement.classList.contains("dark");
        const color = isDark ? stat.darkAccentColor : stat.accentColor;
        e.currentTarget.style.outline = `2px solid ${color}`;
        e.currentTarget.style.outlineOffset = "2px";
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = "none";
      }}
    >
      <DecorativeOverlay
        accentColor={stat.accentColor}
        darkAccentColor={stat.darkAccentColor}
        cardId={stat.id}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Upper block */}
        <div className="flex items-start gap-3">
          {/* Icon container */}
          <div className="w-12 h-12 bg-white dark:bg-[#262626] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200">
            <IconComponent
              size={20}
              strokeWidth={2}
              color={stat.accentColor}
              className="dark:hidden"
            />
            <IconComponent
              size={20}
              strokeWidth={2}
              color={stat.darkAccentColor}
              className="hidden dark:block"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <div className="font-poppins font-medium text-[32px] leading-8 text-[#09121F] dark:text-[#E5E7EB] mb-1 transition-colors duration-200">
              {stat.value}
            </div>
            <div className="font-montserrat font-semibold text-sm leading-5 text-[#64748B] dark:text-[#9CA3AF] transition-colors duration-200">
              {stat.title}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-3">
          <p className="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF] transition-colors duration-200">
            {stat.description}
          </p>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px bg-black bg-opacity-6 dark:bg-white dark:bg-opacity-10 my-4 transition-colors duration-200"
          style={{ marginTop: "auto", marginBottom: "16px" }}
        />

        {/* Lower block */}
        <div className="flex items-center justify-between">
          <button
            className={`font-montserrat font-semibold text-sm leading-5 ${stat.textColor} hover:underline focus:outline-none focus:underline transition-colors duration-200`}
          >
            View Details
          </button>
          <div>
            <ArrowRight
              size={18}
              color={stat.accentColor}
              className="dark:hidden"
            />
            <ArrowRight
              size={18}
              color={stat.darkAccentColor}
              className="hidden dark:block"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LMSDashboard() {
  return (
    <section className="w-full">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-poppins font-bold text-3xl md:text-4xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-2 transition-colors duration-200">
          Welcome back, Alexis! 👋
        </h1>
        <p className="font-inter text-base text-[#64748B] dark:text-[#9CA3AF] transition-colors duration-200">
          Here's what's happening with your learning journey today
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {statsData.map((stat) => (
          <StatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}

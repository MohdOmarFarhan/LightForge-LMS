import {
  Home,
  FileText,
  TrendingUp,
  Trophy,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  GraduationCap,
} from "lucide-react";

export default function LMSSidebar() {
  return (
    <div
      className="w-64 bg-[#0A1929] dark:bg-[#0D1117] text-white flex flex-col fixed left-0 top-0 h-full font-onest md:block hidden transition-colors duration-200"
      style={{
        paddingTop: "32px",
        paddingLeft: "24px",
        paddingRight: "24px",
        paddingBottom: "28px",
      }}
    >
      {/* Brand Section */}
      <div className="mb-5">
        <a
          href="/"
          className="flex items-center hover:opacity-80 transition-opacity"
        >
          <GraduationCap size={28} className="text-[#0066FF] mr-2" />
          <h1
            className="font-montserrat font-bold text-lg text-white"
            style={{ letterSpacing: "-0.25px" }}
          >
            LightForge Academy
          </h1>
        </a>
      </div>

      {/* Student Profile Section */}
      <div className="flex items-center mb-7 cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-lg p-2 -m-2 transition-colors duration-200">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center mr-3 text-white font-montserrat font-bold text-sm">
          AS
        </div>
        <div className="flex-1">
          <div className="font-onest font-semibold text-[13px] text-white">
            Alexis Sanchez
          </div>
          <div
            className="font-onest font-normal text-[11px] text-white"
            style={{ opacity: "0.5" }}
          >
            ID: 241073
          </div>
        </div>
        <ChevronDown
          size={18}
          className="text-white opacity-60 hover:opacity-80 transition-opacity"
        />
      </div>

      {/* Main Menu Section */}
      <div className="mb-9">
        <h2
          className="font-onest font-semibold text-[11px] text-white mb-3"
          style={{ opacity: "0.6" }}
        >
          Main Menu
        </h2>
        <div className="space-y-3">
          {/* Active Menu Item - Dashboard */}
          <a
            href="/"
            className="flex items-center bg-[#0066FF] dark:bg-[#0052CC] rounded-md px-4 py-3 transition-colors duration-150 ease-out hover:bg-[#0052CC] dark:hover:bg-[#0047B3] active:bg-[#0047B3] dark:active:bg-[#003D99] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            tabIndex="0"
          >
            <Home size={18} className="text-white mr-4" />
            <span className="font-onest font-medium text-[13px] text-white">
              Dashboard
            </span>
          </a>

          {/* Inactive Menu Items */}
          <a
            href="/exams"
            className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] group"
            tabIndex="0"
          >
            <FileText
              size={18}
              className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
            />
            <span className="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
              Exams
            </span>
          </a>

          <a
            href="/performance"
            className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] group"
            tabIndex="0"
          >
            <TrendingUp
              size={18}
              className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
            />
            <span className="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
              Performance
            </span>
          </a>

          <a
            href="/leaderboard"
            className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] group"
            tabIndex="0"
          >
            <Trophy
              size={18}
              className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
            />
            <span className="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
              Leaderboard
            </span>
          </a>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="flex-1">
        <h2
          className="font-onest font-semibold text-[11px] text-white mb-4"
          style={{ opacity: "0.6" }}
        >
          Your Stats
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 bg-[#0066FF] dark:bg-[#3B82F6] rounded-full mr-3"></div>
              <span className="font-onest font-normal text-[12px] text-white">
                Exams Taken
              </span>
            </div>
            <span className="font-onest font-semibold text-[12px] text-white">
              12
            </span>
          </div>
          <div className="flex items-center justify-between cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 bg-[#10B981] dark:bg-[#34D399] rounded-full mr-3"></div>
              <span className="font-onest font-normal text-[12px] text-white">
                Average Score
              </span>
            </div>
            <span className="font-onest font-semibold text-[12px] text-white">
              85%
            </span>
          </div>
          <div className="flex items-center justify-between cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 bg-[#F59E0B] dark:bg-[#FBBF24] rounded-full mr-3"></div>
              <span className="font-onest font-normal text-[12px] text-white">
                Rank
              </span>
            </div>
            <span className="font-onest font-semibold text-[12px] text-white">
              #8
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Utility Links */}
      <div className="mt-60">
        <hr className="border-[#1E3A52] dark:border-[#1F2937] border-t mb-6" />
        <div className="space-y-3">
          <div
            className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF] rounded px-2 py-1 group"
            tabIndex="0"
          >
            <Settings
              size={18}
              className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
            />
            <span className="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
              Settings
            </span>
          </div>

          <div
            className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF] rounded px-2 py-1 group"
            tabIndex="0"
          >
            <HelpCircle
              size={18}
              className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
            />
            <span className="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
              Help & Support
            </span>
          </div>

          <div
            className="flex items-center px-2 py-3 rounded-md cursor-pointer hover:bg-[#0D2339] dark:hover:bg-[#1F2937] active:bg-[#0A1E2D] dark:active:bg-[#111827] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
            tabIndex="0"
          >
            <LogOut size={18} className="text-white mr-4" />
            <span className="font-onest font-medium text-[12px] text-white">
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

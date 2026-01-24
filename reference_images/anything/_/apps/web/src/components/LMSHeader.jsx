import {
  Menu,
  Search,
  Bell,
  BookOpen,
  Home,
  FileText,
  TrendingUp,
  Trophy,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  X,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";

export default function LMSHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-10 bg-white dark:bg-[#1E1E1E] border-b border-[#E9EDF3] dark:border-[#2A2A2A] h-14 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-6 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left Utility Group - Hamburger */}
            <div className="flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded hover:bg-[#E3F2FD] dark:hover:bg-[#0066FF] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40"
              >
                <Menu
                  size={22}
                  className="text-[#0A1929] dark:text-white hover:text-[#0066FF] transition-colors"
                />
              </button>

              {/* Brand name on mobile */}
              <div className="flex items-center ml-3 md:hidden">
                <GraduationCap size={24} className="text-[#0066FF] mr-2" />
                <h1 className="font-montserrat font-bold text-base text-[#0A1929] dark:text-white">
                  LightForge Academy
                </h1>
              </div>
            </div>

            {/* Search Module - Hidden on mobile */}
            <div className="hidden md:flex flex-1 max-w-[480px] min-w-[280px] mx-4">
              <div className="flex items-center h-10 border border-[#D7DBE3] dark:border-[#374151] rounded-lg overflow-hidden focus-within:border-[#0066FF] transition-colors bg-white dark:bg-[#262626] w-full">
                {/* Search Icon Section */}
                <div className="w-12 flex items-center justify-center">
                  <Search
                    size={20}
                    className="text-[#505B6B] dark:text-[#9CA3AF]"
                  />
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search exams, courses..."
                  className="flex-1 h-full px-0 py-0 border-0 outline-none font-inter text-sm text-[#505B6B] dark:text-[#E5E7EB] placeholder-[#8B93A3] dark:placeholder-[#6B7280] focus:placeholder-[#707888] dark:focus:placeholder-[#9CA3AF] bg-transparent"
                />
              </div>
            </div>

            {/* Action Cluster */}
            <div className="flex items-center space-x-3 md:space-x-6">
              {/* Search icon for mobile */}
              <button className="md:hidden w-10 h-10 flex items-center justify-center rounded hover:bg-[#E3F2FD] dark:hover:bg-[#0066FF] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40">
                <Search
                  size={20}
                  className="text-[#505B6B] dark:text-[#9CA3AF]"
                />
              </button>

              {/* Vertical Divider - hidden on mobile */}
              <div className="w-px h-6 bg-[#E1E4E8] dark:bg-[#374151] hidden md:block"></div>

              {/* Notification Bell */}
              <button className="relative w-10 h-10 flex items-center justify-center rounded hover:bg-[#E3F2FD] dark:hover:bg-[#0066FF] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40">
                <Bell
                  size={20}
                  className="text-[#8B93A3] dark:text-[#9CA3AF]"
                />
                {/* Notification Dot */}
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF4E5C] rounded-full"></div>
              </button>

              {/* Primary CTA */}
              <button className="flex items-center h-10 px-3 md:px-6 bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0047B3] text-white rounded-lg font-inter font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40">
                <span className="hidden sm:inline">Start Exam</span>
                <BookOpen size={18} className="sm:ml-2" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeMobileMenu}
          ></div>

          {/* Mobile Menu Panel */}
          <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-[#0A1929] dark:bg-[#0D1117] text-white flex flex-col transition-colors duration-200 transform">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1E3A52] dark:border-[#1F2937]">
              <div className="flex items-center">
                <GraduationCap size={24} className="text-[#0066FF] mr-2" />
                <h1 className="font-montserrat font-bold text-base text-white">
                  LightForge Academy
                </h1>
              </div>
              <button
                onClick={closeMobileMenu}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                <X size={20} className="text-white" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Student Profile Section */}
              <div className="flex items-center mb-7 cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-lg p-2 -m-2 transition-colors duration-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center mr-3 text-white font-montserrat font-bold text-sm">
                  AS
                </div>
                <div className="flex-1">
                  <div className="font-onest font-semibold text-[13px] text-white">
                    Alexis Sanchez
                  </div>
                  <div className="font-onest font-normal text-[11px] text-white opacity-50">
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
                <h2 className="font-onest font-semibold text-[11px] text-white mb-3 opacity-60">
                  Main Menu
                </h2>
                <div className="space-y-3">
                  {/* Active Menu Item - Dashboard */}
                  <a
                    href="/"
                    onClick={closeMobileMenu}
                    className="flex items-center bg-[#0066FF] dark:bg-[#0052CC] rounded-md px-4 py-3 transition-colors duration-150 ease-out hover:bg-[#0052CC] dark:hover:bg-[#0047B3] active:bg-[#0047B3] dark:active:bg-[#003D99] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
                  >
                    <Home size={18} className="text-white mr-4" />
                    <span className="font-onest font-medium text-[13px] text-white">
                      Dashboard
                    </span>
                  </a>

                  {/* Inactive Menu Items */}
                  <a
                    href="/exams"
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] group"
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
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] group"
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
                    onClick={closeMobileMenu}
                    className="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] group"
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
              <div className="mb-8">
                <h2 className="font-onest font-semibold text-[11px] text-white mb-4 opacity-60">
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
              <div className="border-t border-[#1E3A52] dark:border-[#1F2937] pt-6">
                <div className="space-y-3">
                  <div className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF] rounded px-2 py-1 group">
                    <Settings
                      size={18}
                      className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                      Settings
                    </span>
                  </div>

                  <div className="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF] rounded px-2 py-1 group">
                    <HelpCircle
                      size={18}
                      className="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                      Help & Support
                    </span>
                  </div>

                  <div className="flex items-center px-2 py-3 rounded-md cursor-pointer hover:bg-[#0D2339] dark:hover:bg-[#1F2937] active:bg-[#0A1E2D] dark:active:bg-[#111827] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF]">
                    <LogOut size={18} className="text-white mr-4" />
                    <span className="font-onest font-medium text-[12px] text-white">
                      Logout
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

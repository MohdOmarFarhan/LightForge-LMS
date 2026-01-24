"use client";
import { useState } from "react";
import {
  Home,
  Users,
  FileQuestion,
  FileText,
  ClipboardCheck,
  Trophy,
  UserCheck,
  Menu,
  X,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/admin",
  );

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Questions", href: "/admin/questions", icon: FileQuestion },
    { name: "Exams", href: "/admin/exams", icon: FileText },
    { name: "Scrutiny", href: "/admin/scrutiny", icon: ClipboardCheck },
    { name: "Leaderboard", href: "/admin/leaderboard", icon: Trophy },
    { name: "Pending Approvals", href: "/admin/approvals", icon: UserCheck },
  ];

  const isActive = (href) => {
    if (href === "/admin") {
      return currentPath === href;
    }
    return currentPath?.startsWith(href);
  };

  const handleNavigation = (href) => {
    setCurrentPath(href);
    setSidebarOpen(false);
    window.location.href = href;
  };

  return (
    <div className="min-h-screen bg-[#0F1419]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-[#161B22] border-r border-[#1F2937] z-50
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-[#1F2937]">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                <p className="text-xs text-[#9CA3AF] mt-1">Management System</p>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-[#1F2937] rounded-lg transition-colors"
              >
                <X size={20} className="text-[#9CA3AF]" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left
                      ${
                        active
                          ? "bg-[#0D6EFD] text-white shadow-lg shadow-[#0D6EFD]/20"
                          : "text-[#9CA3AF] hover:bg-[#1F2937] hover:text-white"
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#1F2937]">
            <div className="flex items-center gap-3 p-3 bg-[#1F2937] rounded-lg mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] rounded-lg flex items-center justify-center text-white font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  Admin User
                </p>
                <p className="text-xs text-[#9CA3AF]">Administrator</p>
              </div>
            </div>
            <button className="w-full flex items-center gap-2 px-4 py-2 text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] rounded-lg transition-all duration-200">
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-[#161B22] border-b border-[#1F2937]">
          <div className="flex items-center justify-between px-4 md:px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-[#1F2937] rounded-lg transition-colors"
            >
              <Menu size={24} className="text-white" />
            </button>
            <div className="flex-1 lg:flex-none">
              <h2 className="text-lg md:text-xl font-bold text-white">
                {navigation.find((item) => isActive(item.href))?.name ||
                  "Dashboard"}
              </h2>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main>{children}</main>
      </div>
    </div>
  );
}

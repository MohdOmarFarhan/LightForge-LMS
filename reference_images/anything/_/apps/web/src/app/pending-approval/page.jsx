"use client";

import { useState, useEffect } from "react";
import {
  GraduationCap,
  Clock,
  Mail,
  CheckCircle2,
  Sparkles,
  Bell,
  Phone,
  Calendar,
} from "lucide-react";

export default function PendingApprovalPage() {
  const [currentStep, setCurrentStep] = useState(1);

  // Simulate progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev === 3 ? 1 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#E0F2FE] dark:from-[#0D1117] dark:via-[#0A0E14] dark:to-[#0D1929] flex items-center justify-center p-4 font-inter">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#0066FF]/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Main Content Card */}
      <div className="relative w-full max-w-4xl">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#2A2A2A]">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left Side - Visual */}
            <div className="bg-gradient-to-br from-[#0A1929] via-[#0D2744] to-[#0066FF] p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
                <div
                  className="absolute bottom-10 right-10 w-40 h-40 bg-[#00D4FF] rounded-full blur-2xl animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              {/* Logo */}
              <div className="relative z-10 mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-2xl flex items-center justify-center shadow-2xl">
                  <GraduationCap size={40} className="text-white" />
                </div>
              </div>

              {/* Animated Clock Icon */}
              <div className="relative z-10 mb-6">
                <div className="w-32 h-32 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border-4 border-white/20">
                  <Clock size={56} className="text-white animate-pulse" />
                </div>
              </div>

              <h2 className="relative z-10 font-montserrat font-bold text-3xl text-center mb-4">
                Almost There!
              </h2>
              <p className="relative z-10 font-onest text-center text-white/80 text-lg mb-8">
                Your application is being reviewed by our admissions team
              </p>

              {/* Progress Steps */}
              <div className="relative z-10 w-full max-w-xs space-y-4">
                {[
                  {
                    icon: CheckCircle2,
                    label: "Application Submitted",
                    done: true,
                  },
                  {
                    icon: Clock,
                    label: "Under Review",
                    done: false,
                    active: true,
                  },
                  { icon: Sparkles, label: "Approval Pending", done: false },
                ].map((step, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                        step.done
                          ? "bg-[#10B981] scale-100"
                          : step.active
                            ? "bg-[#0066FF] scale-110 animate-pulse"
                            : "bg-white/10 scale-90"
                      }`}
                    >
                      <step.icon size={20} className="text-white" />
                    </div>
                    <span
                      className={`font-onest text-sm transition-all duration-500 ${
                        step.done || step.active
                          ? "text-white font-semibold"
                          : "text-white/50"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Information */}
            <div className="p-12 flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="font-montserrat font-bold text-4xl text-[#0A1929] dark:text-white mb-3">
                  Welcome to the Waitlist! 🎓
                </h1>
                <p className="text-[#64748B] dark:text-[#9CA3AF] font-onest text-lg">
                  Thank you for registering with LightForge Academy. We're
                  excited to have you join our community!
                </p>
              </div>

              {/* What's Next Section */}
              <div className="mb-8">
                <h3 className="font-montserrat font-bold text-xl text-[#0A1929] dark:text-white mb-4 flex items-center">
                  <div className="w-2 h-2 bg-[#0066FF] rounded-full mr-3"></div>
                  What Happens Next?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Mail size={16} className="text-[#0066FF]" />
                    </div>
                    <div>
                      <p className="font-onest font-semibold text-[#0A1929] dark:text-white text-sm">
                        Check Your Email
                      </p>
                      <p className="font-onest text-[#64748B] dark:text-[#9CA3AF] text-sm">
                        We've sent a confirmation to your registered email
                        address
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Clock size={16} className="text-[#0066FF]" />
                    </div>
                    <div>
                      <p className="font-onest font-semibold text-[#0A1929] dark:text-white text-sm">
                        Review Process
                      </p>
                      <p className="font-onest text-[#64748B] dark:text-[#9CA3AF] text-sm">
                        Typically takes 24-48 hours during business days
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bell size={16} className="text-[#0066FF]" />
                    </div>
                    <div>
                      <p className="font-onest font-semibold text-[#0A1929] dark:text-white text-sm">
                        Get Notified
                      </p>
                      <p className="font-onest text-[#64748B] dark:text-[#9CA3AF] text-sm">
                        You'll receive an email once your account is approved
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Student ID Preview */}
              <div className="bg-gradient-to-br from-[#E3F2FD] to-[#DBEAFE] dark:from-[#0066FF]/5 dark:to-[#0052CC]/5 rounded-2xl p-6 mb-8 border border-[#0066FF]/20">
                <div className="flex items-center mb-3">
                  <Sparkles size={18} className="text-[#0066FF] mr-2" />
                  <h4 className="font-montserrat font-bold text-[#0A1929] dark:text-white text-sm">
                    Your Student ID
                  </h4>
                </div>
                <p className="font-onest text-[#64748B] dark:text-[#9CA3AF] text-xs mb-2">
                  Once approved, you'll receive your unique student ID:
                </p>
                <div className="bg-white dark:bg-[#1E1E1E] rounded-lg px-4 py-3 border-2 border-dashed border-[#0066FF]/30">
                  <p className="font-mono font-bold text-2xl text-[#0066FF] text-center tracking-wider">
                    LFA-XXXXXX
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/40 transform hover:scale-[1.02] active:scale-[0.98] font-onest group">
                  <Mail size={20} />
                  <span>Resend Confirmation Email</span>
                </button>

                <button className="w-full bg-white dark:bg-[#262626] border-2 border-[#E2E8F0] dark:border-[#374151] hover:border-[#0066FF] text-[#0A1929] dark:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 hover:shadow-lg transform hover:scale-[1.01] active:scale-[0.99] font-onest group">
                  <Phone size={20} className="text-[#0066FF]" />
                  <span>Contact Support</span>
                </button>
              </div>

              {/* Footer Note */}
              <div className="mt-8 pt-6 border-t border-[#E2E8F0] dark:border-[#2A2A2A]">
                <p className="text-center font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                  Questions? Email us at{" "}
                  <span className="text-[#0066FF] font-semibold hover:underline cursor-pointer">
                    admissions@lightforge.academy
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Info Cards */}
        <div className="hidden lg:block absolute -right-8 top-1/4 transform -translate-y-1/2">
          <div
            className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl p-5 border border-[#E2E8F0] dark:border-[#2A2A2A] w-64 animate-pulse"
            style={{ animationDuration: "3s" }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center">
                <CheckCircle2 size={20} className="text-white" />
              </div>
              <div>
                <p className="font-montserrat font-bold text-sm text-[#0A1929] dark:text-white">
                  Fast Processing
                </p>
                <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                  Avg. 36 hours
                </p>
              </div>
            </div>
            <div className="bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-lg p-3">
              <p className="font-onest text-xs text-[#0A1929] dark:text-white">
                <span className="font-bold text-[#0066FF]">95%</span> of
                applications approved within 48 hours
              </p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute -left-8 bottom-1/4 transform translate-y-1/2">
          <div
            className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl p-5 border border-[#E2E8F0] dark:border-[#2A2A2A] w-64 animate-pulse"
            style={{ animationDuration: "3s", animationDelay: "1.5s" }}
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-full flex items-center justify-center">
                <Calendar size={20} className="text-white" />
              </div>
              <div>
                <p className="font-montserrat font-bold text-sm text-[#0A1929] dark:text-white">
                  Next Cohort
                </p>
                <p className="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                  Starts Feb 1st
                </p>
              </div>
            </div>
            <div className="bg-[#FEF3C7] dark:bg-[#F59E0B]/10 rounded-lg p-3">
              <p className="font-onest text-xs text-[#0A1929] dark:text-white">
                Get approved early to secure your spot in the upcoming semester!
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}

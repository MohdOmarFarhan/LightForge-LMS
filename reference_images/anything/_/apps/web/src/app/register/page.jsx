"use client";

import { useState } from "react";
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Upload,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "",
    course: "",
    yearSemester: "",
    address: "",
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen flex font-inter">
      {/* Left Side - Brand & Visual */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A1929] via-[#0D2744] to-[#0066FF] relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-[#0066FF] rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h1 className="font-montserrat font-bold text-3xl">
              LightForge Academy
            </h1>
          </div>

          {/* Hero Text */}
          <h2 className="font-montserrat font-bold text-5xl leading-tight mb-6">
            Begin Your
            <br />
            Learning Journey
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-md font-onest">
            Join thousands of students mastering their skills and achieving
            excellence in their chosen fields.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg">
            <div className="text-center">
              <div className="font-montserrat font-bold text-4xl mb-2">
                15K+
              </div>
              <div className="text-sm text-white/70 font-onest">
                Active Students
              </div>
            </div>
            <div className="text-center">
              <div className="font-montserrat font-bold text-4xl mb-2">
                200+
              </div>
              <div className="text-sm text-white/70 font-onest">Courses</div>
            </div>
            <div className="text-center">
              <div className="font-montserrat font-bold text-4xl mb-2">98%</div>
              <div className="text-sm text-white/70 font-onest">
                Success Rate
              </div>
            </div>
          </div>

          {/* Floating Cards Animation */}
          <div className="absolute bottom-12 right-12 space-y-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 transform hover:scale-105 transition-transform duration-300 border border-white/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">New Achievement!</div>
                  <div className="text-xs text-white/70">Top 10% Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F8FAFC] dark:bg-[#0D1117]">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-2xl flex items-center justify-center mr-3">
              <GraduationCap size={24} className="text-white" />
            </div>
            <h1 className="font-montserrat font-bold text-2xl text-[#0A1929] dark:text-white">
              LightForge Academy
            </h1>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="font-montserrat font-bold text-3xl text-[#0A1929] dark:text-white mb-2">
              Create Account
            </h2>
            <p className="text-[#64748B] dark:text-[#9CA3AF] font-onest">
              Fill in your details to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                Full Name
              </label>
              <div
                className={`relative transition-all duration-200 ${focusedField === "fullName" ? "transform scale-[1.01]" : ""}`}
              >
                <User
                  size={20}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "fullName" ? "text-[#0066FF]" : "text-[#94A3B8] dark:text-[#6B7280]"}`}
                />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                Email Address
              </label>
              <div
                className={`relative transition-all duration-200 ${focusedField === "email" ? "transform scale-[1.01]" : ""}`}
              >
                <Mail
                  size={20}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "email" ? "text-[#0066FF]" : "text-[#94A3B8] dark:text-[#6B7280]"}`}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
            </div>

            {/* Password & Confirm Password - Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Password */}
              <div className="relative">
                <label className="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                  Password
                </label>
                <div
                  className={`relative transition-all duration-200 ${focusedField === "password" ? "transform scale-[1.01]" : ""}`}
                >
                  <Lock
                    size={20}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "password" ? "text-[#0066FF]" : "text-[#94A3B8] dark:text-[#6B7280]"}`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-12 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] dark:text-[#6B7280] hover:text-[#0066FF] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                  Confirm
                </label>
                <div
                  className={`relative transition-all duration-200 ${focusedField === "confirmPassword" ? "transform scale-[1.01]" : ""}`}
                >
                  <Lock
                    size={20}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "confirmPassword" ? "text-[#0066FF]" : "text-[#94A3B8] dark:text-[#6B7280]"}`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Phone & Date of Birth - Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone */}
              <div className="relative">
                <label className="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                  Phone Number
                </label>
                <div
                  className={`relative transition-all duration-200 ${focusedField === "phoneNumber" ? "transform scale-[1.01]" : ""}`}
                >
                  <Phone
                    size={20}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "phoneNumber" ? "text-[#0066FF]" : "text-[#94A3B8] dark:text-[#6B7280]"}`}
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phoneNumber")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                    placeholder="+1 (555) 000-0000"
                    required
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="relative">
                <label className="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                  Date of Birth
                </label>
                <div
                  className={`relative transition-all duration-200 ${focusedField === "dateOfBirth" ? "transform scale-[1.01]" : ""}`}
                >
                  <Calendar
                    size={20}
                    className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "dateOfBirth" ? "text-[#0066FF]" : "text-[#94A3B8] dark:text-[#6B7280]"}`}
                  />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("dateOfBirth")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Gender */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                Gender
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["Male", "Female", "Other"].map((gender) => (
                  <button
                    key={gender}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender })}
                    className={`py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 font-onest ${
                      formData.gender === gender
                        ? "bg-[#0066FF] text-white shadow-lg shadow-[#0066FF]/30 transform scale-105"
                        : "bg-white dark:bg-[#1F2937] text-[#64748B] dark:text-[#9CA3AF] border-2 border-[#E2E8F0] dark:border-[#374151] hover:border-[#0066FF] hover:text-[#0066FF]"
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {/* Course */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                Course
              </label>
              <div
                className={`relative transition-all duration-200 ${focusedField === "course" ? "transform scale-[1.01]" : ""}`}
              >
                <BookOpen
                  size={20}
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === "course" ? "text-[#0066FF]" : "text-[#94A3B8] dark:text-[#6B7280]"}`}
                />
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("course")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white font-onest appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select your course</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Business Administration">
                    Business Administration
                  </option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>
            </div>

            {/* Year/Semester */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                Year/Semester
              </label>
              <div
                className={`relative transition-all duration-200 ${focusedField === "yearSemester" ? "transform scale-[1.01]" : ""}`}
              >
                <input
                  type="text"
                  name="yearSemester"
                  value={formData.yearSemester}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("yearSemester")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full px-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                  placeholder="e.g., Year 1 - Semester 1"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                Address
              </label>
              <div
                className={`relative transition-all duration-200 ${focusedField === "address" ? "transform scale-[1.01]" : ""}`}
              >
                <MapPin
                  size={20}
                  className={`absolute left-4 top-4 transition-colors ${focusedField === "address" ? "text-[#0066FF]" : "text-[#94A3B8] dark:text-[#6B7280]"}`}
                />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("address")}
                  onBlur={() => setFocusedField(null)}
                  rows="3"
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest resize-none"
                  placeholder="Enter your full address"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="w-5 h-5 mt-0.5 rounded border-2 border-[#E2E8F0] dark:border-[#374151] text-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 cursor-pointer"
                required
              />
              <label
                htmlFor="terms"
                className="ml-3 text-sm text-[#64748B] dark:text-[#9CA3AF] font-onest"
              >
                I agree to the{" "}
                <span className="text-[#0066FF] hover:underline cursor-pointer font-semibold">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-[#0066FF] hover:underline cursor-pointer font-semibold">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/40 transform hover:scale-[1.02] active:scale-[0.98] font-onest group"
            >
              <span>Create My Account</span>
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#64748B] dark:text-[#9CA3AF] font-onest">
              Already have an account?{" "}
              <span className="text-[#0066FF] hover:underline cursor-pointer font-semibold">
                Sign In
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

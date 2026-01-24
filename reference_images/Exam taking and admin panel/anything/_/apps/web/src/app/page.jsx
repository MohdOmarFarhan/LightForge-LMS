import { useState, useEffect } from "react";
import {
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Play,
  Check,
  ArrowRight,
  Menu,
  X,
  Zap,
  Globe,
  Shield,
  BarChart3,
  MessageSquare,
  Video,
} from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors duration-300">
      {/* Sticky Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-lg shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#30C4B5] to-[#006DFF] rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-white" />
              </div>
              <span className="font-montserrat font-bold text-xl text-[#001D2E] dark:text-white">
                LearnHub
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] hover:text-[#30C4B5] dark:hover:text-[#30C4B5] transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] hover:text-[#30C4B5] dark:hover:text-[#30C4B5] transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] hover:text-[#30C4B5] dark:hover:text-[#30C4B5] transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] hover:text-[#30C4B5] dark:hover:text-[#30C4B5] transition-colors"
              >
                Contact
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="font-inter font-medium text-sm text-[#30C4B5] hover:text-[#29AF9F] transition-colors">
                Sign In
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#30C4B5] to-[#006DFF] hover:from-[#29AF9F] hover:to-[#0058CC] text-white rounded-lg font-inter font-semibold text-sm transition-all duration-200 shadow-lg shadow-[#30C4B5]/30">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[#F7F9FC] dark:hover:bg-[#1E1E1E] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4">
              <a
                href="#features"
                className="block font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="block font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="block font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#contact"
                className="block font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
              >
                Contact
              </a>
              <div className="flex flex-col gap-3 pt-4">
                <button className="font-inter font-medium text-sm text-[#30C4B5] hover:text-[#29AF9F] transition-colors text-left">
                  Sign In
                </button>
                <button className="px-6 py-2.5 bg-gradient-to-r from-[#30C4B5] to-[#006DFF] text-white rounded-lg font-inter font-semibold text-sm transition-all duration-200">
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7F9FC] via-[#E4FAF1] to-[#DDF7F5] dark:from-[#0A0A0A] dark:via-[#001D2E] dark:to-[#0A1E2D]">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#30C4B5] rounded-full blur-[120px] opacity-20 dark:opacity-10"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#006DFF] rounded-full blur-[140px] opacity-20 dark:opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#30C4B5] to-[#794CFF] rounded-full blur-[180px] opacity-10 dark:opacity-5"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1E1E1E] border border-[#E3E8F4] dark:border-[#2A2A2A] rounded-full mb-6 shadow-sm">
              <Zap size={16} className="text-[#30C4B5]" />
              <span className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF]">
                Trusted by 50,000+ learners worldwide
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-poppins font-bold text-5xl md:text-7xl text-[#001D2E] dark:text-white mb-6 leading-tight">
              The Future of
              <span className="block bg-gradient-to-r from-[#30C4B5] to-[#006DFF] bg-clip-text text-transparent">
                Online Learning
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-inter text-lg md:text-xl text-[#505B6B] dark:text-[#9CA3AF] mb-10 max-w-2xl mx-auto leading-relaxed">
              Transform your educational journey with our cutting-edge learning
              platform. Access world-class courses, interactive workshops, and
              expert mentorship.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#30C4B5] to-[#006DFF] hover:from-[#29AF9F] hover:to-[#0058CC] text-white rounded-xl font-inter font-semibold text-base transition-all duration-200 shadow-xl shadow-[#30C4B5]/40 hover:shadow-2xl hover:shadow-[#30C4B5]/50 hover:-translate-y-0.5">
                Start Free Trial
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#1E1E1E] border-2 border-[#E3E8F4] dark:border-[#2A2A2A] hover:border-[#30C4B5] dark:hover:border-[#30C4B5] text-[#001D2E] dark:text-white rounded-xl font-inter font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2 hover:-translate-y-0.5">
                <Play size={20} />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-[#E3E8F4] dark:border-[#2A2A2A]">
              <div>
                <div className="font-poppins font-bold text-3xl md:text-4xl text-[#30C4B5] mb-2">
                  500+
                </div>
                <div className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF]">
                  Expert Courses
                </div>
              </div>
              <div>
                <div className="font-poppins font-bold text-3xl md:text-4xl text-[#006DFF] mb-2">
                  50K+
                </div>
                <div className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF]">
                  Active Students
                </div>
              </div>
              <div>
                <div className="font-poppins font-bold text-3xl md:text-4xl text-[#794CFF] mb-2">
                  98%
                </div>
                <div className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF]">
                  Success Rate
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 md:py-32 bg-white dark:bg-[#121212] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-[#001D2E] dark:text-white mb-4">
              Everything You Need to Excel
            </h2>
            <p className="font-inter text-lg text-[#505B6B] dark:text-[#9CA3AF]">
              Powerful features designed to accelerate your learning journey
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Video}
              title="Interactive Video Lessons"
              description="Engage with high-quality video content featuring expert instructors and real-world examples."
              color="#30C4B5"
              gradient="from-[#DDF7F5] to-[#E4FAF1]"
              darkGradient="dark:from-[#1A2F2B] dark:to-[#1A332B]"
            />
            <FeatureCard
              icon={MessageSquare}
              title="Live Q&A Sessions"
              description="Connect directly with instructors and peers through interactive live sessions and discussions."
              color="#006DFF"
              gradient="from-[#E4F3FF] to-[#EFE9FF]"
              darkGradient="dark:from-[#1A2E3D] dark:to-[#2A2440]"
            />
            <FeatureCard
              icon={Award}
              title="Verified Certificates"
              description="Earn industry-recognized certificates to showcase your achievements and advance your career."
              color="#FF983B"
              gradient="from-[#FFF1E4] to-[#FFE8D6]"
              darkGradient="dark:from-[#3D2B1A] dark:to-[#3D2415]"
            />
            <FeatureCard
              icon={BarChart3}
              title="Progress Tracking"
              description="Monitor your learning journey with detailed analytics and personalized progress reports."
              color="#794CFF"
              gradient="from-[#EFE9FF] to-[#F5EDFF]"
              darkGradient="dark:from-[#2A2440] dark:to-[#2D2148]"
            />
            <FeatureCard
              icon={Globe}
              title="Global Community"
              description="Join a worldwide network of learners and professionals to share knowledge and experiences."
              color="#17C8AD"
              gradient="from-[#DDF7F5] to-[#D6F5EC]"
              darkGradient="dark:from-[#1A2F2B] dark:to-[#1A332B]"
            />
            <FeatureCard
              icon={Shield}
              title="Lifetime Access"
              description="Get unlimited access to all course materials, updates, and resources forever."
              color="#009EF7"
              gradient="from-[#E4F3FF] to-[#D9EFFF]"
              darkGradient="dark:from-[#1A2E3D] dark:to-[#1A3544]"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-20 md:py-32 bg-[#F7F9FC] dark:bg-[#0A0A0A] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-[#001D2E] dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="font-inter text-lg text-[#505B6B] dark:text-[#9CA3AF]">
              Select the perfect plan for your learning goals
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <PricingCard
              name="Starter"
              price="29"
              description="Perfect for individual learners"
              features={[
                "Access to 100+ courses",
                "Basic progress tracking",
                "Community forum access",
                "Mobile app access",
                "Email support",
              ]}
              popular={false}
            />
            <PricingCard
              name="Professional"
              price="79"
              description="Best for serious learners"
              features={[
                "Access to 500+ courses",
                "Advanced analytics",
                "Live Q&A sessions",
                "Downloadable resources",
                "Priority support",
                "Verified certificates",
              ]}
              popular={true}
            />
            <PricingCard
              name="Enterprise"
              price="199"
              description="For teams and organizations"
              features={[
                "Unlimited course access",
                "Custom learning paths",
                "Dedicated account manager",
                "Team collaboration tools",
                "API access",
                "White-label options",
              ]}
              popular={false}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 md:py-32 bg-white dark:bg-[#121212] transition-colors duration-300"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-poppins font-bold text-4xl md:text-5xl text-[#001D2E] dark:text-white mb-4">
              Loved by Learners Worldwide
            </h2>
            <p className="font-inter text-lg text-[#505B6B] dark:text-[#9CA3AF]">
              See what our students have to say about their experience
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Sarah Johnson"
              role="UX Designer"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
              text="This platform completely transformed my career. The courses are well-structured and the instructors are world-class!"
            />
            <TestimonialCard
              name="Michael Chen"
              role="Software Engineer"
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
              text="The interactive lessons and hands-on projects helped me land my dream job. Absolutely worth every penny!"
            />
            <TestimonialCard
              name="Emily Rodriguez"
              role="Product Manager"
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
              text="I love the flexibility and quality of the content. It's like having a personal mentor available 24/7."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-[#001D2E] to-[#0A1E2D] dark:from-[#001D2E] dark:to-[#001018] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-poppins font-bold text-4xl md:text-5xl text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="font-inter text-lg text-[#9CA3AF] mb-10 max-w-2xl mx-auto">
            Join thousands of learners achieving their goals with LearnHub.
            Start your free trial today.
          </p>
          <button className="px-10 py-4 bg-gradient-to-r from-[#30C4B5] to-[#006DFF] hover:from-[#29AF9F] hover:to-[#0058CC] text-white rounded-xl font-inter font-semibold text-lg transition-all duration-200 shadow-2xl shadow-[#30C4B5]/40 hover:shadow-[#30C4B5]/60 hover:-translate-y-1 inline-flex items-center gap-2">
            Get Started Free
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="py-16 bg-[#001D2E] dark:bg-[#0A0A0A] border-t border-[#0B3144] dark:border-[#1F2937]"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#30C4B5] to-[#006DFF] rounded-lg flex items-center justify-center">
                  <BookOpen size={24} className="text-white" />
                </div>
                <span className="font-montserrat font-bold text-xl text-white">
                  LearnHub
                </span>
              </div>
              <p className="font-inter text-sm text-[#9CA3AF] leading-relaxed">
                Empowering learners worldwide with cutting-edge educational
                technology.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-montserrat font-semibold text-white mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    Certificates
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-montserrat font-semibold text-white mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-montserrat font-semibold text-white mb-4">
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-[#0B3144] dark:border-[#1F2937] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-inter text-sm text-[#9CA3AF]">
              © 2026 LearnHub. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="font-inter text-sm text-[#9CA3AF] hover:text-[#30C4B5] transition-colors"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

        html {
          scroll-behavior: smooth;
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }

        .font-poppins {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  gradient,
  darkGradient,
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative p-6 rounded-2xl border border-[#E3E8F4] dark:border-[#2A2A2A] 
        bg-gradient-to-br ${gradient} ${darkGradient}
        transition-all duration-300 cursor-pointer
        ${isHovered ? "shadow-xl -translate-y-1" : "shadow-sm"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-white dark:bg-[#262626] shadow-sm"
        style={{
          boxShadow: isHovered ? `0 8px 20px ${color}20` : "none",
          transition: "box-shadow 0.3s ease",
        }}
      >
        <Icon size={28} style={{ color }} />
      </div>

      {/* Content */}
      <h3 className="font-montserrat font-bold text-lg text-[#001D2E] dark:text-white mb-2">
        {title}
      </h3>
      <p className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function PricingCard({ name, price, description, features, popular }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        relative p-8 rounded-2xl transition-all duration-300
        ${
          popular
            ? "bg-gradient-to-br from-[#001D2E] to-[#0A1E2D] dark:from-[#1E1E1E] dark:to-[#2A2A2A] border-2 border-[#30C4B5] shadow-2xl shadow-[#30C4B5]/20"
            : "bg-white dark:bg-[#1E1E1E] border border-[#E3E8F4] dark:border-[#2A2A2A]"
        }
        ${isHovered && !popular ? "shadow-xl -translate-y-1" : ""}
        ${isHovered && popular ? "shadow-2xl shadow-[#30C4B5]/30 -translate-y-1" : ""}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="px-4 py-1 bg-gradient-to-r from-[#30C4B5] to-[#006DFF] text-white rounded-full text-xs font-inter font-semibold">
            MOST POPULAR
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3
          className={`font-montserrat font-bold text-xl mb-2 ${popular ? "text-white" : "text-[#001D2E] dark:text-white"}`}
        >
          {name}
        </h3>
        <p
          className={`font-inter text-sm ${popular ? "text-[#9CA3AF]" : "text-[#505B6B] dark:text-[#9CA3AF]"}`}
        >
          {description}
        </p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span
            className={`font-poppins font-bold text-5xl ${popular ? "text-white" : "text-[#001D2E] dark:text-white"}`}
          >
            ${price}
          </span>
          <span
            className={`font-inter text-sm ${popular ? "text-[#9CA3AF]" : "text-[#505B6B] dark:text-[#9CA3AF]"}`}
          >
            /month
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              size={20}
              className={
                popular ? "text-[#30C4B5] mt-0.5" : "text-[#30C4B5] mt-0.5"
              }
            />
            <span
              className={`font-inter text-sm ${popular ? "text-[#E5E7EB]" : "text-[#505B6B] dark:text-[#9CA3AF]"}`}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        className={`
        w-full py-3 rounded-lg font-inter font-semibold text-sm transition-all duration-200
        ${
          popular
            ? "bg-gradient-to-r from-[#30C4B5] to-[#006DFF] hover:from-[#29AF9F] hover:to-[#0058CC] text-white shadow-lg shadow-[#30C4B5]/30"
            : "bg-[#001D2E] dark:bg-white hover:bg-[#001829] dark:hover:bg-[#F7F9FC] text-white dark:text-[#001D2E]"
        }
      `}
      >
        Get Started
      </button>
    </div>
  );
}

function TestimonialCard({ name, role, image, text }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`
        p-6 rounded-2xl bg-white dark:bg-[#1E1E1E] border border-[#E3E8F4] dark:border-[#2A2A2A]
        transition-all duration-300
        ${isHovered ? "shadow-xl -translate-y-1" : "shadow-sm"}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Quote */}
      <p className="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] leading-relaxed mb-6">
        "{text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-montserrat font-semibold text-sm text-[#001D2E] dark:text-white">
            {name}
          </div>
          <div className="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF]">
            {role}
          </div>
        </div>
      </div>
    </div>
  );
}

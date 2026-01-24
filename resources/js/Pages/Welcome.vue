<script setup>
import { Head, Link } from '@inertiajs/vue3';
import {
    GraduationCap,
    BookOpen,
    Trophy,
    BarChart3,
    ArrowRight,
    CheckCircle2
} from 'lucide-vue-next';

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <Head title="Welcome" />

    <div class="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#E0F2FE] dark:from-[#0D1117] dark:via-[#0A0E14] dark:to-[#0D1929] font-inter text-[#0A1929] dark:text-white">
        <!-- Background Decorations -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#0066FF]/10 rounded-full blur-3xl opacity-50"></div>
            <div class="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00D4FF]/10 rounded-full blur-3xl opacity-50"></div>
        </div>

        <!-- Navigation -->
        <nav class="relative z-50 container mx-auto px-6 py-6 flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <div class="w-10 h-10 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap :size="24" class="text-white" />
                </div>
                <span class="font-montserrat font-bold text-xl tracking-tight">LightForge<span class="text-[#0066FF]">Academy</span></span>
            </div>

            <div v-if="canLogin" class="flex items-center space-x-4">
                <Link
                    v-if="$page.props.auth.user"
                    :href="route('dashboard')"
                    class="font-onest font-semibold text-[#0066FF] hover:text-[#0052CC] transition-colors"
                >
                    Dashboard
                </Link>

                <template v-else>
                    <Link
                        :href="route('login')"
                        class="font-onest font-semibold text-[#64748B] dark:text-[#9CA3AF] hover:text-[#0066FF] dark:hover:text-white transition-colors"
                    >
                        Log in
                    </Link>

                    <Link
                        v-if="canRegister"
                        :href="route('register')"
                        class="bg-[#0066FF] hover:bg-[#0052CC] text-white font-onest font-bold py-2.5 px-6 rounded-lg transition-all shadow-lg shadow-[#0066FF]/20 hover:shadow-[#0066FF]/40 transform hover:scale-105"
                    >
                        Get Started
                    </Link>
                </template>
            </div>
        </nav>

        <!-- Hero Section -->
        <main class="relative z-10 container mx-auto px-6 pt-10 pb-20 md:pt-20 md:pb-32">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <!-- Text Content -->
                <div class="text-center md:text-left space-y-8">
                    <div class="inline-flex items-center space-x-2 bg-[#E3F2FD] dark:bg-[#0066FF]/10 border border-[#0066FF]/20 rounded-full px-4 py-1.5 mb-4">
                        <span class="flex h-2 w-2 relative">
                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0066FF] opacity-75"></span>
                            <span class="relative inline-flex rounded-full h-2 w-2 bg-[#0066FF]"></span>
                        </span>
                        <span class="font-onest text-xs font-bold text-[#0066FF] uppercase tracking-wide">Admissions Open 2026</span>
                    </div>

                    <h1 class="font-montserrat font-bold text-5xl md:text-6xl leading-tight">
                        Master Your <br/>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#0066FF] to-[#00D4FF]">Future Today</span>
                    </h1>
                    
                    <p class="font-onest text-lg md:text-xl text-[#64748B] dark:text-[#9CA3AF] max-w-lg mx-auto md:mx-0 leading-relaxed">
                        The ultimate learning management system designed to track your performance, simulate exams, and help you excel.
                    </p>

                    <div class="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
                        <Link
                            v-if="!$page.props.auth.user" 
                            :href="route('register')"
                            class="w-full sm:w-auto bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl shadow-[#0066FF]/30 hover:shadow-2xl hover:shadow-[#0066FF]/40 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                        >
                            <span>Start Learning</span>
                            <ArrowRight :size="20" />
                        </Link>
                        <Link
                             v-else
                             :href="route('dashboard')"
                            class="w-full sm:w-auto bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-xl shadow-[#0066FF]/30 hover:shadow-2xl hover:shadow-[#0066FF]/40 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
                        >
                             <span>Go to Dashboard</span>
                             <ArrowRight :size="20" />
                        </Link>

                        <button class="w-full sm:w-auto bg-white dark:bg-[#1E1E1E] border border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#0066FF] text-[#0A1929] dark:text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1">
                            Learn More
                        </button>
                    </div>

                    <div class="pt-8 flex items-center justify-center md:justify-start space-x-8 text-[#64748B] dark:text-[#9CA3AF]">
                        <div class="flex items-center space-x-2">
                            <CheckCircle2 :size="18" class="text-[#10B981]" />
                            <span class="font-onest text-sm">Real-time Results</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <CheckCircle2 :size="18" class="text-[#10B981]" />
                            <span class="font-onest text-sm">Expert Content</span>
                        </div>
                    </div>
                </div>

                <!-- Visual Content -->
                <div class="relative mt-12 md:mt-0">
                    <!-- Main Card -->
                    <div class="relative z-20 bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-2xl p-6 border border-[#E2E8F0] dark:border-[#2A2A2A] transform rotate-3 hover:rotate-0 transition-all duration-500">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h3 class="font-montserrat font-bold text-lg">Performance Overview</h3>
                                <p class="text-xs text-[#64748B]">Last 30 Days</p>
                            </div>
                            <div class="bg-[#E3F2FD] dark:bg-[#0066FF]/10 p-2 rounded-lg">
                                <BarChart3 :size="20" class="text-[#0066FF]" />
                            </div>
                        </div>
                        
                        <!-- Fake Chart Bars -->
                        <div class="flex items-end justify-between h-40 space-x-2 mb-4">
                            <div class="w-full bg-[#F1F5F9] dark:bg-[#2A2A2A] rounded-t-lg relative group">
                                <div class="absolute bottom-0 w-full bg-[#0066FF] rounded-t-lg h-[40%] transition-all duration-500 group-hover:h-[45%]"></div>
                            </div>
                            <div class="w-full bg-[#F1F5F9] dark:bg-[#2A2A2A] rounded-t-lg relative group">
                                <div class="absolute bottom-0 w-full bg-[#0066FF] rounded-t-lg h-[70%] opacity-80 transition-all duration-500 group-hover:h-[75%]"></div>
                            </div>
                            <div class="w-full bg-[#F1F5F9] dark:bg-[#2A2A2A] rounded-t-lg relative group">
                                <div class="absolute bottom-0 w-full bg-[#0066FF] rounded-t-lg h-[55%] opacity-60 transition-all duration-500 group-hover:h-[60%]"></div>
                            </div>
                            <div class="w-full bg-[#F1F5F9] dark:bg-[#2A2A2A] rounded-t-lg relative group">
                                <div class="absolute bottom-0 w-full bg-[#0066FF] rounded-t-lg h-[85%] transition-all duration-500 group-hover:h-[90%]"></div>
                            </div>
                            <div class="w-full bg-[#F1F5F9] dark:bg-[#2A2A2A] rounded-t-lg relative group">
                                <div class="absolute bottom-0 w-full bg-[#0066FF] rounded-t-lg h-[65%] opacity-70 transition-all duration-500 group-hover:h-[70%]"></div>
                            </div>
                        </div>
                        
                        <div class="flex items-center justify-between pt-4 border-t border-[#E2E8F0] dark:border-[#2A2A2A]">
                            <div class="flex items-center space-x-2">
                                <div class="w-2 h-2 rounded-full bg-[#10B981]"></div>
                                <span class="text-xs font-semibold">Improved by 12%</span>
                            </div>
                            <span class="text-xs text-[#64748B]">Updated just now</span>
                        </div>
                    </div>

                    <!-- Floating Card 1 -->
                    <div class="absolute -top-10 -right-10 z-10 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl p-4 border border-[#E2E8F0] dark:border-[#2A2A2A] animate-bounce" style="animation-duration: 3s">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
                                <Trophy :size="20" class="text-[#F59E0B]" />
                            </div>
                            <div>
                                <p class="font-bold text-sm">Top 5%</p>
                                <p class="text-[10px] text-[#64748B]">Class Ranking</p>
                            </div>
                        </div>
                    </div>

                    <!-- Floating Card 2 -->
                    <div class="absolute -bottom-5 -left-5 z-30 bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl p-4 border border-[#E2E8F0] dark:border-[#2A2A2A] animate-pulse" style="animation-duration: 4s">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-[#10B981]/10 rounded-full flex items-center justify-center">
                                <BookOpen :size="20" class="text-[#10B981]" />
                            </div>
                            <div>
                                <p class="font-bold text-sm">Physics 101</p>
                                <p class="text-[10px] text-[#64748B]">Next Exam: Tomorrow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Grid -->
            <div class="mt-24 grid md:grid-cols-3 gap-8">
                <div class="bg-white/50 dark:bg-[#1E1E1E]/50 backdrop-blur-sm p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#0066FF]/50 transition-all duration-300 group">
                    <div class="w-12 h-12 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <BookOpen :size="24" class="text-[#0066FF]" />
                    </div>
                    <h3 class="font-montserrat font-bold text-xl mb-3">Comprehensive Exams</h3>
                    <p class="font-onest text-[#64748B] dark:text-[#9CA3AF] text-sm leading-relaxed">
                        Access a vast bank of questions designed to challenge and prepare you for your real exams.
                    </p>
                </div>

                <div class="bg-white/50 dark:bg-[#1E1E1E]/50 backdrop-blur-sm p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#0066FF]/50 transition-all duration-300 group">
                    <div class="w-12 h-12 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <BarChart3 :size="24" class="text-[#0066FF]" />
                    </div>
                    <h3 class="font-montserrat font-bold text-xl mb-3">Advanced Analytics</h3>
                    <p class="font-onest text-[#64748B] dark:text-[#9CA3AF] text-sm leading-relaxed">
                        Track your progress with detailed analytics and identify your strengths and weaknesses.
                    </p>
                </div>

                <div class="bg-white/50 dark:bg-[#1E1E1E]/50 backdrop-blur-sm p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#2A2A2A] hover:border-[#0066FF]/50 transition-all duration-300 group">
                    <div class="w-12 h-12 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Trophy :size="24" class="text-[#0066FF]" />
                    </div>
                    <h3 class="font-montserrat font-bold text-xl mb-3">Leaderboard</h3>
                    <p class="font-onest text-[#64748B] dark:text-[#9CA3AF] text-sm leading-relaxed">
                        Compete with your peers and see where you stand on the global leaderboard.
                    </p>
                </div>
            </div>
        </main>

        <footer class="py-10 text-center border-t border-[#E2E8F0] dark:border-[#2A2A2A] mt-10">
            <p class="font-onest text-sm text-[#64748B] dark:text-[#9CA3AF]">
                &copy; {{ new Date().getFullYear() }} LightForge Academy. All rights reserved.
            </p>
        </footer>
    </div>
</template>

<style scoped>
/* No extra styles needed, using Tailwind */
</style>

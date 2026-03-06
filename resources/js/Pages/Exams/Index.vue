<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import {
    Calendar,
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    ChevronRight,
    Filter,
} from 'lucide-vue-next';
import dayjs from 'dayjs';

const props = defineProps({
    exams: Array,
});

const activeTab = ref('all');

const filteredExams = computed(() => {
    if (activeTab.value === 'all') return props.exams;
    if (activeTab.value === 'upcoming') {
        return props.exams.filter(exam => !exam.user_attempt);
    }
    if (activeTab.value === 'completed') {
        return props.exams.filter(exam => exam.user_attempt && (exam.user_attempt.status === 'submitted' || exam.user_attempt.status === 'graded'));
    }
    return props.exams;
});

const getTabCount = (status) => {
    if (status === 'all') return props.exams.length;
    if (status === 'upcoming') {
        return props.exams.filter(exam => !exam.user_attempt).length;
    }
    if (status === 'completed') {
        return props.exams.filter(exam => exam.user_attempt && (exam.user_attempt.status === 'submitted' || exam.user_attempt.status === 'graded')).length;
    }
    return 0;
};

const getStatusConfig = (exam) => {
    if (!exam.user_attempt) {
        return {
            bgColor: "bg-[#E3F2FD] dark:bg-[#1A2744]",
            textColor: "text-[#0066FF] dark:text-[#2196F3]",
            icon: AlertCircle,
            label: "Upcoming",
        };
    } else if (exam.user_attempt.status === 'in_progress') {
        return {
            bgColor: "bg-[#FFF3E0] dark:bg-[#3D2B1A]",
            textColor: "text-[#F59E0B] dark:text-[#FBBF24]",
            icon: Clock,
            label: "In Progress",
        };
    } else {
        return {
            bgColor: "bg-[#E8F5E9] dark:bg-[#1A3A2B]",
            textColor: "text-[#10B981] dark:text-[#34D399]",
            icon: CheckCircle,
            label: "Completed",
        };
    }
};

const formatDate = (date) => {
    return dayjs(date).format('MMM D, YYYY');
};

const formatTime = (start, end) => {
    return `${dayjs(start).format('h:mm A')} - ${dayjs(end).format('h:mm A')}`;
};

const startExam = (examId) => {
    useForm({}).post(route('exams.start', examId));
};
</script>

<template>
    <Head title="Exams" />

    <AuthenticatedLayout>
        <div class="w-full">
            <!-- Page Header -->
            <div class="mb-6">
                <h1 class="font-poppins font-bold text-3xl md:text-4xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-2 transition-colors duration-200">
                    My Exams
                </h1>
                <p class="font-inter text-base text-[#64748B] dark:text-[#9CA3AF] transition-colors duration-200">
                    Browse and manage all your examinations
                </p>
            </div>

            <!-- Stats Overview -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div class="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-5 transition-colors duration-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="font-poppins font-bold text-2xl text-[#0066FF] dark:text-[#2196F3] mb-1">
                                {{ getTabCount("upcoming") }}
                            </div>
                            <div class="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                Upcoming Exams
                            </div>
                        </div>
                        <div class="w-12 h-12 bg-[#E3F2FD] dark:bg-[#1A2744] rounded-lg flex items-center justify-center">
                            <AlertCircle :size="24" class="text-[#0066FF] dark:text-[#2196F3]" />
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-5 transition-colors duration-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="font-poppins font-bold text-2xl text-[#10B981] dark:text-[#34D399] mb-1">
                                {{ getTabCount("completed") }}
                            </div>
                            <div class="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                Completed Exams
                            </div>
                        </div>
                        <div class="w-12 h-12 bg-[#E8F5E9] dark:bg-[#1A3A2B] rounded-lg flex items-center justify-center">
                            <CheckCircle :size="24" class="text-[#10B981] dark:text-[#34D399]" />
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-5 transition-colors duration-200">
                    <div class="flex items-center justify-between">
                        <div>
                            <div class="font-poppins font-bold text-2xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-1">
                                {{ getTabCount("all") }}
                            </div>
                            <div class="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                Total Exams
                            </div>
                        </div>
                        <div class="w-12 h-12 bg-[#F7F9FC] dark:bg-[#262626] rounded-lg flex items-center justify-center">
                            <Filter :size="24" class="text-[#64748B] dark:text-[#9CA3AF]" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Filter Tabs -->
            <div class="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-2 mb-6 transition-colors duration-200">
                <div class="flex flex-wrap gap-2">
                    <button
                        @click="activeTab = 'all'"
                        :class="[
                            'px-6 py-2.5 rounded-lg font-inter font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40',
                            activeTab === 'all'
                                ? 'bg-[#0066FF] text-white'
                                : 'bg-transparent text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]'
                        ]"
                    >
                        All Exams ({{ getTabCount("all") }})
                    </button>
                    <button
                        @click="activeTab = 'upcoming'"
                        :class="[
                            'px-6 py-2.5 rounded-lg font-inter font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40',
                            activeTab === 'upcoming'
                                ? 'bg-[#0066FF] text-white'
                                : 'bg-transparent text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]'
                        ]"
                    >
                        Upcoming ({{ getTabCount("upcoming") }})
                    </button>
                    <button
                        @click="activeTab = 'completed'"
                        :class="[
                            'px-6 py-2.5 rounded-lg font-inter font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40',
                            activeTab === 'completed'
                                ? 'bg-[#0066FF] text-white'
                                : 'bg-transparent text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]'
                        ]"
                    >
                        Completed ({{ getTabCount("completed") }})
                    </button>
                </div>
            </div>

            <!-- Exams List -->
            <div class="space-y-4">
                <div v-if="filteredExams.length > 0" v-for="exam in filteredExams" :key="exam.id">
                    <div class="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 transition-all duration-200 ease-out hover:shadow-md dark:hover:shadow-lg hover:-translate-y-0.5">
                        <!-- Header Section -->
                        <div class="flex items-start justify-between mb-4">
                            <div class="flex-1">
                                <!-- Subject Badge -->
                                <div class="inline-flex items-center px-3 py-1 rounded-full bg-[#E3F2FD] dark:bg-[#1A2744] mb-3">
                                    <span class="font-inter text-xs font-medium text-[#0066FF] dark:text-[#2196F3] transition-colors duration-200">
                                        {{ exam.subject?.name || 'Mixed' }}
                                    </span>
                                </div>

                                <!-- Exam Title -->
                                <h3 class="font-montserrat font-bold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-2 leading-tight transition-colors duration-200">
                                    {{ exam.title }}
                                </h3>

                                <!-- Date and Time Info -->
                                <div class="flex flex-wrap items-center gap-4 text-sm text-[#6D7A8B] dark:text-[#9CA3AF] transition-colors duration-200">
                                    <div class="flex items-center gap-1.5">
                                        <Calendar :size="16" class="text-[#6D7A8B] dark:text-[#9CA3AF]" />
                                        <span class="font-inter">{{ formatDate(exam.start_time) }}</span>
                                    </div>
                                    <div class="flex items-center gap-1.5">
                                        <Clock :size="16" class="text-[#6D7A8B] dark:text-[#9CA3AF]" />
                                        <span class="font-inter">{{ formatTime(exam.start_time, exam.end_time) }}</span>
                                    </div>
                                    <div class="flex items-center gap-1.5">
                                        <span class="font-inter font-medium">
                                            Duration: {{ exam.duration_minutes }} min
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <!-- Status Badge -->
                            <div :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg', getStatusConfig(exam).bgColor]">
                                <component :is="getStatusConfig(exam).icon" :size="16" :class="getStatusConfig(exam).textColor" />
                                <span :class="['font-inter text-xs font-medium', getStatusConfig(exam).textColor]">
                                    {{ getStatusConfig(exam).label }}
                                </span>
                            </div>
                        </div>

                        <!-- Divider -->
                        <div class="w-full h-px bg-[#E7ECF3] dark:bg-[#2A2A2A] my-4"></div>

                        <!-- Question Breakdown Section -->
                        <!-- Simplified for now as question breakdown might not be available on list view directly -->
                        <div class="mb-5">
                             <div class="flex items-center gap-4 text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                <span>Total Marks: {{ exam.total_marks }}</span>
                             </div>
                        </div>

                        <!-- Footer Section -->
                        <div class="flex items-center justify-between flex-wrap gap-3">
                            <!-- Score or Preparation Status -->
                            <div class="flex items-center gap-2">
                                <div v-if="exam.user_attempt && exam.user_attempt.status === 'graded'" class="flex items-center gap-2">
                                    <span class="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                        Score:
                                    </span>
                                    <span class="font-poppins font-bold text-lg text-[#10B981] dark:text-[#34D399]">
                                        {{ exam.user_attempt.total_score }}/{{ exam.total_marks }}
                                    </span>
                                </div>
                                <div v-else-if="exam.user_attempt && exam.user_attempt.status === 'submitted'" class="text-sm text-[#F59E0B]">
                                    Pending Grading
                                </div>
                            </div>

                            <!-- Action Button -->
                            <button
                                v-if="!exam.user_attempt"
                                @click="startExam(exam.id)"
                                class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0047B3] text-white font-inter font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-50"
                            >
                                Start Exam
                                <ChevronRight :size="16" />
                            </button>
                            <Link
                                v-else-if="exam.user_attempt.status === 'in_progress'"
                                :href="route('exams.take', exam.id)"
                                class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#F59E0B] hover:bg-[#D97706] text-white font-inter font-semibold text-sm transition-colors duration-200"
                            >
                                Resume Exam
                                <ChevronRight :size="16" />
                            </Link>
                            <Link
                                v-else
                                :href="route('exams.session', exam.id)"
                                class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1F2937] hover:bg-[#374151] text-white font-inter font-semibold text-sm transition-colors duration-200"
                            >
                                View Details
                                <ChevronRight :size="16" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div v-else class="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-12 text-center transition-colors duration-200">
                    <div class="w-16 h-16 bg-[#F7F9FC] dark:bg-[#262626] rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle :size="32" class="text-[#64748B] dark:text-[#9CA3AF]" />
                    </div>
                    <h3 class="font-montserrat font-semibold text-lg text-[#04111C] dark:text-[#E5E7EB] mb-2">
                        No exams found
                    </h3>
                    <p class="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                        There are no exams in this category yet.
                    </p>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

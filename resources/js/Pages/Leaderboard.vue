<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import {
    Trophy,
    Medal,
    Crown,
    TrendingUp,
    TrendingDown,
    ArrowUpDown,
} from 'lucide-vue-next';

const props = defineProps({
    students: {
        type: Array,
        default: () => [],
    },
});

const sortBy = ref("rank");
const sortDirection = ref("asc");

const sortedStudents = computed(() => {
    const students = [...props.students];

    students.sort((a, b) => {
        let comparison = 0;

        switch (sortBy.value) {
            case "rank":
                comparison = b.avgMarks - a.avgMarks; // Higher avg = better rank
                break;
            case "id":
                comparison = a.id.localeCompare(b.id);
                break;
            case "name":
                comparison = a.name.localeCompare(b.name);
                break;
            case "totalMarks":
                comparison = a.totalMarks - b.totalMarks;
                break;
            case "avgMarks":
                comparison = a.avgMarks - b.avgMarks;
                break;
            case "exams":
                comparison = a.exams - b.exams;
                break;
            default:
                comparison = 0;
        }

        return sortDirection.value === "asc" ? comparison : -comparison;
    });

    return students;
});

const handleSort = (field) => {
    if (sortBy.value === field) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
        sortBy.value = field;
        sortDirection.value = field === "rank" ? "asc" : "asc";
    }
};

const getRankByAverage = (student) => {
    const ranked = [...props.students].sort((a, b) => b.avgMarks - a.avgMarks);
    return ranked.findIndex((s) => s.id === student.id) + 1;
};

const topThree = computed(() => {
    return [...props.students]
        .sort((a, b) => b.avgMarks - a.avgMarks)
        .slice(0, 3);
});
</script>

<template>
    <Head title="Leaderboard" />

    <AuthenticatedLayout>
        <div class="space-y-6">
            <!-- Page Title -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="font-montserrat font-bold text-2xl md:text-3xl text-[#0A1929] dark:text-white">
                        Leaderboard
                    </h1>
                    <p class="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF] mt-1">
                        See how you rank among your peers
                    </p>
                </div>
                <Trophy class="text-[#F59E0B] dark:text-[#FBBF24]" :size="32" />
            </div>

            <!-- Top 3 Podium -->
            <div v-if="students.length > 0" class="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-sm border border-[#E9EDF3] dark:border-[#2A2A2A]">
                <h2 class="font-montserrat font-semibold text-lg text-[#0A1929] dark:text-white mb-6">
                    Top Performers
                </h2>

                <div class="flex items-end justify-center gap-4 md:gap-8">
                    <!-- 2nd Place -->
                    <div v-if="topThree[1]" class="flex flex-col items-center flex-1 max-w-[140px]">
                        <div class="relative mb-3">
                            <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#9CA3AF] to-[#6B7280] flex items-center justify-center text-white font-montserrat font-bold text-lg md:text-xl shadow-lg">
                                {{ topThree[1].name.split(" ").map((n) => n[0]).join("").slice(0, 2) }}
                            </div>
                            <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-[#9CA3AF] dark:bg-[#6B7280] rounded-full flex items-center justify-center shadow-md">
                                <Medal :size="18" class="text-white" />
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-[#F3F4F6] to-[#E5E7EB] dark:from-[#374151] dark:to-[#4B5563] rounded-xl p-4 w-full text-center">
                            <div class="text-3xl font-bold text-[#6B7280] dark:text-[#9CA3AF] mb-1">
                                2
                            </div>
                            <h3 class="font-onest font-semibold text-sm text-[#0A1929] dark:text-white mb-1 truncate">
                                {{ topThree[1].name }}
                            </h3>
                            <p class="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF]">
                                {{ topThree[1].avgMarks }} avg
                            </p>
                        </div>
                    </div>

                    <!-- 1st Place -->
                    <div v-if="topThree[0]" class="flex flex-col items-center flex-1 max-w-[160px] -mt-6">
                        <div class="relative mb-3">
                            <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white font-montserrat font-bold text-xl md:text-2xl shadow-xl ring-4 ring-[#FEF3C7] dark:ring-[#92400E]">
                                {{ topThree[0].name.split(" ").map((n) => n[0]).join("").slice(0, 2) }}
                            </div>
                            <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-[#F59E0B] dark:bg-[#D97706] rounded-full flex items-center justify-center shadow-lg">
                                <Crown :size="22" class="text-white" />
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] dark:from-[#92400E] dark:to-[#B45309] rounded-xl p-5 w-full text-center shadow-md">
                            <div class="text-4xl font-bold text-[#D97706] dark:text-[#FDE68A] mb-1">
                                1
                            </div>
                            <h3 class="font-onest font-semibold text-sm text-[#0A1929] dark:text-white mb-1 truncate">
                                {{ topThree[0].name }}
                            </h3>
                            <p class="font-inter text-xs text-[#78350F] dark:text-[#FEF3C7]">
                                {{ topThree[0].avgMarks }} avg
                            </p>
                        </div>
                    </div>

                    <!-- 3rd Place -->
                    <div v-if="topThree[2]" class="flex flex-col items-center flex-1 max-w-[140px]">
                        <div class="relative mb-3">
                            <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#CD7F32] to-[#8B5A2B] flex items-center justify-center text-white font-montserrat font-bold text-lg md:text-xl shadow-lg">
                                {{ topThree[2].name.split(" ").map((n) => n[0]).join("").slice(0, 2) }}
                            </div>
                            <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-[#CD7F32] dark:bg-[#8B5A2B] rounded-full flex items-center justify-center shadow-md">
                                <Medal :size="18" class="text-white" />
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] dark:from-[#78350F] dark:to-[#92400E] rounded-xl p-4 w-full text-center">
                            <div class="text-3xl font-bold text-[#8B5A2B] dark:text-[#FDE68A] mb-1">
                                3
                            </div>
                            <h3 class="font-onest font-semibold text-sm text-[#0A1929] dark:text-white mb-1 truncate">
                                {{ topThree[2].name }}
                            </h3>
                            <p class="font-inter text-xs text-[#505B6B] dark:text-[#FEF3C7]">
                                {{ topThree[2].avgMarks }} avg
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="bg-white dark:bg-[#1E1E1E] rounded-2xl p-6 shadow-sm border border-[#E9EDF3] dark:border-[#2A2A2A] text-center">
                <p class="text-[#6D7A8B] dark:text-[#9CA3AF]">Not enough data for leaderboard yet.</p>
            </div>

            <!-- Sort Controls -->
            <div class="bg-white dark:bg-[#1E1E1E] rounded-xl p-4 shadow-sm border border-[#E9EDF3] dark:border-[#2A2A2A]">
                <div class="flex flex-wrap items-center gap-2">
                    <span class="font-onest text-sm text-[#505B6B] dark:text-[#9CA3AF] mr-2">
                        Sort by:
                    </span>
                    <button v-for="field in ['rank', 'name', 'id', 'totalMarks', 'avgMarks']" :key="field"
                        @click="handleSort(field)"
                        :class="[
                            'px-4 py-2 rounded-lg font-inter text-sm font-medium transition-colors flex items-center space-x-1 group',
                            sortBy === field
                                ? 'bg-[#0066FF] text-white'
                                : 'bg-[#F3F4F6] dark:bg-[#262626] text-[#505B6B] dark:text-[#9CA3AF] hover:bg-[#E5E7EB] dark:hover:bg-[#374151]'
                        ]"
                    >
                        <span class="capitalize">{{ field === 'id' ? 'Student ID' : field.replace(/([A-Z])/g, ' $1').trim() }}</span>
                        <ArrowUpDown
                            :size="14"
                            :class="[
                                sortBy === field
                                    ? 'text-white'
                                    : 'text-[#8B93A3] dark:text-[#6B7280] opacity-0 group-hover:opacity-100'
                            ]"
                        />
                    </button>
                </div>
            </div>

            <!-- Leaderboard Table -->
            <div class="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-sm border border-[#E9EDF3] dark:border-[#2A2A2A] overflow-hidden">
                <!-- Desktop Table -->
                <div class="hidden md:block overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-[#F7F9FC] dark:bg-[#262626] border-b border-[#E9EDF3] dark:border-[#2A2A2A]">
                            <tr>
                                <th class="px-6 py-4 text-left" v-for="header in [
                                    { key: 'rank', label: 'Rank' },
                                    { key: 'name', label: 'Student Name' },
                                    { key: 'id', label: 'Student ID' },
                                    { key: 'exams', label: 'Exams' },
                                    { key: 'totalMarks', label: 'Total Marks' },
                                    { key: 'avgMarks', label: 'Avg Marks' }
                                ]" :key="header.key">
                                    <button @click="handleSort(header.key)" class="flex items-center space-x-1 hover:text-[#0066FF] dark:hover:text-[#3B82F6] transition-colors focus:outline-none group">
                                        <span class="font-onest font-semibold text-xs uppercase text-[#505B6B] dark:text-[#9CA3AF]">
                                            {{ header.label }}
                                        </span>
                                        <ArrowUpDown
                                            :size="14"
                                            :class="[
                                                sortBy === header.key
                                                    ? 'text-[#0066FF] dark:text-[#3B82F6]'
                                                    : 'text-[#8B93A3] dark:text-[#6B7280] opacity-0 group-hover:opacity-100'
                                            ]"
                                        />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="sortedStudents.length === 0">
                                <td colspan="6" class="px-6 py-8 text-center text-[#6D7A8B] dark:text-[#9CA3AF]">
                                    No students found.
                                </td>
                            </tr>
                            <tr v-for="student in sortedStudents" :key="student.id"
                                :class="[
                                    'border-b border-[#E9EDF3] dark:border-[#2A2A2A] transition-colors',
                                    student.isCurrentUser
                                        ? 'bg-[#E3F2FD] dark:bg-[#0066FF] dark:bg-opacity-10'
                                        : 'hover:bg-[#F7F9FC] dark:hover:bg-[#262626]'
                                ]"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <Crown v-if="getRankByAverage(student) === 1" :size="18" class="text-[#F59E0B]" />
                                        <Medal v-else-if="getRankByAverage(student) === 2" :size="18" class="text-[#9CA3AF]" />
                                        <Medal v-else-if="getRankByAverage(student) === 3" :size="18" class="text-[#CD7F32]" />
                                        <span class="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                                            #{{ getRankByAverage(student) }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white font-montserrat font-semibold text-xs">
                                            {{ student.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }}
                                        </div>
                                        <div>
                                            <div class="font-onest font-medium text-sm text-[#0A1929] dark:text-white">
                                                {{ student.name }}
                                                <span v-if="student.isCurrentUser" class="ml-2 text-xs text-[#0066FF] dark:text-[#3B82F6]">
                                                    (You)
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="font-inter text-sm text-[#505B6B] dark:text-[#9CA3AF]">
                                        {{ student.id }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="font-inter text-sm text-[#0A1929] dark:text-white">
                                        {{ student.exams }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                                        {{ student.totalMarks }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <span class="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                                            {{ student.avgMarks }}
                                        </span>
                                        <TrendingUp v-if="student.avgMarks >= 90" :size="16" class="text-[#10B981]" />
                                        <TrendingDown v-if="student.avgMarks < 80" :size="16" class="text-[#EF4444]" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Mobile Cards -->
                <div class="md:hidden divide-y divide-[#E9EDF3] dark:divide-[#2A2A2A]">
                    <div v-if="sortedStudents.length === 0" class="p-6 text-center text-[#6D7A8B] dark:text-[#9CA3AF]">
                        No students found.
                    </div>
                    <div v-for="student in sortedStudents" :key="student.id"
                        :class="[
                            'p-4',
                            student.isCurrentUser
                                ? 'bg-[#E3F2FD] dark:bg-[#0066FF] dark:bg-opacity-10'
                                : ''
                        ]"
                    >
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex items-center space-x-3">
                                <div class="flex flex-col items-center">
                                    <Crown v-if="getRankByAverage(student) === 1" :size="20" class="text-[#F59E0B] mb-1" />
                                    <Medal v-else-if="getRankByAverage(student) === 2" :size="20" class="text-[#9CA3AF] mb-1" />
                                    <Medal v-else-if="getRankByAverage(student) === 3" :size="20" class="text-[#CD7F32] mb-1" />
                                    <span class="font-inter font-bold text-lg text-[#0A1929] dark:text-white">
                                        #{{ getRankByAverage(student) }}
                                    </span>
                                </div>
                                <div class="w-11 h-11 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white font-montserrat font-semibold text-sm">
                                    {{ student.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }}
                                </div>
                                <div>
                                    <h3 class="font-onest font-semibold text-sm text-[#0A1929] dark:text-white">
                                        {{ student.name }}
                                        <span v-if="student.isCurrentUser" class="ml-1 text-xs text-[#0066FF] dark:text-[#3B82F6]">
                                            (You)
                                        </span>
                                    </h3>
                                    <p class="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF]">
                                        ID: {{ student.id }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-3 gap-3">
                            <div class="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-3">
                                <p class="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF] mb-1">
                                    Exams
                                </p>
                                <p class="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                                    {{ student.exams }}
                                </p>
                            </div>
                            <div class="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-3">
                                <p class="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF] mb-1">
                                    Total
                                </p>
                                <p class="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                                    {{ student.totalMarks }}
                                </p>
                            </div>
                            <div class="bg-[#F7F9FC] dark:bg-[#262626] rounded-lg p-3">
                                <p class="font-inter text-xs text-[#505B6B] dark:text-[#9CA3AF] mb-1">
                                    Average
                                </p>
                                <div class="flex items-center space-x-1">
                                    <p class="font-inter font-semibold text-sm text-[#0A1929] dark:text-white">
                                        {{ student.avgMarks }}
                                    </p>
                                    <TrendingUp v-if="student.avgMarks >= 90" :size="14" class="text-[#10B981]" />
                                    <TrendingDown v-if="student.avgMarks < 80" :size="14" class="text-[#EF4444]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

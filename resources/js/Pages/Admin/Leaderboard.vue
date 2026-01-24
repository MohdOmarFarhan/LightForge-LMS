<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, router } from '@inertiajs/vue3';
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
    filters: {
        type: Object,
        default: () => ({ class: '12' }),
    },
});

const sortBy = ref("rank");
const sortDirection = ref("asc");

// Filter Handling
const handleClassChange = (className) => {
    router.get(route('admin.leaderboard'), { class: className }, {
        preserveState: true,
        preserveScroll: true,
    });
};

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

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Page Title -->
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="font-montserrat font-bold text-2xl md:text-3xl text-white">
                        Global Leaderboard
                    </h1>
                    <p class="font-inter text-sm text-[#9CA3AF] mt-1">
                        View rankings across all students
                    </p>
                </div>
                <Trophy class="text-[#F59E0B]" :size="32" />
            </div>

            <!-- Class Toggle -->
            <div class="flex justify-center mb-4">
                <div class="bg-[#161B22] p-1 rounded-lg border border-[#1F2937] inline-flex">
                    <button
                        @click="handleClassChange('11')"
                        :class="[
                            'px-4 py-2 rounded-md text-sm font-medium transition-colors font-onest',
                            filters.class === '11'
                                ? 'bg-[#0D6EFD] text-white shadow-sm'
                                : 'text-[#9CA3AF] hover:text-white hover:bg-[#1F2937]'
                        ]"
                    >
                        Class 11
                    </button>
                    <button
                        @click="handleClassChange('12')"
                        :class="[
                            'px-4 py-2 rounded-md text-sm font-medium transition-colors font-onest',
                            filters.class === '12'
                                ? 'bg-[#0D6EFD] text-white shadow-sm'
                                : 'text-[#9CA3AF] hover:text-white hover:bg-[#1F2937]'
                        ]"
                    >
                        Class 12
                    </button>
                </div>
            </div>

            <!-- Top 3 Podium -->
            <div v-if="students.length > 0" class="bg-[#161B22] rounded-2xl p-6 shadow-sm border border-[#1F2937]">
                <h2 class="font-montserrat font-semibold text-lg text-white mb-6">
                    Top Performers
                </h2>

                <div class="flex items-end justify-center gap-4 md:gap-8">
                    <!-- 2nd Place -->
                    <div v-if="topThree[1]" class="flex flex-col items-center flex-1 max-w-[140px]">
                        <div class="relative mb-3">
                            <div class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#9CA3AF] to-[#6B7280] flex items-center justify-center text-white font-montserrat font-bold text-lg md:text-xl shadow-lg">
                                {{ topThree[1].name.split(" ").map((n) => n[0]).join("").slice(0, 2) }}
                            </div>
                            <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-[#9CA3AF] rounded-full flex items-center justify-center shadow-md">
                                <Medal :size="18" class="text-white" />
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-[#1F2937] to-[#374151] rounded-xl p-4 w-full text-center">
                            <div class="text-3xl font-bold text-[#9CA3AF] mb-1">
                                2
                            </div>
                            <h3 class="font-onest font-semibold text-sm text-white mb-1 truncate">
                                {{ topThree[1].name }}
                            </h3>
                            <p class="font-inter text-xs text-[#9CA3AF]">
                                {{ topThree[1].avgMarks }} avg
                            </p>
                        </div>
                    </div>

                    <!-- 1st Place -->
                    <div v-if="topThree[0]" class="flex flex-col items-center flex-1 max-w-[160px] -mt-6">
                        <div class="relative mb-3">
                            <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white font-montserrat font-bold text-xl md:text-2xl shadow-xl ring-4 ring-[#92400E]">
                                {{ topThree[0].name.split(" ").map((n) => n[0]).join("").slice(0, 2) }}
                            </div>
                            <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-[#F59E0B] rounded-full flex items-center justify-center shadow-lg">
                                <Crown :size="22" class="text-white" />
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-[#92400E] to-[#B45309] rounded-xl p-5 w-full text-center shadow-md">
                            <div class="text-4xl font-bold text-[#FDE68A] mb-1">
                                1
                            </div>
                            <h3 class="font-onest font-semibold text-sm text-white mb-1 truncate">
                                {{ topThree[0].name }}
                            </h3>
                            <p class="font-inter text-xs text-[#FEF3C7]">
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
                            <div class="absolute -bottom-2 -right-2 w-8 h-8 bg-[#CD7F32] rounded-full flex items-center justify-center shadow-md">
                                <Medal :size="18" class="text-white" />
                            </div>
                        </div>
                        <div class="bg-gradient-to-br from-[#1F2937] to-[#374151] rounded-xl p-4 w-full text-center">
                            <div class="text-3xl font-bold text-[#FDE68A] mb-1">
                                3
                            </div>
                            <h3 class="font-onest font-semibold text-sm text-white mb-1 truncate">
                                {{ topThree[2].name }}
                            </h3>
                            <p class="font-inter text-xs text-[#9CA3AF]">
                                {{ topThree[2].avgMarks }} avg
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="bg-[#161B22] rounded-2xl p-6 shadow-sm border border-[#1F2937] text-center">
                <p class="text-[#9CA3AF]">Not enough data for leaderboard yet.</p>
            </div>

            <!-- Sort Controls -->
            <div class="bg-[#161B22] rounded-xl p-4 shadow-sm border border-[#1F2937]">
                <div class="flex flex-wrap items-center gap-2">
                    <span class="font-onest text-sm text-[#9CA3AF] mr-2">
                        Sort by:
                    </span>
                    <button v-for="field in ['rank', 'name', 'id', 'totalMarks', 'avgMarks']" :key="field"
                        @click="handleSort(field)"
                        :class="[
                            'px-4 py-2 rounded-lg font-inter text-sm font-medium transition-colors flex items-center space-x-1 group',
                            sortBy === field
                                ? 'bg-[#0D6EFD] text-white'
                                : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]'
                        ]"
                    >
                        <span class="capitalize">{{ field === 'id' ? 'Student ID' : field.replace(/([A-Z])/g, ' $1').trim() }}</span>
                        <ArrowUpDown
                            :size="14"
                            :class="[
                                sortBy === field
                                    ? 'text-white'
                                    : 'text-[#6B7280] opacity-0 group-hover:opacity-100'
                            ]"
                        />
                    </button>
                </div>
            </div>

            <!-- Leaderboard Table -->
            <div class="bg-[#161B22] rounded-2xl shadow-sm border border-[#1F2937] overflow-hidden">
                <!-- Desktop Table -->
                <div class="hidden md:block overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-[#1F2937] border-b border-[#374151]">
                            <tr>
                                <th class="px-6 py-4 text-left" v-for="header in [
                                    { key: 'rank', label: 'Rank' },
                                    { key: 'name', label: 'Student Name' },
                                    { key: 'id', label: 'Student ID' },
                                    { key: 'exams', label: 'Exams' },
                                    { key: 'totalMarks', label: 'Total Marks' },
                                    { key: 'avgMarks', label: 'Avg Marks' }
                                ]" :key="header.key">
                                    <button @click="handleSort(header.key)" class="flex items-center space-x-1 hover:text-[#0D6EFD] transition-colors focus:outline-none group">
                                        <span class="font-onest font-semibold text-xs uppercase text-[#9CA3AF]">
                                            {{ header.label }}
                                        </span>
                                        <ArrowUpDown
                                            :size="14"
                                            :class="[
                                                sortBy === header.key
                                                    ? 'text-[#0D6EFD]'
                                                    : 'text-[#6B7280] opacity-0 group-hover:opacity-100'
                                            ]"
                                        />
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="sortedStudents.length === 0">
                                <td colspan="6" class="px-6 py-8 text-center text-[#9CA3AF]">
                                    No students found.
                                </td>
                            </tr>
                            <tr v-for="student in sortedStudents" :key="student.id"
                                class="border-b border-[#374151] transition-colors hover:bg-[#1F2937]"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <Crown v-if="getRankByAverage(student) === 1" :size="18" class="text-[#F59E0B]" />
                                        <Medal v-else-if="getRankByAverage(student) === 2" :size="18" class="text-[#9CA3AF]" />
                                        <Medal v-else-if="getRankByAverage(student) === 3" :size="18" class="text-[#CD7F32]" />
                                        <span class="font-inter font-semibold text-sm text-white">
                                            #{{ getRankByAverage(student) }}
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-3">
                                        <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] flex items-center justify-center text-white font-montserrat font-semibold text-xs">
                                            {{ student.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }}
                                        </div>
                                        <div>
                                            <div class="font-onest font-medium text-sm text-white">
                                                {{ student.name }}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="font-inter text-sm text-[#9CA3AF]">
                                        {{ student.id }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="font-inter text-sm text-white">
                                        {{ student.exams }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="font-inter font-semibold text-sm text-white">
                                        {{ student.totalMarks }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center space-x-2">
                                        <span class="font-inter font-semibold text-sm text-white">
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
                <div class="md:hidden divide-y divide-[#374151]">
                    <div v-if="sortedStudents.length === 0" class="p-6 text-center text-[#9CA3AF]">
                        No students found.
                    </div>
                    <div v-for="student in sortedStudents" :key="student.id" class="p-4">
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex items-center space-x-3">
                                <div class="flex flex-col items-center">
                                    <Crown v-if="getRankByAverage(student) === 1" :size="20" class="text-[#F59E0B] mb-1" />
                                    <Medal v-else-if="getRankByAverage(student) === 2" :size="20" class="text-[#9CA3AF] mb-1" />
                                    <Medal v-else-if="getRankByAverage(student) === 3" :size="20" class="text-[#CD7F32] mb-1" />
                                    <span class="font-inter font-bold text-lg text-white">
                                        #{{ getRankByAverage(student) }}
                                    </span>
                                </div>
                                <div class="w-11 h-11 rounded-full bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] flex items-center justify-center text-white font-montserrat font-semibold text-sm">
                                    {{ student.name.split(" ").map((n) => n[0]).join("").slice(0, 2) }}
                                </div>
                                <div>
                                    <h3 class="font-onest font-semibold text-sm text-white">
                                        {{ student.name }}
                                    </h3>
                                    <p class="font-inter text-xs text-[#9CA3AF]">
                                        ID: {{ student.id }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="grid grid-cols-3 gap-3">
                            <div class="bg-[#1F2937] rounded-lg p-3">
                                <p class="font-inter text-xs text-[#9CA3AF] mb-1">
                                    Exams
                                </p>
                                <p class="font-inter font-semibold text-sm text-white">
                                    {{ student.exams }}
                                </p>
                            </div>
                            <div class="bg-[#1F2937] rounded-lg p-3">
                                <p class="font-inter text-xs text-[#9CA3AF] mb-1">
                                    Total
                                </p>
                                <p class="font-inter font-semibold text-sm text-white">
                                    {{ student.totalMarks }}
                                </p>
                            </div>
                            <div class="bg-[#1F2937] rounded-lg p-3">
                                <p class="font-inter text-xs text-[#9CA3AF] mb-1">
                                    Average
                                </p>
                                <div class="flex items-center space-x-1">
                                    <p class="font-inter font-semibold text-sm text-white">
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
    </AdminLayout>
</template>

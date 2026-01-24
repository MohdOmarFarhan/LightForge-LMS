<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { TrendingUp, Award, Target, Calendar } from 'lucide-vue-next';
import VueApexCharts from 'vue3-apexcharts';

const props = defineProps({
    examData: {
        type: Array,
        default: () => [],
    },
});

const subjects = ["All", "Physics", "Chemistry", "Mathematics", "Biology"];

const subjectColors = {
    Physics: "#0066FF",
    Chemistry: "#10B981",
    Mathematics: "#F59E0B",
    Biology: "#8B5CF6",
};

const selectedSubject = ref("All");

// Filter exams based on selected subject
const filteredExams = computed(() => {
    return selectedSubject.value === "All"
        ? props.examData
        : props.examData.filter((exam) => exam.subject === selectedSubject.value);
});

// Sort by date for chart
const sortedExams = computed(() => {
    return [...filteredExams.value].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );
});

// Calculate stats
const totalExams = computed(() => filteredExams.value.length);
const averageScore = computed(() => {
    if (totalExams.value === 0) return 0;
    return Math.round(
        filteredExams.value.reduce((sum, exam) => sum + exam.percentage, 0) /
        totalExams.value
    );
});
const highestScore = computed(() => {
    if (totalExams.value === 0) return 0;
    return Math.max(...filteredExams.value.map((exam) => exam.percentage));
});
const lowestScore = computed(() => {
    if (totalExams.value === 0) return 0;
    return Math.min(...filteredExams.value.map((exam) => exam.percentage));
});

// Chart Options
const chartOptions = computed(() => ({
    chart: {
        type: 'line',
        toolbar: { show: false },
        fontFamily: 'Inter, sans-serif'
    },
    stroke: {
        curve: 'smooth',
        width: 3
    },
    xaxis: {
        categories: sortedExams.value.map(e => e.dateLabel),
        labels: {
            style: { colors: '#64748B', fontSize: '12px' }
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
    },
    yaxis: {
        min: 0,
        max: 100,
        tickAmount: 4,
        labels: {
            style: { colors: '#64748B', fontSize: '12px' }
        }
    },
    grid: {
        borderColor: '#E9EDF3',
        strokeDashArray: 4,
        yaxis: { lines: { show: true } }
    },
    colors: ['#0066FF'],
    tooltip: {
        theme: 'light',
        y: {
            formatter: (val) => val + "%"
        }
    },
    markers: {
        size: 5,
        hover: { size: 7 }
    }
}));

const chartSeries = computed(() => [{
    name: "Score",
    data: sortedExams.value.map(e => e.percentage)
}]);

</script>

<template>
    <Head title="Performance" />

    <AuthenticatedLayout>
        <div class="w-full">
            <!-- Header -->
            <div class="mb-8">
                <h1 class="font-poppins font-bold text-3xl md:text-4xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-2">
                    Performance Analytics 📊
                </h1>
                <p class="font-inter text-base text-[#64748B] dark:text-[#9CA3AF]">
                    Track your exam performance and identify areas for improvement
                </p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                <!-- Average Score -->
                <div class="relative p-5 rounded-xl border border-[#E9EDF3] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style="border-left-width: 3px; border-left-color: #0066FF;">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <Award :size="20" class="mr-2 text-[#0066FF]" />
                                <span class="font-montserrat font-medium text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                    Average Score
                                </span>
                            </div>
                            <div class="font-poppins font-bold text-3xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-1">
                                {{ averageScore }}%
                            </div>
                            <div class="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">
                                Across {{ totalExams }} exam{{ totalExams !== 1 ? "s" : "" }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Highest Score -->
                <div class="relative p-5 rounded-xl border border-[#E9EDF3] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style="border-left-width: 3px; border-left-color: #10B981;">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <TrendingUp :size="20" class="mr-2 text-[#10B981]" />
                                <span class="font-montserrat font-medium text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                    Highest Score
                                </span>
                            </div>
                            <div class="font-poppins font-bold text-3xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-1">
                                {{ highestScore }}%
                            </div>
                            <div class="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">
                                Best performance
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Lowest Score -->
                <div class="relative p-5 rounded-xl border border-[#E9EDF3] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style="border-left-width: 3px; border-left-color: #F59E0B;">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <Target :size="20" class="mr-2 text-[#F59E0B]" />
                                <span class="font-montserrat font-medium text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                    Lowest Score
                                </span>
                            </div>
                            <div class="font-poppins font-bold text-3xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-1">
                                {{ lowestScore }}%
                            </div>
                            <div class="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">
                                Room for improvement
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Total Exams -->
                <div class="relative p-5 rounded-xl border border-[#E9EDF3] dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E] transition-all duration-200 hover:shadow-md hover:-translate-y-0.5" style="border-left-width: 3px; border-left-color: #8B5CF6;">
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <div class="flex items-center mb-2">
                                <Calendar :size="20" class="mr-2 text-[#8B5CF6]" />
                                <span class="font-montserrat font-medium text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                    Total Exams
                                </span>
                            </div>
                            <div class="font-poppins font-bold text-3xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-1">
                                {{ totalExams }}
                            </div>
                            <div class="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">
                                Completed assessments
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Subject Filter -->
            <div class="mb-6">
                <div class="flex flex-wrap gap-2">
                    <button v-for="subject in subjects" :key="subject"
                        @click="selectedSubject = subject"
                        :class="[
                            'px-4 py-2 rounded-lg font-montserrat font-semibold text-sm transition-all duration-200',
                            selectedSubject === subject
                                ? 'bg-[#0066FF] text-white shadow-md'
                                : 'bg-white dark:bg-[#1E1E1E] text-[#64748B] dark:text-[#9CA3AF] border border-[#E9EDF3] dark:border-[#2A2A2A] hover:border-[#0066FF] dark:hover:border-[#0066FF]'
                        ]"
                    >
                        {{ subject }}
                    </button>
                </div>
            </div>

            <!-- Performance Chart -->
            <div v-if="sortedExams.length > 0" class="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9EDF3] dark:border-[#2A2A2A] p-6 mb-8">
                <h2 class="font-poppins font-bold text-xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-6">
                    Performance Over Time
                </h2>
                <div class="w-full h-[400px]">
                    <VueApexCharts
                        type="line"
                        height="350"
                        :options="chartOptions"
                        :series="chartSeries"
                    />
                </div>
            </div>

            <!-- Exam Marks Table -->
            <div class="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E9EDF3] dark:border-[#2A2A2A] overflow-hidden">
                <div class="p-6 border-b border-[#E9EDF3] dark:border-[#2A2A2A]">
                    <h2 class="font-poppins font-bold text-xl text-[#0B0F1A] dark:text-[#E5E7EB]">
                        All Exam Results
                    </h2>
                </div>

                <!-- Desktop Table -->
                <div class="hidden md:block overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-[#F8FAFC] dark:bg-[#0D1117]">
                            <tr>
                                <th class="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">Exam</th>
                                <th class="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">Subject</th>
                                <th class="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">Date</th>
                                <th class="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">Marks</th>
                                <th class="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">Percentage</th>
                                <th class="px-6 py-4 text-left font-montserrat font-semibold text-sm text-[#64748B] dark:text-[#9CA3AF]">Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="sortedExams.length === 0">
                                <td colspan="6" class="px-6 py-8 text-center text-[#64748B] dark:text-[#9CA3AF]">
                                    No graded exams found yet.
                                </td>
                            </tr>
                            <tr v-for="(exam, index) in sortedExams" :key="exam.id"
                                :class="[
                                    index !== sortedExams.length - 1 ? 'border-b border-[#E9EDF3] dark:border-[#2A2A2A]' : '',
                                    'hover:bg-[#F8FAFC] dark:hover:bg-[#0D1117] transition-colors'
                                ]"
                            >
                                <td class="px-6 py-4">
                                    <div class="font-inter font-medium text-sm text-[#0B0F1A] dark:text-[#E5E7EB]">{{ exam.title }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="inline-flex items-center px-3 py-1 rounded-full font-montserrat font-semibold text-xs text-white" :style="{ backgroundColor: subjectColors[exam.subject] || '#6B7280' }">
                                        {{ exam.subject }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                        {{ new Date(exam.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="font-inter font-medium text-sm text-[#0B0F1A] dark:text-[#E5E7EB]">
                                        {{ exam.obtainedMarks }}/{{ exam.totalMarks }}
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <div class="flex-1 bg-[#E9EDF3] dark:bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
                                            <div class="h-full rounded-full transition-all duration-300" :style="{ width: `${exam.percentage}%`, backgroundColor: subjectColors[exam.subject] || '#0066FF' }"></div>
                                        </div>
                                        <span class="font-inter font-semibold text-sm text-[#0B0F1A] dark:text-[#E5E7EB] min-w-[45px]">
                                            {{ exam.percentage }}%
                                        </span>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span :class="[
                                        'inline-flex items-center px-3 py-1 rounded-full font-montserrat font-semibold text-xs',
                                        (exam.grade === 'A+' || exam.grade === 'A') ? 'bg-[#D1FAE5] text-[#065F46] dark:bg-[#065F46] dark:text-[#D1FAE5]' :
                                        (exam.grade === 'B+' || exam.grade === 'B') ? 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#92400E] dark:text-[#FEF3C7]' :
                                        'bg-[#FEE2E2] text-[#991B1B] dark:bg-[#991B1B] dark:text-[#FEE2E2]'
                                    ]">
                                        {{ exam.grade }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Mobile Cards -->
                <div class="md:hidden">
                    <div v-if="sortedExams.length === 0" class="p-6 text-center text-[#64748B] dark:text-[#9CA3AF]">
                        No graded exams found yet.
                    </div>
                    <div v-for="(exam, index) in sortedExams" :key="exam.id"
                        :class="[
                            'p-4',
                            index !== sortedExams.length - 1 ? 'border-b border-[#E9EDF3] dark:border-[#2A2A2A]' : ''
                        ]"
                    >
                        <!-- Mobile content similar to desktop... -->
                        <div class="flex items-start justify-between mb-3">
                            <div class="flex-1">
                                <h3 class="font-inter font-semibold text-sm text-[#0B0F1A] dark:text-[#E5E7EB] mb-1">{{ exam.title }}</h3>
                                <p class="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF]">{{ new Date(exam.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }}</p>
                            </div>
                            <span class="inline-flex items-center px-2 py-1 rounded-full font-montserrat font-semibold text-xs text-white" :style="{ backgroundColor: subjectColors[exam.subject] || '#6B7280' }">{{ exam.subject }}</span>
                        </div>
                        <!-- ... rest of mobile card layout ... -->
                         <div class="flex items-center justify-between mb-2">
                            <span class="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">Marks:</span>
                            <span class="font-inter font-semibold text-sm text-[#0B0F1A] dark:text-[#E5E7EB]">{{ exam.obtainedMarks }}/{{ exam.totalMarks }}</span>
                        </div>
                        <div class="flex items-center justify-between mb-2">
                            <span class="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">Percentage:</span>
                            <span class="font-inter font-semibold text-sm text-[#0B0F1A] dark:text-[#E5E7EB]">{{ exam.percentage }}%</span>
                        </div>
                         <div class="flex items-center justify-between">
                            <span class="font-inter text-sm text-[#64748B] dark:text-[#9CA3AF]">Grade:</span>
                             <span :class="[
                                        'inline-flex items-center px-2 py-1 rounded-full font-montserrat font-semibold text-xs',
                                        (exam.grade === 'A+' || exam.grade === 'A') ? 'bg-[#D1FAE5] text-[#065F46] dark:bg-[#065F46] dark:text-[#D1FAE5]' :
                                        (exam.grade === 'B+' || exam.grade === 'B') ? 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#92400E] dark:text-[#FEF3C7]' :
                                        'bg-[#FEE2E2] text-[#991B1B] dark:bg-[#991B1B] dark:text-[#FEE2E2]'
                                    ]">
                                        {{ exam.grade }}
                                    </span>
                        </div>
                         <div class="mt-3">
                            <div class="bg-[#E9EDF3] dark:bg-[#2A2A2A] rounded-full h-2 overflow-hidden">
                                <div class="h-full rounded-full transition-all duration-300" :style="{ width: `${exam.percentage}%`, backgroundColor: subjectColors[exam.subject] || '#0066FF' }"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

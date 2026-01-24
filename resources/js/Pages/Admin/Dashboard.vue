<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { computed } from 'vue';
import {
    Users,
    FileQuestion,
    FileText,
    ClipboardCheck,
    TrendingUp,
    UserCheck,
    ArrowUpRight,
    ArrowDownRight,
} from 'lucide-vue-next';

const props = defineProps({
    stats: Object,
    recentActivity: Array,
    upcomingExams: Array,
});

// Map backend stats to UI format
const statsList = computed(() => [
    {
        name: "Total Students",
        value: props.stats.totalStudents,
        change: "Active", // simplified
        trend: "up",
        icon: Users,
        color: "bg-[#0D6EFD]",
    },
    {
        name: "Questions Bank",
        value: props.stats.questionsCount,
        change: "Total",
        trend: "up",
        icon: FileQuestion,
        color: "bg-[#16A34A]",
    },
    {
        name: "Active Exams",
        value: props.stats.activeExams,
        change: "Running",
        trend: "up", // simplified
        icon: FileText,
        color: "bg-[#F59E0B]",
    },
    {
        name: "Pending Reviews",
        value: props.stats.pendingReviews,
        change: "To Grade",
        trend: "up",
        icon: ClipboardCheck,
        color: "bg-[#DC2626]",
    },
    {
        name: "Pending Approvals",
        value: props.stats.pendingApprovals,
        change: "Waiting",
        trend: "up",
        icon: UserCheck,
        color: "bg-[#8B5CF6]",
    },
    {
        name: "Avg Performance",
        value: props.stats.avgPerformance + "%",
        change: "Global",
        trend: "up",
        icon: TrendingUp,
        color: "bg-[#10B981]",
    },
]);
</script>

<template>
    <Head title="Admin Dashboard" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div
                    v-for="stat in statsList"
                    :key="stat.name"
                    class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6 hover:border-[#374151] transition-all duration-200"
                >
                    <div class="flex items-center justify-between mb-4">
                        <div
                            :class="[stat.color, 'w-12 h-12 rounded-lg flex items-center justify-center']"
                        >
                            <component :is="stat.icon" :size="24" class="text-white" />
                        </div>
                        <!-- Simplified trend indicator for now -->
                        <!-- 
                        <div
                            :class="['flex items-center gap-1 text-sm font-semibold', stat.trend === 'up' ? 'text-[#22C55E]' : 'text-[#DC2626]']"
                        >
                            <ArrowUpRight v-if="stat.trend === 'up'" :size="16" />
                            <ArrowDownRight v-else :size="16" />
                            {{ stat.change }}
                        </div>
                        -->
                         <div class="flex items-center gap-1 text-sm font-semibold text-[#9CA3AF]">
                            {{ stat.change }}
                        </div>
                    </div>
                    <h3 class="text-2xl font-bold text-white mb-1 font-montserrat">
                        {{ stat.value }}
                    </h3>
                    <p class="text-sm text-[#9CA3AF] font-onest">{{ stat.name }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Recent Activity -->
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <h3 class="text-lg font-bold text-white mb-4 font-montserrat">Recent Activity</h3>
                    <div class="space-y-4">
                        <div v-if="recentActivity.length === 0" class="text-[#9CA3AF] text-sm">
                            No recent activity.
                        </div>
                        <div
                            v-for="(activity, index) in recentActivity"
                            :key="index"
                            class="flex items-start gap-4 p-4 bg-[#0F1419] rounded-lg hover:bg-[#1F2937] transition-all duration-200"
                        >
                            <div class="w-10 h-10 bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0 font-montserrat">
                                {{ activity.student.charAt(0) }}
                            </div>
                            <div class="flex-1 min-w-0 font-onest">
                                <div class="flex items-center gap-2 mb-1">
                                    <p class="text-sm font-semibold text-white">
                                        {{ activity.student }}
                                    </p>
                                    <span class="px-2 py-0.5 bg-[#1F2937] text-[#9CA3AF] rounded text-xs">
                                        {{ activity.class }}
                                    </span>
                                </div>
                                <p class="text-sm text-[#9CA3AF]">
                                    {{ activity.action }} • {{ activity.exam }}
                                </p>
                                <p class="text-xs text-[#6B7280] mt-1">{{ activity.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Upcoming Exams -->
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <h3 class="text-lg font-bold text-white mb-4 font-montserrat">Upcoming Exams</h3>
                    <div class="space-y-4">
                        <div v-if="upcomingExams.length === 0" class="text-[#9CA3AF] text-sm">
                            No upcoming exams scheduled.
                        </div>
                        <div
                            v-for="(exam, index) in upcomingExams"
                            :key="index"
                            class="p-4 bg-[#0F1419] rounded-lg border border-[#1F2937] hover:border-[#0D6EFD] transition-all duration-200"
                        >
                            <div class="flex items-start justify-between mb-3">
                                <div>
                                    <h4 class="text-base font-semibold text-white mb-1 font-montserrat">
                                        {{ exam.name }}
                                    </h4>
                                    <span class="px-2 py-1 bg-[#0D6EFD]/20 text-[#0D6EFD] rounded text-xs font-semibold font-onest">
                                        {{ exam.class }}
                                    </span>
                                </div>
                                <div class="text-right font-onest">
                                    <p class="text-sm font-semibold text-white">
                                        {{ exam.date }}
                                    </p>
                                    <p class="text-xs text-[#9CA3AF]">{{ exam.time }}</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-2 text-xs text-[#9CA3AF] font-onest">
                                <Users :size="14" />
                                <span>{{ exam.students }} potential students</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                <h3 class="text-lg font-bold text-white mb-4 font-montserrat">Quick Actions</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4 font-onest">
                    <Link :href="route('admin.exams.create')" class="p-4 bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] rounded-lg hover:shadow-lg hover:shadow-[#0D6EFD]/20 transition-all duration-200 block text-center">
                        <FileText :size="24" class="text-white mb-2 mx-auto" />
                        <p class="text-sm font-semibold text-white">Create Exam</p>
                    </Link>
                    <Link :href="route('admin.questions.create')" class="p-4 bg-gradient-to-br from-[#16A34A] to-[#15803D] rounded-lg hover:shadow-lg hover:shadow-[#16A34A]/20 transition-all duration-200 block text-center">
                        <FileQuestion :size="24" class="text-white mb-2 mx-auto" />
                        <p class="text-sm font-semibold text-white">Add Question</p>
                    </Link>
                    <Link :href="route('admin.scrutiny')" class="p-4 bg-gradient-to-br from-[#F59E0B] to-[#D97706] rounded-lg hover:shadow-lg hover:shadow-[#F59E0B]/20 transition-all duration-200 block text-center">
                        <ClipboardCheck :size="24" class="text-white mb-2 mx-auto" />
                        <p class="text-sm font-semibold text-white">Review Answers</p>
                    </Link>
                    <Link :href="route('admin.students.pending')" class="p-4 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-lg hover:shadow-lg hover:shadow-[#8B5CF6]/20 transition-all duration-200 block text-center">
                        <UserCheck :size="24" class="text-white mb-2 mx-auto" />
                        <p class="text-sm font-semibold text-white">Approvals</p>
                    </Link>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

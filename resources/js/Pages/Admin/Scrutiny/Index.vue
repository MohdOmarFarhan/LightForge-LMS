<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import { Search, Filter, Eye, CheckCircle, Clock } from 'lucide-vue-next';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const props = defineProps({
    attempts: Object,
    filters: Object,
});

const formatDate = (date) => {
    return dayjs(date).format('MMM D, YYYY h:mm A');
};
</script>

<template>
    <Head title="Scrutiny" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Header -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-white mb-1 font-montserrat">Exam Scrutiny</h1>
                    <p class="text-[#9CA3AF] font-onest">
                        Review and grade student submissions
                    </p>
                </div>
            </div>

            <!-- List -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-[#1F2937]">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Student
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Exam
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Submitted
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Status
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#1F2937]">
                            <tr
                                v-for="attempt in attempts.data"
                                :key="attempt.id"
                                class="hover:bg-[#1F2937] transition-colors"
                            >
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] rounded-lg flex items-center justify-center text-white font-bold font-montserrat">
                                            {{ attempt.user.name.charAt(0) }}
                                        </div>
                                        <div>
                                            <p class="text-sm font-semibold text-white font-onest">{{ attempt.user.name }}</p>
                                            <p class="text-xs text-[#9CA3AF] font-onest">{{ attempt.user.student_id }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-onest">
                                        <div class="text-white">{{ attempt.exam.title }}</div>
                                        <div class="text-[#9CA3AF] text-xs">Class {{ attempt.exam.class }} • {{ attempt.exam.subject }}</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-[#9CA3AF] font-onest">
                                        {{ formatDate(attempt.submitted_at) }}
                                        <div class="text-xs mt-0.5">({{ dayjs(attempt.submitted_at).fromNow() }})</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] rounded-lg text-xs font-semibold font-onest flex items-center gap-1 w-fit">
                                        <Clock :size="12" />
                                        Pending Grading
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <Link
                                        :href="route('admin.scrutiny.show', attempt.id)"
                                        class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-lg text-sm font-semibold transition-all duration-200 font-onest"
                                    >
                                        <Eye :size="16" />
                                        Grade
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="attempts.data.length === 0" class="py-12 text-center">
                    <p class="text-[#9CA3AF] font-onest">No submissions pending grading.</p>
                </div>

                <!-- Pagination (Simplified) -->
                <div v-if="attempts.links.length > 3" class="px-6 py-4 border-t border-[#374151] flex items-center justify-between">
                     <!-- ... pagination links ... -->
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

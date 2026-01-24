<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import { Search, Filter, Download, Eye, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { debounce } from 'lodash';

const props = defineProps({
    students: Object,
    filters: Object,
    stats: Object,
});

const selectedClass = ref(props.filters.class || "all");
const searchQuery = ref(props.filters.search || "");

watch(selectedClass, (value) => {
    router.get(
        route("admin.students"),
        { class: value, search: searchQuery.value },
        { preserveState: true, preserveScroll: true }
    );
});

watch(searchQuery, debounce((value) => {
    router.get(
        route("admin.students"),
        { class: selectedClass.value, search: value },
        { preserveState: true, preserveScroll: true }
    );
}, 300));
</script>

<template>
    <Head title="Students" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Header Stats -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <p class="text-sm text-[#9CA3AF] mb-1 font-onest">Total Students</p>
                    <p class="text-3xl font-bold text-white font-montserrat">{{ stats.all }}</p>
                </div>
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <p class="text-sm text-[#9CA3AF] mb-1 font-onest">Class 11 Students</p>
                    <p class="text-3xl font-bold text-white font-montserrat">{{ stats[11] }}</p>
                </div>
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <p class="text-sm text-[#9CA3AF] mb-1 font-onest">Class 12 Students</p>
                    <p class="text-3xl font-bold text-white font-montserrat">{{ stats[12] }}</p>
                </div>
            </div>

            <!-- Filters and Search -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div class="flex items-center gap-3">
                        <Filter :size="20" class="text-[#9CA3AF]" />
                        <div class="flex gap-2 font-onest">
                            <button
                                @click="selectedClass = 'all'"
                                :class="['px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200', selectedClass === 'all' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                All Classes
                            </button>
                            <button
                                @click="selectedClass = '11'"
                                :class="['px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200', selectedClass === '11' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                Class 11
                            </button>
                            <button
                                @click="selectedClass = '12'"
                                :class="['px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200', selectedClass === '12' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                Class 12
                            </button>
                        </div>
                    </div>

                    <div class="flex items-center gap-3">
                        <div class="relative flex-1 md:w-64">
                            <Search
                                :size="18"
                                class="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                            />
                            <input
                                type="text"
                                placeholder="Search by name or ID..."
                                v-model="searchQuery"
                                class="w-full pl-10 pr-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                            />
                        </div>
                        <button class="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 font-onest">
                            <Download :size="18" />
                            Export
                        </button>
                    </div>
                </div>
            </div>

            <!-- Students Table -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-[#1F2937] border-b border-[#374151]">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider font-onest">
                                    Student ID
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider font-onest">
                                    Name
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider font-onest">
                                    Class
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider font-onest">
                                    Group
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider font-onest">
                                    Avg Score
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider font-onest">
                                    Exams
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider font-onest">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#1F2937]">
                            <tr
                                v-for="student in students.data"
                                :key="student.id"
                                class="hover:bg-[#1F2937] transition-colors"
                            >
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm font-mono font-semibold text-[#0D6EFD]">
                                        #{{ student.student_id }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] rounded-lg flex items-center justify-center text-white font-bold font-montserrat">
                                            {{ student.name.charAt(0) }}
                                        </div>
                                        <div>
                                            <p class="text-sm font-semibold text-white font-onest">
                                                {{ student.name }}
                                            </p>
                                            <p class="text-xs text-[#9CA3AF] font-onest">
                                                {{ student.email }}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-3 py-1 bg-[#1F2937] text-white rounded-lg text-sm font-semibold font-onest">
                                        Class {{ student.class }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-[#9CA3AF] font-onest">
                                        {{ student.group }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center gap-2">
                                        <span class="text-sm font-bold text-white font-onest">
                                            {{ Math.round(student.avg_score || 0) }}%
                                        </span>
                                        <TrendingUp :size="14" class="text-[#22C55E]" />
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="text-sm text-[#9CA3AF] font-onest">
                                        {{ student.exams_count }} exams
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button
                                        class="inline-flex items-center gap-2 px-4 py-2 bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-lg text-sm font-semibold transition-all duration-200 font-onest"
                                    >
                                        <Eye :size="16" />
                                        View
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="students.links.length > 3" class="px-6 py-4 border-t border-[#374151] flex items-center justify-between">
                    <div class="flex-1 flex justify-between sm:hidden">
                        <Link
                            v-if="students.prev_page_url"
                            :href="students.prev_page_url"
                            class="relative inline-flex items-center px-4 py-2 border border-[#374151] text-sm font-medium rounded-md text-white bg-[#1F2937] hover:bg-[#374151]"
                        >
                            Previous
                        </Link>
                        <Link
                            v-if="students.next_page_url"
                            :href="students.next_page_url"
                            class="ml-3 relative inline-flex items-center px-4 py-2 border border-[#374151] text-sm font-medium rounded-md text-white bg-[#1F2937] hover:bg-[#374151]"
                        >
                            Next
                        </Link>
                    </div>
                    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p class="text-sm text-[#9CA3AF] font-onest">
                                Showing
                                <span class="font-medium text-white">{{ students.from }}</span>
                                to
                                <span class="font-medium text-white">{{ students.to }}</span>
                                of
                                <span class="font-medium text-white">{{ students.total }}</span>
                                results
                            </p>
                        </div>
                        <div>
                            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <template v-for="(link, index) in students.links" :key="index">
                                    <Link
                                        v-if="link.url"
                                        :href="link.url"
                                        :class="[
                                            'relative inline-flex items-center px-4 py-2 border text-sm font-medium font-onest',
                                            link.active
                                                ? 'z-10 bg-[#0D6EFD] border-[#0D6EFD] text-white'
                                                : 'bg-[#1F2937] border-[#374151] text-[#9CA3AF] hover:bg-[#374151]',
                                            index === 0 ? 'rounded-l-md' : '',
                                            index === students.links.length - 1 ? 'rounded-r-md' : ''
                                        ]"
                                        v-html="link.label"
                                    />
                                    <span
                                        v-else
                                        :class="[
                                            'relative inline-flex items-center px-4 py-2 border border-[#374151] bg-[#161B22] text-sm font-medium text-[#6B7280] font-onest',
                                            index === 0 ? 'rounded-l-md' : '',
                                            index === students.links.length - 1 ? 'rounded-r-md' : ''
                                        ]"
                                        v-html="link.label"
                                    />
                                </template>
                            </nav>
                        </div>
                    </div>
                </div>

                <div v-if="students.data.length === 0" class="py-12 text-center">
                    <p class="text-[#9CA3AF] font-onest">No students found</p>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

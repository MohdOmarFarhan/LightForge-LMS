<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import { Plus, Search, Filter, FileQuestion, TrendingUp, Users, ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const props = defineProps({
    questions: Object,
    filters: Object,
    stats: Object,
    subjectStats: Array,
});

const selectedClass = ref(props.filters.class || "all");
const selectedSubject = ref(props.filters.subject || "all");
const selectedType = ref(props.filters.type || "all");

const updateFilters = () => {
    router.get(
        route("admin.questions"),
        {
            class: selectedClass.value,
            subject: selectedSubject.value,
            type: selectedType.value,
        },
        { preserveState: true, preserveScroll: true }
    );
};

watch([selectedClass, selectedSubject, selectedType], debounce(updateFilters, 300));
</script>

<template>
    <Head title="Question Bank" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Header with Add Button -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-white mb-1 font-montserrat">Question Bank</h1>
                    <p class="text-[#9CA3AF] font-onest">
                        Manage and organize your question database
                    </p>
                </div>
                <Link
                    :href="route('admin.questions.create')"
                    class="px-6 py-3 bg-gradient-to-r from-[#0D6EFD] to-[#0B5ED7] hover:shadow-lg hover:shadow-[#0D6EFD]/30 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 justify-center font-onest"
                >
                    <Plus :size="20" />
                    Add Question
                </Link>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="bg-[#0D6EFD] w-12 h-12 rounded-lg flex items-center justify-center">
                            <FileQuestion :size="24" class="text-white" />
                        </div>
                        <TrendingUp :size="20" class="text-[#22C55E]" />
                    </div>
                    <h3 class="text-3xl font-bold text-white mb-2 font-montserrat">{{ stats.mcq }}</h3>
                    <p class="text-sm text-[#9CA3AF] mb-3 font-onest">MCQ Questions</p>
                </div>
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="bg-[#16A34A] w-12 h-12 rounded-lg flex items-center justify-center">
                            <FileQuestion :size="24" class="text-white" />
                        </div>
                        <TrendingUp :size="20" class="text-[#22C55E]" />
                    </div>
                    <h3 class="text-3xl font-bold text-white mb-2 font-montserrat">{{ stats.cq }}</h3>
                    <p class="text-sm text-[#9CA3AF] mb-3 font-onest">CQ Questions</p>
                </div>
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="bg-[#F59E0B] w-12 h-12 rounded-lg flex items-center justify-center">
                            <FileQuestion :size="24" class="text-white" />
                        </div>
                        <TrendingUp :size="20" class="text-[#22C55E]" />
                    </div>
                    <h3 class="text-3xl font-bold text-white mb-2 font-montserrat">{{ stats.descriptive }}</h3>
                    <p class="text-sm text-[#9CA3AF] mb-3 font-onest">Descriptive Questions</p>
                </div>
            </div>

            <!-- Filters -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                <div class="flex items-center gap-2 mb-4">
                    <Filter :size="20" class="text-[#0D6EFD]" />
                    <h3 class="text-lg font-bold text-white font-montserrat">Filters</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 font-onest">
                    <!-- Class Filter -->
                    <div>
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-2">
                            Class
                        </label>
                        <div class="flex gap-2">
                            <button
                                @click="selectedClass = 'all'"
                                :class="['flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200', selectedClass === 'all' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                All
                            </button>
                            <button
                                @click="selectedClass = '11'"
                                :class="['flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200', selectedClass === '11' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                Class 11
                            </button>
                            <button
                                @click="selectedClass = '12'"
                                :class="['flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200', selectedClass === '12' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                Class 12
                            </button>
                        </div>
                    </div>

                    <!-- Subject Filter -->
                    <div>
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-2">
                            Subject
                        </label>
                        <select
                            v-model="selectedSubject"
                            class="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors"
                        >
                            <option value="all">All Subjects</option>
                            <option value="mathematics">Mathematics</option>
                            <option value="physics">Physics</option>
                            <option value="chemistry">Chemistry</option>
                            <option value="biology">Biology</option>
                        </select>
                    </div>

                    <!-- Type Filter -->
                    <div>
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-2">
                            Question Type
                        </label>
                        <select
                            v-model="selectedType"
                            class="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors"
                        >
                            <option value="all">All Types</option>
                            <option value="mcq">MCQ</option>
                            <option value="cq">CQ</option>
                            <option value="descriptive">Descriptive</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Subject-wise Breakdown -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                <h3 class="text-lg font-bold text-white mb-4 font-montserrat">
                    Subject-wise Breakdown
                </h3>
                <div class="space-y-4">
                    <div v-for="subject in subjectStats" :key="subject.subject" class="p-4 bg-[#0F1419] rounded-lg">
                        <div class="flex items-center justify-between mb-3">
                            <h4 class="text-base font-semibold text-white font-montserrat">
                                {{ subject.subject }}
                            </h4>
                            <span class="text-sm font-bold text-[#0D6EFD] font-onest">
                                {{ subject.total }} total
                            </span>
                        </div>
                        <div class="grid grid-cols-3 gap-4 font-onest">
                            <div>
                                <p class="text-xs text-[#9CA3AF] mb-1">MCQ</p>
                                <p class="text-lg font-bold text-white">{{ subject.mcq }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-[#9CA3AF] mb-1">CQ</p>
                                <p class="text-lg font-bold text-white">{{ subject.cq }}</p>
                            </div>
                            <div>
                                <p class="text-xs text-[#9CA3AF] mb-1">Descriptive</p>
                                <p class="text-lg font-bold text-white">
                                    {{ subject.descriptive }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Recent Questions -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                <div class="p-6 border-b border-[#1F2937]">
                    <h3 class="text-lg font-bold text-white font-montserrat">
                        Recently Added Questions
                    </h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-[#1F2937]">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    ID
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Type
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Subject
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Chapter
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Class
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Added
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#1F2937]">
                            <tr
                                v-for="question in questions.data"
                                :key="question.id"
                                class="hover:bg-[#1F2937] transition-colors"
                            >
                                <td class="px-6 py-4">
                                    <span class="text-sm font-mono font-semibold text-[#0D6EFD]">
                                        #{{ question.id }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        :class="['px-3 py-1 rounded-lg text-xs font-semibold font-onest uppercase', question.type === 'mcq' ? 'bg-[#0D6EFD]/20 text-[#0D6EFD]' : question.type === 'cq' ? 'bg-[#16A34A]/20 text-[#22C55E]' : 'bg-[#F59E0B]/20 text-[#F59E0B]']"
                                    >
                                        {{ question.type }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm text-white font-onest capitalize">
                                        {{ question.subject }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm text-[#9CA3AF] font-onest">
                                        {{ question.chapter }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-3 py-1 bg-[#1F2937] text-white rounded-lg text-sm font-semibold font-onest">
                                        Class {{ question.class }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm text-[#9CA3AF] font-onest">
                                        {{ dayjs(question.created_at).fromNow() }}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Pagination -->
                <div v-if="questions.links.length > 3" class="px-6 py-4 border-t border-[#374151] flex items-center justify-between">
                    <div class="flex-1 flex justify-between sm:hidden">
                        <Link
                            v-if="questions.prev_page_url"
                            :href="questions.prev_page_url"
                            class="relative inline-flex items-center px-4 py-2 border border-[#374151] text-sm font-medium rounded-md text-white bg-[#1F2937] hover:bg-[#374151]"
                        >
                            Previous
                        </Link>
                        <Link
                            v-if="questions.next_page_url"
                            :href="questions.next_page_url"
                            class="ml-3 relative inline-flex items-center px-4 py-2 border border-[#374151] text-sm font-medium rounded-md text-white bg-[#1F2937] hover:bg-[#374151]"
                        >
                            Next
                        </Link>
                    </div>
                    <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p class="text-sm text-[#9CA3AF] font-onest">
                                Showing
                                <span class="font-medium text-white">{{ questions.from }}</span>
                                to
                                <span class="font-medium text-white">{{ questions.to }}</span>
                                of
                                <span class="font-medium text-white">{{ questions.total }}</span>
                                results
                            </p>
                        </div>
                        <div>
                            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                <template v-for="(link, index) in questions.links" :key="index">
                                    <Link
                                        v-if="link.url"
                                        :href="link.url"
                                        :class="[
                                            'relative inline-flex items-center px-4 py-2 border text-sm font-medium font-onest',
                                            link.active
                                                ? 'z-10 bg-[#0D6EFD] border-[#0D6EFD] text-white'
                                                : 'bg-[#1F2937] border-[#374151] text-[#9CA3AF] hover:bg-[#374151]',
                                            index === 0 ? 'rounded-l-md' : '',
                                            index === questions.links.length - 1 ? 'rounded-r-md' : ''
                                        ]"
                                        v-html="link.label"
                                    />
                                    <span
                                        v-else
                                        :class="[
                                            'relative inline-flex items-center px-4 py-2 border border-[#374151] bg-[#161B22] text-sm font-medium text-[#6B7280] font-onest',
                                            index === 0 ? 'rounded-l-md' : '',
                                            index === questions.links.length - 1 ? 'rounded-r-md' : ''
                                        ]"
                                        v-html="link.label"
                                    />
                                </template>
                            </nav>
                        </div>
                    </div>
                </div>

                <div v-if="questions.data.length === 0" class="py-12 text-center">
                    <p class="text-[#9CA3AF] font-onest">No questions found</p>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

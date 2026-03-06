<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import { Plus, Search, Filter, FileQuestion, TrendingUp, Users, ChevronLeft, ChevronRight, Edit, Trash2, Eye } from 'lucide-vue-next';

// ...

const deleteQuestion = (id) => {
    if (confirm('Are you sure you want to delete this question?')) {
        router.delete(route('admin.questions.destroy', id), {
            preserveScroll: true,
        });
    }
};
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
};

const props = defineProps({
    questions: Object,
    filters: Object,
    stats: Object,
    allSubjects: Array,
    levels: Array,
});

const selectedLevel = ref(props.filters.level_id || "all");
const selectedSubjectId = ref(props.filters.subject_id || "all");
const selectedType = ref(props.filters.type || "all");
const selectedPaperId = ref(props.filters.paper_id || "all");
const selectedChapterId = ref(props.filters.chapter_id || "all");

// Computed properties for cascading filters
const availablePapers = computed(() => {
    if (selectedSubjectId.value === 'all') return [];
    const subject = props.allSubjects.find(s => s.id === parseInt(selectedSubjectId.value));
    return subject ? subject.papers : [];
});

const availableChapters = computed(() => {
    if (selectedPaperId.value === 'all' || selectedSubjectId.value === 'all') return [];
    const subject = props.allSubjects.find(s => s.id === parseInt(selectedSubjectId.value));
    if (!subject) return [];
    const paper = subject.papers.find(p => p.id === parseInt(selectedPaperId.value));
    return paper ? paper.chapters : [];
});

// Watchers for cascading resets
watch(selectedSubjectId, (newVal) => {
    if (newVal === 'all') {
        selectedPaperId.value = 'all';
        selectedChapterId.value = 'all';
    } else {
        // Reset paper if not valid for new subject
        if (selectedPaperId.value !== 'all') {
             const subject = props.allSubjects.find(s => s.id === parseInt(newVal));
             if (subject) {
                 const hasPaper = subject.papers.some(p => p.id === parseInt(selectedPaperId.value));
                 if (!hasPaper) {
                     selectedPaperId.value = 'all';
                     selectedChapterId.value = 'all';
                 }
             }
        }
    }
});

watch(selectedPaperId, (newVal) => {
    if (newVal === 'all') {
        selectedChapterId.value = 'all';
    } else {
        // Reset chapter if not valid
        if (selectedChapterId.value !== 'all' && selectedSubjectId.value !== 'all') {
            const subject = props.allSubjects.find(s => s.id === parseInt(selectedSubjectId.value));
            if (subject) {
                const paper = subject.papers.find(p => p.id === parseInt(newVal));
                if (paper) {
                    const hasChapter = paper.chapters.some(c => c.id === parseInt(selectedChapterId.value));
                    if (!hasChapter) selectedChapterId.value = 'all';
                }
            }
        }
    }
});

const updateFilters = () => {
    router.get(
        route("admin.questions"),
        {
            level_id: selectedLevel.value,
            subject_id: selectedSubjectId.value,
            type: selectedType.value,
            paper_id: selectedPaperId.value,
            chapter_id: selectedChapterId.value,
        },
        { preserveState: true, preserveScroll: true }
    );
};

watch([selectedLevel, selectedSubjectId, selectedType, selectedPaperId, selectedChapterId], debounce(updateFilters, 300));
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
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 font-onest">
                    <!-- Level Filter -->
                    <div>
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-2">
                            Level
                        </label>
                        <select
                            v-model="selectedLevel"
                            class="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors"
                        >
                            <option value="all">All Levels</option>
                            <option v-for="level in levels" :key="level.id" :value="level.id">
                                {{ level.name }}
                            </option>
                        </select>
                    </div>

                    <!-- Subject Filter -->
                    <div>
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-2">
                            Subject
                        </label>
                        <select
                            v-model="selectedSubjectId"
                            class="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors"
                        >
                            <option value="all">All Subjects</option>
                            <option v-for="subject in allSubjects" :key="subject.id" :value="subject.id">
                                {{ subject.name }}
                            </option>
                        </select>
                    </div>

                    <!-- Paper Filter -->
                    <div>
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-2">
                            Paper
                        </label>
                        <select
                            v-model="selectedPaperId"
                            :disabled="selectedSubjectId === 'all'"
                            class="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors disabled:opacity-50"
                        >
                            <option value="all">All Papers</option>
                            <option v-for="paper in availablePapers" :key="paper.id" :value="paper.id">
                                {{ paper.name }}
                            </option>
                        </select>
                    </div>

                    <!-- Chapter Filter -->
                    <div>
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-2">
                            Chapter
                        </label>
                        <select
                            v-model="selectedChapterId"
                            :disabled="selectedPaperId === 'all' || selectedSubjectId === 'all'"
                            class="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors disabled:opacity-50"
                        >
                            <option value="all">All Chapters</option>
                            <option v-for="chapter in availableChapters" :key="chapter.id" :value="chapter.id">
                                {{ chapter.name }}
                            </option>
                        </select>
                    </div>

                    <!-- Type Filter -->
                    <div>
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-2">
                            Type
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
            <!-- Removed as per request -->

            <!-- Recent Questions -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                <div class="p-6 border-b border-[#1F2937]">
                    <h3 class="text-lg font-bold text-white font-montserrat">
                        Questions List
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
                                    Question
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Subject
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Paper
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
                                <th class="px-6 py-4 text-right text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Actions
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
                                    <div class="max-w-md">
                                        <p class="text-sm text-white font-onest truncate" :title="question.content">
                                            {{ question.content.length > 50 ? question.content.substring(0, 50) + '...' : question.content }}
                                        </p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm text-white font-onest capitalize">
                                        {{ question.subject?.name }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm text-[#9CA3AF] font-onest">
                                        {{ question.paper?.name }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm text-[#9CA3AF] font-onest">
                                        {{ question.chapter?.name }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="px-3 py-1 bg-[#1F2937] text-white rounded-lg text-sm font-semibold font-onest">
                                        {{ question.level?.name }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm text-[#9CA3AF] font-onest">
                                        {{ dayjs(question.created_at).fromNow() }}
                                    </span>
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <div class="flex items-center justify-end gap-2">
                                        <Link
                                            :href="route('admin.questions.show', question.id)"
                                            class="p-2 text-[#9CA3AF] hover:text-[#0D6EFD] hover:bg-[#1F2937] rounded-lg transition-colors"
                                            title="View"
                                        >
                                            <Eye :size="18" />
                                        </Link>
                                        <Link
                                            :href="route('admin.questions.edit', question.id)"
                                            class="p-2 text-[#9CA3AF] hover:text-[#0D6EFD] hover:bg-[#1F2937] rounded-lg transition-colors"
                                            title="Edit"
                                        >
                                            <Edit :size="18" />
                                        </Link>
                                        <button
                                            @click="deleteQuestion(question.id)"
                                            class="p-2 text-[#9CA3AF] hover:text-red-500 hover:bg-[#1F2937] rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 :size="18" />
                                        </button>
                                    </div>
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

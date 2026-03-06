<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, watch, computed, onMounted } from 'vue';
import { ArrowLeft, Save, Plus, Search, Filter, Trash2, GripVertical, Check, FileText, ChevronRight, ChevronDown } from 'lucide-vue-next';
import axios from 'axios';
import { debounce } from 'lodash';

const props = defineProps({
    exam: Object,
    subjects: {
        type: Array,
        default: () => [],
    },
    levels: {
        type: Array,
        default: () => [],
    },
});

const step = ref(1);
const availableQuestions = ref([]);
const isSearching = ref(false);

const form = useForm({
    title: props.exam.title,
    target_class: props.exam.target_class,
    level_id: props.exam.level_id,
    subject_id: props.exam.subject_id,
    paper_id: props.exam.paper_id,
    start_time: props.exam.start_time,
    end_time: props.exam.end_time,
    duration_minutes: props.exam.duration_minutes,
    total_marks: props.exam.total_marks,
    is_published: !!props.exam.is_published,
    questions: props.exam.questions || [],
});

// Cascading Filter Logic
const searchFilters = ref({
    level_id: props.exam.level_id || '',
    subject_id: '',
    paper_id: '',
    chapter_id: '',
    module_id: '',
    type: '',
});

// Auto-set search level to exam level
watch(() => form.level_id, (newVal) => {
    searchFilters.value.level_id = newVal;
});

// Computed properties for cascading dropdowns
const availablePapers = computed(() => {
    const subject = props.subjects.find(s => s.id === searchFilters.value.subject_id);
    return subject ? subject.papers : [];
});

const availableChapters = computed(() => {
    const paper = availablePapers.value.find(p => p.id === searchFilters.value.paper_id);
    return paper ? paper.chapters : [];
});

const availableModules = computed(() => {
    const chapter = availableChapters.value.find(c => c.id === searchFilters.value.chapter_id);
    return chapter ? chapter.modules : [];
});

// Watch for filter changes to clear downstream filters
watch(() => searchFilters.value.subject_id, () => {
    searchFilters.value.paper_id = '';
    searchFilters.value.chapter_id = '';
    searchFilters.value.module_id = '';
});

watch(() => searchFilters.value.paper_id, () => {
    searchFilters.value.chapter_id = '';
    searchFilters.value.module_id = '';
});

watch(() => searchFilters.value.chapter_id, () => {
    searchFilters.value.module_id = '';
});

const fetchQuestions = debounce(async () => {
    isSearching.value = true;
    try {
        const params = Object.fromEntries(
            Object.entries(searchFilters.value).filter(([_, v]) => v !== '')
        );
        
        const response = await axios.get(route('admin.api.questions.search'), { params });
        availableQuestions.value = response.data.questions;
    } catch (error) {
        console.error("Failed to fetch questions", error);
    } finally {
        isSearching.value = false;
    }
}, 300);

// Initial fetch and deep watch
watch(searchFilters, fetchQuestions, { deep: true });

const addQuestion = (question) => {
    if (!form.questions.find(q => q.id === question.id)) {
        form.questions.push(question);
        calculateTotalMarks();
    }
};

const removeQuestion = (questionId) => {
    form.questions = form.questions.filter(q => q.id !== questionId);
    calculateTotalMarks();
};

const calculateTotalMarks = () => {
    form.total_marks = form.questions.reduce((sum, q) => sum + q.marks, 0);
};

const submit = () => {
    form.put(route('admin.exams.update', props.exam.id));
};

// Grouped Questions Logic
const groupedQuestions = computed(() => {
    const groups = {
        mcq: {},
        cq: {},
        descriptive: {}
    };
    
    form.questions.forEach(q => {
        const type = q.type; // mcq, cq, descriptive
        const subjectName = q.subject?.name || 'Unknown Subject';
        if (!groups[type][subjectName]) {
            groups[type][subjectName] = [];
        }
        groups[type][subjectName].push(q);
    });
    
    return groups;
});

const typeLabels = {
    mcq: 'MCQ',
    cq: 'Creative Questions (CQ)',
    descriptive: 'Descriptive'
};

const typeColors = {
    mcq: 'text-[#0D6EFD]',
    cq: 'text-[#22C55E]',
    descriptive: 'text-[#F59E0B]'
};

// Toggle state for groups
const expandedGroups = ref({});
const toggleGroup = (key) => {
    expandedGroups.value[key] = !expandedGroups.value[key];
};

// Initialize expanded groups for existing questions
onMounted(() => {
    Object.keys(groupedQuestions.value).forEach(key => {
        expandedGroups.value[key] = true;
    });
});
</script>

<template>
    <Head title="Edit Exam" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <Link
                    :href="route('admin.exams')"
                    class="inline-flex items-center gap-2 text-[#0D6EFD] hover:text-[#0B5ED7] transition-colors font-onest"
                >
                    <ArrowLeft :size="20" />
                    <span class="font-semibold">Back to Exams</span>
                </Link>
                <div class="flex gap-2">
                    <button
                        v-if="step === 2"
                        @click="step = 1"
                        class="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all duration-200 font-onest"
                    >
                        Back to Details
                    </button>
                    <button
                        v-if="step === 1"
                        @click="step = 2"
                        class="px-4 py-2 bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-lg font-semibold transition-all duration-200 font-onest"
                    >
                        Next: Add Questions
                    </button>
                    <button
                        v-if="step === 2"
                        @click="submit"
                        :disabled="form.processing || form.questions.length === 0"
                        class="px-4 py-2 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-[#16A34A]/30 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 font-onest disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save :size="18" />
                        Update Exam
                    </button>
                </div>
            </div>

            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden flex flex-col h-[calc(100vh-140px)]">
                <!-- Step 1: Exam Details -->
                <div v-if="step === 1" class="p-6 md:p-8 overflow-y-auto">
                    <h2 class="text-xl font-bold text-white mb-6 font-montserrat">Edit Exam Details</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Exam Title <span class="text-red-500">*</span></label>
                            <input v-model="form.title" type="text" placeholder="e.g., HSC 2026 Physics First Paper Model Test" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                            <div v-if="form.errors.title" class="text-red-500 text-xs mt-1">{{ form.errors.title }}</div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Level <span class="text-red-500">*</span></label>
                            <select v-model="form.level_id" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="">Select Level</option>
                                <option v-for="level in levels" :key="level.id" :value="level.id">{{ level.name }} ({{ level.code }})</option>
                            </select>
                            <div v-if="form.errors.level_id" class="text-red-500 text-xs mt-1">{{ form.errors.level_id }}</div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Target Class <span class="text-red-500">*</span></label>
                            <select v-model="form.target_class" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="">Select Class</option>
                                <option :value="11">Class 11</option>
                                <option :value="12">Class 12</option>
                            </select>
                            <div v-if="form.errors.target_class" class="text-red-500 text-xs mt-1">{{ form.errors.target_class }}</div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Subject (Optional - Leave empty for Mixed)</label>
                            <select v-model="form.subject_id" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="">Mixed / Multiple Subjects</option>
                                <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Paper (Optional)</label>
                            <select v-if="form.subject_id" v-model="form.paper_id" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="">Select Paper (Optional)</option>
                                <option v-for="paper in subjects.find(s => s.id === form.subject_id)?.papers || []" :key="paper.id" :value="paper.id">{{ paper.name }}</option>
                            </select>
                            <div v-else class="text-[#9CA3AF] text-sm italic mt-2">Select a subject to choose a paper.</div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Duration (Minutes) <span class="text-red-500">*</span></label>
                            <input v-model="form.duration_minutes" type="number" min="1" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                            <div v-if="form.errors.duration_minutes" class="text-red-500 text-xs mt-1">{{ form.errors.duration_minutes }}</div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Start Time <span class="text-red-500">*</span></label>
                            <input v-model="form.start_time" type="datetime-local" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                            <div v-if="form.errors.start_time" class="text-red-500 text-xs mt-1">{{ form.errors.start_time }}</div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">End Time <span class="text-red-500">*</span></label>
                            <input v-model="form.end_time" type="datetime-local" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                            <div v-if="form.errors.end_time" class="text-red-500 text-xs mt-1">{{ form.errors.end_time }}</div>
                        </div>

                        <div class="flex items-center gap-3">
                            <input v-model="form.is_published" type="checkbox" id="published" class="w-5 h-5 text-[#0D6EFD] rounded border-[#374151] bg-[#1F2937]">
                            <label for="published" class="text-sm font-semibold text-white font-onest">Publish Immediately</label>
                        </div>
                    </div>
                </div>

                <!-- Step 2: Add Questions -->
                <div v-else class="flex flex-1 overflow-hidden">
                    <!-- Left: Question Pool -->
                    <div class="w-1/2 border-r border-[#1F2937] flex flex-col">
                        <div class="p-4 border-b border-[#1F2937] bg-[#161B22] space-y-3">
                            <h3 class="text-lg font-bold text-white font-montserrat">Question Bank</h3>
                            
                            <!-- Filters Grid -->
                            <div class="grid grid-cols-2 gap-2">
                                <!-- Subject -->
                                <select v-model="searchFilters.subject_id" class="px-3 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6EFD]">
                                    <option value="">All Subjects</option>
                                    <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                                </select>
                                
                                <!-- Paper -->
                                <select v-model="searchFilters.paper_id" :disabled="!searchFilters.subject_id" class="px-3 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6EFD] disabled:opacity-50">
                                    <option value="">All Papers</option>
                                    <option v-for="paper in availablePapers" :key="paper.id" :value="paper.id">{{ paper.name }}</option>
                                </select>
                                
                                <!-- Chapter -->
                                <select v-model="searchFilters.chapter_id" :disabled="!searchFilters.paper_id" class="px-3 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6EFD] disabled:opacity-50">
                                    <option value="">All Chapters</option>
                                    <option v-for="chapter in availableChapters" :key="chapter.id" :value="chapter.id">{{ chapter.name }}</option>
                                </select>

                                <!-- Module -->
                                <select v-model="searchFilters.module_id" :disabled="!searchFilters.chapter_id" class="px-3 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6EFD] disabled:opacity-50">
                                    <option value="">All Modules</option>
                                    <option v-for="module in availableModules" :key="module.id" :value="module.id">{{ module.name }}</option>
                                </select>
                                
                                <!-- Type -->
                                <select v-model="searchFilters.type" class="px-3 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6EFD]">
                                    <option value="">All Types</option>
                                    <option value="mcq">MCQ</option>
                                    <option value="cq">CQ</option>
                                    <option value="descriptive">Descriptive</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0D1117]">
                            <div v-if="isSearching" class="text-center py-4 text-[#9CA3AF]">Loading questions...</div>
                            <div v-else-if="availableQuestions.length === 0" class="text-center py-4 text-[#9CA3AF]">No questions found matching filters.</div>
                            
                            <div 
                                v-for="question in availableQuestions" 
                                :key="question.id"
                                class="bg-[#1F2937] p-4 rounded-lg border border-[#374151] hover:border-[#0D6EFD] transition-colors cursor-pointer group"
                                @click="addQuestion(question)"
                            >
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-xs font-mono text-[#0D6EFD]">#{{ question.id }}</span>
                                    <span class="text-xs px-2 py-0.5 rounded bg-[#374151] text-white uppercase">{{ question.type }}</span>
                                </div>
                                <p class="text-sm text-white line-clamp-2 mb-2 font-onest">{{ question.content }}</p>
                                <div class="flex flex-wrap gap-2 text-xs text-[#9CA3AF]">
                                    <span class="bg-[#374151] px-1.5 py-0.5 rounded">{{ question.subject?.name }}</span>
                                    <span>{{ question.chapter?.name }}</span>
                                    <span>{{ question.marks }} Marks</span>
                                </div>
                                <div v-if="form.questions.find(q => q.id === question.id)" class="mt-2 text-xs text-[#22C55E] flex items-center gap-1">
                                    <Check :size="12" /> Added
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Selected Questions Preview -->
                    <div class="w-1/2 flex flex-col bg-[#161B22]">
                        <div class="p-4 border-b border-[#1F2937] flex justify-between items-center bg-[#161B22]">
                            <div>
                                <h3 class="text-lg font-bold text-white font-montserrat">Exam Structure</h3>
                                <p class="text-xs text-[#9CA3AF]">{{ form.questions.length }} Questions • {{ form.total_marks }} Marks Total</p>
                            </div>
                        </div>

                        <div class="flex-1 overflow-y-auto p-4 space-y-4">
                            <div v-if="form.questions.length === 0" class="h-full flex flex-col items-center justify-center text-[#9CA3AF]">
                                <FileText :size="48" class="mb-4 opacity-50" />
                                <p>No questions selected yet</p>
                                <p class="text-sm">Use filters on the left to find and add questions</p>
                            </div>

                            <!-- Grouped Display -->
                            <div v-else class="space-y-4">
                                <div v-for="(subjects, type) in groupedQuestions" :key="type" v-show="Object.keys(subjects).length > 0">
                                    <!-- Type Header -->
                                    <div class="bg-[#1F2937] px-4 py-2 rounded-t-xl border border-[#374151] border-b-0 flex justify-between items-center cursor-pointer" @click="toggleGroup(type)">
                                        <h4 :class="['font-bold font-montserrat flex items-center gap-2 uppercase tracking-wider text-sm', typeColors[type]]">
                                            <ChevronRight v-if="!expandedGroups[type]" :size="16" />
                                            <ChevronDown v-else :size="16" />
                                            {{ typeLabels[type] }}
                                        </h4>
                                        <span class="text-xs text-[#9CA3AF]">
                                            {{ Object.values(subjects).flat().length }} Qs
                                        </span>
                                    </div>

                                    <!-- Subjects Body -->
                                    <div v-show="expandedGroups[type]" class="bg-[#1F2937] border border-[#374151] rounded-b-xl p-4 space-y-4">
                                        <div v-for="(questions, subject) in subjects" :key="subject">
                                            <h5 class="text-xs font-bold text-white mb-2 border-b border-[#374151] pb-1 flex justify-between">
                                                <span>{{ subject }}</span>
                                                <span class="text-[#9CA3AF] font-normal">{{ questions.length }}</span>
                                            </h5>
                                            <div class="space-y-2">
                                                <div v-for="q in questions" :key="q.id" class="flex gap-2 items-start bg-[#0D1117] p-2 rounded border border-[#374151]">
                                                    <button @click="removeQuestion(q.id)" class="text-[#EF4444] hover:bg-[#1F2937] p-1 rounded shrink-0">
                                                        <Trash2 :size="14" />
                                                    </button>
                                                    <div>
                                                        <p class="text-xs text-white line-clamp-1">{{ q.content }}</p>
                                                        <p class="text-[10px] text-[#9CA3AF]">{{ q.chapter }} • {{ q.marks }} Marks</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

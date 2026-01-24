<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, watch, computed } from 'vue';
import { ArrowLeft, Save, Plus, Search, Filter, Trash2, GripVertical, Check, FileText } from 'lucide-vue-next';
import axios from 'axios';
import { debounce } from 'lodash';

const step = ref(1);
const availableQuestions = ref([]);
const isSearching = ref(false);

const form = useForm({
    title: '',
    class: '',
    subject: '',
    paper: '',
    start_time: '',
    end_time: '',
    duration_minutes: '',
    total_marks: 0,
    is_published: false,
    questions: [],
});

const searchFilters = ref({
    class: '',
    subject: '',
    chapter: '',
    type: '',
});

// Watch for class/subject changes to auto-filter questions
watch(() => form.class, (val) => searchFilters.value.class = val);
watch(() => form.subject, (val) => searchFilters.value.subject = val);

const fetchQuestions = debounce(async () => {
    isSearching.value = true;
    try {
        const response = await axios.get(route('admin.api.questions.search'), {
            params: searchFilters.value
        });
        availableQuestions.value = response.data.questions;
    } catch (error) {
        console.error("Failed to fetch questions", error);
    } finally {
        isSearching.value = false;
    }
}, 300);

// Initial fetch
watch(searchFilters, fetchQuestions, { deep: true });

const addQuestion = (question) => {
    if (!form.questions.find(q => q.id === question.id)) {
        form.questions.push(question);
        calculateTotalMarks();
    }
};

const removeQuestion = (index) => {
    form.questions.splice(index, 1);
    calculateTotalMarks();
};

const calculateTotalMarks = () => {
    form.total_marks = form.questions.reduce((sum, q) => sum + q.marks, 0);
};

const submit = () => {
    form.post(route('admin.exams.store'));
};
</script>

<template>
    <Head title="Create Exam" />

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
                        Create Exam
                    </button>
                </div>
            </div>

            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                <!-- Step 1: Exam Details -->
                <div v-if="step === 1" class="p-6 md:p-8">
                    <h2 class="text-xl font-bold text-white mb-6 font-montserrat">Exam Details</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Exam Title <span class="text-red-500">*</span></label>
                            <input v-model="form.title" type="text" placeholder="e.g., HSC 2026 Physics First Paper Model Test" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                            <div v-if="form.errors.title" class="text-red-500 text-xs mt-1">{{ form.errors.title }}</div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Class <span class="text-red-500">*</span></label>
                            <select v-model="form.class" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="">Select Class</option>
                                <option value="11">Class 11</option>
                                <option value="12">Class 12</option>
                            </select>
                            <div v-if="form.errors.class" class="text-red-500 text-xs mt-1">{{ form.errors.class }}</div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Subject <span class="text-red-500">*</span></label>
                            <select v-model="form.subject" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="">Select Subject</option>
                                <option value="mathematics">Mathematics</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="biology">Biology</option>
                            </select>
                            <div v-if="form.errors.subject" class="text-red-500 text-xs mt-1">{{ form.errors.subject }}</div>
                        </div>

                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">Paper <span class="text-red-500">*</span></label>
                            <select v-model="form.paper" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="">Select Paper</option>
                                <option value="paper1">Paper 1</option>
                                <option value="paper2">Paper 2</option>
                            </select>
                            <div v-if="form.errors.paper" class="text-red-500 text-xs mt-1">{{ form.errors.paper }}</div>
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
                <div v-else class="flex h-[calc(100vh-200px)]">
                    <!-- Left: Question Pool -->
                    <div class="w-1/2 border-r border-[#1F2937] flex flex-col">
                        <div class="p-4 border-b border-[#1F2937] bg-[#161B22]">
                            <h3 class="text-lg font-bold text-white mb-4 font-montserrat">Question Bank</h3>
                            <div class="grid grid-cols-2 gap-2 mb-2">
                                <input v-model="searchFilters.chapter" type="text" placeholder="Search Chapter..." class="px-3 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-sm text-white focus:outline-none focus:border-[#0D6EFD]">
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
                                <div class="flex justify-between items-center text-xs text-[#9CA3AF]">
                                    <span>{{ question.chapter }}</span>
                                    <span>{{ question.marks }} Marks</span>
                                </div>
                                <div v-if="form.questions.find(q => q.id === question.id)" class="mt-2 text-xs text-[#22C55E] flex items-center gap-1">
                                    <Check :size="12" /> Added
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: Selected Questions -->
                    <div class="w-1/2 flex flex-col bg-[#161B22]">
                        <div class="p-4 border-b border-[#1F2937] flex justify-between items-center">
                            <div>
                                <h3 class="text-lg font-bold text-white font-montserrat">Selected Questions</h3>
                                <p class="text-xs text-[#9CA3AF]">{{ form.questions.length }} Questions • {{ form.total_marks }} Marks Total</p>
                            </div>
                        </div>

                        <div class="flex-1 overflow-y-auto p-4 space-y-3">
                            <div v-if="form.questions.length === 0" class="h-full flex flex-col items-center justify-center text-[#9CA3AF]">
                                <FileText :size="48" class="mb-4 opacity-50" />
                                <p>No questions selected yet</p>
                                <p class="text-sm">Click questions from the left to add them</p>
                            </div>

                            <div 
                                v-for="(question, index) in form.questions" 
                                :key="question.id"
                                class="bg-[#1F2937] p-4 rounded-lg border border-[#374151] flex gap-3 group"
                            >
                                <div class="flex flex-col items-center gap-2 pt-1 text-[#9CA3AF] cursor-move">
                                    <span class="text-xs font-mono">{{ index + 1 }}</span>
                                    <GripVertical :size="16" />
                                </div>
                                <div class="flex-1">
                                    <div class="flex justify-between items-start mb-1">
                                        <span class="text-xs font-semibold text-white uppercase bg-[#374151] px-2 py-0.5 rounded">{{ question.type }}</span>
                                        <button @click="removeQuestion(index)" class="text-[#DC2626] hover:bg-[#DC2626]/10 p-1 rounded transition-colors">
                                            <Trash2 :size="16" />
                                        </button>
                                    </div>
                                    <p class="text-sm text-white line-clamp-2 mb-1 font-onest">{{ question.content }}</p>
                                    <div class="flex justify-between text-xs text-[#9CA3AF]">
                                        <span>{{ question.chapter }}</span>
                                        <span>{{ question.marks }} Marks</span>
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

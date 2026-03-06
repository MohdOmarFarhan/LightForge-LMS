<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, computed, watch, onMounted } from 'vue';
import { ArrowLeft, Save, Plus, X } from 'lucide-vue-next';
import RichTextEditor from '@/Components/RichTextEditor.vue';

const props = defineProps({
    question: Object,
    subjects: {
        type: Array,
        default: () => [],
    },
    levels: {
        type: Array,
        default: () => [],
    },
});

const form = useForm({
    level_id: props.question.level_id,
    subject_id: props.question.subject_id,
    paper_id: props.question.paper_id,
    chapter_id: props.question.chapter_id,
    module_id: props.question.module_id,
    type: props.question.type,
    difficulty: props.question.difficulty,
    marks: props.question.marks,
    time_limit: props.question.time_limit,
    content: props.question.content,
    options: props.question.options || ["", "", "", ""],
    correct_answer: props.question.correct_answer,
    sub_questions: props.question.sub_questions || { a: "", b: "", c: "", d: "" },
});

// UI State for correct option index
const correctOptionIndex = ref(0);

// Initialize correctOptionIndex based on correct_answer
if (form.type === 'mcq' && form.correct_answer && form.options) {
    const index = form.options.indexOf(form.correct_answer);
    if (index !== -1) correctOptionIndex.value = index;
}

// Cascading Dropdown Logic
const selectedSubjectId = ref(props.question.subject_id);
const selectedPaperId = ref(props.question.paper_id);
const selectedChapterId = ref(props.question.chapter_id);
const selectedModuleId = ref(props.question.module_id);

const availablePapers = computed(() => {
    const subject = props.subjects.find(s => s.id === selectedSubjectId.value);
    return subject ? subject.papers : [];
});

const availableChapters = computed(() => {
    const paper = availablePapers.value.find(p => p.id === selectedPaperId.value);
    return paper ? paper.chapters : [];
});

const availableModules = computed(() => {
    const chapter = availableChapters.value.find(c => c.id === selectedChapterId.value);
    return chapter ? chapter.modules : [];
});

// Watchers
watch(selectedSubjectId, (newVal) => {
    if (newVal !== form.subject_id) {
        form.subject_id = newVal;
        selectedPaperId.value = ""; selectedChapterId.value = ""; selectedModuleId.value = "";
        form.paper_id = ""; form.chapter_id = ""; form.module_id = "";
    }
});

watch(selectedPaperId, (newVal) => {
    if (newVal !== form.paper_id) {
        form.paper_id = newVal;
        selectedChapterId.value = ""; selectedModuleId.value = "";
        form.chapter_id = ""; form.module_id = "";
    }
});

watch(selectedChapterId, (newVal) => {
    if (newVal !== form.chapter_id) {
        form.chapter_id = newVal;
        selectedModuleId.value = "";
        form.module_id = "";
    }
});

watch(selectedModuleId, (newVal) => {
    if (newVal !== form.module_id) {
        form.module_id = newVal;
    }
});

const handleAddOption = () => {
    form.options.push("");
};

const handleRemoveOption = (optIndex) => {
    if (form.options.length > 2) {
        form.options = form.options.filter((_, i) => i !== optIndex);
        if (correctOptionIndex.value === optIndex) correctOptionIndex.value = 0;
        else if (correctOptionIndex.value > optIndex) correctOptionIndex.value--;
    }
};

const submit = () => {
    if (form.type === 'mcq') {
        form.correct_answer = form.options[correctOptionIndex.value];
    }

    form.put(route('admin.questions.update', props.question.id), {
        onSuccess: () => {
            // Optional: toast notification
        },
    });
};
</script>

<template>
    <Head title="Edit Question" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <Link
                    :href="route('admin.questions')"
                    class="inline-flex items-center gap-2 text-[#0D6EFD] hover:text-[#0B5ED7] transition-colors font-onest"
                >
                    <ArrowLeft :size="20" />
                    <span class="font-semibold">Back to Questions</span>
                </Link>
                <h1 class="text-2xl font-bold text-white font-montserrat">Edit Question</h1>
            </div>

            <form @submit.prevent="submit" class="space-y-6">
                <!-- 1. Common Metadata Section -->
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <span class="bg-[#0D6EFD] w-1 h-6 rounded-full"></span>
                        Details
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- Level/Class -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Level *</label>
                            <select v-model="form.level_id" class="w-full px-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors">
                                <option value="">Select Level</option>
                                <option v-for="level in levels" :key="level.id" :value="level.id">{{ level.name }} ({{ level.code }})</option>
                            </select>
                            <div v-if="form.errors.level_id" class="text-red-500 text-xs mt-1">{{ form.errors.level_id }}</div>
                        </div>

                        <!-- Subject -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Subject *</label>
                            <select v-model="selectedSubjectId" class="w-full px-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors">
                                <option value="">Select Subject</option>
                                <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                            </select>
                            <div v-if="form.errors.subject_id" class="text-red-500 text-xs mt-1">{{ form.errors.subject_id }}</div>
                        </div>

                        <!-- Paper -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Paper *</label>
                            <select v-model="selectedPaperId" :disabled="!selectedSubjectId" class="w-full px-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors disabled:opacity-50">
                                <option value="">Select Paper</option>
                                <option v-for="paper in availablePapers" :key="paper.id" :value="paper.id">{{ paper.name }}</option>
                            </select>
                            <div v-if="form.errors.paper_id" class="text-red-500 text-xs mt-1">{{ form.errors.paper_id }}</div>
                        </div>

                        <!-- Chapter -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Chapter *</label>
                            <select v-model="selectedChapterId" :disabled="!selectedPaperId" class="w-full px-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors disabled:opacity-50">
                                <option value="">Select Chapter</option>
                                <option v-for="chapter in availableChapters" :key="chapter.id" :value="chapter.id">Chapter {{ chapter.number }}: {{ chapter.name }}</option>
                            </select>
                            <div v-if="form.errors.chapter_id" class="text-red-500 text-xs mt-1">{{ form.errors.chapter_id }}</div>
                        </div>

                        <!-- Module -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Module</label>
                            <select v-model="selectedModuleId" :disabled="!selectedChapterId" class="w-full px-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors disabled:opacity-50">
                                <option value="">Select Module</option>
                                <option v-for="module in availableModules" :key="module.id" :value="module.id">Module {{ module.number }}: {{ module.name }}</option>
                            </select>
                        </div>

                        <!-- Difficulty -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Difficulty</label>
                            <select v-model="form.difficulty" class="w-full px-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors">
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>

                        <!-- Marks -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Marks *</label>
                            <input type="number" v-model="form.marks" min="1" class="w-full px-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors" />
                            <div v-if="form.errors.marks" class="text-red-500 text-xs mt-1">{{ form.errors.marks }}</div>
                        </div>

                        <!-- Time -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Time (min)</label>
                            <input type="number" v-model="form.time_limit" min="1" class="w-full px-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors" />
                        </div>
                    </div>

                    <!-- Question Type Selection -->
                    <div class="mt-6">
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-3 font-onest">Question Type *</label>
                        <div class="flex gap-3 font-onest">
                            <button type="button" @click="form.type = 'mcq'" :class="['px-6 py-2.5 rounded-lg font-semibold transition-all', form.type === 'mcq' ? 'bg-[#0D6EFD] text-white' : 'bg-[#0D1117] text-[#9CA3AF] border border-[#374151] hover:bg-[#1F2937]']">MCQ</button>
                            <button type="button" @click="form.type = 'cq'" :class="['px-6 py-2.5 rounded-lg font-semibold transition-all', form.type === 'cq' ? 'bg-[#0D6EFD] text-white' : 'bg-[#0D1117] text-[#9CA3AF] border border-[#374151] hover:bg-[#1F2937]']">CQ (Creative)</button>
                            <button type="button" @click="form.type = 'descriptive'" :class="['px-6 py-2.5 rounded-lg font-semibold transition-all', form.type === 'descriptive' ? 'bg-[#0D6EFD] text-white' : 'bg-[#0D1117] text-[#9CA3AF] border border-[#374151] hover:bg-[#1F2937]']">Descriptive</button>
                        </div>
                    </div>
                </div>

                <!-- 2. Question Content -->
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <h2 class="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <span class="bg-[#0D6EFD] w-1 h-6 rounded-full"></span>
                        Content
                    </h2>

                    <div class="space-y-4">
                         <!-- Question Content -->
                        <div class="mb-4">
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">
                                {{ form.type === 'cq' ? 'Stem/Passage' : 'Question Content' }} *
                            </label>
                            <RichTextEditor
                                v-model="form.content"
                                placeholder="Enter question text..."
                            />
                            <div v-if="form.errors.content" class="text-red-500 text-xs mt-1">Content is required</div>
                        </div>

                        <!-- MCQ Options -->
                        <div v-if="form.type === 'mcq'" class="space-y-3 pl-4 border-l-2 border-[#1F2937]">
                            <div v-for="(opt, optIndex) in form.options" :key="optIndex" class="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="correct-option"
                                    :checked="correctOptionIndex === optIndex"
                                    @change="correctOptionIndex = optIndex"
                                    class="w-4 h-4 text-[#0D6EFD] bg-[#0D1117] border-[#374151]"
                                />
                                <input
                                    type="text"
                                    v-model="form.options[optIndex]"
                                    :placeholder="`Option ${String.fromCharCode(65 + optIndex)}`"
                                    class="flex-1 px-3 py-2 bg-[#0D1117] border border-[#374151] rounded-lg text-white text-sm focus:outline-none focus:border-[#0D6EFD] transition-colors"
                                />
                                <button v-if="form.options.length > 2" type="button" @click="handleRemoveOption(optIndex)" class="text-[#EF4444] hover:bg-[#1F2937] p-1.5 rounded">
                                    <X :size="16" />
                                </button>
                            </div>
                            <button type="button" @click="handleAddOption" class="text-xs font-semibold text-[#0D6EFD] hover:underline flex items-center gap-1 mt-2">
                                <Plus :size="14" /> Add Option
                            </button>
                        </div>

                        <!-- CQ Sub-questions -->
                        <div v-if="form.type === 'cq'" class="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-[#1F2937]">
                            <div v-for="letter in ['a', 'b', 'c', 'd']" :key="letter">
                                <label class="block text-xs font-semibold text-[#9CA3AF] mb-1 uppercase">Question {{ letter }}</label>
                                <RichTextEditor
                                    v-model="form.sub_questions[letter]"
                                    placeholder="Enter sub-question..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="flex gap-4 pt-4 border-t border-[#1F2937]">
                    <Link
                        :href="route('admin.questions')"
                        class="flex-1 px-6 py-3 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all text-center"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="flex-1 px-6 py-3 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-[#16A34A]/30 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                    >
                        <Save :size="20" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>

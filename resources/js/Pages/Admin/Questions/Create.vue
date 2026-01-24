<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import { ArrowLeft, Save, Plus, X } from 'lucide-vue-next';

const questionType = ref("mcq");
const mcqOptions = ref(["", "", "", ""]);
const correctOption = ref(0);
const subQuestions = ref({
    a: "",
    b: "",
    c: "",
    d: ""
});

const form = useForm({
    type: 'mcq',
    content: '',
    class: '',
    subject: '',
    paper: '',
    chapter: '',
    module: '',
    difficulty: 'medium',
    marks: 1,
    time_limit: null,
    options: [],
    correct_answer: null,
    sub_questions: null,
});

const handleAddOption = () => {
    mcqOptions.value.push("");
};

const handleRemoveOption = (index) => {
    if (mcqOptions.value.length > 2) {
        mcqOptions.value = mcqOptions.value.filter((_, i) => i !== index);
        if (correctOption.value === index) {
            correctOption.value = 0;
        } else if (correctOption.value > index) {
            correctOption.value--;
        }
    }
};

const submit = () => {
    form.type = questionType.value;
    
    if (form.type === 'mcq') {
        form.options = mcqOptions.value;
        form.correct_answer = mcqOptions.value[correctOption.value];
        form.sub_questions = null;
    } else if (form.type === 'cq') {
        form.sub_questions = subQuestions.value;
        form.options = null;
        form.correct_answer = null;
    } else {
        form.options = null;
        form.correct_answer = null;
        form.sub_questions = null;
    }

    form.post(route('admin.questions.store'), {
        onSuccess: () => {
            // Reset logic if needed or redirect handles it
        },
    });
};
</script>

<template>
    <Head title="Add Question" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Back Button -->
            <Link
                :href="route('admin.questions')"
                class="inline-flex items-center gap-2 text-[#0D6EFD] hover:text-[#0B5ED7] transition-colors font-onest"
            >
                <ArrowLeft :size="20" />
                <span class="font-semibold">Back to Questions</span>
            </Link>

            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6 md:p-8">
                <h1 class="text-2xl font-bold text-white mb-6 font-montserrat">Add New Question</h1>

                <form @submit.prevent="submit" class="space-y-6">
                    <!-- Basic Info Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Class -->
                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">
                                Class <span class="text-[#DC2626]">*</span>
                            </label>
                            <select v-model="form.class" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="">Select Class</option>
                                <option value="11">Class 11</option>
                                <option value="12">Class 12</option>
                            </select>
                            <div v-if="form.errors.class" class="text-red-500 text-xs mt-1">{{ form.errors.class }}</div>
                        </div>

                        <!-- Subject -->
                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">
                                Subject <span class="text-[#DC2626]">*</span>
                            </label>
                            <select v-model="form.subject" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="">Select Subject</option>
                                <option value="mathematics">Mathematics</option>
                                <option value="physics">Physics</option>
                                <option value="chemistry">Chemistry</option>
                                <option value="biology">Biology</option>
                            </select>
                            <div v-if="form.errors.subject" class="text-red-500 text-xs mt-1">{{ form.errors.subject }}</div>
                        </div>

                        <!-- Paper -->
                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">
                                Paper <span class="text-[#DC2626]">*</span>
                            </label>
                            <select v-model="form.paper" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="">Select Paper</option>
                                <option value="paper1">Paper 1</option>
                                <option value="paper2">Paper 2</option>
                            </select>
                            <div v-if="form.errors.paper" class="text-red-500 text-xs mt-1">{{ form.errors.paper }}</div>
                        </div>

                        <!-- Chapter -->
                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">
                                Chapter <span class="text-[#DC2626]">*</span>
                            </label>
                            <input
                                type="text"
                                v-model="form.chapter"
                                placeholder="e.g., Calculus, Thermodynamics"
                                class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                            />
                            <div v-if="form.errors.chapter" class="text-red-500 text-xs mt-1">{{ form.errors.chapter }}</div>
                        </div>

                        <!-- Module -->
                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">
                                Module/Topic
                            </label>
                            <input
                                type="text"
                                v-model="form.module"
                                placeholder="e.g., Derivatives, Heat Transfer"
                                class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                            />
                        </div>

                        <!-- Difficulty -->
                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">
                                Difficulty Level
                            </label>
                            <select v-model="form.difficulty" class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest">
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                        </div>
                    </div>

                    <!-- Question Type -->
                    <div>
                        <label class="block text-sm font-semibold text-white mb-3 font-onest">
                            Question Type <span class="text-[#DC2626]">*</span>
                        </label>
                        <div class="flex gap-3 font-onest">
                            <button
                                type="button"
                                @click="questionType = 'mcq'"
                                :class="['flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200', questionType === 'mcq' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                MCQ
                            </button>
                            <button
                                type="button"
                                @click="questionType = 'cq'"
                                :class="['flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200', questionType === 'cq' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                CQ (Creative)
                            </button>
                            <button
                                type="button"
                                @click="questionType = 'descriptive'"
                                :class="['flex-1 px-6 py-3 rounded-lg font-semibold transition-all duration-200', questionType === 'descriptive' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                Descriptive
                            </button>
                        </div>
                    </div>

                    <!-- Question Content -->
                    <div>
                        <label class="block text-sm font-semibold text-white mb-2 font-onest">
                            {{ questionType === 'cq' ? 'Stem/Passage' : 'Question' }}
                            <span class="text-[#DC2626]">*</span>
                        </label>
                        <textarea
                            v-model="form.content"
                            rows="6"
                            :placeholder="questionType === 'cq' ? 'Enter the stem or passage...' : 'Enter your question here...'"
                            class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors resize-none font-onest"
                        ></textarea>
                        <div v-if="form.errors.content" class="text-red-500 text-xs mt-1">{{ form.errors.content }}</div>
                    </div>

                    <!-- MCQ Options -->
                    <div v-if="questionType === 'mcq'">
                        <div class="flex items-center justify-between mb-3">
                            <label class="block text-sm font-semibold text-white font-onest">
                                Answer Options <span class="text-[#DC2626]">*</span>
                            </label>
                            <button
                                type="button"
                                @click="handleAddOption"
                                class="flex items-center gap-2 px-3 py-1 bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-lg text-sm font-semibold transition-all duration-200 font-onest"
                            >
                                <Plus :size="16" />
                                Add Option
                            </button>
                        </div>
                        <div class="space-y-3">
                            <div v-for="(option, index) in mcqOptions" :key="index" class="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="correctAnswer"
                                    :checked="correctOption === index"
                                    @change="correctOption = index"
                                    class="w-5 h-5 text-[#0D6EFD]"
                                />
                                <input
                                    type="text"
                                    v-model="mcqOptions[index]"
                                    :placeholder="`Option ${String.fromCharCode(65 + index)}`"
                                    class="flex-1 px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                                />
                                <button
                                    v-if="mcqOptions.length > 2"
                                    type="button"
                                    @click="handleRemoveOption(index)"
                                    class="p-2 hover:bg-[#DC2626]/20 rounded-lg transition-all duration-200"
                                >
                                    <X :size="20" class="text-[#DC2626]" />
                                </button>
                            </div>
                        </div>
                        <p class="text-xs text-[#9CA3AF] mt-2 font-onest">
                            Select the radio button to mark the correct answer
                        </p>
                    </div>

                    <!-- CQ Sub-questions -->
                    <div v-if="questionType === 'cq'">
                        <label class="block text-sm font-semibold text-white mb-3 font-onest">
                            Sub-questions <span class="text-[#DC2626]">*</span>
                        </label>
                        <div class="space-y-4">
                            <div v-for="letter in ['a', 'b', 'c', 'd']" :key="letter">
                                <label class="block text-xs font-semibold text-[#9CA3AF] mb-2 font-onest">
                                    Question {{ letter.toUpperCase() }}
                                </label>
                                <textarea
                                    v-model="subQuestions[letter]"
                                    rows="3"
                                    :placeholder="`Enter sub-question ${letter.toUpperCase()}...`"
                                    class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors resize-none font-onest"
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- Marks -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">
                                Marks <span class="text-[#DC2626]">*</span>
                            </label>
                            <input
                                type="number"
                                v-model="form.marks"
                                min="1"
                                placeholder="e.g., 5"
                                class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                            />
                            <div v-if="form.errors.marks" class="text-red-500 text-xs mt-1">{{ form.errors.marks }}</div>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-white mb-2 font-onest">
                                Time (minutes)
                            </label>
                            <input
                                type="number"
                                v-model="form.time_limit"
                                min="1"
                                placeholder="e.g., 3"
                                class="w-full px-4 py-3 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                            />
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="flex gap-4 pt-4 font-onest">
                        <Link
                            :href="route('admin.questions')"
                            class="flex-1 px-6 py-3 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all duration-200 text-center"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            :disabled="form.processing"
                            class="flex-1 px-6 py-3 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-[#16A34A]/30 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
                        >
                            <Save :size="20" />
                            Save Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </AdminLayout>
</template>

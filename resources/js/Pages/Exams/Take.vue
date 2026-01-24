<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted } from 'vue';
import { Clock, AlertTriangle, Check, ArrowRight, ArrowLeft } from 'lucide-vue-next';

const props = defineProps({
    exam: Object,
    attempt: Object,
    remainingSeconds: Number,
});

const currentQuestionIndex = ref(0);
const timeLeft = ref(props.remainingSeconds);
const timerInterval = ref(null);

const form = useForm({
    answers: {},
});

// Initialize answers structure
props.exam.questions.forEach(question => {
    if (!form.answers[question.id]) {
        form.answers[question.id] = {
            answer_text: '',
            answer_images: [],
        };
    }
});

const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

onMounted(() => {
    timerInterval.value = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--;
        } else {
            submitExam();
        }
    }, 1000);
});

onUnmounted(() => {
    clearInterval(timerInterval.value);
});

const submitExam = () => {
    clearInterval(timerInterval.value);
    form.post(route('exams.submit', props.exam.id));
};

const nextQuestion = () => {
    if (currentQuestionIndex.value < props.exam.questions.length - 1) {
        currentQuestionIndex.value++;
    }
};

const prevQuestion = () => {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
    }
};

const selectMcqOption = (questionId, option) => {
    form.answers[questionId].answer_text = option;
};
</script>

<template>
    <Head :title="`Taking Exam: ${exam.title}`" />

    <div class="min-h-screen bg-[#F3F4F6] dark:bg-[#0B0F1A] text-[#0B0F1A] dark:text-[#E5E7EB] font-inter">
        <!-- Sticky Header -->
        <header class="sticky top-0 z-50 bg-white dark:bg-[#1E1E1E] border-b border-[#E7ECF3] dark:border-[#2A2A2A] shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div>
                        <h1 class="font-bold text-lg md:text-xl font-montserrat truncate max-w-md">
                            {{ exam.title }}
                        </h1>
                        <p class="text-xs text-[#64748B] dark:text-[#9CA3AF]">
                            Question {{ currentQuestionIndex + 1 }} of {{ exam.questions.length }}
                        </p>
                    </div>

                    <div class="flex items-center gap-4">
                        <div 
                            :class="[
                                'flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-bold text-lg transition-colors',
                                timeLeft < 300 ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' : 'bg-[#E3F2FD] text-[#0066FF] dark:bg-[#1A2744] dark:text-[#2196F3]'
                            ]"
                        >
                            <Clock :size="20" />
                            {{ formatTime(timeLeft) }}
                        </div>
                        <button
                            @click="submitExam"
                            :disabled="form.processing"
                            class="hidden md:flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-[#16A34A]/30 text-white rounded-lg font-semibold transition-all duration-200"
                        >
                            <Check :size="18" />
                            Submit Exam
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <!-- Question Card -->
            <div class="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 shadow-sm">
                <div class="flex justify-between items-start mb-6">
                    <span class="inline-block px-3 py-1 rounded bg-[#F7F9FC] dark:bg-[#262626] text-[#64748B] dark:text-[#9CA3AF] text-xs font-bold uppercase tracking-wider">
                        {{ exam.questions[currentQuestionIndex].type }}
                    </span>
                    <span class="text-sm font-semibold text-[#64748B] dark:text-[#9CA3AF]">
                        {{ exam.questions[currentQuestionIndex].marks }} Marks
                    </span>
                </div>

                <div class="prose dark:prose-invert max-w-none mb-8">
                    <p class="text-lg md:text-xl font-medium leading-relaxed">
                        {{ exam.questions[currentQuestionIndex].content }}
                    </p>
                    
                    <!-- Sub-questions for CQ -->
                    <div v-if="exam.questions[currentQuestionIndex].sub_questions" class="mt-4 space-y-3 pl-4 border-l-2 border-[#E7ECF3] dark:border-[#2A2A2A]">
                        <div v-for="(text, key) in exam.questions[currentQuestionIndex].sub_questions" :key="key">
                            <span class="font-bold text-[#0066FF] dark:text-[#2196F3]">{{ key }}.</span> 
                            <span class="ml-2">{{ text }}</span>
                        </div>
                    </div>
                </div>

                <!-- Answer Section -->
                <div class="mt-8 pt-8 border-t border-[#E7ECF3] dark:border-[#2A2A2A]">
                    <!-- MCQ Options -->
                    <div v-if="exam.questions[currentQuestionIndex].type === 'mcq'" class="space-y-3">
                        <div 
                            v-for="(option, idx) in exam.questions[currentQuestionIndex].options" 
                            :key="idx"
                            @click="selectMcqOption(exam.questions[currentQuestionIndex].id, option)"
                            :class="[
                                'flex items-center p-4 rounded-lg border cursor-pointer transition-all duration-200 group',
                                form.answers[exam.questions[currentQuestionIndex].id].answer_text === option
                                    ? 'border-[#0066FF] bg-[#E3F2FD] dark:bg-[#1A2744] dark:border-[#2196F3]' 
                                    : 'border-[#E7ECF3] dark:border-[#374151] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]'
                            ]"
                        >
                            <div :class="[
                                'w-5 h-5 rounded-full border flex items-center justify-center mr-4 transition-colors',
                                form.answers[exam.questions[currentQuestionIndex].id].answer_text === option
                                    ? 'border-[#0066FF] dark:border-[#2196F3] bg-[#0066FF] dark:bg-[#2196F3]'
                                    : 'border-[#9CA3AF]'
                            ]">
                                <div v-if="form.answers[exam.questions[currentQuestionIndex].id].answer_text === option" class="w-2 h-2 rounded-full bg-white"></div>
                            </div>
                            <span :class="[
                                'font-medium',
                                form.answers[exam.questions[currentQuestionIndex].id].answer_text === option
                                    ? 'text-[#0066FF] dark:text-[#2196F3]'
                                    : 'text-[#0B0F1A] dark:text-[#E5E7EB]'
                            ]">
                                {{ option }}
                            </span>
                        </div>
                    </div>

                    <!-- Text Area for CQ/Descriptive -->
                    <div v-else>
                        <label class="block text-sm font-semibold text-[#64748B] dark:text-[#9CA3AF] mb-2">Your Answer</label>
                        <textarea
                            v-model="form.answers[exam.questions[currentQuestionIndex].id].answer_text"
                            rows="8"
                            class="w-full px-4 py-3 bg-[#F7F9FC] dark:bg-[#0D1117] border border-[#E7ECF3] dark:border-[#374151] rounded-lg text-[#0B0F1A] dark:text-[#E5E7EB] placeholder-[#9CA3AF] focus:outline-none focus:border-[#0066FF] dark:focus:border-[#2196F3] transition-colors resize-none font-onest"
                            placeholder="Type your answer here..."
                        ></textarea>
                        <!-- Image Upload Placeholder -->
                        <div class="mt-4 p-4 border-2 border-dashed border-[#E7ECF3] dark:border-[#374151] rounded-lg text-center cursor-pointer hover:border-[#0066FF] dark:hover:border-[#2196F3] transition-colors">
                            <p class="text-sm text-[#64748B] dark:text-[#9CA3AF]">
                                Click to upload images (optional for handwritten answers)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Navigation Controls -->
            <div class="mt-6 flex justify-between items-center">
                <button
                    @click="prevQuestion"
                    :disabled="currentQuestionIndex === 0"
                    class="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-lg font-semibold text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ArrowLeft :size="18" />
                    Previous
                </button>

                <div class="flex gap-2 overflow-x-auto max-w-[200px] md:max-w-md px-2 hide-scrollbar">
                    <button
                        v-for="(q, index) in exam.questions"
                        :key="q.id"
                        @click="currentQuestionIndex = index"
                        :class="[
                            'w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center text-xs font-bold transition-all',
                            currentQuestionIndex === index
                                ? 'bg-[#0066FF] text-white scale-110'
                                : form.answers[q.id].answer_text
                                    ? 'bg-[#E3F2FD] dark:bg-[#1A2744] text-[#0066FF] dark:text-[#2196F3]'
                                    : 'bg-[#F7F9FC] dark:bg-[#262626] text-[#64748B] dark:text-[#9CA3AF]'
                        ]"
                    >
                        {{ index + 1 }}
                    </button>
                </div>

                <button
                    v-if="currentQuestionIndex < exam.questions.length - 1"
                    @click="nextQuestion"
                    class="flex items-center gap-2 px-6 py-3 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg font-semibold transition-all"
                >
                    Next
                    <ArrowRight :size="18" />
                </button>
                <button
                    v-else
                    @click="submitExam"
                    class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-[#16A34A]/30 text-white rounded-lg font-semibold transition-all md:hidden"
                >
                    Submit
                </button>
            </div>
        </main>
    </div>
</template>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
    display: none;
}
.hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>

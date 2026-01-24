<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import {
    Clock,
    Flag,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Circle,
    AlertCircle,
    BarChart3
} from 'lucide-vue-next';

const props = defineProps({
    examId: String
});

const currentQuestion = ref(0);
const answers = ref({});
const flagged = ref(new Set());
const showSubmitModal = ref(false);

// Mock questions data
const questions = [
    {
        id: 1,
        question: "What is the derivative of f(x) = x³ + 2x² - 5x + 3?",
        options: [
            { id: "a", text: "3x² + 4x - 5" },
            { id: "b", text: "3x² + 2x - 5" },
            { id: "c", text: "x² + 4x - 5" },
            { id: "d", text: "3x³ + 4x² - 5x" },
        ],
    },
    {
        id: 2,
        question: "Which of the following is the correct formula for integration by parts?",
        options: [
            { id: "a", text: "∫u dv = uv - ∫v du" },
            { id: "b", text: "∫u dv = uv + ∫v du" },
            { id: "c", text: "∫u dv = u/v - ∫v du" },
            { id: "d", text: "∫u dv = uv - ∫u dv" },
        ],
    },
    {
        id: 3,
        question: "What is lim(x→0) (sin x)/x?",
        options: [
            { id: "a", text: "0" },
            { id: "b", text: "1" },
            { id: "c", text: "∞" },
            { id: "d", text: "Does not exist" },
        ],
    },
    // Adding dummy questions to reach closer to 50
    ...Array.from({ length: 7 }, (_, i) => ({
        id: i + 4,
        question: `Sample Question ${i + 4}: Solve for x in x² - ${i+2}x + 1 = 0`,
        options: [
             { id: "a", text: "x = 1" },
             { id: "b", text: "x = 2" },
             { id: "c", text: "x = 3" },
             { id: "d", text: "x = 4" },
        ]
    }))
];

const totalQuestions = questions.length;
const timeRemaining = "54:32";

const handleAnswerSelect = (questionId, optionId) => {
    answers.value = {
        ...answers.value,
        [questionId]: optionId
    };
};

const toggleFlag = (questionId) => {
    if (flagged.value.has(questionId)) {
        flagged.value.delete(questionId);
    } else {
        flagged.value.add(questionId);
    }
};

const navigateQuestion = (index) => {
    currentQuestion.value = index;
};

const answeredCount = computed(() => Object.keys(answers.value).length);
const unansweredCount = computed(() => totalQuestions - answeredCount.value);
const flaggedCount = computed(() => flagged.value.size);

const submitExam = () => {
    // Save progress to localStorage
    const savedProgress = JSON.parse(localStorage.getItem(`exam_${props.examId}_progress`) || '{}');
    savedProgress.mcq = true;
    localStorage.setItem(`exam_${props.examId}_progress`, JSON.stringify(savedProgress));

    // Redirect to session page
    router.visit(route('exams.session', props.examId));
};

</script>

<template>
    <Head title="MCQ Exam" />

    <div class="min-h-screen bg-[#0F1419] text-white font-inter">
        <!-- Header -->
        <div class="border-b border-[#1F2937] bg-[#161B22] sticky top-0 z-40">
            <div class="max-w-7xl mx-auto px-4 md:px-6 py-4">
                <div class="flex items-center justify-between flex-wrap gap-4">
                    <div>
                        <h1 class="text-lg md:text-xl font-bold text-white font-montserrat">
                            Advanced Mathematics - Calculus II
                        </h1>
                        <p class="text-[#9CA3AF] text-xs md:text-sm font-onest">
                            MCQ Section • {{ totalQuestions }} Questions
                        </p>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="px-3 md:px-4 py-2 bg-[#DC2626]/10 border border-[#DC2626] rounded-lg">
                            <div class="flex items-center gap-2">
                                <Clock :size="16" class="text-[#DC2626]" />
                                <span class="text-sm font-bold text-[#DC2626] font-mono">
                                    {{ timeRemaining }}
                                </span>
                            </div>
                        </div>
                        <button
                            @click="showSubmitModal = true"
                            class="px-4 md:px-6 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg font-semibold text-sm transition-all duration-200 font-onest"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 md:px-6 py-6">
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <!-- Main Question Area -->
                <div class="lg:col-span-3 space-y-6">
                    <!-- Question Card -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6 md:p-8">
                        <div class="flex items-start justify-between mb-6">
                            <div class="flex items-center gap-3">
                                <span class="px-4 py-2 bg-[#0D6EFD] text-white rounded-lg font-bold text-lg font-montserrat">
                                    Q{{ currentQuestion + 1 }}
                                </span>
                                <div>
                                    <p class="text-[#9CA3AF] text-xs font-onest">
                                        Question {{ currentQuestion + 1 }} of {{ totalQuestions }}
                                    </p>
                                    <p class="text-[#6B7280] text-xs mt-1 font-onest">1 mark</p>
                                </div>
                            </div>
                            <button
                                @click="toggleFlag(questions[currentQuestion]?.id)"
                                :class="['p-2 rounded-lg transition-all duration-200', flagged.has(questions[currentQuestion]?.id) ? 'bg-[#F59E0B]/20 text-[#F59E0B]' : 'bg-[#1F2937] text-[#9CA3AF] hover:text-[#F59E0B]']"
                            >
                                <Flag :size="20" :fill="flagged.has(questions[currentQuestion]?.id) ? 'currentColor' : 'none'" />
                            </button>
                        </div>

                        <!-- Question Text -->
                        <div class="mb-8">
                            <h2 class="text-lg md:text-xl text-white leading-relaxed font-onest">
                                {{ questions[currentQuestion]?.question }}
                            </h2>
                        </div>

                        <!-- Options -->
                        <div class="space-y-3">
                            <button
                                v-for="option in questions[currentQuestion]?.options"
                                :key="option.id"
                                @click="handleAnswerSelect(questions[currentQuestion].id, option.id)"
                                :class="['w-full p-4 rounded-xl border-2 transition-all duration-200 text-left', answers[questions[currentQuestion].id] === option.id ? 'border-[#0D6EFD] bg-[#0D6EFD]/10' : 'border-[#1F2937] hover:border-[#374151] bg-[#0F1419]']"
                            >
                                <div class="flex items-center gap-4">
                                    <div
                                        :class="['w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0', answers[questions[currentQuestion].id] === option.id ? 'border-[#0D6EFD] bg-[#0D6EFD]' : 'border-[#374151]']"
                                    >
                                        <div v-if="answers[questions[currentQuestion].id] === option.id" class="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <div class="flex-1 font-onest">
                                        <span class="text-[#9CA3AF] text-xs mr-2">{{ option.id.toUpperCase() }}.</span>
                                        <span class="text-white">{{ option.text }}</span>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <div class="flex items-center justify-between">
                        <button
                            @click="navigateQuestion(Math.max(0, currentQuestion - 1))"
                            :disabled="currentQuestion === 0"
                            :class="['px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 font-onest', currentQuestion === 0 ? 'bg-[#1F2937] text-[#6B7280] cursor-not-allowed' : 'bg-[#1F2937] text-white hover:bg-[#374151]']"
                        >
                            <ChevronLeft :size="18" />
                            Previous
                        </button>

                        <div class="hidden md:block text-center">
                            <p class="text-[#9CA3AF] text-sm font-onest">
                                Question {{ currentQuestion + 1 }} of {{ totalQuestions }}
                            </p>
                        </div>

                        <button
                            @click="navigateQuestion(Math.min(totalQuestions - 1, currentQuestion + 1))"
                            :disabled="currentQuestion === totalQuestions - 1"
                            :class="['px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 font-onest', currentQuestion === totalQuestions - 1 ? 'bg-[#1F2937] text-[#6B7280] cursor-not-allowed' : 'bg-[#0D6EFD] text-white hover:bg-[#0B5ED7]']"
                        >
                            Next
                            <ChevronRight :size="18" />
                        </button>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Stats Card -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2 font-montserrat">
                            <BarChart3 :size="16" class="text-[#0D6EFD]" />
                            Progress
                        </h3>
                        <div class="space-y-4 font-onest">
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <CheckCircle2 :size="16" class="text-[#22C55E]" />
                                    <span class="text-sm text-[#9CA3AF]">Answered</span>
                                </div>
                                <span class="text-sm font-bold text-white">{{ answeredCount }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <Circle :size="16" class="text-[#6B7280]" />
                                    <span class="text-sm text-[#9CA3AF]">Unanswered</span>
                                </div>
                                <span class="text-sm font-bold text-white">{{ unansweredCount }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <div class="flex items-center gap-2">
                                    <Flag :size="16" class="text-[#F59E0B]" />
                                    <span class="text-sm text-[#9CA3AF]">Flagged</span>
                                </div>
                                <span class="text-sm font-bold text-white">{{ flaggedCount }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Question Grid -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-sm font-bold text-white mb-4 font-montserrat">
                            All Questions
                        </h3>
                        <div class="grid grid-cols-5 gap-2">
                            <button
                                v-for="(q, index) in questions"
                                :key="index"
                                @click="navigateQuestion(index)"
                                :class="['aspect-square rounded-lg font-semibold text-xs transition-all duration-200 font-montserrat', currentQuestion === index ? 'bg-[#0D6EFD] text-white ring-2 ring-[#0D6EFD] ring-offset-2 ring-offset-[#161B22]' : answers[q.id] ? 'bg-[#22C55E] text-white hover:bg-[#16A34A]' : flagged.has(q.id) ? 'bg-[#F59E0B] text-white hover:bg-[#D97706]' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                {{ index + 1 }}
                            </button>
                        </div>
                    </div>

                    <!-- Legend -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-sm font-bold text-white mb-4 font-montserrat">Legend</h3>
                        <div class="space-y-3 font-onest">
                            <div class="flex items-center gap-3">
                                <div class="w-6 h-6 bg-[#0D6EFD] rounded"></div>
                                <span class="text-xs text-[#9CA3AF]">Current</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="w-6 h-6 bg-[#22C55E] rounded"></div>
                                <span class="text-xs text-[#9CA3AF]">Answered</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="w-6 h-6 bg-[#F59E0B] rounded"></div>
                                <span class="text-xs text-[#9CA3AF]">Flagged</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <div class="w-6 h-6 bg-[#1F2937] rounded"></div>
                                <span class="text-xs text-[#9CA3AF]">Not Answered</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Submit Modal -->
        <div v-if="showSubmitModal" class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-8 max-w-md w-full">
                <div class="flex items-center gap-3 mb-4">
                    <AlertCircle :size="24" class="text-[#F59E0B]" />
                    <h2 class="text-xl font-bold text-white font-montserrat">
                        Submit MCQ Section?
                    </h2>
                </div>
                <p class="text-[#9CA3AF] mb-6 font-onest">
                    You have answered {{ answeredCount }} out of {{ totalQuestions }} questions.
                    <span v-if="unansweredCount > 0"> {{ unansweredCount }} questions remain unanswered.</span>
                </p>
                <div class="flex gap-3 font-onest">
                    <button
                        @click="showSubmitModal = false"
                        class="flex-1 px-6 py-3 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all duration-200"
                    >
                        Review
                    </button>
                    <button
                        @click="submitExam"
                        class="flex-1 px-6 py-3 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg font-semibold transition-all duration-200"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

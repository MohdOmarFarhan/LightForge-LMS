<script setup>
import { Head, useForm, Link } from '@inertiajs/vue3';
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import {
    Clock,
    CheckCircle2,
    Menu,
    X,
    Bookmark,
    ArrowLeft,
    ArrowRight,
    AlertTriangle,
    Save
} from 'lucide-vue-next';
import RichTextEditor from '@/Components/RichTextEditor.vue';

const props = defineProps({
    exam: Object,
    attempt: Object,
    remainingSeconds: Number,
    section: String,
});

// State
const currentQuestionIndex = ref(0);
const timeLeft = ref(props.remainingSeconds || 0);
const timerInterval = ref(null);
const isSidebarOpen = ref(false);
const markedForReview = ref(new Set());

// Form Initialization
const form = useForm({
    answers: {},
    section: props.section,
});

// Initialize form answers based on questions
const initializeAnswers = () => {
    if (!props.exam?.questions) return;

    props.exam.questions.forEach(question => {
        // Only initialize if not already present (to preserve existing answers if page reloads/hot reloads)
        if (!form.answers[question.id]) {
             if (question.type === 'cq') {
                // CQ structure: { a: '', b: '', c: '', d: '' }
                form.answers[question.id] = {
                    answer_text: { a: '', b: '', c: '', d: '' },
                    answer_images: []
                };
            } else {
                // MCQ / Descriptive structure
                form.answers[question.id] = {
                    answer_text: '',
                    answer_images: []
                };
            }
        }
    });
};

initializeAnswers();

// Computed Properties
const currentQuestion = computed(() => {
    if (!props.exam?.questions || props.exam.questions.length === 0) return null;
    return props.exam.questions[currentQuestionIndex.value];
});

const totalQuestions = computed(() => props.exam?.questions?.length || 0);

const answeredCount = computed(() => {
    if (!props.exam?.questions) return 0;
    return props.exam.questions.filter(q => isAnswered(q.id)).length;
});

const markedCount = computed(() => markedForReview.value.size);
const notVisitedCount = computed(() => totalQuestions.value - answeredCount.value);

// Helper Methods
const isAnswered = (questionId) => {
    const answer = form.answers[questionId];
    if (!answer) return false;
    
    if (typeof answer.answer_text === 'string') {
        return answer.answer_text.trim().length > 0;
    }
    
    if (typeof answer.answer_text === 'object' && answer.answer_text !== null) {
        // For CQ, check if any part has content
        return Object.values(answer.answer_text).some(val => val && val.trim().length > 0);
    }
    
    return false;
};

const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

// Actions
const nextQuestion = () => {
    if (currentQuestionIndex.value < totalQuestions.value - 1) {
        currentQuestionIndex.value++;
    }
};

const prevQuestion = () => {
    if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--;
    }
};

const toggleMarkForReview = () => {
    if (!currentQuestion.value) return;
    const qId = currentQuestion.value.id;
    if (markedForReview.value.has(qId)) {
        markedForReview.value.delete(qId);
    } else {
        markedForReview.value.add(qId);
    }
};

const submitExam = () => {
    if (confirm('Are you sure you want to finish this section?')) {
        clearInterval(timerInterval.value);
        form.post(route('exams.submit', { id: props.exam.id, section: props.section }));
    }
};

// MCQ Specific
const selectMcqOption = (questionId, option) => {
    if (!form.answers[questionId]) return;
    form.answers[questionId].answer_text = option;
};


// Lifecycle Hooks
onMounted(() => {
    timerInterval.value = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--;
        } else {
            // Auto-submit when time is up
            clearInterval(timerInterval.value);
            alert('Time is up! Submitting your exam section.');
            form.post(route('exams.submit', { id: props.exam.id, section: props.section }));
        }
    }, 1000);
});

onUnmounted(() => {
    if (timerInterval.value) clearInterval(timerInterval.value);
});

</script>

<template>
    <Head :title="`Taking Exam: ${exam?.title || 'Loading...'}`" />

    <div class="h-screen flex flex-col md:flex-row bg-[#F3F4F6] dark:bg-[#0B0F1A] text-[#0B0F1A] dark:text-[#E5E7EB] font-inter overflow-hidden">
        
        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col h-full overflow-hidden relative">
            
            <!-- Mobile Header -->
            <div class="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#1E1E1E] border-b border-[#E7ECF3] dark:border-[#2A2A2A]">
                <span class="font-bold text-lg" v-if="currentQuestion">Question {{ currentQuestionIndex + 1 }}</span>
                <span class="font-bold text-lg" v-else>Exam</span>
                
                <div class="flex items-center gap-3">
                    <span class="font-mono font-bold text-[#0066FF] dark:text-[#2196F3]">{{ formatTime(timeLeft) }}</span>
                    <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2A2A2A]">
                        <Menu :size="24" />
                    </button>
                </div>
            </div>

            <!-- Desktop Header -->
            <div class="hidden md:flex items-center justify-between px-8 py-4 bg-white dark:bg-[#1E1E1E] border-b border-[#E7ECF3] dark:border-[#2A2A2A]">
                <div class="flex items-center gap-2">
                     <h1 class="font-bold text-xl font-montserrat text-[#0066FF] dark:text-[#2196F3]">
                        LightForge Academy
                    </h1>
                </div>
                <div class="font-mono font-bold text-xl text-[#0B0F1A] dark:text-[#E5E7EB] bg-[#E3F2FD] dark:bg-[#1A2744] px-4 py-1 rounded-lg text-[#0066FF] dark:text-[#2196F3]">
                    {{ formatTime(timeLeft) }}
                </div>
            </div>

            <!-- Scrollable Content -->
            <div class="flex-1 overflow-y-auto p-4 md:p-8">
                <div class="max-w-5xl mx-auto min-h-full">
                    
                    <!-- Loading / Empty State -->
                    <div v-if="!currentQuestion" class="flex flex-col items-center justify-center h-64 text-center">
                        <AlertTriangle :size="48" class="text-yellow-500 mb-4" />
                        <h3 class="text-xl font-bold mb-2">No Questions Found</h3>
                        <p class="text-gray-500">There are no questions available in this section.</p>
                        <Link :href="route('exams.session', exam.id)" class="mt-4 text-blue-500 hover:underline">
                            Return to Exam Overview
                        </Link>
                    </div>

                    <!-- Question Content -->
                    <div v-else>
                        <!-- Question Header -->
                        <div class="flex justify-between items-start mb-6 border-b border-[#E7ECF3] dark:border-[#2A2A2A] pb-4">
                            <div>
                                <h2 class="text-lg md:text-xl font-bold text-[#0B0F1A] dark:text-[#E5E7EB]">
                                    Question {{ currentQuestionIndex + 1 }}
                                </h2>
                                <div class="flex items-center gap-2 mt-1">
                                    <span class="text-sm font-medium text-[#16A34A]">+{{ currentQuestion.marks }} marks</span>
                                    <span class="text-sm text-[#64748B] dark:text-[#9CA3AF]">• {{ currentQuestion.type.toUpperCase() }}</span>
                                </div>
                            </div>
                            <button class="text-[#64748B] dark:text-[#9CA3AF] hover:text-[#0B0F1A] dark:hover:text-[#E5E7EB] text-sm flex items-center gap-1">
                                <AlertTriangle :size="14" /> Report Issue
                            </button>
                        </div>

                        <!-- Question Body -->
                        <div class="prose dark:prose-invert max-w-none mb-8 bg-white dark:bg-[#1E1E1E] p-6 rounded-xl border border-[#E7ECF3] dark:border-[#2A2A2A] shadow-sm">
                            <div class="text-lg font-medium leading-relaxed ql-editor" v-html="currentQuestion.content"></div>
                            
                            <!-- Sub-questions for CQ Display -->
                            <div v-if="currentQuestion.sub_questions" class="mt-4 space-y-3 pl-4 border-l-2 border-[#E7ECF3] dark:border-[#2A2A2A]">
                                <div v-for="(text, key) in currentQuestion.sub_questions" :key="key">
                                    <span class="font-bold text-[#0066FF] dark:text-[#2196F3]">{{ key }}.</span> 
                                    <span class="ml-2 ql-editor inline-block align-top" v-html="text"></span>
                                </div>
                            </div>
                        </div>

                        <!-- Answer Section -->
                        <div class="mt-8">
                            <!-- MCQ Options -->
                            <div v-if="currentQuestion.type === 'mcq'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div 
                                    v-for="(option, idx) in currentQuestion.options" 
                                    :key="idx"
                                    @click="selectMcqOption(currentQuestion.id, option)"
                                    :class="[
                                        'flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200 group relative overflow-hidden',
                                        form.answers[currentQuestion.id]?.answer_text === option
                                            ? 'border-[#0066FF] bg-[#E3F2FD] dark:bg-[#1A2744] dark:border-[#2196F3]' 
                                            : 'bg-white dark:bg-[#1E1E1E] border-[#E7ECF3] dark:border-[#374151] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]'
                                    ]"
                                >
                                    <div :class="[
                                        'w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors shrink-0',
                                        form.answers[currentQuestion.id]?.answer_text === option
                                            ? 'border-[#0066FF] dark:border-[#2196F3] bg-[#0066FF] dark:bg-[#2196F3]'
                                            : 'border-[#9CA3AF]'
                                    ]">
                                        <div v-if="form.answers[currentQuestion.id]?.answer_text === option" class="w-2.5 h-2.5 rounded-full bg-white"></div>
                                    </div>
                                    <span :class="[
                                        'font-medium text-lg',
                                        form.answers[currentQuestion.id]?.answer_text === option
                                            ? 'text-[#0066FF] dark:text-[#2196F3]'
                                            : 'text-[#0B0F1A] dark:text-[#E5E7EB]'
                                    ]">
                                        {{ option }}
                                    </span>
                                </div>
                            </div>

                            <!-- Descriptive Answer -->
                            <div v-else-if="currentQuestion.type === 'descriptive'">
                                <label class="block text-sm font-semibold text-[#64748B] dark:text-[#9CA3AF] mb-2">Your Answer</label>
                                <RichTextEditor
                                    v-if="form.answers[currentQuestion.id]"
                                    v-model="form.answers[currentQuestion.id].answer_text"
                                    placeholder="Type your answer here..."
                                />
                            </div>

                            <!-- CQ Answer -->
                            <div v-else-if="currentQuestion.type === 'cq'" class="space-y-6">
                                <div v-for="key in ['a', 'b', 'c', 'd']" :key="key" class="bg-white dark:bg-[#1E1E1E] p-6 rounded-xl border border-[#E7ECF3] dark:border-[#2A2A2A] shadow-sm">
                                    <label class="block text-sm font-bold text-[#0066FF] dark:text-[#2196F3] mb-2 uppercase border-b border-gray-200 dark:border-gray-700 pb-2">
                                        Part {{ key }}
                                    </label>
                                    
                                    <!-- Sub-question text display -->
                                    <div v-if="currentQuestion.sub_questions && currentQuestion.sub_questions[key]" class="mb-4 text-sm text-[#64748B] dark:text-[#9CA3AF] italic ql-editor bg-gray-50 dark:bg-[#111] p-3 rounded" v-html="currentQuestion.sub_questions[key]"></div>

                                    <RichTextEditor
                                        v-if="form.answers[currentQuestion.id]"
                                        v-model="form.answers[currentQuestion.id].answer_text[key]"
                                        placeholder="Type your answer here..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- Footer Navigation -->
            <div class="p-4 bg-white dark:bg-[#1E1E1E] border-t border-[#E7ECF3] dark:border-[#2A2A2A] flex items-center justify-between z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <button
                    @click="prevQuestion"
                    :disabled="currentQuestionIndex === 0"
                    class="px-6 py-2.5 rounded-lg border border-[#E7ECF3] dark:border-[#374151] font-semibold text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                    <ArrowLeft :size="18" />
                    Previous
                </button>

                <div class="flex gap-3">
                    <button
                        v-if="currentQuestion"
                        @click="toggleMarkForReview"
                        class="px-6 py-2.5 rounded-lg border border-[#E7ECF3] dark:border-[#374151] font-semibold flex items-center gap-2 transition-colors"
                        :class="markedForReview.has(currentQuestion.id) ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]' : 'text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]'"
                    >
                        <Bookmark :size="18" :fill="markedForReview.has(currentQuestion.id) ? 'currentColor' : 'none'" />
                        <span class="hidden sm:inline">{{ markedForReview.has(currentQuestion.id) ? 'Marked' : 'Mark for Review' }}</span>
                    </button>
                    
                    <button
                        v-if="currentQuestionIndex < totalQuestions - 1"
                        @click="nextQuestion"
                        class="px-8 py-2.5 bg-[#0066FF] hover:bg-[#0052CC] text-white rounded-lg font-bold transition-colors shadow-lg shadow-[#0066FF]/20 flex items-center gap-2"
                    >
                        Next
                        <ArrowRight :size="18" />
                    </button>
                    
                    <button
                        v-else
                        @click="submitExam"
                        class="px-8 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg font-bold transition-colors shadow-lg shadow-[#16A34A]/20 flex items-center gap-2"
                    >
                        <Save :size="18" />
                        Submit Section
                    </button>
                </div>
            </div>
        </div>

        <!-- Sidebar (Right Panel) -->
        <div 
            :class="[
                'fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-[#1E1E1E] border-l border-[#E7ECF3] dark:border-[#2A2A2A] transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl md:shadow-none',
                isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0 md:static md:flex'
            ]"
        >
            <!-- Sidebar Header -->
            <div class="p-6 border-b border-[#E7ECF3] dark:border-[#2A2A2A]">
                <div class="flex justify-between items-center mb-4 md:hidden">
                    <h2 class="font-bold text-lg">Menu</h2>
                    <button @click="isSidebarOpen = false" class="p-2 text-[#64748B]">
                        <X :size="24" />
                    </button>
                </div>

                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 rounded-full bg-[#E3F2FD] dark:bg-[#1A2744] flex items-center justify-center text-[#0066FF] dark:text-[#2196F3] font-bold text-lg">
                        {{ attempt.user?.name?.charAt(0) || 'U' }}
                    </div>
                    <div class="overflow-hidden">
                        <p class="font-bold text-sm text-[#0B0F1A] dark:text-[#E5E7EB] truncate">{{ attempt.user?.name || 'Student' }}</p>
                        <p class="text-xs text-[#64748B] dark:text-[#9CA3AF] truncate">ID: {{ attempt.user?.student_id || attempt.user?.id }}</p>
                    </div>
                </div>

                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm font-semibold text-[#64748B] dark:text-[#9CA3AF]">Questions Palette</span>
                     <button 
                        @click="submitExam"
                        class="px-4 py-1.5 bg-white dark:bg-transparent border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white rounded-md text-xs font-bold transition-colors uppercase tracking-wider"
                    >
                        Finish
                    </button>
                </div>
            </div>

            <!-- Legend -->
            <div class="px-6 py-4 border-b border-[#E7ECF3] dark:border-[#2A2A2A] bg-[#F7F9FC] dark:bg-[#0D1117]">
                <div class="grid grid-cols-2 gap-y-3 gap-x-2">
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-[#22C55E]"></div>
                        <span class="text-xs text-[#64748B] dark:text-[#9CA3AF]">Answered ({{ answeredCount }})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-[#F59E0B]"></div>
                        <span class="text-xs text-[#64748B] dark:text-[#9CA3AF]">Marked ({{ markedCount }})</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-3 h-3 rounded-full bg-[#E5E7EB] border border-gray-400"></div>
                        <span class="text-xs text-[#64748B] dark:text-[#9CA3AF]">Pending ({{ notVisitedCount }})</span>
                    </div>
                </div>
            </div>

            <!-- Questions Grid -->
            <div class="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-[#111]">
                <h3 class="font-bold text-sm mb-4 text-gray-500 uppercase tracking-wider">Section: {{ section?.toUpperCase() }}</h3>
                <div class="grid grid-cols-4 gap-3">
                    <button
                        v-for="(q, index) in exam.questions"
                        :key="q.id"
                        @click="currentQuestionIndex = index"
                        class="relative w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all border-2 shadow-sm"
                        :class="[
                            currentQuestionIndex === index ? 'border-[#0066FF] ring-2 ring-[#0066FF]/20 z-10 transform scale-110' : 'border-transparent',
                            isAnswered(q.id) 
                                ? 'bg-[#22C55E] text-white border-[#22C55E]' 
                                : markedForReview.has(q.id)
                                    ? 'bg-[#F59E0B] text-white border-[#F59E0B]'
                                    : 'bg-white dark:bg-[#262626] text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#E5E7EB] dark:hover:bg-[#374151]'
                        ]"
                    >
                        {{ index + 1 }}
                        <div v-if="markedForReview.has(q.id)" class="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#F59E0B] rounded-full border border-white dark:border-[#1E1E1E]"></div>
                    </button>
                </div>
            </div>
        </div>

        <!-- Overlay for Mobile Sidebar -->
        <div 
            v-if="isSidebarOpen" 
            @click="isSidebarOpen = false"
            class="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
        ></div>

    </div>
</template>

<style scoped>
/* Custom scrollbar for sidebar */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
::-webkit-scrollbar-track {
    background: transparent;
}
::-webkit-scrollbar-thumb {
    background: #CBD5E1;
    border-radius: 3px;
}
.dark ::-webkit-scrollbar-thumb {
    background: #374151;
}
::-webkit-scrollbar-thumb:hover {
    background: #94A3B8;
}
.dark ::-webkit-scrollbar-thumb:hover {
    background: #4B5563;
}
</style>
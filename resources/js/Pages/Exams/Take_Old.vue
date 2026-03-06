<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { Clock, AlertTriangle, Check, ArrowRight, ArrowLeft, Upload, Image as ImageIcon, Bookmark, Menu, X, Grip } from 'lucide-vue-next';
import RichTextEditor from '@/Components/RichTextEditor.vue';
import 'katex/dist/katex.min.css';

const props = defineProps({
    exam: Object,
    attempt: Object,
    remainingSeconds: Number,
    section: String,
});

const currentQuestionIndex = ref(0);
const timeLeft = ref(props.remainingSeconds);
const timerInterval = ref(null);
const markedForReview = ref(new Set());
const isSidebarOpen = ref(false);

const form = useForm({
    answers: {},
    section: props.section,
});

// Initialize answers structure
if (props.exam.questions && props.exam.questions.length > 0) {
    props.exam.questions.forEach(question => {
        if (!form.answers[question.id]) {
            if (question.type === 'cq') {
                form.answers[question.id] = {
                    answer_text: { a: '', b: '', c: '', d: '' },
                    answer_images: [],
                };
            } else {
                form.answers[question.id] = {
                    answer_text: '',
                    answer_images: [],
                };
            }
        }
    });
}


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
    if (confirm('Are you sure you want to end the test and submit?')) {
        clearInterval(timerInterval.value);
        form.post(route('exams.submit', { id: props.exam.id, section: props.section }));
    }
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

const toggleMarkForReview = () => {
    const qId = props.exam.questions[currentQuestionIndex.value].id;
    if (markedForReview.value.has(qId)) {
        markedForReview.value.delete(qId);
    } else {
        markedForReview.value.add(qId);
    }
};

const isAnswered = (questionId) => {
    const answer = form.answers[questionId];
    if (!answer) return false;
    if (typeof answer.answer_text === 'string') return answer.answer_text.length > 0;
    if (typeof answer.answer_text === 'object') return Object.values(answer.answer_text).some(v => v && v.length > 0);
    return false;
};

const answeredCount = computed(() => props.exam.questions.filter(q => isAnswered(q.id)).length);
const markedCount = computed(() => markedForReview.value.size);
const unansweredCount = computed(() => props.exam.questions.length - answeredCount.value);

</script>

<template>
    <Head :title="`Taking Exam: ${exam.title}`" />

    <div class="h-screen flex flex-col md:flex-row bg-[#F3F4F6] dark:bg-[#0B0F1A] text-[#0B0F1A] dark:text-[#E5E7EB] font-inter overflow-hidden">
        
        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col h-full overflow-hidden relative">
            
            <!-- Mobile Header -->
            <div class="md:hidden flex items-center justify-between p-4 bg-white dark:bg-[#1E1E1E] border-b border-[#E7ECF3] dark:border-[#2A2A2A]">
                <span class="font-bold text-lg">Question {{ currentQuestionIndex + 1 }}</span>
                <div class="flex items-center gap-3">
                    <span class="font-mono font-bold text-[#0066FF] dark:text-[#2196F3]">{{ formatTime(timeLeft) }}</span>
                    <button @click="isSidebarOpen = !isSidebarOpen" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#2A2A2A]">
                        <Menu :size="24" />
                    </button>
                </div>
            </div>

            <!-- Desktop Header (Timer & Branding) -->
            <div class="hidden md:flex items-center justify-between px-8 py-4 bg-white dark:bg-[#1E1E1E] border-b border-[#E7ECF3] dark:border-[#2A2A2A]">
                 <!-- Left: Branding/Logo Placeholder -->
                <div class="flex items-center gap-2">
                    <!-- You can add logo here if needed -->
                     <h1 class="font-bold text-xl font-montserrat text-[#0066FF] dark:text-[#2196F3]">
                        LightForge Academy
                    </h1>
                </div>

                <!-- Right: Timer -->
                <div class="font-mono font-bold text-xl text-[#0B0F1A] dark:text-[#E5E7EB]">
                    {{ formatTime(timeLeft) }}
                </div>
            </div>

            <!-- Scrollable Question Content -->
            <div class="flex-1 overflow-y-auto p-4 md:p-8">
                <div v-if="exam.questions && exam.questions.length > 0" class="max-w-5xl mx-auto">
                    <!-- Question Header -->
                    <div class="flex justify-between items-start mb-6 border-b border-[#E7ECF3] dark:border-[#2A2A2A] pb-4">
                        <div>
                            <h2 class="text-lg md:text-xl font-bold text-[#0B0F1A] dark:text-[#E5E7EB]">
                                Question {{ currentQuestionIndex + 1 }}
                            </h2>
                            <div class="flex items-center gap-2 mt-1">
                                <span class="text-sm font-medium text-[#16A34A]">+{{ exam.questions[currentQuestionIndex].marks }} marks</span>
                                <span class="text-sm text-[#64748B] dark:text-[#9CA3AF]">• {{ exam.questions[currentQuestionIndex].type.toUpperCase() }}</span>
                            </div>
                        </div>
                        <button class="text-[#64748B] dark:text-[#9CA3AF] hover:text-[#0B0F1A] dark:hover:text-[#E5E7EB] text-sm flex items-center gap-1">
                            <AlertTriangle :size="14" /> Report
                        </button>
                    </div>

                    <!-- Question Body -->
                    <div class="prose dark:prose-invert max-w-none mb-8">
                        <div class="text-lg font-medium leading-relaxed ql-editor" v-html="exam.questions[currentQuestionIndex].content"></div>
                        
                        <!-- Sub-questions for CQ -->
                        <div v-if="exam.questions[currentQuestionIndex].sub_questions" class="mt-4 space-y-3 pl-4 border-l-2 border-[#E7ECF3] dark:border-[#2A2A2A]">
                            <div v-for="(text, key) in exam.questions[currentQuestionIndex].sub_questions" :key="key">
                                <span class="font-bold text-[#0066FF] dark:text-[#2196F3]">{{ key }}.</span> 
                                <span class="ml-2 ql-editor inline-block align-top" v-html="text"></span>
                            </div>
                        </div>
                    </div>

                    <!-- Options / Inputs -->
                    <div class="mt-8">
                         <!-- MCQ Options Grid -->
                        <div v-if="exam.questions[currentQuestionIndex].type === 'mcq'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div 
                                v-for="(option, idx) in exam.questions[currentQuestionIndex].options" 
                                :key="idx"
                                @click="selectMcqOption(exam.questions[currentQuestionIndex].id, option)"
                                :class="[
                                    'flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200 group relative overflow-hidden',
                                    form.answers[exam.questions[currentQuestionIndex].id].answer_text === option
                                        ? 'border-[#0066FF] bg-[#E3F2FD]/50 dark:bg-[#1A2744]/50 dark:border-[#2196F3]' 
                                        : 'border-[#E7ECF3] dark:border-[#374151] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]'
                                ]"
                            >
                                <div :class="[
                                    'w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors shrink-0',
                                    form.answers[exam.questions[currentQuestionIndex].id].answer_text === option
                                        ? 'border-[#0066FF] dark:border-[#2196F3] bg-[#0066FF] dark:bg-[#2196F3]'
                                        : 'border-[#9CA3AF]'
                                ]">
                                    <div v-if="form.answers[exam.questions[currentQuestionIndex].id].answer_text === option" class="w-2.5 h-2.5 rounded-full bg-white"></div>
                                </div>
                                <span :class="[
                                    'font-medium text-lg',
                                    form.answers[exam.questions[currentQuestionIndex].id].answer_text === option
                                        ? 'text-[#0066FF] dark:text-[#2196F3]'
                                        : 'text-[#0B0F1A] dark:text-[#E5E7EB]'
                                ]">
                                    {{ option }}
                                </span>
                            </div>
                        </div>

                        <!-- Text Area for Descriptive -->
                        <div v-else-if="exam.questions[currentQuestionIndex].type === 'descriptive'">
                            <label class="block text-sm font-semibold text-[#64748B] dark:text-[#9CA3AF] mb-2">Your Answer</label>
                            <RichTextEditor
                                v-if="form.answers[exam.questions[currentQuestionIndex].id]"
                                v-model="form.answers[exam.questions[currentQuestionIndex].id].answer_text"
                                placeholder="Type your answer here..."
                            />
                        </div>

                        <!-- CQ Answer Fields -->
                        <div v-else-if="exam.questions[currentQuestionIndex].type === 'cq'" class="space-y-6">
                            <div v-for="key in ['a', 'b', 'c', 'd']" :key="key" class="bg-[#F7F9FC] dark:bg-[#0D1117] p-4 rounded-lg border border-[#E7ECF3] dark:border-[#374151]">
                                <label class="block text-sm font-bold text-[#0066FF] dark:text-[#2196F3] mb-2 uppercase">Answer for Question {{ key }}</label>
                                <!-- Sub-question text display -->
                                <div v-if="exam.questions[currentQuestionIndex].sub_questions && exam.questions[currentQuestionIndex].sub_questions[key]" class="mb-3 text-sm text-[#64748B] dark:text-[#9CA3AF] italic ql-editor" v-html="exam.questions[currentQuestionIndex].sub_questions[key]"></div>

                                <RichTextEditor
                                    v-if="form.answers[exam.questions[currentQuestionIndex].id]"
                                    v-model="form.answers[exam.questions[currentQuestionIndex].id].answer_text[key]"
                                    placeholder="Type your answer here..."
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="flex items-center justify-center h-full text-gray-500">
                    <p>No questions available in this section.</p>
                </div>
            </div>

            <!-- Footer Navigation -->
            <div v-if="exam.questions && exam.questions.length > 0" class="p-4 bg-white dark:bg-[#1E1E1E] border-t border-[#E7ECF3] dark:border-[#2A2A2A] flex items-center justify-between">
                <button
                    @click="prevQuestion"
                    :disabled="currentQuestionIndex === 0"
                    class="px-6 py-2.5 rounded-lg border border-[#E7ECF3] dark:border-[#374151] font-semibold text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    Previous
                </button>

                <div class="flex gap-3">
                    <button
                        @click="toggleMarkForReview"
                        class="px-6 py-2.5 rounded-lg border border-[#E7ECF3] dark:border-[#374151] font-semibold flex items-center gap-2 transition-colors"
                        :class="markedForReview.has(exam.questions[currentQuestionIndex].id) ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]' : 'text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#F7F9FC] dark:hover:bg-[#262626]'"
                    >
                        <Bookmark :size="18" :fill="markedForReview.has(exam.questions[currentQuestionIndex].id) ? 'currentColor' : 'none'" />
                        {{ markedForReview.has(exam.questions[currentQuestionIndex].id) ? 'Marked' : 'Mark for Review' }}
                    </button>
                    
                    <button
                        v-if="currentQuestionIndex < exam.questions.length - 1"
                        @click="nextQuestion"
                        class="px-8 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white rounded-lg font-bold transition-colors shadow-lg shadow-[#16A34A]/20"
                    >
                        Save & Next
                    </button>
                    <!-- On last question, show Next implies save/stay, submit is in sidebar -->
                     <button
                        v-else
                        class="px-8 py-2.5 bg-[#1F2937] text-white rounded-lg font-bold opacity-50 cursor-not-allowed"
                    >
                        Last Question
                    </button>
                </div>
            </div>
        </div>

        <!-- Sidebar (Right Panel) -->
        <div 
            :class="[
                'fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-[#1E1E1E] border-l border-[#E7ECF3] dark:border-[#2A2A2A] transform transition-transform duration-300 ease-in-out flex flex-col',
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
                    <div class="w-10 h-10 rounded-full bg-[#E3F2FD] dark:bg-[#1A2744] flex items-center justify-center text-[#0066FF] dark:text-[#2196F3] font-bold">
                        {{ attempt.user.name.charAt(0) }}
                    </div>
                    <div>
                        <p class="font-bold text-sm text-[#0B0F1A] dark:text-[#E5E7EB] line-clamp-1">{{ attempt.user.name }}</p>
                        <p class="text-xs text-[#64748B] dark:text-[#9CA3AF]">Student ID: {{ attempt.user.id }}</p>
                    </div>
                </div>

                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm font-semibold text-[#64748B] dark:text-[#9CA3AF]">Questions Palette</span>
                     <button 
                        @click="submitExam"
                        class="px-4 py-1.5 bg-white border border-[#EF4444] text-[#EF4444] hover:bg-[#EF4444] hover:text-white rounded-md text-xs font-bold transition-colors uppercase tracking-wider"
                    >
                        End Test
                    </button>
                </div>
            </div>

            <!-- Legend -->
            <div class="px-6 py-4 border-b border-[#E7ECF3] dark:border-[#2A2A2A] bg-[#F7F9FC] dark:bg-[#0D1117]">
                <div class="grid grid-cols-2 gap-y-3 gap-x-2">
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded bg-[#22C55E] flex items-center justify-center text-white text-[10px] font-bold">{{ answeredCount }}</div>
                        <span class="text-xs text-[#64748B] dark:text-[#9CA3AF]">Answered</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded bg-[#F59E0B] flex items-center justify-center text-white text-[10px] font-bold relative">
                            {{ markedCount }}
                            <div class="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span class="text-xs text-[#64748B] dark:text-[#9CA3AF]">Marked</span>
                    </div>
                    <div class="flex items-center gap-2">
                         <div class="w-6 h-6 rounded border border-[#E7ECF3] dark:border-[#374151] bg-white dark:bg-[#1F2937] flex items-center justify-center text-[#64748B] dark:text-[#9CA3AF] text-[10px] font-bold">{{ unansweredCount }}</div>
                        <span class="text-xs text-[#64748B] dark:text-[#9CA3AF]">Not Visited</span>
                    </div>
                </div>
            </div>

            <!-- Questions Grid -->
            <div class="flex-1 overflow-y-auto p-6">
                <h3 class="font-bold text-sm mb-4">Section: {{ section.toUpperCase() }}</h3>
                <div class="grid grid-cols-4 gap-3">
                    <button
                        v-for="(q, index) in exam.questions"
                        :key="q.id"
                        @click="currentQuestionIndex = index"
                        class="relative w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all border-2"
                        :class="[
                            currentQuestionIndex === index ? 'border-[#0066FF] ring-2 ring-[#0066FF]/20 z-10' : 'border-transparent',
                            isAnswered(q.id) 
                                ? 'bg-[#22C55E] text-white border-[#22C55E]' 
                                : markedForReview.has(q.id)
                                    ? 'bg-[#F59E0B] text-white border-[#F59E0B]'
                                    : 'bg-[#F3F4F6] dark:bg-[#262626] text-[#64748B] dark:text-[#9CA3AF] hover:bg-[#E5E7EB] dark:hover:bg-[#374151]'
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
            class="fixed inset-0 bg-black/50 z-40 md:hidden"
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

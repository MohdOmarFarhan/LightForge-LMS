<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, onMounted } from 'vue';
import {
    Clock,
    BookOpen,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    CheckCheck,
    Upload
} from 'lucide-vue-next';

const props = defineProps({
    examId: String
});

// Mock exam data
const examData = {
    title: "Advanced Mathematics - Calculus II",
    subject: "Mathematics",
    totalTime: "120 minutes",
    parts: {
        mcq: {
            available: true,
            questions: 50,
            timeLimit: "60 minutes",
            marks: 50,
        },
        cq: {
            available: true,
            stems: 5,
            questions: 20,
            timeLimit: "45 minutes",
            marks: 40,
        },
        descriptive: {
            available: true,
            questions: 2,
            timeLimit: "30 minutes",
            marks: 20,
        },
    },
    instructions: [
        "Read each question carefully before answering",
        "You must complete one section before moving to another",
        "For written answers (CQ/Descriptive), write on paper and upload clear images",
        "Ensure your uploaded images are legible and properly oriented",
        "Once you submit a section, you cannot go back to change answers",
        "Complete all sections before final submission",
        "Internet connectivity is required throughout the exam",
    ],
};

const completedParts = ref({
    mcq: false,
    cq: false,
    descriptive: false,
});

onMounted(() => {
    // Check localStorage for mock progress
    const savedProgress = localStorage.getItem(`exam_${props.examId}_progress`);
    if (savedProgress) {
        completedParts.value = JSON.parse(savedProgress);
    }
});

const allPartsCompleted = ref(false); // Computed in real app, but ref for now to update
const anyPartCompleted = ref(false);

// Update derived state
import { watch } from 'vue';
watch(completedParts, (newVal) => {
    allPartsCompleted.value = newVal.mcq && newVal.cq && newVal.descriptive;
    anyPartCompleted.value = newVal.mcq || newVal.cq || newVal.descriptive;
}, { deep: true, immediate: true });

</script>

<template>
    <Head :title="examData.title" />

    <div class="min-h-screen bg-[#0F1419] text-white font-inter">
        <!-- Header -->
        <div class="border-b border-[#1F2937] bg-[#161B22]">
            <div class="max-w-7xl mx-auto px-6 py-6">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-3 py-1 bg-[#0D6EFD] text-white text-xs font-semibold rounded-full font-montserrat">
                                {{ examData.subject }}
                            </span>
                            <span v-if="anyPartCompleted" class="px-3 py-1 bg-[#16A34A]/20 text-[#22C55E] text-xs font-semibold rounded-full flex items-center gap-1 font-montserrat">
                                <CheckCircle2 :size="12" />
                                In Progress
                            </span>
                        </div>
                        <h1 class="text-2xl md:text-3xl font-bold text-white mb-1 font-montserrat">
                            {{ examData.title }}
                        </h1>
                        <p class="text-[#9CA3AF] text-sm font-onest">
                            Total Duration: {{ examData.totalTime }} • Total Marks:
                            {{ examData.parts.mcq.marks + examData.parts.cq.marks + examData.parts.descriptive.marks }}
                        </p>
                    </div>
                    <div class="hidden md:flex items-center gap-3">
                        <div class="px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg">
                            <div class="flex items-center gap-2 text-[#9CA3AF]">
                                <Clock :size="18" class="text-[#0D6EFD]" />
                                <span class="text-sm font-medium font-mono">
                                    Time Remaining: 115:42
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Main Content - Left Side -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Instructions Card -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <div class="flex items-center gap-2 mb-4">
                            <AlertCircle :size="20" class="text-[#F59E0B]" />
                            <h2 class="text-xl font-bold text-white font-montserrat">
                                Exam Instructions
                            </h2>
                        </div>
                        <div class="space-y-3">
                            <div v-for="(instruction, index) in examData.instructions" :key="index" class="flex items-start gap-3">
                                <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-[#D1D5DB] text-sm leading-relaxed font-onest">
                                    {{ instruction }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Exam Sections -->
                    <div class="space-y-4">
                        <h2 class="text-xl font-bold text-white flex items-center gap-2 font-montserrat">
                            <BookOpen :size="20" class="text-[#0D6EFD]" />
                            Exam Sections
                        </h2>

                        <!-- MCQ Section -->
                        <div v-if="examData.parts.mcq.available"
                             :class="['bg-[#161B22] border rounded-xl p-6 transition-all duration-300', completedParts.mcq ? 'border-[#16A34A]' : 'border-[#1F2937]']"
                        >
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h3 class="text-lg font-bold text-white font-montserrat">
                                            Multiple Choice Questions (MCQ)
                                        </h3>
                                        <span v-if="completedParts.mcq" class="px-2 py-1 bg-[#16A34A]/20 text-[#22C55E] text-xs font-semibold rounded flex items-center gap-1 font-montserrat">
                                            <CheckCircle2 :size="12" />
                                            Completed
                                        </span>
                                    </div>
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 font-onest">
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Questions</p>
                                            <p class="text-white font-semibold">{{ examData.parts.mcq.questions }}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Time Limit</p>
                                            <p class="text-white font-semibold">{{ examData.parts.mcq.timeLimit }}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Marks</p>
                                            <p class="text-white font-semibold">{{ examData.parts.mcq.marks }}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Type</p>
                                            <p class="text-white font-semibold">MCQ</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link
                                v-if="!completedParts.mcq"
                                :href="route('exams.take.mcq', examId)"
                                class="w-full md:w-auto px-6 py-3 bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 font-onest"
                            >
                                Start MCQ Section
                                <ArrowRight :size="18" />
                            </Link>
                            <button
                                v-else
                                disabled
                                class="w-full md:w-auto px-6 py-3 bg-[#1F2937] text-[#6B7280] cursor-not-allowed rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 font-onest"
                            >
                                <CheckCheck :size="18" />
                                Section Completed
                            </button>
                        </div>

                        <!-- CQ Section -->
                        <div v-if="examData.parts.cq.available"
                             :class="['bg-[#161B22] border rounded-xl p-6 transition-all duration-300', completedParts.cq ? 'border-[#16A34A]' : 'border-[#1F2937]']"
                        >
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h3 class="text-lg font-bold text-white font-montserrat">
                                            Creative Questions (CQ)
                                        </h3>
                                        <span v-if="completedParts.cq" class="px-2 py-1 bg-[#16A34A]/20 text-[#22C55E] text-xs font-semibold rounded flex items-center gap-1 font-montserrat">
                                            <CheckCircle2 :size="12" />
                                            Completed
                                        </span>
                                    </div>
                                    <p class="text-[#9CA3AF] text-sm mb-3 font-onest">
                                        {{ examData.parts.cq.stems }} stems with {{ examData.parts.cq.questions }} questions total
                                    </p>
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 font-onest">
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Stems</p>
                                            <p class="text-white font-semibold">{{ examData.parts.cq.stems }}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Time Limit</p>
                                            <p class="text-white font-semibold">{{ examData.parts.cq.timeLimit }}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Marks</p>
                                            <p class="text-white font-semibold">{{ examData.parts.cq.marks }}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Format</p>
                                            <p class="text-white font-semibold flex items-center gap-1">
                                                <Upload :size="14" />
                                                Written
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <Link
                                v-if="!completedParts.cq"
                                :href="route('exams.take.cq', examId)"
                                class="w-full md:w-auto px-6 py-3 bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 font-onest"
                            >
                                Start CQ Section
                                <ArrowRight :size="18" />
                            </Link>
                            <button
                                v-else
                                disabled
                                class="w-full md:w-auto px-6 py-3 bg-[#1F2937] text-[#6B7280] cursor-not-allowed rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 font-onest"
                            >
                                <CheckCheck :size="18" />
                                Section Completed
                            </button>
                        </div>

                        <!-- Descriptive Section -->
                        <div v-if="examData.parts.descriptive.available"
                             :class="['bg-[#161B22] border rounded-xl p-6 transition-all duration-300', completedParts.descriptive ? 'border-[#16A34A]' : 'border-[#1F2937]']"
                        >
                            <div class="flex items-start justify-between mb-4">
                                <div class="flex-1">
                                    <div class="flex items-center gap-3 mb-2">
                                        <h3 class="text-lg font-bold text-white font-montserrat">
                                            Descriptive Questions
                                        </h3>
                                        <span v-if="completedParts.descriptive" class="px-2 py-1 bg-[#16A34A]/20 text-[#22C55E] text-xs font-semibold rounded flex items-center gap-1 font-montserrat">
                                            <CheckCircle2 :size="12" />
                                            Completed
                                        </span>
                                    </div>
                                    <p class="text-[#9CA3AF] text-sm mb-3 font-onest">
                                        Detailed written answers required
                                    </p>
                                    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 font-onest">
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Questions</p>
                                            <p class="text-white font-semibold">{{ examData.parts.descriptive.questions }}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Time Limit</p>
                                            <p class="text-white font-semibold">{{ examData.parts.descriptive.timeLimit }}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Marks</p>
                                            <p class="text-white font-semibold">{{ examData.parts.descriptive.marks }}</p>
                                        </div>
                                        <div>
                                            <p class="text-[#9CA3AF] text-xs mb-1">Format</p>
                                            <p class="text-white font-semibold flex items-center gap-1">
                                                <Upload :size="14" />
                                                Written
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                             <Link
                                v-if="!completedParts.descriptive"
                                :href="route('exams.take.descriptive', examId)"
                                class="w-full md:w-auto px-6 py-3 bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 font-onest"
                            >
                                Start Descriptive Section
                                <ArrowRight :size="18" />
                            </Link>
                            <button
                                v-else
                                disabled
                                class="w-full md:w-auto px-6 py-3 bg-[#1F2937] text-[#6B7280] cursor-not-allowed rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 font-onest"
                            >
                                <CheckCheck :size="18" />
                                Section Completed
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Sidebar - Right Side -->
                <div class="space-y-6">
                    <!-- Progress Card -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-lg font-bold text-white mb-4 font-montserrat">
                            Exam Progress
                        </h3>
                        <div class="space-y-4">
                            <div>
                                <div class="flex items-center justify-between mb-2 font-onest">
                                    <span class="text-sm text-[#9CA3AF]">Overall Completion</span>
                                    <span class="text-sm font-semibold text-white">
                                        {{ Math.round(((completedParts.mcq ? 1 : 0) + (completedParts.cq ? 1 : 0) + (completedParts.descriptive ? 1 : 0)) / 3 * 100) }}%
                                    </span>
                                </div>
                                <div class="w-full bg-[#1F2937] rounded-full h-2">
                                    <div
                                        class="bg-gradient-to-r from-[#0D6EFD] to-[#0B5ED7] h-2 rounded-full transition-all duration-500"
                                        :style="{ width: `${((completedParts.mcq ? 1 : 0) + (completedParts.cq ? 1 : 0) + (completedParts.descriptive ? 1 : 0)) / 3 * 100}%` }"
                                    ></div>
                                </div>
                            </div>

                            <div class="pt-4 border-t border-[#1F2937] space-y-3 font-onest">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <CheckCircle2 v-if="completedParts.mcq" :size="16" class="text-[#22C55E]" />
                                        <div v-else class="w-4 h-4 border-2 border-[#374151] rounded-full"></div>
                                        <span :class="['text-sm', completedParts.mcq ? 'text-[#22C55E]' : 'text-[#9CA3AF]']">MCQ</span>
                                    </div>
                                    <span class="text-xs text-[#6B7280]">{{ examData.parts.mcq.marks }} marks</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <CheckCircle2 v-if="completedParts.cq" :size="16" class="text-[#22C55E]" />
                                        <div v-else class="w-4 h-4 border-2 border-[#374151] rounded-full"></div>
                                        <span :class="['text-sm', completedParts.cq ? 'text-[#22C55E]' : 'text-[#9CA3AF]']">CQ</span>
                                    </div>
                                    <span class="text-xs text-[#6B7280]">{{ examData.parts.cq.marks }} marks</span>
                                </div>
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-2">
                                        <CheckCircle2 v-if="completedParts.descriptive" :size="16" class="text-[#22C55E]" />
                                        <div v-else class="w-4 h-4 border-2 border-[#374151] rounded-full"></div>
                                        <span :class="['text-sm', completedParts.descriptive ? 'text-[#22C55E]' : 'text-[#9CA3AF]']">Descriptive</span>
                                    </div>
                                    <span class="text-xs text-[#6B7280]">{{ examData.parts.descriptive.marks }} marks</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Submit Card -->
                    <div v-if="allPartsCompleted" class="bg-gradient-to-br from-[#16A34A] to-[#15803D] border border-[#22C55E] rounded-xl p-6">
                        <div class="flex items-center gap-2 mb-3">
                            <CheckCircle2 :size="20" class="text-white" />
                            <h3 class="text-lg font-bold text-white font-montserrat">
                                Ready to Submit
                            </h3>
                        </div>
                        <p class="text-white/90 text-sm mb-4 font-onest">
                            You've completed all sections. Review your answers or submit your exam.
                        </p>
                        <Link :href="route('exams')" class="w-full px-6 py-3 bg-white hover:bg-gray-100 text-[#16A34A] rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 font-onest">
                            Submit Exam
                            <ArrowRight :size="18" />
                        </Link>
                    </div>

                    <!-- Quick Tips -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-lg font-bold text-white mb-4 font-montserrat">Quick Tips</h3>
                        <div class="space-y-3 font-onest">
                            <div class="flex items-start gap-3">
                                <div class="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-[#9CA3AF] text-xs">Complete sections in any order you prefer</p>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-[#9CA3AF] text-xs">Upload clear, well-lit images for written answers</p>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-[#9CA3AF] text-xs">Keep track of time for each section</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

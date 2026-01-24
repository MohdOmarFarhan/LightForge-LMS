<script setup>
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import {
    Clock,
    ChevronLeft,
    ChevronRight,
    Upload,
    X,
    CheckCircle2,
    Image as ImageIcon,
    AlertCircle
} from 'lucide-vue-next';

const props = defineProps({
    examId: String
});

const currentQuestion = ref(0);
const uploads = ref({});
const showSubmitModal = ref(false);

const questions = [
    {
        id: 1,
        text: "Explain the fundamental theorem of calculus and its applications in solving real-world problems. Provide at least three detailed examples demonstrating how this theorem bridges differential and integral calculus.",
        marks: 15,
        suggestedPages: "3-4 pages",
    },
    {
        id: 2,
        text: "Derive the formula for the volume of a solid of revolution using the disk method. Then, apply this method to find the volume of a sphere with radius R, showing all steps of your derivation.",
        marks: 15,
        suggestedPages: "3-4 pages",
    },
];

const totalQuestions = questions.length;
const timeRemaining = "24:18";

const handleFileUpload = (questionId, event) => {
    const files = Array.from(event.target.files);
    
    // Simulate file upload
    const newFiles = files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
    }));

    uploads.value = {
        ...uploads.value,
        [questionId]: [...(uploads.value[questionId] || []), ...newFiles]
    };
};

const removeFile = (questionId, fileIndex) => {
    if (!uploads.value[questionId]) return;
    uploads.value[questionId] = uploads.value[questionId].filter((_, index) => index !== fileIndex);
};

const getUploadedFiles = (questionId) => uploads.value[questionId] || [];

const getTotalUploads = computed(() => {
    return Object.values(uploads.value).reduce((sum, files) => sum + files.length, 0);
});

const submitExam = () => {
    // Save progress to localStorage
    const savedProgress = JSON.parse(localStorage.getItem(`exam_${props.examId}_progress`) || '{}');
    savedProgress.descriptive = true;
    localStorage.setItem(`exam_${props.examId}_progress`, JSON.stringify(savedProgress));

    // Redirect to session page
    router.visit(route('exams.session', props.examId));
};

</script>

<template>
    <Head title="Descriptive Exam" />

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
                            Descriptive Section • {{ totalQuestions }} Questions
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
                <!-- Main Content -->
                <div class="lg:col-span-3 space-y-6">
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
                                    <p class="text-[#6B7280] text-xs mt-1 font-onest">
                                        {{ questions[currentQuestion]?.marks }} marks • {{ questions[currentQuestion]?.suggestedPages }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="mb-8">
                            <h2 class="text-lg md:text-xl text-white leading-relaxed font-onest">
                                {{ questions[currentQuestion]?.text }}
                            </h2>
                        </div>

                        <div class="bg-[#0D6EFD]/10 border border-[#0D6EFD] rounded-xl p-4 mb-6">
                            <p class="text-sm text-[#0D6EFD] font-onest">
                                <strong>Instructions:</strong> Write your answer on paper, then upload clear images of your work below.
                            </p>
                        </div>

                        <div>
                            <label class="block">
                                <div class="border-2 border-dashed border-[#374151] hover:border-[#0D6EFD] rounded-xl p-8 cursor-pointer transition-all duration-200 bg-[#0F1419]">
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        class="hidden"
                                        @change="(e) => handleFileUpload(questions[currentQuestion].id, e)"
                                    />
                                    <div class="flex flex-col items-center gap-3">
                                        <Upload :size="32" class="text-[#0D6EFD]" />
                                        <div class="text-center font-onest">
                                            <p class="text-base text-white font-semibold mb-1">
                                                Upload Answer Images
                                            </p>
                                            <p class="text-sm text-[#9CA3AF]">
                                                Click to browse or drag and drop multiple images
                                            </p>
                                            <p class="text-xs text-[#6B7280] mt-2">
                                                Supported formats: JPG, PNG • Max 10MB per image
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </label>

                            <div v-if="getUploadedFiles(questions[currentQuestion].id).length > 0" class="mt-6 space-y-3">
                                <h3 class="text-sm font-bold text-white flex items-center gap-2 font-montserrat">
                                    <ImageIcon :size="16" class="text-[#0D6EFD]" />
                                    Uploaded Images ({{ getUploadedFiles(questions[currentQuestion].id).length }})
                                </h3>
                                <div v-for="(file, fileIndex) in getUploadedFiles(questions[currentQuestion].id)" :key="fileIndex" class="flex items-center justify-between p-4 bg-[#1F2937] rounded-lg hover:bg-[#374151] transition-all duration-200">
                                    <div class="flex items-center gap-4 flex-1">
                                        <div class="w-12 h-12 bg-[#0F1419] rounded-lg flex items-center justify-center">
                                            <ImageIcon :size="20" class="text-[#0D6EFD]" />
                                        </div>
                                        <div class="flex-1 min-w-0 font-onest">
                                            <p class="text-sm text-white font-medium truncate">{{ file.name }}</p>
                                            <p class="text-xs text-[#9CA3AF]">{{ (file.size / 1024).toFixed(2) }} KB</p>
                                        </div>
                                    </div>
                                    <button
                                        @click="removeFile(questions[currentQuestion].id, fileIndex)"
                                        class="p-2 hover:bg-[#DC2626]/20 rounded-lg transition-all duration-200"
                                    >
                                        <X :size="18" class="text-[#DC2626]" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between">
                        <button
                            @click="currentQuestion = Math.max(0, currentQuestion - 1)"
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
                            @click="currentQuestion = Math.min(totalQuestions - 1, currentQuestion + 1)"
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
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-sm font-bold text-white mb-4 font-montserrat">
                            Upload Progress
                        </h3>
                        <div class="space-y-4 font-onest">
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-[#9CA3AF]">Total Uploads</span>
                                <span class="text-sm font-bold text-white">{{ getTotalUploads }}</span>
                            </div>
                            <div class="flex items-center justify-between">
                                <span class="text-sm text-[#9CA3AF]">Questions</span>
                                <span class="text-sm font-bold text-white">{{ totalQuestions }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-sm font-bold text-white mb-4 font-montserrat">
                            All Questions
                        </h3>
                        <div class="space-y-2">
                            <button
                                v-for="(q, index) in questions"
                                :key="q.id"
                                @click="currentQuestion = index"
                                :class="['w-full p-3 rounded-lg text-left transition-all duration-200 font-onest', currentQuestion === index ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                <div class="flex items-center justify-between">
                                    <span class="font-semibold text-sm">Question {{ index + 1 }}</span>
                                    <CheckCircle2 v-if="getUploadedFiles(q.id).length > 0 && currentQuestion !== index" :size="16" />
                                </div>
                                <p class="text-xs opacity-75 mt-1">{{ q.marks }} marks</p>
                            </button>
                        </div>
                    </div>

                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-sm font-bold text-white mb-4 font-montserrat">Tips</h3>
                        <div class="space-y-3 font-onest">
                            <div class="flex items-start gap-2">
                                <div class="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-xs text-[#9CA3AF]">Write in clear, legible handwriting</p>
                            </div>
                            <div class="flex items-start gap-2">
                                <div class="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-xs text-[#9CA3AF]">Show all working and steps</p>
                            </div>
                            <div class="flex items-start gap-2">
                                <div class="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-xs text-[#9CA3AF]">Upload images in correct order</p>
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
                        Submit Descriptive Section?
                    </h2>
                </div>
                <p class="text-[#9CA3AF] mb-6 font-onest">
                    You have uploaded {{ getTotalUploads }} images for {{ totalQuestions }} questions. Make sure all images are clear and in order.
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

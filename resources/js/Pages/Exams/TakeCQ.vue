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
    FileText,
    AlertCircle
} from 'lucide-vue-next';

const props = defineProps({
    examId: String
});

const currentStem = ref(0);
const uploads = ref({});
const showSubmitModal = ref(false);

// Mock CQ data
const stems = [
    {
        id: 1,
        title: "Stem 1: Projectile Motion",
        passage: "A ball is thrown from the top of a building with an initial velocity of 20 m/s at an angle of 30° above the horizontal. The building has a height of 45 meters. Assume g = 10 m/s² and air resistance is negligible.",
        questions: [
            { id: "a", text: "Calculate the time taken for the ball to reach the ground.", marks: 3 },
            { id: "b", text: "Determine the horizontal distance traveled by the ball.", marks: 3 },
            { id: "c", text: "Find the velocity of the ball just before it hits the ground.", marks: 2 },
            { id: "d", text: "Sketch the trajectory of the ball and label key points.", marks: 2 },
        ],
    },
    {
        id: 2,
        title: "Stem 2: Thermodynamics",
        passage: "An ideal gas undergoes a cyclic process consisting of two isothermal processes and two adiabatic processes. The gas starts at pressure P₁ = 2 atm, volume V₁ = 1 L, and temperature T₁ = 300 K.",
        questions: [
            { id: "a", text: "Draw the P-V diagram for the complete cycle.", marks: 3 },
            { id: "b", text: "Calculate the work done during the isothermal expansion.", marks: 3 },
            { id: "c", text: "Determine the efficiency of the cycle.", marks: 2 },
            { id: "d", text: "Explain the energy transformations in each process.", marks: 2 },
        ],
    },
    // Adding dummy stems
    {
        id: 3,
        title: "Stem 3: Organic Chemistry",
        passage: "Compound A (C4H8) reacts with Br2 in CCl4 to give a colorless solution. Ozonolysis of A yields two aldehydes.",
        questions: [
            { id: "a", text: "Identify compound A.", marks: 3 },
            { id: "b", text: "Write the reaction mechanism with Br2.", marks: 3 },
            { id: "c", text: "Show the ozonolysis products.", marks: 2 },
            { id: "d", text: "Is A cis or trans isomer?", marks: 2 },
        ],
    }
];

const totalStems = stems.length;
const timeRemaining = "38:15";

const totalQuestions = computed(() => stems.reduce((sum, stem) => sum + stem.questions.length, 0));

const handleFileUpload = (stemId, questionId, event) => {
    const files = Array.from(event.target.files);
    const key = `${stemId}-${questionId}`;
    
    // Simulate file upload by storing metadata
    const newFiles = files.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type,
        // In a real app, we'd upload here and get a URL/ID
    }));

    uploads.value = {
        ...uploads.value,
        [key]: [...(uploads.value[key] || []), ...newFiles]
    };
};

const removeFile = (stemId, questionId, fileIndex) => {
    const key = `${stemId}-${questionId}`;
    if (!uploads.value[key]) return;
    
    uploads.value[key] = uploads.value[key].filter((_, index) => index !== fileIndex);
};

const getUploadedFiles = (stemId, questionId) => {
    const key = `${stemId}-${questionId}`;
    return uploads.value[key] || [];
};

const getTotalUploads = computed(() => {
    return Object.values(uploads.value).reduce((sum, files) => sum + files.length, 0);
});

const submitExam = () => {
    // Save progress to localStorage
    const savedProgress = JSON.parse(localStorage.getItem(`exam_${props.examId}_progress`) || '{}');
    savedProgress.cq = true;
    localStorage.setItem(`exam_${props.examId}_progress`, JSON.stringify(savedProgress));

    // Redirect to session page
    router.visit(route('exams.session', props.examId));
};

</script>

<template>
    <Head title="CQ Exam" />

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
                            Creative Questions • {{ totalStems }} Stems • {{ totalQuestions }} Questions
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
                    <!-- Stem Card -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6 md:p-8">
                        <div class="flex items-center justify-between mb-6">
                            <div>
                                <h2 class="text-xl md:text-2xl font-bold text-white mb-2 font-montserrat">
                                    {{ stems[currentStem]?.title }}
                                </h2>
                                <p class="text-[#9CA3AF] text-sm font-onest">
                                    Stem {{ currentStem + 1 }} of {{ totalStems }}
                                </p>
                            </div>
                            <span class="px-4 py-2 bg-[#0D6EFD] text-white rounded-lg font-bold font-montserrat">
                                S{{ currentStem + 1 }}
                            </span>
                        </div>

                        <!-- Passage -->
                        <div class="bg-[#0F1419] border border-[#1F2937] rounded-xl p-6 mb-8">
                            <div class="flex items-center gap-2 mb-3">
                                <FileText :size="18" class="text-[#0D6EFD]" />
                                <h3 class="text-sm font-bold text-white font-montserrat">Passage</h3>
                            </div>
                            <p class="text-[#D1D5DB] leading-relaxed font-onest">
                                {{ stems[currentStem]?.passage }}
                            </p>
                        </div>

                        <!-- Questions -->
                        <div class="space-y-6">
                            <div v-for="question in stems[currentStem]?.questions" :key="question.id" class="border border-[#1F2937] rounded-xl p-6">
                                <div class="flex items-start justify-between mb-4">
                                    <div class="flex-1">
                                        <div class="flex items-center gap-3 mb-2">
                                            <span class="px-3 py-1 bg-[#1F2937] text-white rounded font-semibold text-sm font-montserrat">
                                                {{ question.id.toUpperCase() }}
                                            </span>
                                            <span class="text-xs text-[#9CA3AF] font-onest">
                                                {{ question.marks }} marks
                                            </span>
                                        </div>
                                        <p class="text-white text-base md:text-lg font-onest">
                                            {{ question.text }}
                                        </p>
                                    </div>
                                </div>

                                <!-- Upload Area -->
                                <div class="mt-4">
                                    <label class="block">
                                        <div class="border-2 border-dashed border-[#374151] hover:border-[#0D6EFD] rounded-xl p-6 cursor-pointer transition-all duration-200 bg-[#0F1419]">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                class="hidden"
                                                @change="(e) => handleFileUpload(stems[currentStem].id, question.id, e)"
                                            />
                                            <div class="flex flex-col items-center gap-2">
                                                <Upload :size="24" class="text-[#0D6EFD]" />
                                                <p class="text-sm text-white font-medium font-onest">
                                                    Upload Answer Images
                                                </p>
                                                <p class="text-xs text-[#9CA3AF] font-onest">
                                                    Click to browse or drag and drop
                                                </p>
                                            </div>
                                        </div>
                                    </label>

                                    <!-- Uploaded Files -->
                                    <div v-if="getUploadedFiles(stems[currentStem].id, question.id).length > 0" class="mt-4 space-y-2">
                                        <div v-for="(file, fileIndex) in getUploadedFiles(stems[currentStem].id, question.id)" :key="fileIndex" class="flex items-center justify-between p-3 bg-[#1F2937] rounded-lg">
                                            <div class="flex items-center gap-3 flex-1">
                                                <ImageIcon :size="18" class="text-[#0D6EFD]" />
                                                <div class="flex-1 min-w-0 font-onest">
                                                    <p class="text-sm text-white truncate">{{ file.name }}</p>
                                                    <p class="text-xs text-[#9CA3AF]">{{ (file.size / 1024).toFixed(2) }} KB</p>
                                                </div>
                                            </div>
                                            <button
                                                @click="removeFile(stems[currentStem].id, question.id, fileIndex)"
                                                class="p-1 hover:bg-[#374151] rounded transition-all duration-200"
                                            >
                                                <X :size="16" class="text-[#DC2626]" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Navigation -->
                    <div class="flex items-center justify-between">
                        <button
                            @click="currentStem = Math.max(0, currentStem - 1)"
                            :disabled="currentStem === 0"
                            :class="['px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 font-onest', currentStem === 0 ? 'bg-[#1F2937] text-[#6B7280] cursor-not-allowed' : 'bg-[#1F2937] text-white hover:bg-[#374151]']"
                        >
                            <ChevronLeft :size="18" />
                            Previous Stem
                        </button>

                        <div class="hidden md:block text-center">
                            <p class="text-[#9CA3AF] text-sm font-onest">
                                Stem {{ currentStem + 1 }} of {{ totalStems }}
                            </p>
                        </div>

                        <button
                            @click="currentStem = Math.min(totalStems - 1, currentStem + 1)"
                            :disabled="currentStem === totalStems - 1"
                            :class="['px-6 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 font-onest', currentStem === totalStems - 1 ? 'bg-[#1F2937] text-[#6B7280] cursor-not-allowed' : 'bg-[#0D6EFD] text-white hover:bg-[#0B5ED7]']"
                        >
                            Next Stem
                            <ChevronRight :size="18" />
                        </button>
                    </div>
                </div>

                <!-- Sidebar -->
                <div class="space-y-6">
                    <!-- Progress Card -->
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
                        <div class="pt-4 border-t border-[#1F2937] mt-4 font-onest">
                            <p class="text-xs text-[#9CA3AF] mb-2">Upload answer images for each question</p>
                            <div class="flex items-center gap-2 p-3 bg-[#0D6EFD]/10 border border-[#0D6EFD] rounded-lg">
                                <Upload :size="14" class="text-[#0D6EFD]" />
                                <span class="text-xs text-[#0D6EFD]">Images will be reviewed</span>
                            </div>
                        </div>
                    </div>

                    <!-- Stem Navigator -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-sm font-bold text-white mb-4 font-montserrat">All Stems</h3>
                        <div class="space-y-2">
                            <button
                                v-for="(stem, index) in stems"
                                :key="index"
                                @click="currentStem = index"
                                :class="['w-full p-3 rounded-lg text-left transition-all duration-200 font-onest', currentStem === index ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                <div class="flex items-center justify-between">
                                    <span class="font-semibold text-sm">Stem {{ index + 1 }}</span>
                                    <!-- Simple check if uploads exist for any question in stem -->
                                    <CheckCircle2 v-if="stem.questions.some(q => getUploadedFiles(stem.id, q.id).length > 0) && currentStem !== index" :size="16" />
                                </div>
                            </button>
                        </div>
                    </div>

                    <!-- Tips -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-sm font-bold text-white mb-4 font-montserrat">Tips</h3>
                        <div class="space-y-3 font-onest">
                            <div class="flex items-start gap-2">
                                <div class="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-xs text-[#9CA3AF]">Write clearly on paper</p>
                            </div>
                            <div class="flex items-start gap-2">
                                <div class="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-xs text-[#9CA3AF]">Upload well-lit images</p>
                            </div>
                            <div class="flex items-start gap-2">
                                <div class="mt-1 w-1 h-1 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-xs text-[#9CA3AF]">Check orientation before upload</p>
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
                        Submit CQ Section?
                    </h2>
                </div>
                <p class="text-[#9CA3AF] mb-6 font-onest">
                    You have uploaded {{ getTotalUploads }} images for {{ totalQuestions }} questions across {{ totalStems }} stems. Make sure all images are clear and readable.
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

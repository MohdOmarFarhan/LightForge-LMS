<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, onMounted, computed } from 'vue';
import {
    Clock,
    BookOpen,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    CheckCheck,
    Upload,
    FileText,
    Trophy
} from 'lucide-vue-next';

const props = defineProps({
    exam: Object,
    attempt: Object,
    breakdown: Object
});

const isSubmitted = computed(() => {
    return props.attempt && (props.attempt.status === 'submitted' || props.attempt.status === 'graded');
});

const isGraded = computed(() => {
    return props.attempt && props.attempt.status === 'graded';
});

const startExam = (section) => {
    // Post request to start specific section
    window.location.href = route('exams.take', { id: props.exam.id, section: section });
};

// Section status helpers
const getSectionStatus = (type) => {
    if (!props.attempt) return 'pending';
    if (type === 'mcq') {
        if (props.attempt.mcq_submitted_at) return 'completed';
        if (props.attempt.mcq_started_at) return 'in_progress';
    } else if (type === 'cq') {
        if (props.attempt.cq_submitted_at) return 'completed';
        if (props.attempt.cq_started_at) return 'in_progress';
    } else if (type === 'descriptive') {
        if (props.attempt.descriptive_submitted_at) return 'completed';
        if (props.attempt.descriptive_started_at) return 'in_progress';
    }
    return 'pending';
};

const submitAll = () => {
    if (confirm('Are you sure you want to submit the entire exam? You will not be able to make any changes.')) {
        router.post(route('exams.submit_all', props.exam.id));
    }
};

const mcqCount = computed(() => props.breakdown?.mcq || 0);
const cqCount = computed(() => props.breakdown?.cq || 0);
const descriptiveCount = computed(() => props.breakdown?.descriptive || 0);

const mcqMarks = computed(() => props.breakdown?.mcq_marks || 0);
const cqMarks = computed(() => props.breakdown?.cq_marks || 0);
const descriptiveMarks = computed(() => props.breakdown?.descriptive_marks || 0);

const totalQuestions = computed(() => mcqCount.value + cqCount.value + descriptiveCount.value);

</script>

<template>
    <Head :title="exam.title" />

    <div class="min-h-screen bg-[#0F1419] text-white font-inter">
        <!-- Header -->
        <div class="border-b border-[#1F2937] bg-[#161B22]">
            <div class="max-w-7xl mx-auto px-6 py-6">
                <div class="flex items-center justify-between">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-3 py-1 bg-[#0D6EFD] text-white text-xs font-semibold rounded-full font-montserrat">
                                {{ exam.subject?.name || 'Subject' }}
                            </span>
                            <span v-if="attempt?.status === 'in_progress'" class="px-3 py-1 bg-[#16A34A]/20 text-[#22C55E] text-xs font-semibold rounded-full flex items-center gap-1 font-montserrat">
                                <Clock :size="12" />
                                In Progress
                            </span>
                             <span v-else-if="isSubmitted" class="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-semibold rounded-full flex items-center gap-1 font-montserrat">
                                <CheckCircle2 :size="12" />
                                Submitted
                            </span>
                        </div>
                        <h1 class="text-2xl md:text-3xl font-bold text-white mb-1 font-montserrat">
                            {{ exam.title }}
                        </h1>
                        <p class="text-[#9CA3AF] text-sm font-onest">
                            Total Duration: {{ exam.duration_minutes }} mins • Total Marks: {{ exam.total_marks }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-6 py-8">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Main Content - Left Side -->
                <div class="lg:col-span-2 space-y-6">
                    
                    <!-- Result Card (If Submitted) -->
                    <div v-if="isSubmitted" class="bg-[#161B22] border border-[#1F2937] rounded-xl p-8 text-center">
                        <div class="w-16 h-16 bg-[#16A34A]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trophy :size="32" class="text-[#22C55E]" />
                        </div>
                        <h2 class="text-2xl font-bold text-white mb-2 font-montserrat">Exam Submitted!</h2>
                        <p class="text-[#9CA3AF] font-onest mb-6">You have successfully completed this exam.</p>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto text-left bg-[#0D1117] p-6 rounded-xl border border-[#374151]">
                            <div>
                                <p class="text-sm text-[#9CA3AF] mb-1">MCQ Score</p>
                                <p class="text-2xl font-bold text-white">{{ attempt.score_mcq }} <span class="text-sm text-[#6B7280] font-normal">/ {{ mcqMarks }}</span></p>
                                <p class="text-xs text-[#22C55E] mt-1">Graded Instantly</p>
                            </div>
                            
                            <div v-if="cqCount > 0 || descriptiveCount > 0">
                                <p class="text-sm text-[#9CA3AF] mb-1">Written Part</p>
                                <p class="text-2xl font-bold text-[#F59E0B]" v-if="attempt.status === 'submitted'">Pending</p>
                                <p class="text-2xl font-bold text-white" v-else>{{ (attempt.score_cq || 0) + (attempt.score_descriptive || 0) }}</p>
                                <p class="text-xs text-[#9CA3AF] mt-1" v-if="attempt.status === 'submitted'">Waiting for instructor evaluation</p>
                            </div>

                            <div v-if="attempt.status === 'graded'">
                                <p class="text-sm text-[#9CA3AF] mb-1">Total Score</p>
                                <p class="text-3xl font-bold text-[#0D6EFD]">{{ attempt.total_score }} <span class="text-sm text-[#6B7280] font-normal">/ {{ exam.total_marks }}</span></p>
                            </div>
                        </div>

                        <div class="mt-8">
                             <Link :href="route('exams')" class="inline-flex items-center gap-2 text-[#0D6EFD] hover:underline font-semibold">
                                <ArrowRight :size="16" /> Back to Exams List
                            </Link>
                        </div>
                    </div>

                    <!-- Instructions Card (If Not Submitted) -->
                    <div v-else class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <div class="flex items-center gap-2 mb-4">
                            <AlertCircle :size="20" class="text-[#F59E0B]" />
                            <h2 class="text-xl font-bold text-white font-montserrat">
                                Exam Instructions
                            </h2>
                        </div>
                        <div class="space-y-3">
                            <div class="flex items-start gap-3">
                                <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-[#D1D5DB] text-sm leading-relaxed font-onest">
                                    The exam contains {{ totalQuestions }} questions in total.
                                </p>
                            </div>
                            <div v-if="mcqCount > 0" class="flex items-start gap-3">
                                <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-[#D1D5DB] text-sm leading-relaxed font-onest">
                                    {{ mcqCount }} Multiple Choice Questions (MCQ) - Auto graded.
                                </p>
                            </div>
                            <div v-if="cqCount > 0" class="flex items-start gap-3">
                                <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-[#D1D5DB] text-sm leading-relaxed font-onest">
                                    {{ cqCount }} Creative Questions (CQ) - Requires written answers/uploads.
                                </p>
                            </div>
                             <div v-if="descriptiveCount > 0" class="flex items-start gap-3">
                                <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-[#D1D5DB] text-sm leading-relaxed font-onest">
                                    {{ descriptiveCount }} Descriptive Questions - Requires written answers/uploads.
                                </p>
                            </div>
                            <div class="flex items-start gap-3">
                                <div class="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#0D6EFD] flex-shrink-0"></div>
                                <p class="text-[#D1D5DB] text-sm leading-relaxed font-onest">
                                    Once you start, the timer will begin and cannot be paused.
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Start Buttons Section -->
                    <div v-if="!isSubmitted" class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-xl font-bold text-white mb-6 font-montserrat flex items-center gap-2">
                            <BookOpen :size="24" class="text-[#0D6EFD]" />
                            Select Section to Start
                        </h3>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <!-- MCQ Section -->
                            <div v-if="mcqCount > 0" class="bg-[#0D1117] p-4 rounded-lg border border-[#374151] flex flex-col">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="px-2 py-1 bg-[#0D6EFD]/10 text-[#0D6EFD] text-xs font-bold rounded uppercase">MCQ</span>
                                    <span v-if="getSectionStatus('mcq') === 'completed'" class="text-[#22C55E]"><CheckCircle2 :size="18"/></span>
                                </div>
                                <h4 class="text-white font-bold mb-1">Multiple Choice</h4>
                                <p class="text-[#9CA3AF] text-xs mb-4">{{ mcqCount }} Questions • {{ exam.mcq_duration_minutes || 'As per total' }} Mins</p>
                                
                                <button 
                                    @click="startExam('mcq')"
                                    :disabled="getSectionStatus('mcq') === 'completed'"
                                    class="mt-auto w-full py-2 px-4 rounded font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                                    :class="getSectionStatus('mcq') === 'completed' ? 'bg-[#1F2937] text-[#6B7280] cursor-not-allowed' : 'bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white'"
                                >
                                    {{ getSectionStatus('mcq') === 'completed' ? 'Completed' : (getSectionStatus('mcq') === 'in_progress' ? 'Resume' : 'Start MCQ') }}
                                    <ArrowRight v-if="getSectionStatus('mcq') !== 'completed'" :size="14" />
                                </button>
                            </div>

                            <!-- CQ Section -->
                            <div v-if="cqCount > 0" class="bg-[#0D1117] p-4 rounded-lg border border-[#374151] flex flex-col">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="px-2 py-1 bg-[#16A34A]/10 text-[#16A34A] text-xs font-bold rounded uppercase">CQ</span>
                                    <span v-if="getSectionStatus('cq') === 'completed'" class="text-[#22C55E]"><CheckCircle2 :size="18"/></span>
                                </div>
                                <h4 class="text-white font-bold mb-1">Creative Questions</h4>
                                <p class="text-[#9CA3AF] text-xs mb-4">{{ cqCount }} Questions • {{ exam.cq_duration_minutes || 'As per total' }} Mins</p>
                                
                                <button 
                                    @click="startExam('cq')"
                                    :disabled="getSectionStatus('cq') === 'completed'"
                                    class="mt-auto w-full py-2 px-4 rounded font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                                    :class="getSectionStatus('cq') === 'completed' ? 'bg-[#1F2937] text-[#6B7280] cursor-not-allowed' : 'bg-[#16A34A] hover:bg-[#15803D] text-white'"
                                >
                                    {{ getSectionStatus('cq') === 'completed' ? 'Completed' : (getSectionStatus('cq') === 'in_progress' ? 'Resume' : 'Start CQ') }}
                                    <ArrowRight v-if="getSectionStatus('cq') !== 'completed'" :size="14" />
                                </button>
                            </div>

                            <!-- Descriptive Section -->
                            <div v-if="descriptiveCount > 0" class="bg-[#0D1117] p-4 rounded-lg border border-[#374151] flex flex-col">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="px-2 py-1 bg-[#F59E0B]/10 text-[#F59E0B] text-xs font-bold rounded uppercase">Descriptive</span>
                                    <span v-if="getSectionStatus('descriptive') === 'completed'" class="text-[#22C55E]"><CheckCircle2 :size="18"/></span>
                                </div>
                                <h4 class="text-white font-bold mb-1">Descriptive</h4>
                                <p class="text-[#9CA3AF] text-xs mb-4">{{ descriptiveCount }} Questions • {{ exam.descriptive_duration_minutes || 'As per total' }} Mins</p>
                                
                                <button 
                                    @click="startExam('descriptive')"
                                    :disabled="getSectionStatus('descriptive') === 'completed'"
                                    class="mt-auto w-full py-2 px-4 rounded font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                                    :class="getSectionStatus('descriptive') === 'completed' ? 'bg-[#1F2937] text-[#6B7280] cursor-not-allowed' : 'bg-[#F59E0B] hover:bg-[#D97706] text-white'"
                                >
                                    {{ getSectionStatus('descriptive') === 'completed' ? 'Completed' : (getSectionStatus('descriptive') === 'in_progress' ? 'Resume' : 'Start Descriptive') }}
                                    <ArrowRight v-if="getSectionStatus('descriptive') !== 'completed'" :size="14" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Submit All Button (If all sections completed) -->
                     <div v-if="!isSubmitted && ((mcqCount === 0 || getSectionStatus('mcq') === 'completed') && (cqCount === 0 || getSectionStatus('cq') === 'completed') && (descriptiveCount === 0 || getSectionStatus('descriptive') === 'completed'))" class="mt-6 text-center">
                        <button 
                            @click="submitAll" 
                            class="px-8 py-3 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-[#16A34A]/30 text-white rounded-lg font-bold text-lg transition-all duration-200 flex items-center gap-2 mx-auto"
                        >
                            <CheckCheck :size="20" />
                            Submit Entire Exam
                        </button>
                    </div>

                </div>

                <!-- Sidebar - Right Side -->
                <div class="space-y-6">
                    <!-- Exam Details Card -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                        <h3 class="text-lg font-bold text-white mb-4 font-montserrat">
                            Details
                        </h3>
                        <div class="space-y-4 font-onest">
                            <div class="flex justify-between items-center py-2 border-b border-[#1F2937]">
                                <span class="text-[#9CA3AF]">Subject</span>
                                <span class="text-white font-medium">{{ exam.subject?.name || 'N/A' }}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-[#1F2937]">
                                <span class="text-[#9CA3AF]">Class</span>
                                <span class="text-white font-medium">{{ exam.target_class || exam.class }}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-[#1F2937]">
                                <span class="text-[#9CA3AF]">Paper</span>
                                <span class="text-white font-medium">{{ exam.paper?.name || exam.paper }}</span>
                            </div>
                             <div class="flex justify-between items-center py-2 border-b border-[#1F2937]">
                                <span class="text-[#9CA3AF]">Questions</span>
                                <span class="text-white font-medium">{{ totalQuestions }}</span>
                            </div>
                            <div class="flex justify-between items-center py-2 border-b border-[#1F2937]">
                                <span class="text-[#9CA3AF]">Marks</span>
                                <span class="text-white font-medium">{{ exam.total_marks }}</span>
                            </div>
                            <div class="flex justify-between items-center py-2">
                                <span class="text-[#9CA3AF]">Duration</span>
                                <span class="text-white font-medium">{{ exam.duration_minutes }} mins</span>
                            </div>
                        </div>
                    </div>

                    <!-- Structure Card -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                         <h3 class="text-lg font-bold text-white mb-4 font-montserrat">
                            Structure
                        </h3>
                        <div class="space-y-3 font-onest">
                             <div class="flex items-center justify-between p-3 bg-[#0D1117] rounded-lg border border-[#374151]">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-lg bg-[#0D6EFD]/10 text-[#0D6EFD] flex items-center justify-center font-bold">
                                        M
                                    </div>
                                    <div>
                                        <p class="text-white font-semibold">MCQ</p>
                                        <p class="text-xs text-[#9CA3AF]">{{ mcqCount }} questions</p>
                                    </div>
                                </div>
                                <span class="text-white font-bold">{{ mcqMarks }} pts</span>
                            </div>
                            
                            <div v-if="cqCount > 0" class="flex items-center justify-between p-3 bg-[#0D1117] rounded-lg border border-[#374151]">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-lg bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center font-bold">
                                        C
                                    </div>
                                    <div>
                                        <p class="text-white font-semibold">Creative</p>
                                        <p class="text-xs text-[#9CA3AF]">{{ cqCount }} questions</p>
                                    </div>
                                </div>
                                <span class="text-white font-bold">{{ cqMarks }} pts</span>
                            </div>

                             <div v-if="descriptiveCount > 0" class="flex items-center justify-between p-3 bg-[#0D1117] rounded-lg border border-[#374151]">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center font-bold">
                                        D
                                    </div>
                                    <div>
                                        <p class="text-white font-semibold">Descriptive</p>
                                        <p class="text-xs text-[#9CA3AF]">{{ descriptiveCount }} questions</p>
                                    </div>
                                </div>
                                <span class="text-white font-bold">{{ descriptiveMarks }} pts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

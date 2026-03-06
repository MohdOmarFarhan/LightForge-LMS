<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ref, computed } from 'vue';
import { ArrowLeft, Edit, Clock, Calendar, FileText, CheckCircle, BookOpen, Layers, User, ChevronRight, ChevronDown } from 'lucide-vue-next';
import dayjs from 'dayjs';

const props = defineProps({
    exam: Object,
});

const formatDate = (date) => {
    return dayjs(date).format('MMM D, YYYY h:mm A');
};

// Toggle state for groups
const expandedGroups = ref({
    mcq: true,
    cq: true,
    descriptive: true
});

const toggleGroup = (key) => {
    expandedGroups.value[key] = !expandedGroups.value[key];
};

// Grouped Questions Logic
const groupedQuestions = computed(() => {
    const groups = {
        mcq: {},
        cq: {},
        descriptive: {}
    };
    
    props.exam.questions.forEach(q => {
        const type = q.type;
        const subjectName = q.subject?.name || 'Unknown Subject';
        if (!groups[type][subjectName]) {
            groups[type][subjectName] = [];
        }
        groups[type][subjectName].push(q);
    });
    
    return groups;
});

const typeLabels = {
    mcq: 'MCQ',
    cq: 'Creative Questions (CQ)',
    descriptive: 'Descriptive'
};

const typeColors = {
    mcq: 'text-[#0D6EFD]',
    cq: 'text-[#22C55E]',
    descriptive: 'text-[#F59E0B]'
};

const typeBadgeColors = {
    mcq: 'bg-[#0D6EFD]/20 text-[#0D6EFD]',
    cq: 'bg-[#16A34A]/20 text-[#22C55E]',
    descriptive: 'bg-[#F59E0B]/20 text-[#F59E0B]'
};
</script>

<template>
    <Head :title="`View Exam: ${exam.title}`" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <Link
                    :href="route('admin.exams')"
                    class="inline-flex items-center gap-2 text-[#0D6EFD] hover:text-[#0B5ED7] transition-colors font-onest"
                >
                    <ArrowLeft :size="20" />
                    <span class="font-semibold">Back to Exams</span>
                </Link>
                <div class="flex items-center gap-3">
                    <span class="text-[#9CA3AF] font-mono text-sm">#{{ exam.id }}</span>
                    <Link
                        :href="route('admin.exams.edit', exam.id)"
                        class="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all flex items-center gap-2 font-onest text-sm"
                    >
                        <Edit :size="16" />
                        Edit Exam
                    </Link>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left: Exam Info -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Basic Info Card -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                        <div class="p-6 border-b border-[#1F2937]">
                            <h2 class="text-xl font-bold text-white font-montserrat">{{ exam.title }}</h2>
                        </div>
                        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="space-y-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-lg bg-[#0D1117] flex items-center justify-center text-[#0D6EFD]">
                                        <BookOpen :size="20" />
                                    </div>
                                    <div>
                                        <div class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Class & Subject</div>
                                        <div class="text-white font-semibold font-onest">Class {{ exam.target_class }} • {{ exam.subject?.name || 'Mixed' }}</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-lg bg-[#0D1117] flex items-center justify-center text-[#16A34A]">
                                        <Layers :size="20" />
                                    </div>
                                    <div>
                                        <div class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Paper</div>
                                        <div class="text-white font-semibold font-onest">{{ exam.paper?.name || 'N/A' }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-lg bg-[#0D1117] flex items-center justify-center text-[#F59E0B]">
                                        <Clock :size="20" />
                                    </div>
                                    <div>
                                        <div class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Duration</div>
                                        <div class="text-white font-semibold font-onest">{{ exam.duration_minutes }} Minutes</div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-3">
                                    <div class="w-10 h-10 rounded-lg bg-[#0D1117] flex items-center justify-center text-[#EF4444]">
                                        <FileText :size="20" />
                                    </div>
                                    <div>
                                        <div class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider">Total Marks</div>
                                        <div class="text-white font-semibold font-onest">{{ exam.total_marks }} Marks</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Questions List -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                        <div class="p-6 border-b border-[#1F2937] flex justify-between items-center">
                            <h3 class="text-lg font-bold text-white font-montserrat">Exam Questions ({{ exam.questions.length }})</h3>
                        </div>
                        
                        <div class="p-4 space-y-4">
                            <div v-for="(subjects, type) in groupedQuestions" :key="type" v-show="Object.keys(subjects).length > 0">
                                <!-- Type Header -->
                                <div class="bg-[#1F2937] px-4 py-2 rounded-t-xl border border-[#374151] border-b-0 flex justify-between items-center cursor-pointer" @click="toggleGroup(type)">
                                    <h4 :class="['font-bold font-montserrat flex items-center gap-2 uppercase tracking-wider text-sm', typeColors[type]]">
                                        <ChevronRight v-if="!expandedGroups[type]" :size="16" />
                                        <ChevronDown v-else :size="16" />
                                        {{ typeLabels[type] }}
                                    </h4>
                                    <span class="text-xs text-[#9CA3AF]">
                                        {{ Object.values(subjects).flat().length }} Qs
                                    </span>
                                </div>

                                <!-- Subjects Body -->
                                <div v-show="expandedGroups[type]" class="bg-[#1F2937] border border-[#374151] rounded-b-xl p-4 space-y-4">
                                    <div v-for="(questions, subject) in subjects" :key="subject">
                                        <h5 class="text-xs font-bold text-white mb-2 border-b border-[#374151] pb-1 flex justify-between">
                                            <span>{{ subject }}</span>
                                            <span class="text-[#9CA3AF] font-normal">{{ questions.length }}</span>
                                        </h5>
                                        <div class="space-y-2">
                                            <div v-for="(question, qIndex) in questions" :key="question.id" class="p-4 bg-[#0D1117] rounded-lg border border-[#374151]">
                                                <div class="flex items-start gap-4">
                                                    <span class="w-6 h-6 rounded bg-[#1F2937] flex items-center justify-center text-[#9CA3AF] font-mono text-xs font-bold shrink-0">
                                                        {{ qIndex + 1 }}
                                                    </span>
                                                    <div class="flex-1 space-y-2">
                                                        <div class="flex items-center gap-2">
                                                            <span :class="['px-2 py-0.5 rounded text-[10px] font-bold uppercase', typeBadgeColors[type]]">
                                                                {{ type }}
                                                            </span>
                                                            <span class="text-xs text-[#9CA3AF] font-onest">{{ question.chapter?.name }}</span>
                                                            <span class="ml-auto text-xs font-bold text-white">{{ question.marks }} Marks</span>
                                                        </div>
                                                        <p class="text-white font-onest leading-relaxed text-sm">{{ question.content }}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Schedule & Status -->
                <div class="space-y-6">
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                        <div class="p-6 border-b border-[#1F2937]">
                            <h3 class="text-lg font-bold text-white font-montserrat">Schedule & Status</h3>
                        </div>
                        <div class="p-6 space-y-6">
                            <div class="space-y-4">
                                <div>
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-2 block flex items-center gap-1">
                                        <Calendar :size="14" /> Start Time
                                    </label>
                                    <div class="text-white font-semibold font-onest bg-[#0D1117] p-3 rounded-lg border border-[#374151]">
                                        {{ formatDate(exam.start_time) }}
                                    </div>
                                </div>
                                <div>
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-2 block flex items-center gap-1">
                                        <Calendar :size="14" /> End Time
                                    </label>
                                    <div class="text-white font-semibold font-onest bg-[#0D1117] p-3 rounded-lg border border-[#374151]">
                                        {{ formatDate(exam.end_time) }}
                                    </div>
                                </div>
                            </div>

                            <div class="pt-6 border-t border-[#1F2937] space-y-4">
                                <div>
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-2 block">Publish Status</label>
                                    <span
                                        :class="['px-3 py-1.5 rounded-lg text-xs font-bold font-onest flex items-center gap-2 w-fit', exam.is_published ? 'bg-[#16A34A]/20 text-[#22C55E]' : 'bg-[#F59E0B]/20 text-[#F59E0B]']"
                                    >
                                        <CheckCircle :size="14" />
                                        {{ exam.is_published ? 'Published' : 'Draft' }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

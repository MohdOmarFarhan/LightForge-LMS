<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link } from '@inertiajs/vue3';
import { ArrowLeft, Edit, Clock, Tag, BookOpen, Layers, Bookmark, FileText } from 'lucide-vue-next';
import 'katex/dist/katex.min.css';

const props = defineProps({
    question: Object,
});
</script>

<template>
    <Head title="View Question" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <Link
                    :href="route('admin.questions')"
                    class="inline-flex items-center gap-2 text-[#0D6EFD] hover:text-[#0B5ED7] transition-colors font-onest"
                >
                    <ArrowLeft :size="20" />
                    <span class="font-semibold">Back to Questions</span>
                </Link>
                <div class="flex items-center gap-3">
                    <span class="text-[#9CA3AF] font-mono text-sm">#{{ question.id }}</span>
                    <Link
                        :href="route('admin.questions.edit', question.id)"
                        class="px-4 py-2 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all flex items-center gap-2 font-onest text-sm"
                    >
                        <Edit :size="16" />
                        Edit Question
                    </Link>
                </div>
            </div>

            <!-- Main Content -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <!-- Left Column: Question Details -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Question Card -->
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                        <div class="p-6 border-b border-[#1F2937] flex items-center justify-between">
                            <h2 class="text-lg font-bold text-white font-montserrat flex items-center gap-2">
                                <FileText :size="20" class="text-[#0D6EFD]" />
                                Question Content
                            </h2>
                            <span 
                                :class="['px-3 py-1 rounded-lg text-xs font-semibold font-onest uppercase', 
                                    question.type === 'mcq' ? 'bg-[#0D6EFD]/20 text-[#0D6EFD]' : 
                                    question.type === 'cq' ? 'bg-[#16A34A]/20 text-[#22C55E]' : 
                                    'bg-[#F59E0B]/20 text-[#F59E0B]'
                                ]"
                            >
                                {{ question.type }}
                            </span>
                        </div>
                        <div class="p-6">
                            <div class="text-white text-lg leading-relaxed font-onest whitespace-pre-wrap ql-editor" v-html="question.content"></div>
                        </div>
                    </div>

                    <!-- Options / Sub-questions -->
                    <div v-if="question.type === 'mcq'" class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                        <div class="p-6 border-b border-[#1F2937]">
                            <h3 class="text-lg font-bold text-white font-montserrat">Options</h3>
                        </div>
                        <div class="p-6 space-y-3">
                            <div 
                                v-for="(option, index) in question.options" 
                                :key="index"
                                :class="[
                                    'p-4 rounded-lg border font-onest transition-colors flex items-center gap-3',
                                    question.correct_answer === option 
                                        ? 'bg-[#16A34A]/10 border-[#16A34A] text-white' 
                                        : 'bg-[#0D1117] border-[#374151] text-[#9CA3AF]'
                                ]"
                            >
                                <span 
                                    :class="[
                                        'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                                        question.correct_answer === option ? 'bg-[#16A34A] text-white' : 'bg-[#1F2937] text-[#9CA3AF]'
                                    ]"
                                >
                                    {{ String.fromCharCode(65 + index) }}
                                </span>
                                <span class="flex-1">{{ option }}</span>
                                <span v-if="question.correct_answer === option" class="text-[#16A34A] text-xs font-bold uppercase tracking-wider">Correct Answer</span>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="question.type === 'cq'" class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                        <div class="p-6 border-b border-[#1F2937]">
                            <h3 class="text-lg font-bold text-white font-montserrat">Sub-Questions</h3>
                        </div>
                        <div class="divide-y divide-[#1F2937]">
                            <div v-for="(text, key) in question.sub_questions" :key="key" class="p-6 hover:bg-[#1F2937]/50 transition-colors">
                                <div class="flex items-start gap-4">
                                    <span class="w-8 h-8 rounded-lg bg-[#0D1117] border border-[#374151] flex items-center justify-center text-[#9CA3AF] font-mono font-bold uppercase shrink-0">
                                        {{ key }}
                                    </span>
                                    <div class="text-white font-onest pt-1 ql-editor" v-html="text"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Metadata -->
                <div class="space-y-6">
                    <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                        <div class="p-6 border-b border-[#1F2937]">
                            <h3 class="text-lg font-bold text-white font-montserrat">Metadata</h3>
                        </div>
                        <div class="p-6 space-y-6">
                            <!-- Class & Subject -->
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block">Level</label>
                                    <div class="text-white font-semibold font-onest text-lg">{{ question.level?.name }} ({{ question.level?.code }})</div>
                                </div>
                                <div>
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block">Marks</label>
                                    <div class="text-white font-semibold font-onest text-lg">{{ question.marks }}</div>
                                </div>
                            </div>

                            <!-- Subject Info -->
                            <div class="space-y-4 pt-4 border-t border-[#1F2937]">
                                <div>
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block flex items-center gap-1">
                                        <BookOpen :size="14" /> Subject
                                    </label>
                                    <div class="text-white font-semibold font-onest">{{ question.subject?.name }}</div>
                                </div>
                                <div>
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block flex items-center gap-1">
                                        <Layers :size="14" /> Paper
                                    </label>
                                    <div class="text-white font-semibold font-onest">{{ question.paper?.name }}</div>
                                </div>
                                <div>
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block flex items-center gap-1">
                                        <Bookmark :size="14" /> Chapter
                                    </label>
                                    <div class="text-white font-semibold font-onest">{{ question.chapter?.name }}</div>
                                </div>
                                <div v-if="question.module">
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block flex items-center gap-1">
                                        <Tag :size="14" /> Module
                                    </label>
                                    <div class="text-white font-semibold font-onest">{{ question.module?.name }}</div>
                                </div>
                            </div>

                            <!-- Other Info -->
                            <div class="space-y-4 pt-4 border-t border-[#1F2937]">
                                <div>
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block">Difficulty</label>
                                    <span 
                                        :class="['px-2 py-1 rounded text-xs font-bold uppercase', 
                                            question.difficulty === 'easy' ? 'bg-[#16A34A]/20 text-[#22C55E]' : 
                                            question.difficulty === 'medium' ? 'bg-[#0D6EFD]/20 text-[#0D6EFD]' : 
                                            'bg-[#EF4444]/20 text-[#EF4444]'
                                        ]"
                                    >
                                        {{ question.difficulty }}
                                    </span>
                                </div>
                                <div v-if="question.time_limit">
                                    <label class="text-xs text-[#9CA3AF] font-bold uppercase tracking-wider mb-1 block flex items-center gap-1">
                                        <Clock :size="14" /> Time Limit
                                    </label>
                                    <div class="text-white font-semibold font-onest">{{ question.time_limit }} Minutes</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

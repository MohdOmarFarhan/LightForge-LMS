<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import { ArrowLeft, Save, CheckCircle, XCircle } from 'lucide-vue-next';

const props = defineProps({
    attempt: Object,
});

const form = useForm({
    answers: props.attempt.answers.map(answer => ({
        id: answer.id,
        marks_obtained: answer.marks_obtained || 0,
        feedback: answer.feedback || '',
        question: answer.question,
        // Add existing answers fields to display them correctly
        answer_text: answer.answer_text,
        answer_images: answer.answer_images
    }))
});

const submit = () => {
    form.post(route('admin.scrutiny.update', props.attempt.id));
};
</script>

<template>
    <Head title="Grade Submission" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <Link
                    :href="route('admin.scrutiny')"
                    class="inline-flex items-center gap-2 text-[#0D6EFD] hover:text-[#0B5ED7] transition-colors font-onest"
                >
                    <ArrowLeft :size="20" />
                    <span class="font-semibold">Back to List</span>
                </Link>
                <button
                    @click="submit"
                    :disabled="form.processing"
                    class="px-6 py-2 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-[#16A34A]/30 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 font-onest"
                >
                    <Save :size="18" />
                    Submit Grades
                </button>
            </div>

            <!-- Student & Exam Info -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                <div class="flex justify-between items-start">
                    <div>
                        <h2 class="text-xl font-bold text-white font-montserrat">{{ attempt.exam.title }}</h2>
                        <p class="text-[#9CA3AF] text-sm font-onest mt-1">
                            Student: <span class="text-white font-semibold">{{ attempt.user.name }}</span> ({{ attempt.user.student_id }})
                        </p>
                    </div>
                    <div class="text-right">
                        <p class="text-[#9CA3AF] text-sm font-onest">Total Marks</p>
                        <p class="text-2xl font-bold text-white font-montserrat">{{ attempt.exam.total_marks }}</p>
                    </div>
                </div>
            </div>

            <!-- Questions & Grading -->
            <div class="space-y-6">
                <div 
                    v-for="(answer, index) in form.answers" 
                    :key="answer.id"
                    class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden"
                >
                    <div class="p-4 border-b border-[#1F2937] bg-[#1F2937]/50 flex justify-between items-center">
                        <span class="text-sm font-semibold text-[#9CA3AF] font-onest">Question {{ index + 1 }}</span>
                        <span class="text-xs px-2 py-0.5 rounded bg-[#374151] text-white uppercase">{{ answer.question.type }}</span>
                    </div>
                    
                    <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <!-- Left: Question & Student Answer -->
                        <div class="space-y-4">
                            <div>
                                <p class="text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Question</p>
                                <p class="text-white font-onest">{{ answer.question.content }}</p>
                            </div>
                            
                            <div v-if="answer.question.sub_questions" class="pl-4 border-l-2 border-[#374151] space-y-2">
                                <div v-for="(text, key) in answer.question.sub_questions" :key="key">
                                    <span class="text-[#9CA3AF] uppercase text-xs font-bold">{{ key }}.</span> 
                                    <span class="text-gray-300 text-sm ml-2">{{ text }}</span>
                                </div>
                            </div>

                            <div class="pt-4 border-t border-[#374151]">
                                <p class="text-sm font-semibold text-[#0D6EFD] mb-2 font-onest">Student's Answer</p>
                                <!-- Text Answer -->
                                <p v-if="answer.answer_text" class="text-white font-onest whitespace-pre-wrap">{{ answer.answer_text }}</p>
                                
                                <!-- Image Answer (Mock for now) -->
                                <div v-if="answer.answer_images && answer.answer_images.length > 0" class="mt-2 grid grid-cols-2 gap-2">
                                    <div v-for="(img, i) in answer.answer_images" :key="i" class="relative aspect-video bg-black rounded-lg overflow-hidden border border-[#374151]">
                                        <img :src="img" class="w-full h-full object-contain" />
                                    </div>
                                </div>
                                
                                <p v-if="!answer.answer_text && (!answer.answer_images || answer.answer_images.length === 0)" class="text-[#DC2626] italic text-sm">No answer provided.</p>
                            </div>
                        </div>

                        <!-- Right: Grading Controls -->
                        <div class="bg-[#0D1117] p-6 rounded-xl border border-[#374151] h-fit">
                            <div class="mb-4">
                                <label class="block text-sm font-semibold text-white mb-2 font-onest">
                                    Marks Obtained (Max: {{ answer.question.marks }})
                                </label>
                                <input 
                                    v-model="answer.marks_obtained"
                                    type="number" 
                                    min="0"
                                    :max="answer.question.marks"
                                    class="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                                >
                            </div>

                            <div>
                                <label class="block text-sm font-semibold text-white mb-2 font-onest">
                                    Feedback / Comments
                                </label>
                                <textarea 
                                    v-model="answer.feedback"
                                    rows="3"
                                    placeholder="Optional feedback for the student..."
                                    class="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#0D6EFD] transition-colors resize-none font-onest"
                                ></textarea>
                            </div>

                            <!-- Quick Actions for MCQ (Auto-grading hint could go here) -->
                            <div v-if="answer.question.type === 'mcq'" class="mt-4 p-3 bg-[#1F2937] rounded-lg">
                                <p class="text-xs text-[#9CA3AF] mb-1">Correct Answer:</p>
                                <p class="text-sm text-[#22C55E] font-bold">{{ answer.question.correct_answer }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

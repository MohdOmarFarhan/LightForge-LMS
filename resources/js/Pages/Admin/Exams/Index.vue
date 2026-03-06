<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, router } from '@inertiajs/vue3';
import { ref, watch } from 'vue';
import { Plus, Search, Filter, Calendar, Clock, FileText, CheckCircle, Eye, Edit, Trash2 } from 'lucide-vue-next';

// ...

const deleteExam = (id) => {
    if (confirm('Are you sure you want to delete this exam?')) {
        router.delete(route('admin.exams.destroy', id));
    }
};
import { debounce } from 'lodash';
import dayjs from 'dayjs';

const props = defineProps({
    exams: Object,
    filters: Object,
    subjects: Array,
});

const selectedClass = ref(props.filters.target_class || "all");
const selectedSubjectId = ref(props.filters.subject_id || "all");

const updateFilters = () => {
    router.get(
        route("admin.exams"),
        {
            target_class: selectedClass.value,
            subject_id: selectedSubjectId.value,
        },
        { preserveState: true, preserveScroll: true }
    );
};

watch([selectedClass, selectedSubjectId], debounce(updateFilters, 300));

const formatDate = (date) => {
    return dayjs(date).format('MMM D, YYYY h:mm A');
};
</script>

<template>
    <Head title="Exams" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Header with Add Button -->
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 class="text-2xl font-bold text-white mb-1 font-montserrat">Exams</h1>
                    <p class="text-[#9CA3AF] font-onest">
                        Manage and schedule exams
                    </p>
                </div>
                <Link
                    :href="route('admin.exams.create')"
                    class="px-6 py-3 bg-gradient-to-r from-[#0D6EFD] to-[#0B5ED7] hover:shadow-lg hover:shadow-[#0D6EFD]/30 text-white rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 justify-center font-onest"
                >
                    <Plus :size="20" />
                    Create Exam
                </Link>
            </div>

            <!-- Filters -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                <div class="flex items-center gap-2 mb-4">
                    <Filter :size="20" class="text-[#0D6EFD]" />
                    <h3 class="text-lg font-bold text-white font-montserrat">Filters</h3>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 font-onest">
                    <!-- Class Filter -->
                    <div>
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-2">
                            Class
                        </label>
                        <div class="flex gap-2">
                            <button
                                @click="selectedClass = 'all'"
                                :class="['flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200', selectedClass === 'all' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                All
                            </button>
                            <button
                                @click="selectedClass = '11'"
                                :class="['flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200', selectedClass === '11' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                Class 11
                            </button>
                            <button
                                @click="selectedClass = '12'"
                                :class="['flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200', selectedClass === '12' ? 'bg-[#0D6EFD] text-white' : 'bg-[#1F2937] text-[#9CA3AF] hover:bg-[#374151]']"
                            >
                                Class 12
                            </button>
                        </div>
                    </div>

                    <!-- Subject Filter -->
                    <div>
                        <label class="block text-sm font-semibold text-[#9CA3AF] mb-2">
                            Subject
                        </label>
                        <select
                            v-model="selectedSubjectId"
                            class="w-full px-4 py-2 bg-[#1F2937] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors"
                        >
                            <option value="all">All Subjects</option>
                            <option v-for="subject in subjects" :key="subject.id" :value="subject.id">{{ subject.name }}</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Exams List -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-[#1F2937]">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Exam Title
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Class & Subject
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Schedule
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Details
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Status
                                </th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#1F2937]">
                            <tr
                                v-for="exam in exams.data"
                                :key="exam.id"
                                class="hover:bg-[#1F2937] transition-colors"
                            >
                                <td class="px-6 py-4">
                                    <span class="text-sm font-semibold text-white font-onest">
                                        {{ exam.title }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-onest">
                                        <div class="text-white capitalize">{{ exam.subject?.name || 'Mixed' }}</div>
                                        <div class="text-[#9CA3AF] text-xs">Class {{ exam.target_class }} • {{ exam.paper?.name || 'N/A' }}</div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-onest">
                                        <div class="text-white flex items-center gap-1">
                                            <Calendar :size="14" />
                                            {{ formatDate(exam.start_time) }}
                                        </div>
                                        <div class="text-[#9CA3AF] text-xs flex items-center gap-1 mt-1">
                                            <Clock :size="12" />
                                            {{ exam.duration_minutes }} mins
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm font-onest">
                                        <div class="text-white">{{ exam.total_marks }} Marks</div>
                                        <div class="text-[#9CA3AF] text-xs flex items-center gap-1 mt-1">
                                            <FileText :size="12" />
                                            {{ exam.questions_count }} Questions
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span
                                        :class="['px-3 py-1 rounded-lg text-xs font-semibold font-onest flex items-center gap-1 w-fit', exam.is_published ? 'bg-[#16A34A]/20 text-[#22C55E]' : 'bg-[#F59E0B]/20 text-[#F59E0B]']"
                                    >
                                        <CheckCircle v-if="exam.is_published" :size="12" />
                                        {{ exam.is_published ? 'Published' : 'Draft' }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <Link
                                            :href="route('admin.exams.show', exam.id)"
                                            class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg text-sm font-semibold transition-all duration-200 font-onest"
                                            title="View"
                                        >
                                            <Eye :size="16" />
                                        </Link>
                                        <Link
                                            :href="route('admin.exams.edit', exam.id)"
                                            class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1F2937] hover:bg-[#374151] text-[#0D6EFD] rounded-lg text-sm font-semibold transition-all duration-200 font-onest"
                                            title="Edit"
                                        >
                                            <Edit :size="16" />
                                        </Link>
                                        <button
                                            @click="deleteExam(exam.id)"
                                            class="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1F2937] hover:bg-[#374151] text-red-500 rounded-lg text-sm font-semibold transition-all duration-200 font-onest"
                                            title="Delete"
                                        >
                                            <Trash2 :size="16" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div v-if="exams.data.length === 0" class="py-12 text-center">
                    <p class="text-[#9CA3AF] font-onest">No exams found. Create one to get started.</p>
                </div>

                <!-- Pagination -->
                <div v-if="exams.links.length > 3" class="px-6 py-4 border-t border-[#374151] flex items-center justify-between">
                    <!-- Pagination Links (Simplified for brevity, similar to other pages) -->
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

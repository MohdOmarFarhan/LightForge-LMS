<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { 
    Plus, 
    Edit2, 
    Trash2, 
    ChevronRight, 
    ChevronDown, 
    Folder, 
    FileText, 
    BookOpen, 
    Bookmark 
} from 'lucide-vue-next';
import Modal from '@/Components/Modal.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import SecondaryButton from '@/Components/SecondaryButton.vue';
import InputError from '@/Components/InputError.vue';

const props = defineProps({
    subjects: Array,
});

// Expansion State
const expandedSubjects = ref(new Set());
const expandedPapers = ref(new Set());
const expandedChapters = ref(new Set());

const toggleSubject = (id) => {
    if (expandedSubjects.value.has(id)) expandedSubjects.value.delete(id);
    else expandedSubjects.value.add(id);
};

const togglePaper = (id) => {
    if (expandedPapers.value.has(id)) expandedPapers.value.delete(id);
    else expandedPapers.value.add(id);
};

const toggleChapter = (id) => {
    if (expandedChapters.value.has(id)) expandedChapters.value.delete(id);
    else expandedChapters.value.add(id);
};

// Modal State
const showModal = ref(false);
const modalType = ref(''); // subject, paper, chapter, module
const modalAction = ref(''); // create, edit
const parentId = ref(null); // ID of the parent item (e.g., subject_id for paper)
const editingItem = ref(null);

const form = useForm({
    name: '',
    code: '',
    number: '',
    subject_id: null,
    paper_id: null,
    chapter_id: null,
});

const openCreateModal = (type, parent = null) => {
    modalType.value = type;
    modalAction.value = 'create';
    parentId.value = parent;
    editingItem.value = null;
    
    form.reset();
    form.clearErrors();
    
    if (type === 'paper') form.subject_id = parent;
    if (type === 'chapter') form.paper_id = parent;
    if (type === 'module') form.chapter_id = parent;

    showModal.value = true;
};

const openEditModal = (type, item) => {
    modalType.value = type;
    modalAction.value = 'edit';
    editingItem.value = item;
    
    form.reset();
    form.clearErrors();
    
    form.name = item.name;
    form.code = item.code || '';
    form.number = item.number || '';
    
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    form.reset();
};

const submitForm = () => {
    let url = '';
    let method = 'post';

    // Determine Route
    if (modalType.value === 'subject') url = modalAction.value === 'create' ? route('admin.subjects.store') : route('admin.subjects.update', editingItem.value.id);
    if (modalType.value === 'paper') url = modalAction.value === 'create' ? route('admin.papers.store') : route('admin.papers.update', editingItem.value.id);
    if (modalType.value === 'chapter') url = modalAction.value === 'create' ? route('admin.chapters.store') : route('admin.chapters.update', editingItem.value.id);
    if (modalType.value === 'module') url = modalAction.value === 'create' ? route('admin.modules.store') : route('admin.modules.update', editingItem.value.id);

    if (modalAction.value === 'edit') method = 'put';

    form.submit(method, url, {
        onSuccess: () => closeModal(),
    });
};

const deleteItem = (type, id) => {
    if (!confirm('Are you sure you want to delete this item? This will delete all children items as well.')) return;

    let url = '';
    if (type === 'subject') url = route('admin.subjects.destroy', id);
    if (type === 'paper') url = route('admin.papers.destroy', id);
    if (type === 'chapter') url = route('admin.chapters.destroy', id);
    if (type === 'module') url = route('admin.modules.destroy', id);

    router.delete(url);
};
</script>

<template>
    <Head title="Academic Structure" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="font-montserrat font-bold text-2xl text-white">Academic Structure</h1>
                    <p class="text-sm text-[#9CA3AF]">Manage Subjects, Papers, Chapters, and Modules</p>
                </div>
                <button 
                    @click="openCreateModal('subject')"
                    class="flex items-center px-4 py-2 bg-[#0D6EFD] hover:bg-[#0B5ED7] text-white rounded-lg transition-colors text-sm font-semibold"
                >
                    <Plus :size="16" class="mr-2" />
                    Add Subject
                </button>
            </div>

            <!-- Hierarchy Tree -->
            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                <div v-if="subjects.length === 0" class="p-8 text-center text-[#9CA3AF]">
                    No subjects found. Start by adding one.
                </div>
                
                <div v-else class="divide-y divide-[#1F2937]">
                    <div v-for="subject in subjects" :key="subject.id" class="group/subject">
                        <!-- Subject Row -->
                        <div class="flex items-center justify-between p-4 hover:bg-[#1F2937] transition-colors">
                            <div class="flex items-center gap-3 flex-1 cursor-pointer" @click="toggleSubject(subject.id)">
                                <div class="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                    <Folder :size="20" />
                                </div>
                                <div>
                                    <h3 class="text-white font-semibold font-montserrat">{{ subject.name }}</h3>
                                    <span class="text-xs text-[#9CA3AF] bg-[#374151] px-2 py-0.5 rounded">Code: {{ subject.code }}</span>
                                </div>
                                <component :is="expandedSubjects.has(subject.id) ? ChevronDown : ChevronRight" :size="16" class="text-[#6B7280]" />
                            </div>
                            <div class="flex items-center gap-2">
                                <button @click="openCreateModal('paper', subject.id)" class="p-1.5 text-[#9CA3AF] hover:text-white hover:bg-[#374151] rounded" title="Add Paper">
                                    <Plus :size="16" />
                                </button>
                                <button @click="openEditModal('subject', subject)" class="p-1.5 text-[#9CA3AF] hover:text-blue-400 hover:bg-[#374151] rounded" title="Edit">
                                    <Edit2 :size="16" />
                                </button>
                                <button @click="deleteItem('subject', subject.id)" class="p-1.5 text-[#9CA3AF] hover:text-red-400 hover:bg-[#374151] rounded" title="Delete">
                                    <Trash2 :size="16" />
                                </button>
                            </div>
                        </div>

                        <!-- Papers List -->
                        <div v-if="expandedSubjects.has(subject.id)" class="pl-8 md:pl-12 pr-4 pb-4 bg-[#0D1117] border-t border-[#1F2937]">
                            <div v-if="subject.papers.length === 0" class="py-3 text-sm text-[#6B7280] italic">
                                No papers added yet.
                            </div>
                            <div v-else class="space-y-2 pt-2">
                                <div v-for="paper in subject.papers" :key="paper.id" class="border border-[#1F2937] rounded-lg bg-[#161B22]">
                                    <!-- Paper Row -->
                                    <div class="flex items-center justify-between p-3 hover:bg-[#1F2937] transition-colors rounded-lg">
                                        <div class="flex items-center gap-3 flex-1 cursor-pointer" @click="togglePaper(paper.id)">
                                            <div class="p-1.5 bg-green-500/10 rounded-lg text-green-500">
                                                <FileText :size="18" />
                                            </div>
                                            <div class="flex items-center gap-2">
                                                <span class="text-white text-sm font-medium">{{ paper.name }}</span>
                                                <span v-if="paper.code" class="text-xs text-[#9CA3AF] bg-[#374151] px-1.5 rounded">{{ paper.code }}</span>
                                            </div>
                                            <component :is="expandedPapers.has(paper.id) ? ChevronDown : ChevronRight" :size="14" class="text-[#6B7280]" />
                                        </div>
                                        <div class="flex items-center gap-1">
                                            <button @click="openCreateModal('chapter', paper.id)" class="p-1 text-[#9CA3AF] hover:text-white hover:bg-[#374151] rounded" title="Add Chapter">
                                                <Plus :size="14" />
                                            </button>
                                            <button @click="openEditModal('paper', paper)" class="p-1 text-[#9CA3AF] hover:text-blue-400 hover:bg-[#374151] rounded" title="Edit">
                                                <Edit2 :size="14" />
                                            </button>
                                            <button @click="deleteItem('paper', paper.id)" class="p-1 text-[#9CA3AF] hover:text-red-400 hover:bg-[#374151] rounded" title="Delete">
                                                <Trash2 :size="14" />
                                            </button>
                                        </div>
                                    </div>

                                    <!-- Chapters List -->
                                    <div v-if="expandedPapers.has(paper.id)" class="pl-8 pr-3 pb-3 border-t border-[#1F2937] bg-[#0F1419]">
                                        <div v-if="paper.chapters.length === 0" class="py-2 text-xs text-[#6B7280] italic">
                                            No chapters added yet.
                                        </div>
                                        <div v-else class="space-y-2 pt-2">
                                            <div v-for="chapter in paper.chapters" :key="chapter.id" class="border border-[#1F2937] rounded bg-[#161B22]">
                                                <!-- Chapter Row -->
                                                <div class="flex items-center justify-between p-2 hover:bg-[#1F2937] transition-colors rounded">
                                                    <div class="flex items-center gap-3 flex-1 cursor-pointer" @click="toggleChapter(chapter.id)">
                                                        <div class="p-1 bg-yellow-500/10 rounded text-yellow-500">
                                                            <BookOpen :size="16" />
                                                        </div>
                                                        <div class="flex items-center gap-2">
                                                            <span class="text-white text-sm font-medium">Chapter {{ chapter.number }}: {{ chapter.name }}</span>
                                                        </div>
                                                        <component :is="expandedChapters.has(chapter.id) ? ChevronDown : ChevronRight" :size="14" class="text-[#6B7280]" />
                                                    </div>
                                                    <div class="flex items-center gap-1">
                                                        <button @click="openCreateModal('module', chapter.id)" class="p-1 text-[#9CA3AF] hover:text-white hover:bg-[#374151] rounded" title="Add Module">
                                                            <Plus :size="14" />
                                                        </button>
                                                        <button @click="openEditModal('chapter', chapter)" class="p-1 text-[#9CA3AF] hover:text-blue-400 hover:bg-[#374151] rounded" title="Edit">
                                                            <Edit2 :size="14" />
                                                        </button>
                                                        <button @click="deleteItem('chapter', chapter.id)" class="p-1 text-[#9CA3AF] hover:text-red-400 hover:bg-[#374151] rounded" title="Delete">
                                                            <Trash2 :size="14" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <!-- Modules List -->
                                                <div v-if="expandedChapters.has(chapter.id)" class="pl-8 pr-2 pb-2 border-t border-[#1F2937] bg-[#0A0C10]">
                                                    <div v-if="chapter.modules.length === 0" class="py-1 text-xs text-[#6B7280] italic">
                                                        No modules added yet.
                                                    </div>
                                                    <div v-else class="space-y-1 pt-1">
                                                        <div v-for="module in chapter.modules" :key="module.id" class="flex items-center justify-between p-2 rounded hover:bg-[#1F2937] group/module">
                                                            <div class="flex items-center gap-2">
                                                                <div class="p-1 bg-purple-500/10 rounded text-purple-500">
                                                                    <Bookmark :size="14" />
                                                                </div>
                                                                <span class="text-[#D1D5DB] text-xs">Module {{ module.number }}: {{ module.name }}</span>
                                                            </div>
                                                            <div class="flex items-center gap-1 opacity-0 group-hover/module:opacity-100 transition-opacity">
                                                                <button @click="openEditModal('module', module)" class="p-1 text-[#9CA3AF] hover:text-blue-400 hover:bg-[#374151] rounded">
                                                                    <Edit2 :size="12" />
                                                                </button>
                                                                <button @click="deleteItem('module', module.id)" class="p-1 text-[#9CA3AF] hover:text-red-400 hover:bg-[#374151] rounded">
                                                                    <Trash2 :size="12" />
                                                                </button>
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
                    </div>
                </div>
            </div>
        </div>

        <!-- Create/Edit Modal -->
        <Modal :show="showModal" @close="closeModal">
            <div class="p-6 bg-[#161B22] text-white">
                <h2 class="text-lg font-medium mb-4">
                    {{ modalAction === 'create' ? 'Add' : 'Edit' }} 
                    {{ modalType.charAt(0).toUpperCase() + modalType.slice(1) }}
                </h2>
                
                <div class="space-y-4">
                    <!-- Name Field (All) -->
                    <div>
                        <InputLabel for="name" value="Name" class="text-white" />
                        <TextInput
                            id="name"
                            type="text"
                            class="mt-1 block w-full bg-[#0D1117] border-[#374151] text-white"
                            v-model="form.name"
                            required
                            autofocus
                        />
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>

                    <!-- Code Field (Subject, Paper) -->
                    <div v-if="['subject', 'paper'].includes(modalType)">
                        <InputLabel for="code" value="Code" class="text-white" />
                        <TextInput
                            id="code"
                            type="text"
                            class="mt-1 block w-full bg-[#0D1117] border-[#374151] text-white"
                            v-model="form.code"
                            :required="modalType === 'subject'"
                        />
                        <InputError class="mt-2" :message="form.errors.code" />
                    </div>

                    <!-- Number Field (Chapter, Module) -->
                    <div v-if="['chapter', 'module'].includes(modalType)">
                        <InputLabel for="number" value="Number" class="text-white" />
                        <TextInput
                            id="number"
                            type="number"
                            class="mt-1 block w-full bg-[#0D1117] border-[#374151] text-white"
                            v-model="form.number"
                            required
                        />
                        <InputError class="mt-2" :message="form.errors.number" />
                    </div>
                </div>

                <div class="mt-6 flex justify-end gap-3">
                    <SecondaryButton @click="closeModal" class="bg-[#1F2937] text-white border-[#374151] hover:bg-[#374151]">
                        Cancel
                    </SecondaryButton>
                    <PrimaryButton 
                        @click="submitForm" 
                        class="bg-[#0D6EFD] hover:bg-[#0B5ED7] border-transparent"
                        :disabled="form.processing"
                    >
                        {{ modalAction === 'create' ? 'Create' : 'Save Changes' }}
                    </PrimaryButton>
                </div>
            </div>
        </Modal>
    </AdminLayout>
</template>

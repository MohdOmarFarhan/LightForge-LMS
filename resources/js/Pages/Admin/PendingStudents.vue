<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, router } from '@inertiajs/vue3';
import { Check, X, Clock } from 'lucide-vue-next';

defineProps({
    students: Array,
});

const approve = (id) => {
    if (confirm('Are you sure you want to approve this student?')) {
        router.post(route('admin.students.approve', id));
    }
};
</script>

<template>
    <Head title="Pending Approvals" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-white mb-1 font-montserrat">Pending Approvals</h1>
                    <p class="text-[#9CA3AF] font-onest">
                        Review and approve student registrations
                    </p>
                </div>
            </div>

            <div class="bg-[#161B22] border border-[#1F2937] rounded-xl overflow-hidden">
                <div v-if="students.length === 0" class="p-12 text-center">
                    <div class="w-16 h-16 bg-[#1F2937] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock :size="32" class="text-[#9CA3AF]" />
                    </div>
                    <h3 class="text-lg font-bold text-white mb-1 font-montserrat">No Pending Approvals</h3>
                    <p class="text-[#9CA3AF] font-onest">All student registrations have been processed.</p>
                </div>

                <div v-else class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-[#1F2937]">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">Applicant</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">Institution</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">Academic Info</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">Contacts</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">Applied</th>
                                <th class="px-6 py-4 text-left text-xs font-semibold text-[#9CA3AF] uppercase font-onest">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-[#1F2937]">
                            <tr v-for="student in students" :key="student.id" class="hover:bg-[#1F2937] transition-colors">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-3">
                                        <div class="w-10 h-10 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] rounded-lg flex items-center justify-center text-white font-bold font-montserrat">
                                            {{ student.name.charAt(0) }}
                                        </div>
                                        <div>
                                            <p class="text-sm font-semibold text-white font-onest">{{ student.name }}</p>
                                            <p class="text-xs text-[#9CA3AF] font-onest">{{ student.email }}</p>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-sm text-white font-onest">{{ student.institution }}</div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="font-onest">
                                        <p class="text-sm text-white">Class {{ student.class }}</p>
                                        <p class="text-xs text-[#9CA3AF]">{{ student.group }} • HSC {{ student.hsc_year }}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="text-xs text-[#9CA3AF] space-y-1 font-onest">
                                        <p>M: {{ student.contact_no }}</p>
                                        <p>WA: {{ student.whatsapp_no }}</p>
                                        <p>G: {{ student.guardian_no }}</p>
                                    </div>
                                </td>
                                <td class="px-6 py-4">
                                    <span class="text-sm text-[#9CA3AF] font-onest">
                                        {{ new Date(student.created_at).toLocaleDateString() }}
                                    </span>
                                </td>
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-2">
                                        <button
                                            @click="approve(student.id)"
                                            class="p-2 bg-[#16A34A]/20 hover:bg-[#16A34A]/30 text-[#22C55E] rounded-lg transition-colors"
                                            title="Approve"
                                        >
                                            <Check :size="18" />
                                        </button>
                                        <button
                                            class="p-2 bg-[#DC2626]/20 hover:bg-[#DC2626]/30 text-[#DC2626] rounded-lg transition-colors"
                                            title="Reject"
                                        >
                                            <X :size="18" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

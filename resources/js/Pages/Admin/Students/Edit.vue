<script setup>
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ArrowLeft, Save, User, Mail, Hash, Phone, Calendar, Layers, Lock } from 'lucide-vue-next';

const props = defineProps({
    student: Object,
});

const form = useForm({
    name: props.student.name,
    email: props.student.email,
    password: '', // Optional on edit
    class: props.student.class,
    group: props.student.group,
    hsc_year: props.student.hsc_year,
    contact_no: props.student.contact_no,
    student_id: props.student.student_id || '',
});

const submit = () => {
    form.put(route('admin.students.update', props.student.id));
};
</script>

<template>
    <Head title="Edit Student" />

    <AdminLayout>
        <div class="p-4 md:p-6 space-y-6">
            <!-- Header -->
            <div class="flex items-center justify-between">
                <Link
                    :href="route('admin.students')"
                    class="inline-flex items-center gap-2 text-[#0D6EFD] hover:text-[#0B5ED7] transition-colors font-onest"
                >
                    <ArrowLeft :size="20" />
                    <span class="font-semibold">Back to Students</span>
                </Link>
                <h1 class="text-2xl font-bold text-white font-montserrat">Edit Student</h1>
            </div>

            <form @submit.prevent="submit" class="max-w-4xl mx-auto space-y-6">
                <!-- Personal Info -->
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <span class="bg-[#0D6EFD] w-1 h-6 rounded-full"></span>
                        Personal Information
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Name -->
                        <div class="md:col-span-2">
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Full Name *</label>
                            <div class="relative">
                                <User :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                <input 
                                    v-model="form.name" 
                                    type="text" 
                                    class="w-full pl-10 pr-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                                    placeholder="e.g. John Doe"
                                    required
                                />
                            </div>
                            <div v-if="form.errors.name" class="text-red-500 text-xs mt-1">{{ form.errors.name }}</div>
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Email Address *</label>
                            <div class="relative">
                                <Mail :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                <input 
                                    v-model="form.email" 
                                    type="email" 
                                    class="w-full pl-10 pr-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                                    placeholder="student@example.com"
                                    required
                                />
                            </div>
                            <div v-if="form.errors.email" class="text-red-500 text-xs mt-1">{{ form.errors.email }}</div>
                        </div>

                        <!-- Contact No -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Contact Number *</label>
                            <div class="relative">
                                <Phone :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                <input 
                                    v-model="form.contact_no" 
                                    type="tel" 
                                    class="w-full pl-10 pr-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                                    placeholder="017xxxxxxxx"
                                    required
                                />
                            </div>
                            <div v-if="form.errors.contact_no" class="text-red-500 text-xs mt-1">{{ form.errors.contact_no }}</div>
                        </div>

                         <!-- Password -->
                         <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Password (Leave blank to keep current)</label>
                            <div class="relative">
                                <Lock :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                <input 
                                    v-model="form.password" 
                                    type="text" 
                                    class="w-full pl-10 pr-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                                    placeholder="New Password"
                                />
                            </div>
                            <div v-if="form.errors.password" class="text-red-500 text-xs mt-1">{{ form.errors.password }}</div>
                        </div>
                    </div>
                </div>

                <!-- Academic Info -->
                <div class="bg-[#161B22] border border-[#1F2937] rounded-xl p-6">
                    <h2 class="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <span class="bg-[#0D6EFD] w-1 h-6 rounded-full"></span>
                        Academic Information
                    </h2>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Student ID -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Student ID</label>
                            <div class="relative">
                                <Hash :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                <input 
                                    v-model="form.student_id" 
                                    type="text" 
                                    class="w-full pl-10 pr-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest"
                                    placeholder="e.g. 241001"
                                />
                            </div>
                            <div v-if="form.errors.student_id" class="text-red-500 text-xs mt-1">{{ form.errors.student_id }}</div>
                        </div>

                        <!-- HSC Year -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">HSC Year *</label>
                            <div class="relative">
                                <Calendar :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                <select 
                                    v-model="form.hsc_year" 
                                    class="w-full pl-10 pr-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest appearance-none"
                                >
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                </select>
                            </div>
                            <div v-if="form.errors.hsc_year" class="text-red-500 text-xs mt-1">{{ form.errors.hsc_year }}</div>
                        </div>

                        <!-- Class -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Class *</label>
                            <div class="relative">
                                <Layers :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                <select 
                                    v-model="form.class" 
                                    class="w-full pl-10 pr-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest appearance-none"
                                >
                                    <option :value="11">Class 11</option>
                                    <option :value="12">Class 12</option>
                                </select>
                            </div>
                            <div v-if="form.errors.class" class="text-red-500 text-xs mt-1">{{ form.errors.class }}</div>
                        </div>

                        <!-- Group -->
                        <div>
                            <label class="block text-sm font-semibold text-[#9CA3AF] mb-2 font-onest">Group *</label>
                            <div class="relative">
                                <Layers :size="18" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
                                <select 
                                    v-model="form.group" 
                                    class="w-full pl-10 pr-4 py-2.5 bg-[#0D1117] border border-[#374151] rounded-lg text-white focus:outline-none focus:border-[#0D6EFD] transition-colors font-onest appearance-none"
                                >
                                    <option value="Science">Science</option>
                                    <option value="Humanities">Humanities</option>
                                    <option value="Business Studies">Business Studies</option>
                                </select>
                            </div>
                            <div v-if="form.errors.group" class="text-red-500 text-xs mt-1">{{ form.errors.group }}</div>
                        </div>
                    </div>
                </div>

                <!-- Footer Actions -->
                <div class="flex gap-4 pt-4 border-t border-[#1F2937]">
                    <Link
                        :href="route('admin.students')"
                        class="flex-1 px-6 py-3 bg-[#1F2937] hover:bg-[#374151] text-white rounded-lg font-semibold transition-all text-center font-onest"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="flex-1 px-6 py-3 bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:shadow-lg hover:shadow-[#16A34A]/30 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2 font-onest"
                    >
                        <Save :size="20" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    </AdminLayout>
</template>

<script setup>
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Link, useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import { Pencil, Camera, Save, X } from 'lucide-vue-next';

defineProps({
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const user = usePage().props.auth.user;

const isEditing = ref(false);
const photoInput = ref(null);
const photoPreview = ref(null);

const form = useForm({
    _method: 'PATCH',
    name: user.name,
    email: user.email,
    institution: user.institution || '',
    class: user.class || '',
    group: user.group || '',
    hsc_year: user.hsc_year || '',
    contact_no: user.contact_no || '',
    whatsapp_no: user.whatsapp_no || '',
    guardian_no: user.guardian_no || '',
    photo: null,
});

const updateProfileInformation = () => {
    form.post(route('profile.update'), {
        preserveScroll: true,
        onSuccess: () => {
            isEditing.value = false;
            photoPreview.value = null;
            clearPhotoFileInput();
        },
    });
};

const selectNewPhoto = () => {
    photoInput.value.click();
};

const updatePhotoPreview = () => {
    const photo = photoInput.value.files[0];

    if (!photo) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        photoPreview.value = e.target.result;
    };

    reader.readAsDataURL(photo);
    form.photo = photo;
};

const clearPhotoFileInput = () => {
    if (photoInput.value) {
        photoInput.value.value = null;
    }
};

const cancelEdit = () => {
    isEditing.value = false;
    form.reset();
    form.clearErrors();
    photoPreview.value = null;
    clearPhotoFileInput();
};
</script>

<template>
    <section class="w-full">
        <header class="flex items-center justify-between mb-6">
            <div>
                <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    View and update your account's profile information.
                </p>
            </div>
            <button
                v-if="!isEditing"
                @click="isEditing = true"
                class="flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
            >
                <Pencil :size="14" class="mr-2" />
                Edit Profile
            </button>
        </header>

        <form @submit.prevent="updateProfileInformation" class="space-y-6">
            <!-- Profile Photo -->
            <div class="flex flex-col items-center sm:items-start">
                <InputLabel value="Profile Photo" class="mb-2" />
                <div class="flex items-center gap-4">
                    <!-- Current Profile Photo -->
                    <div v-show="!photoPreview" class="relative">
                        <img
                            :src="user.profile_photo_path ? '/storage/' + user.profile_photo_path : 'https://ui-avatars.com/api/?name=' + user.name + '&color=7F9CF5&background=EBF4FF'"
                            :alt="user.name"
                            class="rounded-full h-20 w-20 object-cover border-2 border-gray-200 dark:border-gray-700"
                        />
                    </div>

                    <!-- New Profile Photo Preview -->
                    <div v-show="photoPreview" class="relative">
                        <span
                            class="block rounded-full w-20 h-20 bg-cover bg-no-repeat bg-center border-2 border-indigo-500"
                            :style="'background-image: url(\'' + photoPreview + '\');'"
                        />
                    </div>

                    <div v-if="isEditing">
                        <input
                            ref="photoInput"
                            type="file"
                            class="hidden"
                            @change="updatePhotoPreview"
                        />

                        <button
                            type="button"
                            class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                            @click.prevent="selectNewPhoto"
                        >
                            <Camera :size="14" class="mr-2" />
                            Change Photo
                        </button>
                    </div>
                </div>
                <InputError :message="form.errors.photo" class="mt-2" />
            </div>

            <!-- Grid Layout for Fields -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name -->
                <div>
                    <InputLabel for="name" value="Full Name" />
                    <div v-if="!isEditing" class="mt-1 block w-full py-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        {{ user.name }}
                    </div>
                    <TextInput
                        v-else
                        id="name"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.name"
                        required
                        autocomplete="name"
                    />
                    <InputError class="mt-2" :message="form.errors.name" />
                </div>

                <!-- Email -->
                <div>
                    <InputLabel for="email" value="Email Address" />
                    <div v-if="!isEditing" class="mt-1 block w-full py-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        {{ user.email }}
                    </div>
                    <TextInput
                        v-else
                        id="email"
                        type="email"
                        class="mt-1 block w-full"
                        v-model="form.email"
                        required
                        autocomplete="username"
                    />
                    <InputError class="mt-2" :message="form.errors.email" />
                </div>

                <!-- Institution -->
                <div>
                    <InputLabel for="institution" value="Institution" />
                    <div v-if="!isEditing" class="mt-1 block w-full py-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        {{ user.institution || 'Not provided' }}
                    </div>
                    <TextInput
                        v-else
                        id="institution"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.institution"
                        placeholder="Your School/College"
                    />
                    <InputError class="mt-2" :message="form.errors.institution" />
                </div>

                <!-- Class -->
                <div>
                    <InputLabel for="class" value="Class" />
                    <div v-if="!isEditing" class="mt-1 block w-full py-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        {{ user.class || 'Not provided' }}
                    </div>
                    <TextInput
                        v-else
                        id="class"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.class"
                        placeholder="e.g. 11, 12"
                    />
                    <InputError class="mt-2" :message="form.errors.class" />
                </div>

                <!-- Group -->
                <div>
                    <InputLabel for="group" value="Group" />
                    <div v-if="!isEditing" class="mt-1 block w-full py-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        {{ user.group || 'Not provided' }}
                    </div>
                     <div v-else class="mt-1">
                        <select
                            id="group"
                            v-model="form.group"
                            class="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm block w-full"
                        >
                            <option value="" disabled>Select Group</option>
                            <option value="Science">Science</option>
                            <option value="Business">Business</option>
                            <option value="Humanities">Humanities</option>
                        </select>
                    </div>
                    <InputError class="mt-2" :message="form.errors.group" />
                </div>

                <!-- HSC Year -->
                <div>
                    <InputLabel for="hsc_year" value="HSC Batch" />
                    <div v-if="!isEditing" class="mt-1 block w-full py-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        {{ user.hsc_year || 'Not provided' }}
                    </div>
                    <TextInput
                        v-else
                        id="hsc_year"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.hsc_year"
                        placeholder="e.g. 2025"
                    />
                    <InputError class="mt-2" :message="form.errors.hsc_year" />
                </div>

                <!-- Contact No -->
                <div>
                    <InputLabel for="contact_no" value="Contact Number" />
                    <div v-if="!isEditing" class="mt-1 block w-full py-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        {{ user.contact_no || 'Not provided' }}
                    </div>
                    <TextInput
                        v-else
                        id="contact_no"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.contact_no"
                        placeholder="01XXXXXXXXX"
                    />
                    <InputError class="mt-2" :message="form.errors.contact_no" />
                </div>

                <!-- Whatsapp No -->
                <div>
                    <InputLabel for="whatsapp_no" value="WhatsApp Number" />
                    <div v-if="!isEditing" class="mt-1 block w-full py-2 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                        {{ user.whatsapp_no || 'Not provided' }}
                    </div>
                    <TextInput
                        v-else
                        id="whatsapp_no"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.whatsapp_no"
                        placeholder="01XXXXXXXXX"
                    />
                    <InputError class="mt-2" :message="form.errors.whatsapp_no" />
                </div>
            </div>

            <!-- Email Verification Notice -->
            <div v-if="mustVerifyEmail && user.email_verified_at === null">
                <p class="text-sm text-gray-800 dark:text-gray-200">
                    Your email address is unverified.
                    <Link
                        :href="route('verification.send')"
                        method="post"
                        as="button"
                        class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Click here to re-send the verification email.
                    </Link>
                </p>

                <div
                    v-show="status === 'verification-link-sent'"
                    class="mt-2 text-sm font-medium text-green-600 dark:text-green-400"
                >
                    A new verification link has been sent to your email address.
                </div>
            </div>

            <!-- Action Buttons -->
            <div v-if="isEditing" class="flex items-center gap-4 mt-6">
                <PrimaryButton :disabled="form.processing">
                    <Save :size="16" class="mr-2" />
                    Save Changes
                </PrimaryButton>

                <button
                    type="button"
                    @click="cancelEdit"
                    class="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-md font-semibold text-xs text-gray-700 dark:text-gray-300 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
                    :disabled="form.processing"
                >
                    <X :size="16" class="mr-2" />
                    Cancel
                </button>

                <Transition
                    enter-active-class="transition ease-in-out"
                    enter-from-class="opacity-0"
                    leave-active-class="transition ease-in-out"
                    leave-to-class="opacity-0"
                >
                    <p
                        v-if="form.recentlySuccessful"
                        class="text-sm text-gray-600 dark:text-gray-400"
                    >
                        Saved.
                    </p>
                </Transition>
            </div>
        </form>
    </section>
</template>

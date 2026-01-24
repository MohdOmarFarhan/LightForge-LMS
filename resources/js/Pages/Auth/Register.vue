<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    institution: '',
    class: '',
    group: '',
    hsc_year: '',
    contact_no: '',
    whatsapp_no: '',
    guardian_no: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Register" />

        <form @submit.prevent="submit">
            <!-- Name -->
            <div>
                <InputLabel for="name" value="Name" />

                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />

                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <!-- Institution -->
            <div class="mt-4">
                <InputLabel for="institution" value="Institution" />

                <TextInput
                    id="institution"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.institution"
                    required
                />

                <InputError class="mt-2" :message="form.errors.institution" />
            </div>

            <!-- Class & Group -->
            <div class="mt-4 grid grid-cols-2 gap-4">
                <div>
                    <InputLabel for="class" value="Class" />

                    <TextInput
                        id="class"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.class"
                        required
                    />

                    <InputError class="mt-2" :message="form.errors.class" />
                </div>

                <div>
                    <InputLabel for="group" value="Group" />

                    <select
                        id="group"
                        class="mt-1 block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                        v-model="form.group"
                        required
                    >
                        <option value="" disabled>Select Group</option>
                        <option value="Science">Science</option>
                        <option value="Business">Business</option>
                        <option value="Humanities">Humanities</option>
                    </select>

                    <InputError class="mt-2" :message="form.errors.group" />
                </div>
            </div>

            <!-- HSC Year -->
            <div class="mt-4">
                <InputLabel for="hsc_year" value="HSC Year" />

                <TextInput
                    id="hsc_year"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.hsc_year"
                    required
                />

                <InputError class="mt-2" :message="form.errors.hsc_year" />
            </div>

            <!-- Contact Numbers -->
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <InputLabel for="contact_no" value="Contact No." />

                    <TextInput
                        id="contact_no"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.contact_no"
                        required
                    />

                    <InputError class="mt-2" :message="form.errors.contact_no" />
                </div>

                <div>
                    <InputLabel for="whatsapp_no" value="WhatsApp No." />

                    <TextInput
                        id="whatsapp_no"
                        type="text"
                        class="mt-1 block w-full"
                        v-model="form.whatsapp_no"
                        required
                    />

                    <InputError class="mt-2" :message="form.errors.whatsapp_no" />
                </div>
            </div>

             <!-- Guardian No -->
             <div class="mt-4">
                <InputLabel for="guardian_no" value="Guardian No." />

                <TextInput
                    id="guardian_no"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.guardian_no"
                    required
                />

                <InputError class="mt-2" :message="form.errors.guardian_no" />
            </div>

            <!-- Email -->
            <div class="mt-4">
                <InputLabel for="email" value="Email" />

                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username"
                />

                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <!-- Password -->
            <div class="mt-4">
                <InputLabel for="password" value="Password" />

                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />

                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <!-- Confirm Password -->
            <div class="mt-4">
                <InputLabel for="password_confirmation" value="Confirm Password" />

                <TextInput
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />

                <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>

            <div class="mt-4 flex items-center justify-end">
                <Link
                    :href="route('login')"
                    class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                >
                    Already registered?
                </Link>

                <PrimaryButton
                    class="ms-4"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Register
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>

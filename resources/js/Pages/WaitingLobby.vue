<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    status: {
        type: String,
    },
});
</script>

<template>
    <GuestLayout>
        <Head title="Waiting for Approval" />

        <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Thanks for signing up! Your account is currently pending approval by the administrator. 
            Once approved, you will receive an email notification and will be able to log in with your Student ID.
        </div>

        <div class="mt-4 flex items-center justify-between">
            <Link
                :href="route('logout')"
                method="post"
                as="button"
                class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
            >
                Log Out
            </Link>
        </div>
    </GuestLayout>
</template>

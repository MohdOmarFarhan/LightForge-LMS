<script setup>
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    canLogin: {
        type: Boolean,
    },
    canRegister: {
        type: Boolean,
    },
    laravelVersion: {
        type: String,
        required: true,
    },
    phpVersion: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <Head title="Welcome" />
    <div class="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50 min-h-screen flex items-center justify-center selection:bg-[#FF2D20] selection:text-white">
        <div class="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <header class="flex flex-col items-center justify-center py-10">
                <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Welcome to LightForge Academy LMS
                </h1>
                
                <p class="text-xl text-gray-600 dark:text-gray-300 mb-12 text-center max-w-2xl">
                    Your platform for exams, results, and performance tracking.
                </p>

                <nav v-if="canLogin" class="flex gap-6">
                    <Link
                        v-if="$page.props.auth.user"
                        :href="route('dashboard')"
                        class="rounded-md bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                    >
                        Go to Dashboard
                    </Link>

                    <template v-else>
                        <Link
                            :href="route('login')"
                            class="rounded-md bg-white px-6 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-900"
                        >
                            Log in
                        </Link>

                        <Link
                            v-if="canRegister"
                            :href="route('register')"
                            class="rounded-md bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                        >
                            Get Started
                        </Link>
                    </template>
                </nav>
            </header>

            <footer class="py-16 text-center text-sm text-black dark:text-white/70">
                &copy; {{ new Date().getFullYear() }} LightForge Academy. All rights reserved.
            </footer>
        </div>
    </div>
</template>

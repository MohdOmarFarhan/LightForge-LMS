<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import LMSDashboard from '@/Components/LMSDashboard.vue';
import UpcomingExams from '@/Components/UpcomingExams.vue';

defineProps({
    stats: Array,
    upcomingExams: Array,
});
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <!-- Dashboard Overview Section - Welcome message and stat cards -->
        <LMSDashboard :stats="stats" />

        <!-- Upcoming Exams Section - List of scheduled exams -->
        <UpcomingExams :exams="upcomingExams" />
    </AuthenticatedLayout>
</template>

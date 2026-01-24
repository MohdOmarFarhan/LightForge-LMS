<script setup>
import { ref } from 'vue';
import LMSSidebar from '@/Components/LMSSidebar.vue';
import LMSHeader from '@/Components/LMSHeader.vue';
</script>

<template>
    <div class="flex min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200 font-inter">
        <!-- Left Sidebar - Fixed dark sidebar with navigation - hidden on mobile -->
        <LMSSidebar />

        <!-- Main Content Area - Responsive with sidebar offset on desktop -->
        <div class="flex-1 md:ml-64">
            <!-- Header - Top navigation bar with search and actions -->
            <LMSHeader />

            <!-- Main Content Container - Scrollable main content with responsive padding -->
            <main class="p-4 md:p-6 space-y-6 md:space-y-8">
                <slot />
            </main>
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&display=swap');

.font-inter {
    font-family: 'Inter', sans-serif;
}

.font-montserrat {
    font-family: 'Montserrat', sans-serif;
}

.font-poppins {
    font-family: 'Poppins', sans-serif;
}

.font-onest {
    font-family: 'Onest', sans-serif;
}
</style>

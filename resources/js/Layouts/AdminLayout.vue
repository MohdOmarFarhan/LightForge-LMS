<script setup>
import { ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import {
    Home,
    Users,
    FileQuestion,
    FileText,
    ClipboardCheck,
    Trophy,
    UserCheck,
    Menu,
    X,
    LogOut,
} from 'lucide-vue-next';

const sidebarOpen = ref(false);
const page = usePage();

const navigation = [
    { name: "Dashboard", href: route('admin.dashboard'), icon: Home, active: route().current('admin.dashboard') },
    { name: "Students", href: route('admin.students'), icon: Users, active: route().current('admin.students') },
    { name: "Pending Approvals", href: route('admin.students.pending'), icon: UserCheck, active: route().current('admin.students.pending') },
    { name: "Questions", href: route('admin.questions'), icon: FileQuestion, active: route().current('admin.questions') },
    { name: "Exams", href: route('admin.exams'), icon: FileText, active: route().current('admin.exams') },
    { name: "Scrutiny", href: route('admin.scrutiny'), icon: ClipboardCheck, active: route().current('admin.scrutiny') },
    { name: "Leaderboard", href: route('admin.leaderboard'), icon: Trophy, active: route().current('admin.leaderboard') },

];

const handleLogout = () => {
    router.post(route('logout'));
};
</script>

<template>
    <div class="min-h-screen bg-[#0F1419] font-inter">
        <!-- Mobile sidebar backdrop -->
        <div
            v-if="sidebarOpen"
            class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            @click="sidebarOpen = false"
        ></div>

        <!-- Sidebar -->
        <aside
            :class="[
                'fixed top-0 left-0 h-full w-64 bg-[#161B22] border-r border-[#1F2937] z-50 transform transition-transform duration-300 ease-in-out',
                sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            ]"
        >
            <div class="flex flex-col h-full">
                <!-- Header -->
                <div class="p-6 border-b border-[#1F2937]">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="text-xl font-bold text-white font-montserrat">Admin Panel</h1>
                            <p class="text-xs text-[#9CA3AF] mt-1 font-onest">Management System</p>
                        </div>
                        <button
                            @click="sidebarOpen = false"
                            class="lg:hidden p-2 hover:bg-[#1F2937] rounded-lg transition-colors"
                        >
                            <X :size="20" class="text-[#9CA3AF]" />
                        </button>
                    </div>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 p-4 overflow-y-auto">
                    <div class="space-y-1">
                        <Link
                            v-for="item in navigation"
                            :key="item.name"
                            :href="item.href"
                            @click="sidebarOpen = false"
                            :class="[
                                'w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left font-onest',
                                item.active
                                    ? 'bg-[#0D6EFD] text-white shadow-lg shadow-[#0D6EFD]/20'
                                    : 'text-[#9CA3AF] hover:bg-[#1F2937] hover:text-white'
                            ]"
                        >
                            <component :is="item.icon" :size="20" />
                            <span class="font-medium">{{ item.name }}</span>
                        </Link>
                    </div>
                </nav>

                <!-- Footer -->
                <div class="p-4 border-t border-[#1F2937]">
                    <div class="flex items-center gap-3 p-3 bg-[#1F2937] rounded-lg mb-3">
                        <div class="w-10 h-10 bg-gradient-to-br from-[#0D6EFD] to-[#0B5ED7] rounded-lg flex items-center justify-center text-white font-bold font-montserrat">
                            A
                        </div>
                        <div class="flex-1 min-w-0 font-onest">
                            <p class="text-sm font-semibold text-white truncate">
                                {{ $page.props.auth.user.name }}
                            </p>
                            <p class="text-xs text-[#9CA3AF]">Administrator</p>
                        </div>
                    </div>
                    <Link
                        :href="route('logout')"
                        method="post"
                        as="button"
                        class="w-full flex items-center gap-2 px-4 py-2 text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] rounded-lg transition-all duration-200 font-onest"
                    >
                        <LogOut :size="18" />
                        <span class="text-sm font-medium">Logout</span>
                    </Link>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="lg:pl-64">
            <!-- Top Bar -->
            <div class="sticky top-0 z-30 bg-[#161B22] border-b border-[#1F2937]">
                <div class="flex items-center justify-between px-4 md:px-6 py-4">
                    <button
                        @click="sidebarOpen = true"
                        class="lg:hidden p-2 hover:bg-[#1F2937] rounded-lg transition-colors"
                    >
                        <Menu :size="24" class="text-white" />
                    </button>
                    <div class="flex-1 lg:flex-none">
                        <h2 class="text-lg md:text-xl font-bold text-white font-montserrat">
                            {{ navigation.find(item => item.active)?.name || 'Dashboard' }}
                        </h2>
                    </div>
                </div>
            </div>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>

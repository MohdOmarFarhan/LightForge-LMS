<script setup>
import {
  Home,
  FileText,
  TrendingUp,
  Trophy,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  GraduationCap,
  User,
  CreditCard,
} from "lucide-vue-next";
import { Link } from '@inertiajs/vue3';
import { ref, onMounted, onUnmounted } from 'vue';

const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const toggleDropdown = (e) => {
  e.preventDefault();
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (e) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    isDropdownOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropdown);
});
</script>

<template>
  <div
    class="w-64 bg-[#0A1929] dark:bg-[#0D1117] text-white flex flex-col fixed left-0 top-0 h-full font-onest md:block hidden transition-colors duration-200 z-20"
    style="
      padding-top: 32px;
      padding-left: 24px;
      padding-right: 24px;
      padding-bottom: 28px;
    "
  >
    <!-- Brand Section -->
    <div class="mb-5">
      <Link
        :href="route('dashboard')"
        class="flex items-center hover:opacity-80 transition-opacity"
      >
        <GraduationCap :size="28" class="text-[#0066FF] mr-2" />
        <h1
          class="font-montserrat font-bold text-lg text-white"
          style="letter-spacing: -0.25px"
        >
          LightForge Academy
        </h1>
      </Link>
    </div>

    <!-- Student Profile Section with Dropdown -->
    <div class="relative mb-7" ref="dropdownRef">
      <button 
        @click="toggleDropdown"
        class="w-full flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-lg p-2 -m-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
        :aria-expanded="isDropdownOpen"
      >
        <div class="mr-3">
          <img
            v-if="$page.props.auth.user.profile_photo_path"
            :src="'/storage/' + $page.props.auth.user.profile_photo_path"
            :alt="$page.props.auth.user.name"
            class="w-10 h-10 rounded-full object-cover"
          />
          <div
            v-else
            class="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center text-white font-montserrat font-bold text-sm"
          >
            {{ $page.props.auth.user.name.charAt(0) }}{{ $page.props.auth.user.name.split(' ')[1] ? $page.props.auth.user.name.split(' ')[1].charAt(0) : '' }}
          </div>
        </div>
        <div class="flex-1 overflow-hidden text-left">
          <div class="font-onest font-semibold text-[13px] text-white truncate">
            {{ $page.props.auth.user.name }}
          </div>
          <div
            class="font-onest font-normal text-[11px] text-white"
            style="opacity: 0.5"
          >
            ID: {{ $page.props.auth.user.student_id || 'Pending' }}
          </div>
        </div>
        <div class="p-1 rounded-md transition-colors" :class="isDropdownOpen ? 'bg-white/10' : ''">
          <ChevronDown
            :size="18"
            class="text-white transition-transform duration-200"
            :class="[
              isDropdownOpen ? 'rotate-180 opacity-100' : 'opacity-60',
              'hover:opacity-100'
            ]"
          />
        </div>
      </button>

      <!-- Dropdown Menu -->
      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <div 
          v-if="isDropdownOpen"
          class="absolute left-0 right-0 top-full mt-2 bg-[#1E293B] dark:bg-[#1F2937] border border-[#374151] rounded-xl shadow-xl overflow-hidden z-50 py-1"
        >
          <!-- User Info Summary -->
          <div class="px-4 py-3 border-b border-[#374151]">
            <p class="text-[10px] text-[#9CA3AF] uppercase font-semibold mb-1">Current Session</p>
            <div class="flex items-center justify-between text-xs text-white">
              <span>Class: {{ $page.props.auth.user.class }}</span>
              <span>Group: {{ $page.props.auth.user.group }}</span>
            </div>
            <div class="text-xs text-white mt-1">
              Batch: {{ $page.props.auth.user.hsc_year }}
            </div>
          </div>

          <!-- Menu Items -->
          <div class="py-1">
            <Link 
              :href="route('profile.edit')"
              class="flex items-center px-4 py-2 text-sm text-[#E5E7EB] hover:bg-[#374151] hover:text-white transition-colors"
            >
              <User :size="16" class="mr-2" />
              My Profile
            </Link>
            <Link 
              :href="route('profile.edit')"
              class="flex items-center px-4 py-2 text-sm text-[#E5E7EB] hover:bg-[#374151] hover:text-white transition-colors"
            >
              <CreditCard :size="16" class="mr-2" />
              Billing
            </Link>
            <Link 
              :href="route('profile.edit')"
              class="flex items-center px-4 py-2 text-sm text-[#E5E7EB] hover:bg-[#374151] hover:text-white transition-colors"
            >
              <Settings :size="16" class="mr-2" />
              Settings
            </Link>
          </div>

          <!-- Logout -->
          <div class="border-t border-[#374151] py-1">
            <Link 
              :href="route('logout')" 
              method="post" 
              as="button" 
              class="w-full flex items-center px-4 py-2 text-sm text-[#EF4444] hover:bg-[#374151] transition-colors"
            >
              <LogOut :size="16" class="mr-2" />
              Sign out
            </Link>
          </div>
        </div>
      </transition>
    </div>

    <!-- Main Menu Section -->
    <div class="mb-9">
      <h2
        class="font-onest font-semibold text-[11px] text-white mb-3"
        style="opacity: 0.6"
      >
        Main Menu
      </h2>
      <div class="space-y-3">
        <!-- Active Menu Item - Dashboard -->
        <Link
          :href="route('dashboard')"
          class="flex items-center rounded-md px-4 py-3 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          :class="route().current('dashboard') ? 'bg-[#0066FF] dark:bg-[#0052CC] hover:bg-[#0052CC] dark:hover:bg-[#0047B3]' : 'hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 group'"
        >
          <Home :size="18" class="text-white mr-4" :class="route().current('dashboard') ? '' : 'opacity-60 group-hover:opacity-80'" />
          <span class="font-onest font-medium text-[13px] text-white" :class="route().current('dashboard') ? '' : 'opacity-60 group-hover:opacity-80'">
            Dashboard
          </span>
        </Link>
        
        <!-- Other Menu Items... -->
        <Link
          :href="route('exams')"
          class="flex items-center rounded-md px-4 py-3 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          :class="route().current('exams') ? 'bg-[#0066FF] dark:bg-[#0052CC] hover:bg-[#0052CC] dark:hover:bg-[#0047B3]' : 'hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 group'"
        >
          <FileText
            :size="18"
            class="text-white mr-4 transition-opacity"
            :class="route().current('exams') ? '' : 'opacity-60 group-hover:opacity-80'"
          />
          <span 
            class="font-onest font-normal text-[13px] text-white transition-opacity"
            :class="route().current('exams') ? 'font-medium' : 'opacity-60 group-hover:opacity-80'"
          >
            Exams
          </span>
        </Link>

        <Link
          :href="route('performance')"
          class="flex items-center rounded-md px-4 py-3 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          :class="route().current('performance') ? 'bg-[#0066FF] dark:bg-[#0052CC] hover:bg-[#0052CC] dark:hover:bg-[#0047B3]' : 'hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 group'"
        >
          <TrendingUp
            :size="18"
            class="text-white mr-4 transition-opacity"
            :class="route().current('performance') ? '' : 'opacity-60 group-hover:opacity-80'"
          />
          <span 
            class="font-onest font-normal text-[13px] text-white transition-opacity"
            :class="route().current('performance') ? 'font-medium' : 'opacity-60 group-hover:opacity-80'"
          >
            Performance
          </span>
        </Link>

        <Link
          :href="route('leaderboard')"
          class="flex items-center rounded-md px-4 py-3 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
          :class="route().current('leaderboard') ? 'bg-[#0066FF] dark:bg-[#0052CC] hover:bg-[#0052CC] dark:hover:bg-[#0047B3]' : 'hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 group'"
        >
          <Trophy
            :size="18"
            class="text-white mr-4 transition-opacity"
            :class="route().current('leaderboard') ? '' : 'opacity-60 group-hover:opacity-80'"
          />
          <span 
            class="font-onest font-normal text-[13px] text-white transition-opacity"
            :class="route().current('leaderboard') ? 'font-medium' : 'opacity-60 group-hover:opacity-80'"
          >
            Leaderboard
          </span>
        </Link>
      </div>
    </div>

    <!-- Quick Stats Section -->
    <div class="flex-1">
      <h2
        class="font-onest font-semibold text-[11px] text-white mb-4"
        style="opacity: 0.6"
      >
        Your Stats
      </h2>
      <div class="space-y-3">
        <div class="flex items-center justify-between cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
          <div class="flex items-center">
            <div class="w-2.5 h-2.5 bg-[#0066FF] dark:bg-[#3B82F6] rounded-full mr-3"></div>
            <span class="font-onest font-normal text-[12px] text-white">
              Exams Taken
            </span>
          </div>
          <span class="font-onest font-semibold text-[12px] text-white">
            {{ $page.props.auth.stats?.exams_taken || 0 }}
          </span>
        </div>
        <div class="flex items-center justify-between cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
          <div class="flex items-center">
            <div class="w-2.5 h-2.5 bg-[#10B981] dark:bg-[#34D399] rounded-full mr-3"></div>
            <span class="font-onest font-normal text-[12px] text-white">
              Average Score
            </span>
          </div>
          <span class="font-onest font-semibold text-[12px] text-white">
            {{ $page.props.auth.stats?.avg_score || 0 }}%
          </span>
        </div>
        <div class="flex items-center justify-between cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded p-1 -m-1 transition-colors duration-150">
          <div class="flex items-center">
            <div class="w-2.5 h-2.5 bg-[#F59E0B] dark:bg-[#FBBF24] rounded-full mr-3"></div>
            <span class="font-onest font-normal text-[12px] text-white">
              Rank
            </span>
          </div>
          <span class="font-onest font-semibold text-[12px] text-white">
            {{ $page.props.auth.stats?.rank || '-' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Bottom Utility Links -->
    <div class="mt-auto">
      <hr class="border-[#1E3A52] dark:border-[#1F2937] border-t mb-6" />
      <div class="space-y-3">
        <Link
          :href="route('profile.edit')"
          class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF] rounded px-2 py-1 group"
        >
          <Settings
            :size="18"
            class="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
          />
          <span class="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
            Settings
          </span>
        </Link>

        <div
          class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF] rounded px-2 py-1 group"
          tabindex="0"
        >
          <HelpCircle
            :size="18"
            class="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
          />
          <span class="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
            Help & Support
          </span>
        </div>

        <Link
          :href="route('logout')"
          method="post"
          as="button"
          class="w-full flex items-center px-2 py-3 rounded-md cursor-pointer hover:bg-[#0D2339] dark:hover:bg-[#1F2937] active:bg-[#0A1E2D] dark:active:bg-[#111827] transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
        >
          <LogOut :size="18" class="text-white mr-4" />
          <span class="font-onest font-medium text-[12px] text-white">
            Logout
          </span>
        </Link>
      </div>
    </div>
  </div>
</template>

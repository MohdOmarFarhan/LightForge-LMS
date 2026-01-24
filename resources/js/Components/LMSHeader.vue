<script setup>
import {
  Menu,
  Search,
  Bell,
  BookOpen,
  Home,
  FileText,
  TrendingUp,
  Trophy,
  ChevronDown,
  Settings,
  HelpCircle,
  LogOut,
  X,
  GraduationCap,
} from "lucide-vue-next";
import { ref } from "vue";
import { Link } from '@inertiajs/vue3';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <header class="sticky top-0 z-10 bg-white dark:bg-[#1E1E1E] border-b border-[#E9EDF3] dark:border-[#2A2A2A] h-14 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-6 h-full">
      <div class="flex items-center justify-between h-full">
        <!-- Left Utility Group - Hamburger -->
        <div class="flex items-center">
          <button
            @click="toggleMobileMenu"
            class="md:hidden w-10 h-10 flex items-center justify-center rounded hover:bg-[#E3F2FD] dark:hover:bg-[#0066FF] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40"
          >
            <Menu
              :size="22"
              class="text-[#0A1929] dark:text-white hover:text-[#0066FF] transition-colors"
            />
          </button>

          <!-- Brand name on mobile -->
          <div class="flex items-center ml-3 md:hidden">
            <GraduationCap :size="24" class="text-[#0066FF] mr-2" />
            <h1 class="font-montserrat font-bold text-base text-[#0A1929] dark:text-white">
              LightForge Academy
            </h1>
          </div>
        </div>

        <!-- Search Module - Hidden on mobile -->
        <div class="hidden md:flex flex-1 max-w-[480px] min-w-[280px] mx-4">
          <div class="flex items-center h-10 border border-[#D7DBE3] dark:border-[#374151] rounded-lg overflow-hidden focus-within:border-[#0066FF] transition-colors bg-white dark:bg-[#262626] w-full">
            <!-- Search Icon Section -->
            <div class="w-12 flex items-center justify-center">
              <Search
                :size="20"
                class="text-[#505B6B] dark:text-[#9CA3AF]"
              />
            </div>

            <!-- Search Input -->
            <input
              type="text"
              placeholder="Search exams, courses..."
              class="flex-1 h-full px-0 py-0 border-0 outline-none font-inter text-sm text-[#505B6B] dark:text-[#E5E7EB] placeholder-[#8B93A3] dark:placeholder-[#6B7280] focus:placeholder-[#707888] dark:focus:placeholder-[#9CA3AF] bg-transparent"
            />
          </div>
        </div>

        <!-- Action Cluster -->
        <div class="flex items-center space-x-3 md:space-x-6">
          <!-- Search icon for mobile -->
          <button class="md:hidden w-10 h-10 flex items-center justify-center rounded hover:bg-[#E3F2FD] dark:hover:bg-[#0066FF] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40">
            <Search
              :size="20"
              class="text-[#505B6B] dark:text-[#9CA3AF]"
            />
          </button>

          <!-- Vertical Divider - hidden on mobile -->
          <div class="w-px h-6 bg-[#E1E4E8] dark:bg-[#374151] hidden md:block"></div>

          <!-- Notification Bell -->
          <button class="relative w-10 h-10 flex items-center justify-center rounded hover:bg-[#E3F2FD] dark:hover:bg-[#0066FF] dark:hover:bg-opacity-10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40">
            <Bell
              :size="20"
              class="text-[#8B93A3] dark:text-[#9CA3AF]"
            />
            <!-- Notification Dot -->
            <div class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#FF4E5C] rounded-full"></div>
          </button>

          <!-- Primary CTA -->
          <button class="flex items-center h-10 px-3 md:px-6 bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0047B3] text-white rounded-lg font-inter font-semibold text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-40">
            <span class="hidden sm:inline">Start Exam</span>
            <BookOpen :size="18" class="sm:ml-2" />
          </button>
        </div>
      </div>
    </div>
  </header>

  <!-- Mobile Menu Overlay -->
  <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 md:hidden">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      @click="closeMobileMenu"
    ></div>

    <!-- Mobile Menu Panel -->
    <div class="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-[#0A1929] dark:bg-[#0D1117] text-white flex flex-col transition-colors duration-200 transform">
      <!-- Mobile Menu Header -->
      <div class="flex items-center justify-between p-6 border-b border-[#1E3A52] dark:border-[#1F2937]">
        <div class="flex items-center">
          <GraduationCap :size="24" class="text-[#0066FF] mr-2" />
          <h1 class="font-montserrat font-bold text-base text-white">
            LightForge Academy
          </h1>
        </div>
        <button
          @click="closeMobileMenu"
          class="w-8 h-8 flex items-center justify-center rounded hover:bg-white hover:bg-opacity-10 transition-colors"
        >
          <X :size="20" class="text-white" />
        </button>
      </div>

      <!-- Mobile Menu Content -->
      <div class="flex-1 p-6 overflow-y-auto">
        <!-- Student Profile Section -->
        <div class="flex items-center mb-7 cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 rounded-lg p-2 -m-2 transition-colors duration-200">
          <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066FF] to-[#0052CC] flex items-center justify-center mr-3 text-white font-montserrat font-bold text-sm">
            {{ $page.props.auth.user.name.charAt(0) }}
          </div>
          <div class="flex-1">
            <div class="font-onest font-semibold text-[13px] text-white">
              {{ $page.props.auth.user.name }}
            </div>
            <div class="font-onest font-normal text-[11px] text-white opacity-50">
              ID: {{ $page.props.auth.user.student_id || 'Pending' }}
            </div>
          </div>
          <ChevronDown
            :size="18"
            class="text-white opacity-60 hover:opacity-80 transition-opacity"
          />
        </div>

        <!-- Main Menu Section -->
        <div class="mb-9">
          <h2 class="font-onest font-semibold text-[11px] text-white mb-3 opacity-60">
            Main Menu
          </h2>
          <div class="space-y-3">
            <!-- Active Menu Item - Dashboard -->
            <Link
              :href="route('dashboard')"
              @click="closeMobileMenu"
              class="flex items-center rounded-md px-4 py-3 transition-colors duration-150 ease-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF]"
              :class="route().current('dashboard') ? 'bg-[#0066FF] dark:bg-[#0052CC]' : 'hover:bg-[#0052CC] dark:hover:bg-[#0047B3] active:bg-[#0047B3] dark:active:bg-[#003D99]'"
            >
              <Home :size="18" class="text-white mr-4" />
              <span class="font-onest font-medium text-[13px] text-white">
                Dashboard
              </span>
            </Link>

            <!-- Inactive Menu Items -->
            <a
              href="#"
              @click="closeMobileMenu"
              class="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] group"
            >
              <FileText
                :size="18"
                class="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
              />
              <span class="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                Exams
              </span>
            </a>

            <a
              href="#"
              @click="closeMobileMenu"
              class="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] group"
            >
              <TrendingUp
                :size="18"
                class="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
              />
              <span class="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                Performance
              </span>
            </a>

            <a
              href="#"
              @click="closeMobileMenu"
              class="flex items-center px-4 py-3 rounded-md transition-colors duration-150 hover:bg-white hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-15 active:bg-white active:bg-opacity-15 dark:active:bg-white dark:active:bg-opacity-20 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] group"
            >
              <Trophy
                :size="18"
                class="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
              />
              <span class="font-onest font-normal text-[13px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                Leaderboard
              </span>
            </a>
          </div>
        </div>

        <!-- Quick Stats Section -->
        <div class="mb-8">
          <h2 class="font-onest font-semibold text-[11px] text-white mb-4 opacity-60">
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
                12
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
                85%
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
                #8
              </span>
            </div>
          </div>
        </div>

        <!-- Bottom Utility Links -->
        <div class="border-t border-[#1E3A52] dark:border-[#1F2937] pt-6">
          <div class="space-y-3">
            <div class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF] rounded px-2 py-1 group">
              <Settings
                :size="18"
                class="text-white opacity-60 mr-4 group-hover:opacity-80 transition-opacity"
              />
              <span class="font-onest font-normal text-[12px] text-white opacity-60 group-hover:opacity-80 transition-opacity">
                Settings
              </span>
            </div>

            <div class="flex items-center cursor-pointer hover:bg-white hover:bg-opacity-5 dark:hover:bg-white dark:hover:bg-opacity-10 active:bg-white active:bg-opacity-10 dark:active:bg-white dark:active:bg-opacity-15 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-[#0066FF] rounded px-2 py-1 group">
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
    </div>
  </div>
</template>

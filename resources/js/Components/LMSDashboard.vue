<script setup>
import { computed } from "vue";
import { FileText, TrendingUp, Trophy, ArrowRight } from "lucide-vue-next";

const props = defineProps({
  stats: {
    type: Array,
    default: () => [],
  },
});

const statsConfig = {
  exams: {
    icon: FileText,
    bgColor: "bg-[#E3F2FD] dark:bg-[#1A2744]",
    borderColor: "border-[#0066FF] dark:border-[#2196F3]",
    accentColor: "#0066FF",
    darkAccentColor: "#2196F3",
    textColor: "text-[#0066FF] dark:text-[#2196F3]",
    hoverBorderColor: "hover:border-[#0052CC] dark:hover:border-[#1976D2]",
  },
  performance: {
    icon: TrendingUp,
    bgColor: "bg-[#E8F5E9] dark:bg-[#1A3A2B]",
    borderColor: "border-[#10B981] dark:border-[#34D399]",
    accentColor: "#10B981",
    darkAccentColor: "#34D399",
    textColor: "text-[#10B981] dark:text-[#34D399]",
    hoverBorderColor: "hover:border-[#059669] dark:hover:border-[#22C55E]",
  },
  leaderboard: {
    icon: Trophy,
    bgColor: "bg-[#FFF3E0] dark:bg-[#3D2B1A]",
    borderColor: "border-[#F59E0B] dark:border-[#FBBF24]",
    accentColor: "#F59E0B",
    darkAccentColor: "#FBBF24",
    textColor: "text-[#F59E0B] dark:text-[#FBBF24]",
    hoverBorderColor: "hover:border-[#D97706] dark:hover:border-[#F59E0B]",
  },
};

const processedStats = computed(() => {
  return props.stats.map((stat) => {
    const config = statsConfig[stat.type] || statsConfig.exams;
    return { ...config, ...stat };
  });
});
</script>

<template>
  <section class="w-full">
    <!-- Welcome Header -->
    <div class="mb-8">
      <h1 class="font-poppins font-bold text-3xl md:text-4xl text-[#0B0F1A] dark:text-[#E5E7EB] mb-2 transition-colors duration-200">
        Welcome back, {{ $page.props.auth.user.name }}! 👋
      </h1>
      <p class="font-inter text-base text-[#64748B] dark:text-[#9CA3AF] transition-colors duration-200">
        Here's what's happening with your learning journey today
      </p>
    </div>

    <!-- Stats Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      <div
        v-for="stat in processedStats"
        :key="stat.id"
        class="relative min-h-[140px] p-5 rounded-[14px] border transition-all duration-200 ease-out cursor-pointer hover:shadow-sm hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:hover:shadow-lg group"
        :class="[stat.bgColor, stat.borderColor, stat.hoverBorderColor]"
        tabindex="0"
        role="button"
      >
        <!-- Decorative Overlay -->
        <div class="absolute inset-0 overflow-hidden rounded-[14px] pointer-events-none">
          <!-- Top-left arc -->
          <svg
            class="absolute -top-2 -left-2 w-16 h-16"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 56 C8 31, 31 8, 56 8"
              :stroke="stat.accentColor"
              stroke-width="1"
              stroke-opacity="0.15"
              fill="none"
              class="dark:hidden"
            />
            <path
              d="M2 60 C2 29, 29 2, 60 2"
              :stroke="stat.accentColor"
              stroke-width="1"
              stroke-opacity="0.15"
              fill="none"
              class="dark:hidden"
            />
            <path
              d="M8 56 C8 31, 31 8, 56 8"
              :stroke="stat.darkAccentColor"
              stroke-width="1"
              stroke-opacity="0.25"
              fill="none"
              class="hidden dark:block"
            />
            <path
              d="M2 60 C2 29, 29 2, 60 2"
              :stroke="stat.darkAccentColor"
              stroke-width="1"
              stroke-opacity="0.25"
              fill="none"
              class="hidden dark:block"
            />
          </svg>

          <!-- Bottom-right arc -->
          <svg
            class="absolute -bottom-2 -right-2 w-16 h-16 rotate-180"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 56 C8 31, 31 8, 56 8"
              :stroke="stat.accentColor"
              stroke-width="1"
              stroke-opacity="0.15"
              fill="none"
              class="dark:hidden"
            />
            <path
              d="M2 60 C2 29, 29 2, 60 2"
              :stroke="stat.accentColor"
              stroke-width="1"
              stroke-opacity="0.15"
              fill="none"
              class="dark:hidden"
            />
            <path
              d="M8 56 C8 31, 31 8, 56 8"
              :stroke="stat.darkAccentColor"
              stroke-width="1"
              stroke-opacity="0.25"
              fill="none"
              class="hidden dark:block"
            />
            <path
              d="M2 60 C2 29, 29 2, 60 2"
              :stroke="stat.darkAccentColor"
              stroke-width="1"
              stroke-opacity="0.25"
              fill="none"
              class="hidden dark:block"
            />
          </svg>
        </div>

        <div class="relative z-10 flex flex-col justify-between h-full">
          <!-- Upper block -->
          <div class="flex items-start gap-3">
            <!-- Icon container -->
            <div class="w-12 h-12 bg-white dark:bg-[#262626] rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-200">
              <component
                :is="stat.icon"
                :size="20"
                :stroke-width="2"
                :color="stat.accentColor"
                class="dark:hidden"
              />
              <component
                :is="stat.icon"
                :size="20"
                :stroke-width="2"
                :color="stat.darkAccentColor"
                class="hidden dark:block"
              />
            </div>

            <!-- Text content -->
            <div class="flex-1 min-w-0">
              <div class="font-poppins font-medium text-[32px] leading-8 text-[#09121F] dark:text-[#E5E7EB] mb-1 transition-colors duration-200">
                {{ stat.value }}
              </div>
              <div class="font-montserrat font-semibold text-sm leading-5 text-[#64748B] dark:text-[#9CA3AF] transition-colors duration-200">
                {{ stat.title }}
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="mt-3">
            <p class="font-inter text-xs text-[#64748B] dark:text-[#9CA3AF] transition-colors duration-200">
              {{ stat.description }}
            </p>
          </div>

          <!-- Divider -->
          <div
            class="w-full h-px bg-black bg-opacity-6 dark:bg-white dark:bg-opacity-10 my-4 transition-colors duration-200"
            style="margin-top: auto; margin-bottom: 16px"
          ></div>

          <!-- Lower block -->
          <div class="flex items-center justify-between">
            <button
              class="font-montserrat font-semibold text-sm leading-5 hover:underline focus:outline-none focus:underline transition-colors duration-200"
              :class="stat.textColor"
            >
              View Details
            </button>
            <div>
              <ArrowRight
                :size="18"
                :color="stat.accentColor"
                class="dark:hidden"
              />
              <ArrowRight
                :size="18"
                :color="stat.darkAccentColor"
                class="hidden dark:block"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.bg-opacity-6 {
  background-color: rgba(0, 0, 0, 0.06);
}
.dark .bg-opacity-10 {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>

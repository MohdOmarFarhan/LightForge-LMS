<script setup>
import { Calendar, Clock, BookOpen, CheckCircle, ArrowRight } from "lucide-vue-next";
import { Link } from '@inertiajs/vue3';

const props = defineProps({
  exams: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section class="w-full">
    <!-- Container with background -->
    <div class="max-w-[1280px] mx-auto bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-6 md:p-8 transition-colors duration-200">
      <!-- Header Row -->
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="font-montserrat text-xl font-bold text-[#04111C] dark:text-[#E5E7EB] transition-colors duration-200 mb-1">
            Upcoming Exams
          </h2>
          <p class="font-inter text-sm text-[#6D7A8B] dark:text-[#9CA3AF] transition-colors duration-200">
            Stay on top of your scheduled assessments
          </p>
        </div>
        <Link 
          :href="route('exams')"
          class="px-4 py-2 rounded-lg text-sm font-inter font-medium bg-[#E3F2FD] bg-opacity-70 text-[#0066FF] dark:bg-[#1A2744] dark:bg-opacity-80 dark:text-[#2196F3] hover:bg-[#BBDEFB] hover:text-[#0052CC] dark:hover:bg-[#1E3A5A] dark:hover:text-[#1976D2] transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-50"
        >
          View All Exams
        </Link>
      </div>

      <!-- Exams List -->
      <div class="space-y-4">
        <div v-if="exams.length === 0" class="text-center py-8">
            <p class="text-[#6D7A8B] dark:text-[#9CA3AF]">No upcoming exams scheduled.</p>
        </div>
        <div
          v-for="exam in exams"
          :key="exam.id"
          class="bg-white dark:bg-[#1E1E1E] border border-[#E7ECF3] dark:border-[#2A2A2A] rounded-xl p-5 transition-all duration-200 ease-out hover:shadow-sm dark:hover:shadow-lg hover:-translate-y-0.5"
        >
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <!-- Left Block - Exam Info -->
            <div class="flex-1">
              <!-- Subject Badge -->
              <div class="inline-flex items-center px-3 py-1 rounded-full bg-[#E3F2FD] dark:bg-[#1A2744] mb-2">
                <span class="font-inter text-xs font-medium text-[#0066FF] dark:text-[#2196F3] transition-colors duration-200">
                  {{ exam.subject }}
                </span>
              </div>

              <!-- Exam Title -->
              <h3 class="font-montserrat font-bold text-base text-[#04111C] dark:text-[#E5E7EB] mb-2 leading-tight transition-colors duration-200">
                {{ exam.title }}
              </h3>

              <!-- Exam Meta -->
              <div class="flex flex-wrap items-center gap-3 text-xs text-[#6D7A8B] dark:text-[#9CA3AF] transition-colors duration-200">
                <div class="flex items-center gap-1">
                  <Calendar
                    :size="14"
                    class="text-[#6D7A8B] dark:text-[#9CA3AF]"
                  />
                  <span class="font-inter">{{ exam.date }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <Clock :size="14" class="text-[#6D7A8B] dark:text-[#9CA3AF]" />
                  <span class="font-inter">{{ exam.time }}</span>
                </div>
                <div class="flex items-center gap-1">
                  <BookOpen
                    :size="14"
                    class="text-[#6D7A8B] dark:text-[#9CA3AF]"
                  />
                  <span class="font-inter">{{ exam.questions }} questions</span>
                </div>
              </div>
            </div>

            <!-- Right Block - Actions -->
            <div class="flex items-center gap-3">
              <!-- Start Button -->
              <Link 
                :href="route('exams')"
                class="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0066FF] hover:bg-[#0052CC] active:bg-[#0047B3] text-white font-inter font-semibold text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-opacity-50"
              >
                Go to Exams
                <ArrowRight :size="16" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

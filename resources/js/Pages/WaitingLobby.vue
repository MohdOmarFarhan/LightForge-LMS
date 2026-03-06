<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { Head, Link, usePage, router } from '@inertiajs/vue3';
import {
    GraduationCap,
    Clock,
    Mail,
    CheckCircle2,
    Sparkles,
    Bell,
    Phone,
    Calendar,
    LogOut,
    ArrowRight
} from 'lucide-vue-next';

const page = usePage();
const user = computed(() => page.props.auth.user);
const isApproved = computed(() => user.value?.is_approved);

const currentStep = ref(1);
let intervalId = null;
let pollId = null;

// Watch for approval status change
watch(isApproved, (newVal) => {
    if (newVal) {
        if (intervalId) clearInterval(intervalId);
        if (pollId) clearInterval(pollId);
        currentStep.value = 3;
    }
});

onMounted(() => {
    // If approved, stop the waiting animation and show the final state
    if (isApproved.value) {
        currentStep.value = 3;
    } else {
        intervalId = setInterval(() => {
            currentStep.value = currentStep.value === 3 ? 1 : currentStep.value + 1;
        }, 3000);

        // Poll for status update
        pollId = setInterval(() => {
            router.reload({ only: ['auth'] });
        }, 5000);
    }
});

onUnmounted(() => {
    if (intervalId) clearInterval(intervalId);
    if (pollId) clearInterval(pollId);
});

const steps = computed(() => [
    {
        icon: CheckCircle2,
        label: "Application Submitted",
        done: true,
    },
    {
        icon: Clock,
        label: "Under Review",
        done: isApproved.value,
        active: !isApproved.value,
    },
    { 
        icon: Sparkles, 
        label: "Approval Pending", 
        done: isApproved.value,
        active: isApproved.value 
    },
]);

const startJourney = () => {
    router.post(route('complete-onboarding'));
};
</script>

<template>
    <Head title="Waiting for Approval" />

    <div class="min-h-screen bg-gradient-to-br from-[#F8FAFC] via-white to-[#E0F2FE] dark:from-[#0D1117] dark:via-[#0A0E14] dark:to-[#0D1929] flex items-center justify-center p-4 font-inter">
        <!-- Background Decorations -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-20 left-10 w-64 h-64 bg-[#0066FF]/5 rounded-full blur-3xl animate-pulse"></div>
            <div
                class="absolute bottom-20 right-10 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl animate-pulse"
                style="animation-delay: 1.5s"
            ></div>
            <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF]/3 rounded-full blur-3xl animate-pulse"
                style="animation-delay: 3s"
            ></div>
        </div>

        <!-- Main Content Card -->
        <div class="relative w-full max-w-4xl z-10">
            <div class="bg-white dark:bg-[#1E1E1E] rounded-3xl shadow-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#2A2A2A]">
                <div class="grid md:grid-cols-2 gap-0">
                    <!-- Left Side - Visual -->
                    <div class="bg-gradient-to-br from-[#0A1929] via-[#0D2744] to-[#0066FF] p-12 flex flex-col justify-center items-center text-white relative overflow-hidden">
                        <!-- Animated Background Elements -->
                        <div class="absolute inset-0 opacity-10">
                            <div class="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl animate-pulse"></div>
                            <div
                                class="absolute bottom-10 right-10 w-40 h-40 bg-[#00D4FF] rounded-full blur-2xl animate-pulse"
                                style="animation-delay: 1s"
                            ></div>
                        </div>

                        <!-- Logo -->
                        <div class="relative z-10 mb-8">
                            <div class="w-20 h-20 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-2xl flex items-center justify-center shadow-2xl">
                                <GraduationCap :size="40" class="text-white" />
                            </div>
                        </div>

                        <!-- Approved: Checkmark, Pending: Clock -->
                        <div class="relative z-10 mb-6">
                            <div v-if="isApproved" class="w-32 h-32 bg-[#10B981]/20 backdrop-blur-lg rounded-full flex items-center justify-center border-4 border-[#10B981]/50">
                                <CheckCircle2 :size="56" class="text-[#10B981] animate-bounce" />
                            </div>
                            <div v-else class="w-32 h-32 bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center border-4 border-white/20">
                                <Clock :size="56" class="text-white animate-pulse" />
                            </div>
                        </div>

                        <h2 class="relative z-10 font-montserrat font-bold text-3xl text-center mb-4">
                            {{ isApproved ? 'You\'re In!' : 'Request Under Consideration' }}
                        </h2>
                        <p class="relative z-10 font-onest text-center text-white/80 text-lg mb-8">
                            {{ isApproved ? 'Your application has been approved.' : 'Your account is pending approval by the administrator.' }}
                        </p>

                        <!-- Progress Steps -->
                        <div class="relative z-10 w-full max-w-xs space-y-4">
                            <div v-for="(step, index) in steps" :key="index" class="flex items-center space-x-3">
                                <div
                                    class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
                                    :class="[
                                        step.done ? 'bg-[#10B981] scale-100' :
                                        step.active ? 'bg-[#0066FF] scale-110 animate-pulse' :
                                        'bg-white/10 scale-90'
                                    ]"
                                >
                                    <component :is="step.icon" :size="20" class="text-white" />
                                </div>
                                <span
                                    class="font-onest text-sm transition-all duration-500"
                                    :class="[
                                        step.done || step.active ? 'text-white font-semibold' : 'text-white/50'
                                    ]"
                                >
                                    {{ step.label }}
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- Right Side - Information -->
                    <div class="p-12 flex flex-col justify-center">
                        <div class="mb-8">
                            <h1 class="font-montserrat font-bold text-4xl text-[#0A1929] dark:text-white mb-3">
                                {{ isApproved ? 'Welcome Aboard! 🎉' : 'Account Pending Approval' }}
                            </h1>
                            <p class="text-[#64748B] dark:text-[#9CA3AF] font-onest text-lg">
                                {{ isApproved ? 'You now have full access to LightForge Academy. We\'re excited to see what you\'ll achieve!' : 'Thank you for registering. Your request is currently under consideration by the administration.' }}
                            </p>
                        </div>

                        <!-- APPROVED STATE -->
                        <div v-if="isApproved">
                             <!-- Student ID Display -->
                            <div class="bg-gradient-to-br from-[#E3F2FD] to-[#DBEAFE] dark:from-[#0066FF]/5 dark:to-[#0052CC]/5 rounded-2xl p-6 mb-8 border border-[#0066FF]/20">
                                <div class="flex items-center mb-3">
                                    <Sparkles :size="18" class="text-[#0066FF] mr-2" />
                                    <h4 class="font-montserrat font-bold text-[#0A1929] dark:text-white text-sm">
                                        Your Official Student ID
                                    </h4>
                                </div>
                                <p class="font-onest text-[#64748B] dark:text-[#9CA3AF] text-xs mb-2">
                                    Please keep this ID safe for future reference:
                                </p>
                                <div class="bg-white dark:bg-[#1E1E1E] rounded-lg px-4 py-3 border-2 border-dashed border-[#0066FF]/30">
                                    <p class="font-mono font-bold text-3xl text-[#0066FF] text-center tracking-wider">
                                        {{ user.student_id }}
                                    </p>
                                </div>
                            </div>

                            <button @click="startJourney" class="w-full bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#14532D] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#16A34A]/30 hover:shadow-xl hover:shadow-[#16A34A]/40 transform hover:scale-[1.02] active:scale-[0.98] font-onest group mb-4">
                                <span>Start Learning</span>
                                <ArrowRight :size="20" />
                            </button>
                        </div>

                        <!-- PENDING STATE -->
                        <div v-else>
                            <!-- Pending Student ID Display -->
                            <div class="bg-gradient-to-br from-[#E3F2FD] to-[#DBEAFE] dark:from-[#0066FF]/5 dark:to-[#0052CC]/5 rounded-2xl p-6 mb-8 border border-[#0066FF]/20">
                                <div class="flex items-center mb-3">
                                    <Sparkles :size="18" class="text-[#0066FF] mr-2" />
                                    <h4 class="font-montserrat font-bold text-[#0A1929] dark:text-white text-sm">
                                        Your Student ID
                                    </h4>
                                </div>
                                <p class="font-onest text-[#64748B] dark:text-[#9CA3AF] text-xs mb-2">
                                    Your ID will be generated upon approval:
                                </p>
                                <div class="bg-white dark:bg-[#1E1E1E] rounded-lg px-4 py-3 border-2 border-dashed border-[#0066FF]/30">
                                    <p class="font-mono font-bold text-3xl text-[#9CA3AF] text-center tracking-wider">
                                        XXXXXX
                                    </p>
                                </div>
                            </div>

                            <!-- What's Next Section -->
                            <div class="mb-8">
                                <h3 class="font-montserrat font-bold text-xl text-[#0A1929] dark:text-white mb-4 flex items-center">
                                    <div class="w-2 h-2 bg-[#0066FF] rounded-full mr-3"></div>
                                    What Happens Next?
                                </h3>
                                <div class="space-y-4">
                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Mail :size="16" class="text-[#0066FF]" />
                                        </div>
                                        <div>
                                            <p class="font-onest font-semibold text-[#0A1929] dark:text-white text-sm">
                                                Check Your Email
                                            </p>
                                            <p class="font-onest text-[#64748B] dark:text-[#9CA3AF] text-sm">
                                                We've sent a confirmation to your registered email address
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Clock :size="16" class="text-[#0066FF]" />
                                        </div>
                                        <div>
                                            <p class="font-onest font-semibold text-[#0A1929] dark:text-white text-sm">
                                                Review Process
                                            </p>
                                            <p class="font-onest text-[#64748B] dark:text-[#9CA3AF] text-sm">
                                                Typically takes 24-48 hours during business days
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-start space-x-3">
                                        <div class="w-8 h-8 bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Bell :size="16" class="text-[#0066FF]" />
                                        </div>
                                        <div>
                                            <p class="font-onest font-semibold text-[#0A1929] dark:text-white text-sm">
                                                Get Notified
                                            </p>
                                            <p class="font-onest text-[#64748B] dark:text-[#9CA3AF] text-sm">
                                                You'll receive an email once your account is approved
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Action Buttons (Common) -->
                        <div class="space-y-3">
                            <Link :href="route('logout')" method="post" as="button" class="w-full bg-white dark:bg-[#262626] border-2 border-[#E2E8F0] dark:border-[#374151] hover:border-[#EF4444] hover:bg-[#EF4444]/5 text-[#0A1929] dark:text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 font-onest group">
                                <LogOut :size="20" class="group-hover:text-[#EF4444] transition-colors" />
                                <span class="group-hover:text-[#EF4444] transition-colors">Log Out</span>
                            </Link>
                        </div>

                        <!-- Footer Note -->
                        <div class="mt-8 pt-6 border-t border-[#E2E8F0] dark:border-[#2A2A2A]">
                            <p class="text-center font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                                Questions? Email us at
                                <span class="text-[#0066FF] font-semibold hover:underline cursor-pointer">
                                    admissions@lightforge.academy
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Floating Info Cards -->
            <div class="hidden lg:block absolute -right-8 top-1/4 transform -translate-y-1/2">
                <div
                    class="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl p-5 border border-[#E2E8F0] dark:border-[#2A2A2A] w-64 animate-pulse"
                    style="animation-duration: 3s"
                >
                    <div class="flex items-center space-x-3 mb-2">
                        <div class="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center">
                            <CheckCircle2 :size="20" class="text-white" />
                        </div>
                        <div>
                            <p class="font-montserrat font-bold text-sm text-[#0A1929] dark:text-white">
                                Fast Processing
                            </p>
                            <p class="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                                Avg. 36 hours
                            </p>
                        </div>
                    </div>
                    <div class="bg-[#E3F2FD] dark:bg-[#0066FF]/10 rounded-lg p-3">
                        <p class="font-onest text-xs text-[#0A1929] dark:text-white">
                            <span class="font-bold text-[#0066FF]">95%</span> of
                            applications approved within 48 hours
                        </p>
                    </div>
                </div>
            </div>

            <div class="hidden lg:block absolute -left-8 bottom-1/4 transform translate-y-1/2">
                <div
                    class="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl p-5 border border-[#E2E8F0] dark:border-[#2A2A2A] w-64 animate-pulse"
                    style="animation-duration: 3s; animation-delay: 1.5s"
                >
                    <div class="flex items-center space-x-3 mb-2">
                        <div class="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-full flex items-center justify-center">
                            <Calendar :size="20" class="text-white" />
                        </div>
                        <div>
                            <p class="font-montserrat font-bold text-sm text-[#0A1929] dark:text-white">
                                Next Cohort
                            </p>
                            <p class="font-onest text-xs text-[#64748B] dark:text-[#9CA3AF]">
                                Starts Feb 1st
                            </p>
                        </div>
                    </div>
                    <div class="bg-[#FEF3C7] dark:bg-[#F59E0B]/10 rounded-lg p-3">
                        <p class="font-onest text-xs text-[#0A1929] dark:text-white">
                            Get approved early to secure your spot in the upcoming semester!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}
</style>

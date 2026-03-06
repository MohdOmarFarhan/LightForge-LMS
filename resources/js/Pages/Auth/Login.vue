<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import {
  GraduationCap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  UserCheck
} from "lucide-vue-next";

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const showPassword = ref(false);
const focusedField = ref(null);

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <Head title="Log in" />

    <div class="min-h-screen flex font-inter">
        <!-- Left Side - Brand & Visual -->
        <div class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A1929] via-[#0D2744] to-[#0066FF] relative overflow-hidden">
            <!-- Animated background elements -->
            <div class="absolute inset-0 opacity-10">
                <div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div
                    class="absolute bottom-20 right-20 w-96 h-96 bg-[#0066FF] rounded-full blur-3xl animate-pulse"
                    style="animation-delay: 1s"
                ></div>
            </div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col justify-center px-16 text-white">
                <!-- Logo -->
                <div class="flex items-center mb-8">
                    <div class="w-14 h-14 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-2xl flex items-center justify-center mr-4 shadow-2xl">
                        <GraduationCap :size="32" class="text-white" />
                    </div>
                    <h1 class="font-montserrat font-bold text-3xl">
                        LightForge Academy
                    </h1>
                </div>

                <!-- Hero Text -->
                <h2 class="font-montserrat font-bold text-5xl leading-tight mb-6">
                    Welcome Back,
                    <br />
                    Scholar!
                </h2>
                <p class="text-xl text-white/80 mb-12 max-w-md font-onest">
                    Continue your journey towards excellence. Your next achievement awaits.
                </p>

                <!-- Stats/Features -->
                <div class="grid grid-cols-1 gap-6 max-w-sm">
                    <div class="flex items-center space-x-4 bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                         <div class="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center flex-shrink-0">
                            <UserCheck :size="24" class="text-white" />
                        </div>
                        <div>
                            <div class="font-montserrat font-bold text-lg">Secure Access</div>
                            <div class="text-sm text-white/70 font-onest">Your data is safe with us</div>
                        </div>
                    </div>
                </div>

                <!-- Floating Cards Animation -->
                <div class="absolute bottom-12 right-12 space-y-4">
                    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-4 transform hover:scale-105 transition-transform duration-300 border border-white/20">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 bg-gradient-to-br from-[#F59E0B] to-[#FBBF24] rounded-full flex items-center justify-center">
                                <Sparkles :size="20" class="text-white" />
                            </div>
                            <div>
                                <div class="font-semibold text-sm">Ready to Learn?</div>
                                <div class="text-xs text-white/70">Jump back into your courses</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Side - Login Form -->
        <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F8FAFC] dark:bg-[#0D1117]">
            <div class="w-full max-w-md">
                 <!-- Mobile Logo -->
                <div class="lg:hidden flex items-center justify-center mb-8">
                    <div class="w-12 h-12 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-2xl flex items-center justify-center mr-3">
                        <GraduationCap :size="24" class="text-white" />
                    </div>
                    <h1 class="font-montserrat font-bold text-2xl text-[#0A1929] dark:text-white">
                        LightForge Academy
                    </h1>
                </div>

                <!-- Form Header -->
                <div class="mb-8">
                    <h2 class="font-montserrat font-bold text-3xl text-[#0A1929] dark:text-white mb-2">
                        Sign In
                    </h2>
                    <p class="text-[#64748B] dark:text-[#9CA3AF] font-onest">
                        Enter your credentials to access your account
                    </p>
                </div>

                <div v-if="status" class="mb-6 p-4 bg-green-100 text-green-700 rounded-xl text-sm font-medium border border-green-200 flex items-center">
                    <Sparkles :size="16" class="mr-2" />
                    {{ status }}
                </div>

                <form @submit.prevent="submit" class="space-y-6">
                    <!-- Email / Student ID -->
                    <div class="relative">
                        <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                            Email or Student ID
                        </label>
                        <div
                            class="relative transition-all duration-200"
                            :class="{ 'transform scale-[1.01]': focusedField === 'email' }"
                        >
                            <Mail
                                :size="20"
                                class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
                                :class="focusedField === 'email' ? 'text-[#0066FF]' : 'text-[#94A3B8] dark:text-[#6B7280]'"
                            />
                            <input
                                type="text"
                                v-model="form.email"
                                @focus="focusedField = 'email'"
                                @blur="focusedField = null"
                                class="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                                placeholder="Enter your email or student ID"
                                required
                                autofocus
                            />
                        </div>
                        <p v-if="form.errors.email" class="mt-1 text-sm text-red-600">{{ form.errors.email }}</p>
                    </div>

                    <!-- Password -->
                    <div class="relative">
                        <div class="flex justify-between items-center mb-2">
                            <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] font-onest">
                                Password
                            </label>
                            <Link
                                v-if="canResetPassword"
                                :href="route('password.request')"
                                class="text-sm font-semibold text-[#0066FF] hover:underline font-onest"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                        <div
                            class="relative transition-all duration-200"
                            :class="{ 'transform scale-[1.01]': focusedField === 'password' }"
                        >
                            <Lock
                                :size="20"
                                class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
                                :class="focusedField === 'password' ? 'text-[#0066FF]' : 'text-[#94A3B8] dark:text-[#6B7280]'"
                            />
                            <input
                                :type="showPassword ? 'text' : 'password'"
                                v-model="form.password"
                                @focus="focusedField = 'password'"
                                @blur="focusedField = null"
                                class="w-full pl-12 pr-12 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                @click="showPassword = !showPassword"
                                class="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] dark:text-[#6B7280] hover:text-[#0066FF] transition-colors"
                            >
                                <EyeOff v-if="showPassword" :size="20" />
                                <Eye v-else :size="20" />
                            </button>
                        </div>
                        <p v-if="form.errors.password" class="mt-1 text-sm text-red-600">{{ form.errors.password }}</p>
                    </div>

                    <!-- Remember Me -->
                    <div class="flex items-center">
                        <label class="flex items-center cursor-pointer group">
                            <div class="relative">
                                <input type="checkbox" v-model="form.remember" class="peer sr-only" />
                                <div class="w-5 h-5 border-2 border-[#94A3B8] rounded transition-colors peer-checked:bg-[#0066FF] peer-checked:border-[#0066FF]"></div>
                                <div class="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                            <span class="ml-2 text-sm text-[#64748B] dark:text-[#9CA3AF] font-onest group-hover:text-[#0A1929] dark:group-hover:text-white transition-colors">Remember me</span>
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="w-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/40 transform hover:scale-[1.02] active:scale-[0.98] font-onest group disabled:opacity-75"
                    >
                        <span>Sign In</span>
                        <ArrowRight
                            :size="20"
                            class="group-hover:translate-x-1 transition-transform"
                        />
                    </button>
                </form>

                <!-- Sign Up Link -->
                <div class="mt-8 text-center">
                    <p class="text-sm text-[#64748B] dark:text-[#9CA3AF] font-onest">
                        Don't have an account?
                        <Link :href="route('register')" class="text-[#0066FF] hover:underline cursor-pointer font-semibold">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600&display=swap');

.font-inter { font-family: 'Inter', sans-serif; }
.font-montserrat { font-family: 'Montserrat', sans-serif; }
.font-onest { font-family: 'Onest', sans-serif; }
</style>

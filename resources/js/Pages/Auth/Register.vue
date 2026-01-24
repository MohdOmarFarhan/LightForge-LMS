<script setup>
import { Head, Link, useForm } from '@inertiajs/vue3';
import {
  GraduationCap,
  Mail,
  Lock,
  User,
  Phone,
  Calendar,
  MapPin,
  BookOpen,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
} from "lucide-vue-next";
import { ref } from 'vue';

const form = useForm({
    name: '',
    institution: '',
    class: '',
    group: '',
    hsc_year: '',
    contact_no: '',
    whatsapp_no: '',
    guardian_no: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const showPassword = ref(false);
const focusedField = ref(null);

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <Head title="Register" />

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
            Begin Your
            <br />
            Learning Journey
          </h2>
          <p class="text-xl text-white/80 mb-12 max-w-md font-onest">
            Join thousands of students mastering their skills and achieving
            excellence in their chosen fields.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-8 max-w-lg">
            <div class="text-center">
              <div class="font-montserrat font-bold text-4xl mb-2">
                15K+
              </div>
              <div class="text-sm text-white/70 font-onest">
                Active Students
              </div>
            </div>
            <div class="text-center">
              <div class="font-montserrat font-bold text-4xl mb-2">
                200+
              </div>
              <div class="text-sm text-white/70 font-onest">Courses</div>
            </div>
            <div class="text-center">
              <div class="font-montserrat font-bold text-4xl mb-2">98%</div>
              <div class="text-sm text-white/70 font-onest">
                Success Rate
              </div>
            </div>
          </div>

          <!-- Floating Cards Animation -->
          <div class="absolute bottom-12 right-12 space-y-4">
            <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-4 transform hover:scale-105 transition-transform duration-300 border border-white/20">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#34D399] rounded-full flex items-center justify-center">
                  <Sparkles :size="20" class="text-white" />
                </div>
                <div>
                  <div class="font-semibold text-sm">New Achievement!</div>
                  <div class="text-xs text-white/70">Top 10% Students</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Registration Form -->
      <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F8FAFC] dark:bg-[#0D1117]">
        <div class="w-full max-w-md h-full overflow-y-auto">
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
              Create Account
            </h2>
            <p class="text-[#64748B] dark:text-[#9CA3AF] font-onest">
              Fill in your details to get started
            </p>
          </div>

          <!-- Form -->
          <form @submit.prevent="submit" class="space-y-5">
            <!-- Full Name -->
            <div class="relative">
              <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                Full Name
              </label>
              <div
                class="relative transition-all duration-200"
                :class="{ 'transform scale-[1.01]': focusedField === 'name' }"
              >
                <User
                  :size="20"
                  class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
                  :class="focusedField === 'name' ? 'text-[#0066FF]' : 'text-[#94A3B8] dark:text-[#6B7280]'"
                />
                <input
                  type="text"
                  v-model="form.name"
                  @focus="focusedField = 'name'"
                  @blur="focusedField = null"
                  class="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <p v-if="form.errors.name" class="mt-1 text-sm text-red-600">{{ form.errors.name }}</p>
            </div>

            <!-- Email -->
            <div class="relative">
              <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                Email Address
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
                  type="email"
                  v-model="form.email"
                  @focus="focusedField = 'email'"
                  @blur="focusedField = null"
                  class="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <p v-if="form.errors.email" class="mt-1 text-sm text-red-600">{{ form.errors.email }}</p>
            </div>

            <!-- Institution -->
            <div class="relative">
              <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                Institution
              </label>
              <div
                class="relative transition-all duration-200"
                :class="{ 'transform scale-[1.01]': focusedField === 'institution' }"
              >
                <input
                  type="text"
                  v-model="form.institution"
                  @focus="focusedField = 'institution'"
                  @blur="focusedField = null"
                  class="w-full px-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                  placeholder="College Name"
                  required
                />
              </div>
              <p v-if="form.errors.institution" class="mt-1 text-sm text-red-600">{{ form.errors.institution }}</p>
            </div>

            <!-- Class & Group Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div class="relative">
                    <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                        Class
                    </label>
                    <div class="relative transition-all duration-200" :class="{ 'transform scale-[1.01]': focusedField === 'class' }">
                        <input
                            type="text"
                            v-model="form.class"
                            @focus="focusedField = 'class'"
                            @blur="focusedField = null"
                            class="w-full px-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                            placeholder="e.g. 11"
                            required
                        />
                    </div>
                    <p v-if="form.errors.class" class="mt-1 text-sm text-red-600">{{ form.errors.class }}</p>
                </div>

                <div class="relative">
                    <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                        Group
                    </label>
                    <div class="relative transition-all duration-200" :class="{ 'transform scale-[1.01]': focusedField === 'group' }">
                        <select
                            v-model="form.group"
                            @focus="focusedField = 'group'"
                            @blur="focusedField = null"
                            class="w-full px-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white font-onest appearance-none cursor-pointer"
                            required
                        >
                            <option value="" disabled>Select Group</option>
                            <option value="Science">Science</option>
                            <option value="Business">Business</option>
                            <option value="Humanities">Humanities</option>
                        </select>
                    </div>
                    <p v-if="form.errors.group" class="mt-1 text-sm text-red-600">{{ form.errors.group }}</p>
                </div>
            </div>

            <!-- HSC Year -->
            <div class="relative">
              <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                HSC Year
              </label>
              <div
                class="relative transition-all duration-200"
                :class="{ 'transform scale-[1.01]': focusedField === 'hsc_year' }"
              >
                <input
                  type="text"
                  v-model="form.hsc_year"
                  @focus="focusedField = 'hsc_year'"
                  @blur="focusedField = null"
                  class="w-full px-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                  placeholder="e.g. 2025"
                  required
                />
              </div>
              <p v-if="form.errors.hsc_year" class="mt-1 text-sm text-red-600">{{ form.errors.hsc_year }}</p>
            </div>

            <!-- Contact Numbers -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div class="relative">
                    <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                        Contact No.
                    </label>
                    <div class="relative transition-all duration-200" :class="{ 'transform scale-[1.01]': focusedField === 'contact_no' }">
                        <Phone :size="20" class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors" :class="focusedField === 'contact_no' ? 'text-[#0066FF]' : 'text-[#94A3B8] dark:text-[#6B7280]'" />
                        <input
                            type="text"
                            v-model="form.contact_no"
                            @focus="focusedField = 'contact_no'"
                            @blur="focusedField = null"
                            class="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                            required
                        />
                    </div>
                    <p v-if="form.errors.contact_no" class="mt-1 text-sm text-red-600">{{ form.errors.contact_no }}</p>
                </div>

                <div class="relative">
                    <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                        WhatsApp No.
                    </label>
                    <div class="relative transition-all duration-200" :class="{ 'transform scale-[1.01]': focusedField === 'whatsapp_no' }">
                        <input
                            type="text"
                            v-model="form.whatsapp_no"
                            @focus="focusedField = 'whatsapp_no'"
                            @blur="focusedField = null"
                            class="w-full px-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                            required
                        />
                    </div>
                    <p v-if="form.errors.whatsapp_no" class="mt-1 text-sm text-red-600">{{ form.errors.whatsapp_no }}</p>
                </div>
            </div>

            <!-- Guardian No -->
            <div class="relative">
              <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                Guardian No.
              </label>
              <div
                class="relative transition-all duration-200"
                :class="{ 'transform scale-[1.01]': focusedField === 'guardian_no' }"
              >
                <input
                  type="text"
                  v-model="form.guardian_no"
                  @focus="focusedField = 'guardian_no'"
                  @blur="focusedField = null"
                  class="w-full px-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                  required
                />
              </div>
              <p v-if="form.errors.guardian_no" class="mt-1 text-sm text-red-600">{{ form.errors.guardian_no }}</p>
            </div>

            <!-- Password & Confirm Password - Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <!-- Password -->
              <div class="relative">
                <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                  Password
                </label>
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

              <!-- Confirm Password -->
              <div class="relative">
                <label class="block text-sm font-semibold text-[#334155] dark:text-[#E5E7EB] mb-2 font-onest">
                  Confirm
                </label>
                <div
                  class="relative transition-all duration-200"
                  :class="{ 'transform scale-[1.01]': focusedField === 'password_confirmation' }"
                >
                  <Lock
                    :size="20"
                    class="absolute left-4 top-1/2 -translate-y-1/2 transition-colors"
                    :class="focusedField === 'password_confirmation' ? 'text-[#0066FF]' : 'text-[#94A3B8] dark:text-[#6B7280]'"
                  />
                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="form.password_confirmation"
                    @focus="focusedField = 'password_confirmation'"
                    @blur="focusedField = null"
                    class="w-full pl-12 pr-4 py-3.5 border-2 border-[#E2E8F0] dark:border-[#374151] rounded-xl focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 outline-none transition-all bg-white dark:bg-[#1F2937] text-[#0A1929] dark:text-white placeholder-[#94A3B8] dark:placeholder-[#6B7280] font-onest"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <p v-if="form.errors.password_confirmation" class="mt-1 text-sm text-red-600">{{ form.errors.password_confirmation }}</p>
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="form.processing"
              class="w-full bg-gradient-to-r from-[#0066FF] to-[#0052CC] hover:from-[#0052CC] hover:to-[#0047B3] text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg shadow-[#0066FF]/30 hover:shadow-xl hover:shadow-[#0066FF]/40 transform hover:scale-[1.02] active:scale-[0.98] font-onest group disabled:opacity-75"
            >
              <span>Create My Account</span>
              <ArrowRight
                :size="20"
                class="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </form>

          <!-- Sign In Link -->
          <div class="mt-6 text-center">
            <p class="text-sm text-[#64748B] dark:text-[#9CA3AF] font-onest">
              Already have an account?
              <Link :href="route('login')" class="text-[#0066FF] hover:underline cursor-pointer font-semibold">
                Sign In
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

<template>
  <div class="min-h-screen bg-background-900 text-white">
    <div class="flex h-screen items-center justify-center">
      <div class="text-center">
        <h1 class="mb-4 text-6xl font-bold">Welcome to</h1>
        <h1 class="mb-4 text-6xl font-bold">HUST COURSES MANAGER</h1>
        <p class="text-xl">
          Register for your courses online, anytime, anywhere.
        </p>
        <button
          @click="
            role
              ? role === 'Teacher'
                ? navigateTo('/AddClass')
                : navigateTo('/ClassRegistration')
              : navigateTo('/login')
          "
          class="mt-6 rounded bg-white px-8 py-4 font-bold text-text-950"
        >
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const role = useCookie("role");
</script>

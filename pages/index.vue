<template>
  <div class="min-h-screen bg-background-900">
    <div class="flex h-screen items-center justify-center">
      <h1 class="text-9xl font-bold">hello,</h1>
    </div>
  </div>
</template>
<script setup>
import { useStorage } from "@vueuse/core";
const user = useStorage("user", null);
</script>

<template>
  <div>
    <div class="flex items-center justify-center">
      <UButton @click="submit" class="mt-10 flex items-center justify-center"
        >Log in</UButton
      >
    </div>
    <div class="flex items-center justify-center">
      <UButton @click="logout" class="mt-10 flex items-center justify-center"
        >Log out</UButton
      >
    </div>
    <div>{{ outside }}</div>
    <div v-if="!outside">outside doesnt exits</div>
  </div>
</template>

<script setup>
const email = ref("hungletatdac1234@gmail.com");
const password = ref("hung1234");

const outside = ref();

async function submit() {
  const res = await $fetch("/api/login", {
    method: "post",
    body: { email: email.value, password: password.value },
  });

  outside.value = res;
}
async function logout() {
  const res = await $fetch("/api/logout", {
    method: "post",
  });

  outside.value = res;
}
</script>

<template>
  <div>
    <div class="flex items-center justify-center">
      <UButton @click="submit" class="mt-10 flex items-center justify-center"
        >Test button</UButton
      >
    </div>
    <div>{{ outside }}</div>
    <div v-if="!outside">outside doesnt exits</div>
  </div>
</template>

<script setup>
const email = ref("hungletatdac1234@gmail.com");
const password = ref("99888");
const outside = ref();

async function submit() {
  const res = await $fetch("/api/login", {
    method: "post",
    body: { email: email.value, password: password.value },
  });
  console.log(res);
}
</script>

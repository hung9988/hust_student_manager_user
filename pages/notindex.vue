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
const email = ref("hungletatdac123456@gmail.com");
const password = ref("080504");

const outside = ref();

async function submit() {
  console.log(password.value);
  const res = await $fetch("/api/signup", {
    method: "post",
    body: { email: email.value, password: password.value },
  });

  outside.value = res;
}
</script>

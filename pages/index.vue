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
    <div v-if="session">
      LOGGED IN<UButton @click="getuser">{{ user }}dasdsd</UButton>
    </div>
    <div v-else>NOT LOGGED IN</div>
  </div>
</template>

<script setup lang="ts">
const email = ref("hungletatdac123456@gmail.com");
const password = ref("080504");
const user = ref();
const outside = ref();

const session = useCookie("Session");
async function submit() {
  const res = await $fetch("/api/login", {
    method: "post",
    body: { email: email.value, password: password.value },
  });
  console.log(res[0]);
  session.value = res;
}
async function logout() {
  const res = await $fetch("/api/logout", {
    method: "post",
  });
  session.value = null;
}
async function getuser() {
  const res = await $fetch("/api/user", {
    method: "get",
  });
  user.value = res;
}
</script>

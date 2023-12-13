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
      <div class="flex items-center justify-center">
        <UButton @click="test" class="mt-10 flex items-center justify-center">{{
          testing
        }}</UButton>
      </div>
    </div>
    <div v-if="currentUser">
      LOGGED IN<UButton class="flex items-center justify-center"
        >get current user
      </UButton>
      <div v-if="currentUser">{{ currentUser }}</div>
    </div>
    <div v-else>NOT LOGGED IN</div>
  </div>
</template>

<script setup lang="ts">
const email = ref("hungletatdac123456@gmail.com");
const password = ref("080504");
const currentUser = ref();

onMounted(() => {
  currentUser.value = localStorage.getItem("authToke");
});
async function submit() {
  const res = await useFetch("/api/login", {
    method: "post",
    body: { email: email.value, password: password.value },
  });
  currentUser.value = res.data.value;
  if (process.client) {
    localStorage.setItem("authToke", JSON.stringify(res.data.value));
  }
}
async function logout() {
  const res = await useFetch("/api/logout", { method: "post" });
  const { data } = await useFetch("/api/user");
  currentUser.value = undefined;
  localStorage.removeItem("authToke");
}
const testing = ref();
async function test() {
  const { data } = await useFetch("/api/user");
  testing.value = data.value;
}
</script>

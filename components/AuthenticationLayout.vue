<template>
  <div class="fixed top-0 w-full bg-background-400">
    <nav class="grid grid-cols-6 border-b border-gray-500 py-2">
      <div
        class="col-span-1 ml-5 flex items-center justify-start text-3xl font-semibold"
      >
        <UButton @click="test">test</UButton>
      </div>
      <div class="col-span-3"></div>
      <div class="col-span-2 mr-2 space-y-2">
        <div v-if="!user" class="col-span-1">
          <div class="md:flex md:justify-end">
            <ULink
              to="/login"
              class="flex items-center justify-center rounded-md border bg-accent-500 p-1 md:w-1/3"
              >Log in</ULink
            >
          </div>
        </div>

        <div v-if="!user" class="col-span-1">
          <div class="md:flex md:justify-end">
            <ULink
              to="/signup"
              class="flex items-center justify-center rounded-md border bg-accent-500 p-1 md:w-1/3"
              >Sign up</ULink
            >
          </div>
        </div>
        <div v-if="user" class="col-span-1">
          <div class="md:flex md:justify-end">
            <ULink
              @click="logout"
              class="flex items-center justify-center rounded-md border bg-accent-500 p-1 md:w-1/3"
              >Logout</ULink
            >
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
async function test() {
  const card = ref([
    { first: "ly", last: "thanh", age: 20 },
    { second: "ly", last: "tnh", age: 30 },
  ]);
  await useFetch("/api/addclasses", {
    method: "post",
    body: { card: card.value },
  });
}
import { ref, watch } from "vue";
const user = useUser();
async function logout() {
  await useFetch("/api/logout", { method: "post" });
  localStorage.removeItem("user");

  user.value = "";
}
const items = [
  [
    {
      label: "Profile",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      shortcuts: ["E"],
      click: () => {
        console.log("Edit");
      },
    },
    {
      label: "Duplicate",
      icon: "i-heroicons-document-duplicate-20-solid",
      shortcuts: ["D"],
      disabled: true,
    },
  ],
  [
    {
      label: "Archive",
      icon: "i-heroicons-archive-box-20-solid",
    },
    {
      label: "Move",
      icon: "i-heroicons-arrow-right-circle-20-solid",
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      shortcuts: ["⌘", "D"],
    },
  ],
];
</script>

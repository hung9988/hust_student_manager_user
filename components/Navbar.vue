<template>
  <div class="sticky top-0 z-50 w-full bg-background-400">
    <nav
      class="flex items-center justify-between bg-background-500 p-6 text-white"
    >
      <div>
        <h1 class="text-2xl font-bold">HUST MANAGER</h1>
      </div>
      <div>
        <button
          @click="showModal = true"
          class="rounded bg-white px-4 py-2 font-bold text-text-950"
        >
          Menu
        </button>
      </div>
    </nav>
    <USlideover v-model="showModal">
      <div class="p-6">
        <div class="mb-6 flex items-center justify-between">
          <NuxtLink to="/"><h1 class="text-4xl font-bold">Home</h1> </NuxtLink>
          <UButton
            icon="i-heroicons-x-mark"
            color="gray"
            square
            variant="solid"
            @click="showModal = false"
          >
          </UButton>
        </div>
        <UDivider
          :ui="{
            border: {
              base: 'dark:border-gray-600',
              size: { horizontal: 'border-t-4' },
            },
          }"
        ></UDivider>

        <div v-if="!session">
          <UButton
            color="gray"
            square
            variant="ghost"
            @click="
              navigateTo('/login');
              showModal = false;
            "
            ><div class="text-xl font-bold">Login</div>
          </UButton>
        </div>
        <div v-if="!session">
          <UButton
            color="gray"
            square
            variant="ghost"
            @click="
              navigateTo('/signup');
              showModal = false;
            "
            ><div class="text-xl font-bold">Sign Up</div>
          </UButton>
        </div>
        <ul
          v-if="session"
          class="font-lexend mt-12 space-y-4 text-2xl font-thin"
        >
          <div v-if="role == 'teacher'">
            <li v-for="link in linkTeacher" :key="linkTeacher.label">
              <NuxtLink
                :to="link.to"
                class="mb-10 flex items-center gap-3"
                @click="showModal = false"
              >
                <div class="text-xl font-medium">{{ link.label }}</div>
              </NuxtLink>
            </li>
          </div>
          <div v-if="role == 'student'">
            <li v-for="link in linkStudent" :key="linkStudent.label">
              <NuxtLink
                :to="link.to"
                class="mb-10 flex items-center gap-3"
                @click="showModal = false"
              >
                <div class="text-xl font-medium">{{ link.label }}</div>
              </NuxtLink>
            </li>
          </div>
        </ul>
      </div>
      <div
        v-if="session"
        @click="logOut()"
        class="mx-10 flex items-end justify-center rounded-md border py-2 hover:cursor-pointer hover:bg-background-500"
      >
        <div class="text-xl font-bold">Logout</div>
      </div>
    </USlideover>
  </div>
</template>

<script setup>
import { ref } from "vue";
const session = useCookie("session");
const role = useCookie("role");
const showModal = ref(false);
const linkTeacher = ref([
  { label: "Create Classes", to: "/AddClass" },
  { label: "Delete Classes", to: "/DeleteClass" },
]);
const linkStudent = ref([
  { label: "Register Classes", to: "/ClassRegistration" },
  { label: "Unregister Classes", to: "/UnregisterClass" },
]);

async function logOut() {
  const { data } = await useFetch("/api/Auth/logout", {
    method: "post",
  });

  localStorage.removeItem("user");
  role.value = "";
  session.value = "";
  showModal.value = false;
  navigateTo("/login");
}
</script>

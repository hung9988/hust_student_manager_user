<template>
  <div class="min-h-screen bg-background-900">
    <div class="flex min-h-screen items-center justify-center">
      <UCard
        class="mx-6 w-full max-w-lg space-y-12 border border-slate-500 pt-8"
      >
        <UForm
          :schema="schema"
          :state="state"
          @submit="submit"
          class="space-y-4"
        >
          <UFormGroup
            label="Email"
            name="email"
            size="xl"
            :ui="{ label: { base: 'font-bold' } }"
          >
            <UInput
              v-model="state.email"
              placeholder="you@example.com"
              icon="i-heroicons-envelope"
            />
          </UFormGroup>
          <UFormGroup
            :ui="{ label: { base: 'font-bold' } }"
            label="Password"
            name="password"
            size="xl"
          >
            <UInput v-model="state.password" type="password" />
          </UFormGroup>

          <div class="flex justify-center pt-3">
            <UButton
              :ui="{ font: 'font-bold' }"
              size="md"
              block
              color="primary"
              :loading="pending"
              class="my-4 w-1/2"
              type="submit"
              >Sign in</UButton
            >
          </div>
        </UForm>
        <UDivider label="OR" color="gray" />
        <div class="pt-2">
          <div class="flex justify-center">Don't have an accout yet ?</div>
          <div class="flex justify-center">
            <ULink to="/signup" class="rounded-md underline">Sign up</ULink>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui/dist/runtime/types";
const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Must be at least 4 characters"),
});
type Schema = z.output<typeof schema>;
const pending = ref(false);
const state = ref({
  email: "",
  password: "",
});

const session = useCookie("session");
const role = useCookie("role");
const user_id = useCookie("user_id");
async function submit(event: FormSubmitEvent<Schema>) {
  pending.value = true;
  const res = await useFetch("/api/Auth/login", {
    method: "post",
    body: { email: event.data.email, password: event.data.password },
  });

  console.log(res.data.value);

  if (res.data.value) {
    pending.value = false;
    if (process.client) {
      localStorage.setItem("user", JSON.stringify(res.data.value.user_info));
      session.value = res.data.value.session;
      role.value = res.data.value.user_info.basic_info.role;
      user_id.value = res.data.value.user_info.basic_info.user_id;
    }

    if (res.data.value.user_info.basic_info.role === "student") {
      navigateTo("/ClassRegistration");
    } else if (res.data.value.user_info.basic_info.role === "teacher") {
      navigateTo("/AddClass");
    } else if (res.data.value.user_info.basic_info.role === "enterprise") {
      navigateTo("/CreateScholarship");
    }
  }
}
</script>

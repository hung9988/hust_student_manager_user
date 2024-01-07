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
            :ui="{ label: { base: 'font-bold' } }"
            label="Email"
            name="email"
            size="xl"
          >
            <UInput
              v-model="state.email"
              placeholder="you@example.com"
              icon="i-heroicons-envelope"
            />
          </UFormGroup>
          <div class="flex flex-row gap-4">
            <UFormGroup
              :ui="{ label: { base: 'font-bold' } }"
              class="basis-1/2"
              label="Password"
              name="password"
              size="xl"
            >
              <UInput v-model="state.password" type="password" />
            </UFormGroup>
            <UFormGroup
              :ui="{ label: { base: 'font-bold' } }"
              class="basis-1/2"
              label="Confirm Password"
              name="passwordConfirm"
              size="xl"
            >
              <UInput v-model="state.passwordConfirm" type="password" />
            </UFormGroup>
          </div>
          <UFormGroup
            :ui="{ label: { base: 'font-bold' } }"
            label="Choose your role"
            size="xl"
          >
            <USelect v-model="state.role" :options="roles" />
          </UFormGroup>
          <div class="space-y-4" v-if="state.role == 'student'">
            <div class="flex flex-row gap-4">
              <UFormGroup
                :ui="{ label: { base: 'font-bold' } }"
                class="basis-1/2"
                label="First name"
                name="first_name"
                size="xl"
              >
                <UInput v-model="state.first_name" />
              </UFormGroup>
              <UFormGroup
                :ui="{ label: { base: 'font-bold' } }"
                class="basis-1/2"
                label="Last name"
                name="last_name"
                size="xl"
              >
                <UInput v-model="state.last_name" />
              </UFormGroup>
            </div>
            <UFormGroup
              class="basis-full"
              label="Date Of Birth"
              name="date_of_birth"
              size="xl"
            >
              <UInput v-model="state.date_of_birth" type="date" />
            </UFormGroup>
            <div class="flex flex-row gap-4">
              <UFormGroup
                :ui="{ label: { base: 'font-bold' } }"
                class="basis-1/2"
                label="Program"
                name="program"
                size="xl"
              >
                <USelect v-model="state.program_id" :options="programs" />
              </UFormGroup>
              <UFormGroup
                :ui="{ label: { base: 'font-bold' } }"
                class="basis-1/2"
                label="Enrolled year"
                name="enrolled_year"
                size="xl"
              >
                <USelect
                  v-model="state.enrolled_year"
                  :options="enrolled_years"
                />
              </UFormGroup>
            </div>
          </div>
          <div v-if="state.role == 'enterprise'">
            <div class="flex flex-row gap-4">
              <UFormGroup
                :ui="{ label: { base: 'font-bold' } }"
                class="basis-1/2"
                label="Enterprise name"
                name="nterprise_name"
                size="xl"
              >
                <UInput v-model="state.enteprise_name" />
              </UFormGroup>
              <UFormGroup
                :ui="{ label: { base: 'font-bold' } }"
                class="basis-1/2"
                label="Contact"
                name="contact"
                size="xl"
              >
                <UInput v-model="state.contact" />
              </UFormGroup>
            </div>
          </div>

          <div class="flex justify-center pt-3">
            <UButton
              :ui="{ font: 'font-bold' }"
              size="md"
              block
              color="primary"
              :loading="pending"
              type="submit"
              class="my-4 w-1/2"
              >Sign up</UButton
            >
          </div>
        </UForm>
      </UCard>
    </div>
  </div>
</template>
<script setup>
import { isJSDocOptionalType } from "typescript";

const enrolled_years = ref([2023, 2022, 2021, 2020, 2019, 2018, 2017]);
const pending = ref(false);
const roles = ref([
  { label: "Student", value: "student" },
  { label: "Enterprise", value: "enterprise" },
]);
const state = ref({ email: undefined, password: undefined, role: undefined });
const { data } = useFetch("/api/GetPrograms", { method: "POST" });
const programs = ref(data.value);
if (programs.value) {
  programs.value = programs.value.map((program) => {
    return { label: program.program_name, value: program.program_id };
  });
}
async function submit() {
  const { data } = await useFetch("/api/Auth/signup", {
    method: "POST",
    body: JSON.stringify(state.value),
  });
  if (data) {
    navigateTo("/login");
  }
}
</script>

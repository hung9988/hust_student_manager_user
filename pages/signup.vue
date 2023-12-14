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
const pending = ref(false);
const state = ref({ email: undefined, password: undefined });
async function submit() {}
</script>

<script setup lang="ts">
import { z } from "zod";

const { selected } = useClassTable();

const time_period = ref([
  {
    time_id: 1,
    start_time: "06:45:00",
    end_time: "07:30:00",
  },
  {
    time_id: 2,
    start_time: "07:40:00",
    end_time: "08:25:00",
  },
  {
    time_id: 3,
    start_time: "08:35:00",
    end_time: "09:20:00",
  },
  {
    time_id: 4,
    start_time: "09:30:00",
    end_time: "10:15:00",
  },
  {
    time_id: 5,
    start_time: "10:25:00",
    end_time: "11:00:00",
  },
  {
    time_id: 6,
    start_time: "11:10:00",
    end_time: "11:55:00",
  },
  {
    time_id: 7,
    start_time: "12:30:00",
    end_time: "13:15:00",
  },
  {
    time_id: 8,
    start_time: "13:25:00",
    end_time: "14:00:00",
  },
  {
    time_id: 9,
    start_time: "14:10:00",
    end_time: "14:55:00",
  },
  {
    time_id: 10,
    start_time: "15:05:00",
    end_time: "15:50:00",
  },
  {
    time_id: 11,
    start_time: "16:00:00",
    end_time: "16:45:00",
  },
  {
    time_id: 12,
    start_time: "16:55:00",
    end_time: "17:40:00",
  },
]);
const day_of_week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const user_id = useCookie("user_id");
async function handleVerify() {
  const res = await useFetch("/api/Teacher/AddClasses", {
    method: "POST",
    body: {
      user_id: user_id.value,
      data: selected.value,
    },
  });
  if (res) console.log(res);
  selected.value = [];
  navigateTo("/AddClass");
}
</script>

<template>
  <div
    v-for="subject in selected"
    class="container mx-auto mt-10 space-y-12 border py-6"
  >
    <div class="flex justify-center">Subject: {{ subject.subject_id }}</div>

    <div class="flex justify-center">
      <div class="space-y-6">
        <div class="flex items-center justify-center">
          <UFormGroup label="Capacity">
            <UInput v-model="subject.capacity" placeholder="input a number" />
          </UFormGroup>
        </div>
        <div class="flex flex-row items-center justify-center gap-6">
          <UFormGroup class="basis-1/2" label="Day of week">
            <USelect
              v-model="subject.day_of_week"
              :options="day_of_week"
              option-attribute="day_of_week"
            ></USelect>
          </UFormGroup>
          <UFormGroup class="basis-1/2" label="Location">
            <UInput
              v-model="subject.location"
              placeholder="D5-305,D9-304,..."
            />
          </UFormGroup>
        </div>
        <div class="flex flex-row items-center justify-center gap-6">
          <UFormGroup class="basis-1/2" label="Start time">
            <USelect
              v-model="subject.start_time"
              :options="time_period"
              option-attribute="start_time"
            ></USelect>
          </UFormGroup>
          <UFormGroup class="basis-1/2" label="End time">
            <USelect
              v-model="subject.end_time"
              :options="time_period"
              option-attribute="end_time"
            ></USelect>
          </UFormGroup>
        </div>
      </div>
    </div>
  </div>
  <div v-if="selected.length !== 0" class="my-16 flex justify-center">
    <UButton
      :ui="{ font: 'font-bold' }"
      class="flex w-1/6 items-center justify-center py-2"
      @click="handleVerify()"
    >
      Submit
    </UButton>
  </div>
</template>

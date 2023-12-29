<script setup>
import { useStorage } from "@vueuse/core";
const page = ref(1);
const pageCount = ref(8);
const count = ref(1);
const query = ref("");
const columns = [
  {
    key: "subject_id",
    label: "ID",
  },
  {
    key: "subject_name",
    label: "Name",
  },

  {
    key: "credit",

    label: "credits",
    sortable: true,
  },
  {
    key: "credit_tuition",
    label: " Tín chỉ Học phí",
    sortable: true,
  },
  {
    key: "weight",
    label: "Trọng số",

    sortable: true,
  },
];
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
const { data } = await useFetch("/api/GetSubjects", {
  method: "post",
  body: {
    query: query.value,
    page: page.value,
    pageCount: pageCount.value,
  },
});
const subjects = ref();
subjects.value = data.value?.subjects;
const selected = ref([]);
function select(row) {
  const index = selected.value.findIndex(
    (item) => item.subject_id === row.subject_id,
  );
  if (index === -1) {
    selected.value.push(row);
    console.log(selected.value);
  } else {
    selected.value.splice(index, 1);
  }
}
const isOpen = ref(false);
const filteredRows = computed(() => {
  if (!query.value) {
    return subjects.value;
  }

  return subjects.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(query.value.toLowerCase());
    });
  });
});
const temp = useStorage("user", null);
const user = ref(JSON.parse(temp.value));
if (user.value) {
  console.log(user.value.basic_info.user_id);
}

async function send_classes() {
  console.log(selected.value);
}
</script>
<template>
  <div>
    <UModal
      :ui="{ container: 'items-center' }"
      class="flex items-center justify-center"
      v-model="isOpen"
    >
      <div v-if="selected.length !== 0">
        <div class="my-4 flex justify-center border-b pb-4 text-2xl">
          Information
        </div>
        <div v-for="items in selected" class="mt-5 space-y-10 px-8">
          <div class="flex grow items-center justify-center text-2xl">
            Subject: {{ items.subject_id }}
          </div>

          <div>
            <div class="mb-2 flex justify-center font-medium">
              Number of classes
            </div>
            <div class="flex items-center justify-center">
              <UInput v-model="items.class_number" size="xl"></UInput>
            </div>
          </div>

          <div v-for="classes in 2">
            <div>
              <div class="mb-2 flex justify-center font-medium">Capacity</div>
              <div class="flex items-center justify-center">
                <UInput v-model="items.capacity[classes]" size="xl"></UInput>
              </div>
            </div>
            <div class="flex flex-row gap-4">
              <UFormGroup
                class="basis-1/2"
                label="location"
                :name="items.subject_id"
                size="xl"
              >
                <UInput v-model="items.location"></UInput>
              </UFormGroup>
              <UFormGroup class="basis-1/2" label="Day of the week" size="xl">
                <USelect v-model="items.day_of_week" :options="day_of_week" />
              </UFormGroup>
            </div>
            <div class="flex flex-row gap-4">
              <UFormGroup class="basis-1/2" label="start time" size="xl">
                <USelect
                  v-model="items.start_time"
                  :options="time_period"
                  option-attribute="start_time"
                />
              </UFormGroup>
              <UFormGroup class="basis-1/2" label="end time" size="xl">
                <USelect
                  v-model="items.end_time"
                  :options="time_period"
                  option-attribute="end_time"
                />
              </UFormGroup>
            </div>
          </div>
          <UDivider
            :ui="{
              border: {
                base: 'border-white-200 dark:border-white-800',
                size: { horizontal: 'border' },
              },
            }"
          ></UDivider>
        </div>

        <div class="m-4 flex justify-center">
          <UButton
            size="sm"
            block
            color="primary"
            :loading="pending"
            @click="send_classes()"
            class="my-4"
            >Create
          </UButton>
        </div>
      </div>
      <div v-else class="m-10 flex items-center justify-center">
        You havent choosen any subject!
      </div>
    </UModal>
  </div>
  <div class="min-h-screen bg-background-900">
    <div class="space-y-10 py-[10vh]">
      <div class="flex justify-center">
        <div class="mb-10 text-4xl font-semibold">CLASS CREATION</div>
      </div>
      <div class="">
        <div class="flex items-center justify-center">
          <UInput
            class="w-1/2"
            size="xl"
            v-model="query"
            placeholder="Search"
            icon="i-heroicons-search"
          />
        </div>
      </div>
      <UTable
        v-model="selected"
        class="mx-10"
        :columns="columns"
        :rows="filteredRows"
        @select="select"
      />
      <div class="grid grid-cols-2">
        <div class="col-span-1">
          <UPagination
            class="grid-col mx-10"
            v-if="count"
            v-model="page"
            :page-count="pageCount"
            :total="count"
          />
        </div>
        <div class="col-span-1 flex justify-end">
          <UButton
            :ui="{ font: 'font-bold' }"
            class="mr-10 flex w-1/3 items-center justify-center"
            @click="isOpen = true"
            >Proceed</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

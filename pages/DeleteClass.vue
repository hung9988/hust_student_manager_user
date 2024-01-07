<script setup>
import { useStorage } from "@vueuse/core";
import { refDebounced } from "@vueuse/core";
const page = ref(1);
const pageCount = ref(8);

const query = ref("");
const debounced = refDebounced(query, 150);
const columns = [
  {
    key: "class_id",
    label: "Class ID",
  },
  {
    key: "subject_id",
    label: "Subject",
  },
  {
    key: "day_of_week",
    label: "Day of week",
  },
  {
    key: "location",
    label: "location",
  },
  {
    key: "start_time",
    label: "Start time",
  },
  {
    key: "end_time",
    label: "End time",
  },
];

const selected = ref([]);
function select(row) {
  const index = selected.value.findIndex(
    (item) => item.class_id === row.class_id,
  );
  if (index === -1) {
    selected.value.push(row);
    console.log(selected.value);
  } else {
    selected.value.splice(index, 1);
  }
}
const user_id = useCookie("user_id");

const { data: classes, refresh } = await useFetch(
  "/api/Teacher/GetClassesTeacher",
  {
    method: "POST",
    body: {
      query: debounced,
      page: page,
      pageCount: pageCount,
    },
  },
);

async function handle_unregister() {
  selected.value = selected.value.map((item) => item.class_id);
  console.log(selected.value);
  const res = await useFetch("/api/Teacher/DeleteClasses", {
    method: "POST",
    body: {
      user_id: user_id.value,
      data: selected.value,
    },
  });
  if (res) console.log(res);
  selected.value = [];
  refresh();
}
</script>
<template>
  <div class="min-h-screen bg-background-900">
    <div class="space-y-10 py-[10vh]">
      <div class="flex justify-center">
        <div class="mb-10 text-4xl font-semibold">Delete Classes</div>
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
        :rows="classes.classes"
        @select="select"
      />
      <div class="grid grid-cols-2">
        <div class="col-span-1">
          <UPagination
            class="grid-col mx-10"
            v-if="classes.totalrows"
            v-model="page"
            :page-count="pageCount"
            :total="Number(classes.totalrows[0].count)"
          />
        </div>
        <div class="col-span-1 flex justify-end">
          <UButton
            :ui="{ font: 'font-bold' }"
            class="mr-10 flex w-1/3 items-center justify-center"
            @click="handle_unregister"
            >Unregister</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

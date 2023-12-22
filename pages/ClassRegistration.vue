<script setup>
import { useStorage } from "@vueuse/core";
const page = ref(1);
const pageCount = ref(8);
const count = ref(1);
const query = ref("");
const columns = [
  {
    key: "class_id",
    label: "ID",
  },
  {
    key: "subject_id",
    label: "Subject",
  },

  {
    key: "last_name",

    label: "Teacher",
  },
  {
    key: "start_time",
    label: "Start time",
  },
  {
    key: "end_time",
    label: "End time",
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
    key: "enrolled",
    label: "Capacity",
  },
];

const { data: classes, refresh: refreshget } = await useFetch(
  "/api/Student/GetClasses",
  {
    method: "post",
    body: { query: query.value, page: page.value, pageCount: pageCount.value },
  },
);

console.log(classes.value.classes);

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
    return classes.value.classes;
  }

  return classes.value.classes.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(query.value.toLowerCase());
    });
  });
});

const user = useStorage("user", null);
async function delete_classes() {
  const { data } = await useFetch("/api/Teacher/DeleteClasses", {
    method: "post",
    body: {
      user_id: JSON.parse(user.value).user_id,
      data: selected.value,
    },
  });
  selected.value = [];
  refreshget();
}
</script>
<template>
  <div class="min-h-screen bg-background-900">
    <div class="space-y-10 py-[10vh]">
      <div class="flex justify-center">
        <div class="mb-10 text-4xl font-semibold">CLASS REGISTRATION</div>
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
            @click="delete_classes()"
            >Register</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

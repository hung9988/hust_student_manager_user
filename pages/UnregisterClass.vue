<script setup>
import { useStorage } from "@vueuse/core";
const page = ref(1);
const pageCount = ref(8);
const count = ref(1);
const query = ref("");
const user = useStorage("user", null);
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
const semester = ref("20232");

const { data: classes, refresh: refreshget } = await useFetch(
  "/api/Student/GetPersonalClasses",
  {
    method: "post",
    body: {
      semester: semester,
      student_id: JSON.parse(user.value).basic_info.user_id,
    },
  },
);

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
const isOpen = ref(false);

async function unregister_classes() {
  const { data } = await useFetch("/api/Student/UnregisterClasses", {
    method: "post",
    body: {
      student_id: JSON.parse(user.value).basic_info.user_id,
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
        <div class="mb-10 text-4xl font-semibold">UNREGISTER CLASSES</div>
      </div>
      <div v-if="user" class="">
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
        v-if="user"
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
            @click="unregister_classes"
            >Unregister</UButton
          >
        </div>
      </div>
    </div>
  </div>
</template>

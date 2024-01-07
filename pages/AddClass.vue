<script setup lang="ts">
import { refDebounced } from "@vueuse/core";

const { selected } = useClassTable();

const page = ref(1);
const pageCount = ref(8);
const ModalOpen = ref(false);
const query = ref("");
const debounced = refDebounced(query, 150);

const { data: subjects } = await useFetch("/api/GetSubjects", {
  method: "POST",
  body: {
    query: debounced,
    page: page,
    pageCount: pageCount,
  },
});

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
    key: "weight",
    label: "Trọng số",

    sortable: true,
  },
];

function select(row: any) {
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
</script>

<template>
  <div v-if="subjects" class="min-h-screen bg-background-900">
    <div class="space-y-10 py-[5vh]">
      <div class="flex justify-center">
        <div class="mb-10 text-4xl font-semibold">Create Classes</div>
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
        :rows="subjects.subjects"
        @select="select"
      />
      <div class="grid grid-cols-2">
        <div class="col-span-1">
          <UPagination
            class="grid-col mx-10"
            v-if="subjects.totalrows"
            v-model="page"
            :page-count="pageCount"
            :total="Number(subjects.totalrows[0].count)"
          />
        </div>
        <div class="col-span-1 flex justify-end">
          <UButton
            :ui="{ font: 'font-bold' }"
            class="mr-10 flex w-1/3 items-center justify-center"
            :disabled="selected.length == 0"
            to="/TimeLocation"
          >
            Proceed
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

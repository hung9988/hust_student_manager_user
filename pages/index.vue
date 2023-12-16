<script setup lang="ts">
const page = ref(1);
const pageCount = ref(6);
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
query.value = "MI";
const { data } = await useFetch("/api/getsubjects", {
  method: "post",
  body: {
    query: query.value,
    page: page.value,
    pageCount: pageCount.value,
  },
});

const subjects = ref();
subjects.value = data.value;
console.log(subjects[0]);
</script>
<template>
  <div class="min-h-screen bg-background-900">
    <Ubutton class="">TEST</Ubutton>
  </div>
</template>

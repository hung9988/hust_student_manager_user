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

const { classes } = await useFetch("/api/GetClasses", {
  method: "post",
  body: {},
});
</script>
<template><div class="min-h-screen bg-background-900"></div></template>

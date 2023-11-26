<template>
  <div>
    <div class="">{{ test }}</div>
  </div>
</template>

<script setup lang="ts">
import db from "./drizzle/db";
import { users } from "./drizzle/schema";
const test = await db.select().from(users);
</script>

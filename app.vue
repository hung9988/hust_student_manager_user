<template>
  <div>
    <div class="">{{ test }}</div>
  </div>
</template>

<script setup lang="ts">
import db from "./drizzle/db";
import { users } from "./drizzle/schema";
import { eq, lt, gte, ne } from "drizzle-orm";
const test = await db
  .selectDistinct()
  .from(users)
  .limit(1)
  .where(eq(users.userId, "1f6b5d42-5186-446c-8143-74ce3aec84b6"));
</script>

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const queryClient = postgres(
  "postgresql://postgres:BMvsgy.s@5Kw3FQ@143.198.80.235:5432/postnuxtDO",
);
const db = drizzle(queryClient);

export default db;

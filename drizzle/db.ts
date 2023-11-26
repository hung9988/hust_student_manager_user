import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const queryClient = postgres(
  "postgresql://postgres:0000@localhost:5432/postnuxt",
);
const db = drizzle(queryClient);

export default db;

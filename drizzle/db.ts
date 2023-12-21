import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";

// Ensure DB_URL is defined and has a value
if (!process.env.DB_URL) {
  throw new Error("DB_URL environment variable is not defined");
}

const queryClient = postgres(process.env.DB_URL);
const db = drizzle(queryClient);

export default db;

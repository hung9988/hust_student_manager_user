import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";

if (!process.env.DB_URL_USER) {
  throw new Error("DB_URL_USER environment variable is not defined");
}
const db_user = drizzle(postgres(process.env.DB_URL_USER));

export { db_user };

import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import "dotenv/config";

// Ensure DB_URL is defined and has a value

if (!process.env.DB_URL_ADMIN) {
  throw new Error("DB_URL environment variable is not defined");
}

const db_admin = drizzle(postgres(process.env.DB_URL_ADMIN));
if (!process.env.DB_URL_TEACHER) {
  throw new Error("DB_URL environment variable is not defined");
}
const db_teacher = drizzle(postgres(process.env.DB_URL_TEACHER));
if (!process.env.DB_URL_STUDENT) {
  throw new Error("DB_URL environment variable is not defined");
}
const db_student = drizzle(postgres(process.env.DB_URL_STUDENT));
if (!process.env.DB_URL_ENTERPRISE) {
  throw new Error("DB_URL environment variable is not defined");
}
const db_enterprise = drizzle(postgres(process.env.DB_URL_ENTERPRISE));

if (!process.env.DB_URL_GUEST) {
  throw new Error("DB_URL environment variable is not defined");
}
const db_guest = drizzle(postgres(process.env.DB_URL_GUEST));
export { db_admin, db_teacher, db_student, db_enterprise, db_guest };

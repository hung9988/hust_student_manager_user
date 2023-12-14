import { pgTable, uuid, varchar, foreignKey } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  userId: uuid("user_id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  email: varchar("email").notNull(),
  phone: varchar("phone"),
  role: varchar("role"),
  encryptedPassword: varchar("encrypted_password").notNull(),
});

export const sessions = pgTable("sessions", {
  sessionId: uuid("session_id")
    .default(sql`uuid_generate_v4()`)
    .primaryKey()
    .notNull(),
  userId: uuid("user_id").references(() => users.userId),
});

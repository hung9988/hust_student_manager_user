import { pgTable, uuid, varchar } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const users = pgTable("users", {
	userId: uuid("user_id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	firstName: varchar("first_name").notNull(),
	lastName: varchar("last_name").notNull(),
	email: varchar("email").notNull(),
	phone: varchar("phone"),
});
import db from "../../drizzle/db";
import { users } from "../../drizzle/schema";
import { eq, lt, gte, ne } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const test = await db.select().from(users).where(eq(users.email, body.email));
  if (test.length !== 0) return { test };
  return undefined;
});

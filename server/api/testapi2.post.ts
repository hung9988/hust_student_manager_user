import { db_student as db } from "../../drizzle/db";
import { teacher, users } from "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
  try {
    const res = await db.execute(
      sql.raw(`SELECT * FROM current_setting('currentUser.role');`),
    );
    return { res };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
});

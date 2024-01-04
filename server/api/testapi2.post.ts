import { db_user as db } from "../../drizzle/db";

import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
  try {
    const res = await db.execute(
      sql.raw(`SELECT * FROM current_setting('myapp.user_id');`),
    );
    return { res };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
});

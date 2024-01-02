import { db_admin as db } from "../../../drizzle/db";
import "../../../drizzle/schema";
import { sql } from "drizzle-orm";

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

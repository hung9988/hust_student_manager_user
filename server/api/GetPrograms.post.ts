import { db_user as db } from "../../drizzle/db";
import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const programs = await db.execute(
    sql.raw(`select program_id,program_name from programs;`),
  );

  return programs;
});

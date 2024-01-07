import { db_user as db } from "../../drizzle/db";
import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  let programs: any[] = await db.execute(
    sql.raw(`select program_id,program_name from programs;`),
  );
  programs = programs.map((program) => {
    return { label: program.program_name, value: program.program_id };
  });
  return { programs };
});

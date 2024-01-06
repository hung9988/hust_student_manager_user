import { db_admin as db } from "../../../drizzle/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const session = event.headers.get("session");
    await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
    const res = await db.execute(
      sql.raw(
        `alter table classes alter column semester set default '${body.semester}';`,
      ),
    );
    return { message: "success" };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
});

import { db_user as db } from "../../drizzle/db";
import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = getCookie(event, "session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  const scholarships = await db.execute(
    sql.raw(
      `select * from scholarships where status='open'  OFFSET ${
        (body.page - 1) * body.pageCount
      } LIMIT ${body.pageCount}`,
    ),
  );

  return { scholarships };
});

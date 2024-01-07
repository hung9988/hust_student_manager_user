import { db_user as db } from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = getCookie(event, "session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  const res = await db.execute(
    sql.raw(
      `select s.email,s.first_name,s.last_name from users as s where user_id in (select student_id from enrollments where class_id=${body.class_id});`,
    ),
  );
  return { res };
});

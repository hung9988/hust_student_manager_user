import { db_user as db } from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = getCookie(event, "session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  const res = await db.execute(
    sql.raw(
      `select * from classes_full where semester='${body.semester}' and class_id in (select class_id from enrollments where student_id=${body.student_id})`,
    ),
  );
  return { res };
});

import { db_admin as db } from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await db.execute(
    sql.raw(
      `select s.email,s.first_name,s.last_name from users as s where user_id in (select student_id from enrollments where class_id=${body.class_id});`,
    ),
  );
  return { res };
});

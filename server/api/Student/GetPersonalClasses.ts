import { db_admin as db } from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await db.execute(
    sql.raw(
      `select * from class_all where class_id in (select class_id from enrollment where student_id='${body.student_id}')`,
    ),
  );
  return { res };
});

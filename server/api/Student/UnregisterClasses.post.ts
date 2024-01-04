import { db_user as db } from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  let value_class_id = "";
  for (const element of body.data) {
    value_class_id += `${element},`;
  }

  value_class_id = value_class_id.slice(0, -1);

  const res = await db.execute(
    sql.raw(
      `delete from enrollments where student_id = '${body.student_id}' AND class_id IN (${value_class_id})  RETURNING *`,
    ),
  );

  return { res };
});

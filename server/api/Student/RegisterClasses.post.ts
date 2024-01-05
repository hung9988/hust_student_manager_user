import { db_user as db } from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = event.headers.get("session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  let values_enrollment = "values";
  for (const element of body.data) {
    values_enrollment += `(${element},'${body.user_id}'),`;
  }
  values_enrollment = values_enrollment.slice(0, -1);
  const res = await db.execute(
    sql.raw(
      `insert into enrollments(class_id,student_id) ${values_enrollment} RETURNING *`,
    ),
  );

  return { res };
});

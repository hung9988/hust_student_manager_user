import db from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let values_enrollment = "values";
  for (const element of body.data) {
    values_enrollment += `(${element.class_id},'${element.user_id}','${element.semester}'),`;
  }
  values_enrollment = values_enrollment.slice(0, -1);
  const res = await db.execute(
    sql.raw(
      `insert into enrollment(class_id,student_id,semester) ${values_enrollment} RETURNING *`,
    ),
  );

  return { res };
});

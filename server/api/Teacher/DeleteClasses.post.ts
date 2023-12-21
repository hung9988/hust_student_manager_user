import db from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  let class_id = "(";
  for (const element of body.data) {
    class_id += `${element.class_id},`;
  }
  class_id = class_id.slice(0, -1);
  class_id += ")";
  const class_teacher = await db.execute(
    sql.raw(
      `with deletion_class AS (select class_id from classes_teachers where class_id in ${class_id} and teacher_id='${body.user_id}')
      delete from classes where class_id in (select class_id from deletion_class) RETURNING *;`,
    ),
  );

  return { class_teacher };
});

import db from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let value_student_id = "";
  let value_class_id = "";
  for (const element of body.data) {
    value_student_id += `'${element.user_id}',`;
    value_class_id += `${element.class_id},`;
  }
  value_student_id = value_student_id.slice(0, -1);
  value_class_id = value_class_id.slice(0, -1);

  const res = await db.execute(
    sql.raw(
      `delete from enrollment where student_id in (${value_student_id}) AND class_id IN (${value_class_id})  RETURNING *`,
    ),
  );

  return { res };
});

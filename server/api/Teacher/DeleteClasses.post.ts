import { db_admin as db } from "../../../drizzle/db";
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
    sql.raw(`delete from classes where class_id in ${class_id} RETURNING *;`),
  );

  return { class_teacher };
});

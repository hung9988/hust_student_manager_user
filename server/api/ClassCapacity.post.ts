import { db_admin as db } from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let enrolled = "(";
  for (const element of body.data) {
    enrolled += `${element.class_id},`;
  }
  enrolled = enrolled.slice(0, -1);
  enrolled += ")";

  const res = await db.execute(
    sql.raw(
      `select class_id,count(class_id) from enrollment where class_id in ${enrolled} group by class_id`,
    ),
  );

  return { res };
});

import { db_user as db } from "../../../drizzle/db";
import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = getCookie(event, "session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  let query_string = "";
  for (const element of body.data) {
    query_string += `UPDATE enrollments SET mid_term = ${element.mid_term}, end_term=${element.end_term} WHERE student_id = ${element.student_id} AND class_id = ${body.class_id} RETURNING *;`;
  }
  const res = await db.transaction(async (db) => {
    return await db.execute(sql.raw(`${query_string}`));
  });
  return { res };
});

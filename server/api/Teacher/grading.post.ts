import { db_admin as db } from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let sql_command = "";
  for (const element of body.data) {
    sql_command += `UPDATE enrollment SET mid_term = ${element.mid_term}, end_term=${element.end_term} WHERE student_id = '${element.student_id}' AND class_id = ${element.class_id} RETURNING *;`;
  }
  const res = await db.execute(sql.raw(`${sql_command}`));
  return { res };
});

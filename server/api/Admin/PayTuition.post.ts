import { db_admin as db } from "../../../drizzle/db";

import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = event.headers.get("session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));

  let query_string = `prepare pay_tuition (int, numeric) as update tuitions set debt=debt-$2 where student_id=$1 returning *;`;
  for (const element of body.data) {
    query_string += `execute pay_tuition(${element.student_id},${element.amount});`;
  }
  const res = await db.execute(sql.raw(`${query_string}`));
  return { res };
});

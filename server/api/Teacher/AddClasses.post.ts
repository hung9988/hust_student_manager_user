import { db_user as db } from "../../../drizzle/db";

import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = getCookie(event, "session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  let query_string = "";
  for (const element of body.data) {
    query_string += `select * from add_class(current_setting('myapp.user_id')::integer,'${element.subject_id}',${element.capacity},'${element.day_of_week}','${element.location}','${element.start_time}'::time,'${element.end_time}'::time);`;
  }

  const res = await db.transaction(async (db) => {
    return await db.execute(sql.raw(`${query_string}`));
  });
  return { res };
});

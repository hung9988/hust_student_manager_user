import { db_user as db } from "../../../drizzle/db";

import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = getCookie(event, "session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  let class_id = "(";
  for (const element of body.data) {
    class_id += `${element},`;
  }
  class_id = class_id.slice(0, -1);
  class_id += ")";
  const class_teacher = await db.execute(
    sql.raw(`delete from classes where class_id in ${class_id} RETURNING *;`),
  );

  return { class_teacher };
});

import { db_user as db } from "../../../drizzle/db";

import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = getCookie(event, "session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  body.query = "'%" + body.query + "%'";
  console.log(body.query);
  const classes = await db.execute(
    sql.raw(
      `
        select * from classes c join classes_time_location ct on c.class_id=ct.class_id where teacher_id=current_setting('myapp.user_id')::integer AND
        (subject_id ILIKE ${body.query}
        OR c.class_id::varchar ILIKE ${body.query}) OFFSET ${
          (body.page - 1) * body.pageCount
        }
      LIMIT
        ${body.pageCount}`,
    ),
  );

  // WORK IN PROGRESS
  const totalrows = await db.execute(
    sql.raw(
      `select count(*) from classes where teacher_id=current_setting('myapp.user_id')::integer;`,
    ),
  );
  return { classes, totalrows };
});

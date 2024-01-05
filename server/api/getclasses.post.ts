import { db_user as db } from "../../drizzle/db";

import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = event.headers.get("session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  body.query = "'%" + body.query + "%'";
  console.log(body.query);
  const classes = await db.execute(
    sql.raw(
      `
        select cf.*,t.last_name,t.first_name from classes_full cf join users t on cf.teacher_id=t.user_id
      where
        subject_id ILIKE ${body.query}
        OR class_id :: varchar ILIKE ${body.query} OFFSET ${
          (body.page - 1) * body.pageCount
        }
      LIMIT
        ${body.pageCount}`,
    ),
  );
  classes.forEach((element) => {
    element.full_name = element.last_name + " " + element.first_name;
    element.enrolled = element.enrolled_count + "/" + element.capacity;
  });
  // WORK IN PROGRESS

  return { classes };
});

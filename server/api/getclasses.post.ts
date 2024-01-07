import { db_user as db } from "../../drizzle/db";

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
        select cf.*,t.last_name,t.first_name from classes_full cf join users t on cf.teacher_id=t.user_id
      where
        is_open = true AND (subject_id IN (select subject_id from subjects_programs where program_id IN (select program_id from students where student_id=${
          body.user_id
        })) AND
        (subject_id ILIKE ${body.query}
        OR class_id::varchar ILIKE ${body.query})) OFFSET ${
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
  const totalrows = await db.execute(
    sql.raw(`select count(*) from classes_full where
  is_open = true AND (subject_id IN (select subject_id from subjects_programs where program_id IN (select program_id from students where student_id=${body.user_id})));`),
  );
  return { classes, totalrows };
});

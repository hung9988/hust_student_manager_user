import { db_user as db } from "../../drizzle/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = getCookie(event, "session");

  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  body.query = "%" + body.query + "%";
  console.log(body.query);
  const subjects = await db.execute(
    sql.raw(
      `select * from subjects where school_id =(select school_id from teachers where teacher_id=current_setting('myapp.user_id')::integer LIMIT 1) and ( subject_id ILIKE '${
        body.query
      }' OR subject_name ILIKE 
      '${body.query}') OFFSET ${(body.page - 1) * body.pageCount} LIMIT ${
        body.pageCount
      }`,
    ),
  );
  const totalrows = await db.execute(
    sql.raw(
      `select count(*) from subjects where school_id =(select school_id from teachers where teacher_id=current_setting('myapp.user_id')::integer LIMIT 1);`,
    ),
  );

  return { subjects, totalrows };
});

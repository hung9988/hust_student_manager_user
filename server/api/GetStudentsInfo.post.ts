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
      `select users.*,program_id,enrolled_year,graduated from students join users on user_id=student_id where student_id::varchar ILIKE '${
        body.query
      }' OR first_name ILIKE 
      '${body.query}' OR last_name ILIKE 
      '${body.query}' OFFSET ${(body.page - 1) * body.pageCount} LIMIT ${
        body.pageCount
      }`,
    ),
  );

  return { subjects };
});

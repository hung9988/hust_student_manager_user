import { db_user as db } from "../../drizzle/db";

import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = event.headers.get("session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  body.query = "%" + body.query + "%";
  console.log(body.query);
  const subjects = await db.execute(
    sql.raw(
      `select * from subjects where subject_id ILIKE '${
        body.query
      }' OR subject_name ILIKE 
      '${body.query}' OFFSET ${(body.page - 1) * body.pageCount} LIMIT ${
        body.pageCount
      }`,
    ),
  );

  return { subjects };
});

import { sql } from "drizzle-orm";

import { db_user as db } from "../../../drizzle/db";

export default defineEventHandler(async (event) => {
  const session = getCookie(event, "session");

  await db.transaction(async (db) => {
    await db.execute(
      sql.raw(`delete from sessions where session_id='${session}';`),
    );
    await db.execute(sql.raw(`set session myapp.user_id= -1;`));
    await db.execute(sql.raw(`set session myapp.user_role= 'anon';`));
  });

  return { message: "Logged out" };
});

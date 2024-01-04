import { sql } from "drizzle-orm";

import { db_user as db } from "../../../drizzle/db";

export default defineEventHandler(async (event) => {
  await db.transaction(async (db) => {
    await db.execute(sql.raw(`set session myapp.user_id= -1;`));
    await db.execute(sql.raw(`set session myapp.user_role= 'anon';`));
  });

  return { message: "Logged out" };
});

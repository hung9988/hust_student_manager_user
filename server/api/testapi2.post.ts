import { get } from "@vueuse/core";
import { db_user as db } from "../../drizzle/db";

import { eq, lt, gte, ne, sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const session = event.headers.get("session");

  const result = await db.transaction(async (db) => {
    await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
    const res = await db.execute(
      sql.raw(
        `select * from users where user_id=current_setting('myapp.user_id')::integer;`,
      ),
    );
    return res;
  });
  return { result };
});

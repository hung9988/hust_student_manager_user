import { db_user as db } from "../../../drizzle/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const session = getCookie(event, "session");
    await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
    let all_scholarship = "(";
    for (const element of body.data) {
      all_scholarship += `${element},`;
    }
    all_scholarship = all_scholarship.slice(0, -1);
    all_scholarship += ")";
    const res = await db.execute(
      sql.raw(
        `update scholarships set status='close' where scholarship_id in ${all_scholarship} returning *;`,
      ),
    );
    return { res };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
});

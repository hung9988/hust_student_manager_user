import { db_user as db } from "../../../drizzle/db";

import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const session = getCookie(event, "session");
    await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
    let values_enrollment = "values";
    for (const element of body.data) {
      values_enrollment += ` (${element},${body.user_id}),`;
    }
    values_enrollment = values_enrollment.slice(0, -1);
    console.log(values_enrollment);
    const res = await db.execute(
      sql.raw(
        `insert into enrollments (class_id,student_id) ${values_enrollment} RETURNING *;`,
      ),
    );

    return { success: true, res };
  } catch (e: any) {
    return { success: false, statusCode: e.statusCode, message: e.message };
  }
});

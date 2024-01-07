import { db_user as db } from "../../../drizzle/db";
import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = getCookie(event, "session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  let all_student_id = "(";
  for (const element of body.data) {
    all_student_id += `${element},`;
  }
  all_student_id = all_student_id.slice(0, -1);
  all_student_id += ")";
  const res = await db.execute(
    sql.raw(
      `update enrollments set absence=absence+1 where class_id = ${body.class_id} and student_id in ${all_student_id} RETURNING *;
      select * from current_setting('myapp.user_id');
      `,
    ),
  );
  return { res };
});

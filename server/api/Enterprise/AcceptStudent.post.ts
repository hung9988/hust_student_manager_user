import { db_user as db } from "../../../drizzle/db";

import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const session = getCookie(event, "session");
  await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
  const body = await readBody(event);
  let all_student_id = "";
  for (const element of body.data) {
    all_student_id += `${element},`;
  }
  all_student_id = all_student_id.slice(0, -1);
  const res = await db.execute(
    sql.raw(
      `update students_scholarships set accepted=true where student_id in (${all_student_id}) and scholarship_id=${body.scholarship_id} returning *;`,
    ),
  );
  return { res };
});

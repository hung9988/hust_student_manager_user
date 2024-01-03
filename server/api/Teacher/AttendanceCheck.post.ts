import { db_teacher as db } from "../../../drizzle/db";
import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let all_student_id = "(";
  for (const element of body.data) {
    all_student_id += `${element},`;
  }
  all_student_id = all_student_id.slice(0, -1);
  all_student_id += ")";

  const res = await db.execute(
    sql.raw(
      `
      set currentUser.id= ${body.teacher_id};
      set currentUser.role= 'Teacher';
      update enrollments set absence=absence+1 where class_id = ${body.class_id} and student_id in ${all_student_id} RETURNING *;
      `,
    ),
  );
  return { res };
});

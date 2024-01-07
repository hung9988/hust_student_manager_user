import { db_user as db } from "../../../drizzle/db";
import { sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const res = await db.execute(
    sql.raw(
      `select * from student_sign_up('${body.email}','${body.password}','${body.first_name}','${body.last_name}','${body.date_of_birth}'::date,${body.program_id},'${body.enrolled_year}');`,
    ),
  );
  return { res };
});

import { db_user as db } from "../../../drizzle/db";

import { sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (body.role == "student") {
    const res = await db.execute(
      sql.raw(
        `select * from student_sign_up('${body.email}','${body.password}','${body.first_name}','${body.last_name}','${body.date_of_birth}'::date,${body.program_id},'${body.enrolled_year}');`,
      ),
    );
    return { res };
  } else if (body.role == "enterprise") {
    const res = await db.execute(
      sql.raw(
        `select * from enterprise_sign_up('${body.email}','${body.password}','${body.enterprise_name}','${body.contact}');`,
      ),
    );
    return { res };
  }
});

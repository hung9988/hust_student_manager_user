import { db_user as db } from "../../../drizzle/db";
import { users } from "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(body.password, salt);

  const res = await db.execute(
    sql.raw(
      `select * from student_sign_up('${body.email}','${hashedpassword}','${body.first_name}','${body.last_name}','${body.dob}'::date,${body.program_id},'${body.enrolled_year}')`,
    ),
  );
  return { res };
});

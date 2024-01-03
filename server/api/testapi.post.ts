import { db_admin as db } from "../../drizzle/db";

import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(body.password, salt);
  // const res = await db.execute(
  //   sql.raw(
  //     `select * from teacher_sign_up('${body.email}','${hashedpassword}','${body.first_name}','${body.last_name}','${body.dob}'::date,${body.school_id},${body.hired_year},'${body.qualification}')`,
  //   ),
  // );

  // try {
  //   const res = await db.execute(
  //     sql.raw(
  //       `select * from add_class(${body.teacher_id},'${body.subject_id}','${body.semester}',${body.capacity},'${body.day_of_week}','${body.location}','${body.start_time}'::time,'${body.end_time}'::time) `,
  //     ),
  //   );
  //   return { res };
  // } catch (err) {
  //   const error = err as Error;
  //   return { error: error.message };
  // }

  try {
    const res = await db.execute(
      sql.raw(
        `select * from enterprise_sign_up('${body.email}','${hashedpassword}','${body.enterprise_name}','${body.contact}')`,
      ),
    );
    return { res };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
});

import "../../../drizzle/db";
import "../../../drizzle/schema";
import { sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import {
  db_admin,
  db_enterprise,
  db_guest,
  db_student,
  db_teacher,
} from "../../../drizzle/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await db_guest.execute(
    sql.raw(`select * from users where email = '${body.email}'`),
  );

  if (bcrypt.compareSync(body.password, String(user[0].encrypted_password))) {
    let user_role: string = (user[0] as { role: string }).role;
    user_role = user_role[0].toLowerCase() + user_role.slice(1);
    let user_role_2 = user_role + "_id";
    user_role += "s";
    let res: any[] = [];
    if (user_role === "teachers") {
      res = await db_teacher.execute(
        sql.raw(
          `select * from ${user_role} where ${user_role_2} = ${user[0].user_id};
        SET currentUser.id=${user[0].user_id};
        SET currentUser.role='${user[0].role}';`,
        ),
      );
    } else if (user_role === "students") {
      res = await db_student.execute(
        sql.raw(
          `select * from ${user_role} where ${user_role_2} = ${user[0].user_id};
        SET currentUser.id=${user[0].user_id};
        SET currentUser.role='${user[0].role}';`,
        ),
      );
    } else if (user_role === "enterprises") {
      res = await db_enterprise.execute(
        sql.raw(
          `select * from ${user_role} where ${user_role_2} = ${user[0].user_id};
        SET currentUser.id=${user[0].user_id};
        SET currentUser.role='${user[0].role}';`,
        ),
      );
    }
    delete user[0].encrypted_password;

    return {
      user_info: {
        basic_info: user[0],
        extra_info: res[0],
      },
    };
  }

  return undefined;
});

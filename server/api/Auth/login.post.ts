import { sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db_user as db } from "../../../drizzle/db";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await db.execute(
    sql.raw(`select * from users where email = '${body.email}'`),
  );

  if (bcrypt.compareSync(body.password, String(user[0].encrypted_password))) {
    let user_role = user[0].role + "s";

    let user_role_id = user[0].role + "_id";

    const res = await db.execute(
      sql.raw(
        `select * from ${user_role} where ${user_role_id} = ${user[0].user_id}`,
      ),
    );

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

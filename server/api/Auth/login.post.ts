import { sql } from "drizzle-orm";
import { db_user as db } from "../../../drizzle/db";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await db.execute(
    sql.raw(`select * from users where email = '${body.email}'`),
  );
  //if (bcrypt.compareSync(body.password, String(user[0].encrypted_password)))
  if (body.password === user[0].encrypted_password) {
    delete user[0].encrypted_password;
    let user_role = user[0].role + "s";
    let user_role_id = user[0].role + "_id";

    const result = await db.transaction(async (db) => {
      const session = await db.execute(
        sql.raw(
          `INSERT INTO sessions(user_id,role) VALUES (${user[0].user_id},'${user[0].role}') RETURNING session_id;`,
        ),
      );
      await db.execute(
        sql.raw(`CALL set_user_id_and_role('${session[0].session_id}');`),
      );
      const res = await db.execute(
        sql.raw(
          `select * from ${user_role} where ${user_role_id} = ${user[0].user_id};`,
        ),
      );
      const debuger = await db.execute(
        sql.raw(`select * from current_setting('myapp.user_id');`),
      );
      return {
        session: session[0].session_id,
        user_info: {
          basic_info: user[0],
          extra_info: res[0],
        },
      };
    });

    return result;
  }

  return undefined;
});

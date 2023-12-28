import db from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await db.execute(
    sql.raw(`select * from users where email = '${body.email}'`),
  );

  if (bcrypt.compareSync(body.password, String(user[0].encrypted_password))) {
    ////UNGA BUNGA FOR STRING CONCATENATION, SHOULD BE FIXED IN THE FUTURE
    let user_role: string = (user[0] as { role: string }).role;
    user_role = user_role[0].toLowerCase() + user_role.slice(1);
    let user_role_2 = user_role + "_id";
    user_role += "s";
    /////////////////////////////////////////

    const session = await db.execute(
      sql.raw(
        `insert into sessions(user_id) values('${user[0].user_id}') returning session_id;`,
      ),
    );
    delete user[0].encrypted_password;
    // setCookie(event, "session", JSON.stringify(session[0].session_id));
    // setCookie(event, "role", JSON.stringify(user[0].role));
    /// WHY IS THIS NOT WORKING ???

    const res = await db.execute(
      sql.raw(
        `select * from ${user_role} where ${user_role_2} = '${user[0].user_id}'`,
      ),
    );
    return {
      session_id: session[0].session_id,
      user_info: { basic_info: user[0], extra_info: res[0] },
    };
  }

  return undefined;
});

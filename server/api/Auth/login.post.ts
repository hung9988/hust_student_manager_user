import db from "../../../drizzle/db";
import { sessions, users } from "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const currentUser = await db
    .select()
    .from(users)
    .where(sql`${users.email} = ${body.email}`);

  if (!bcrypt.compareSync(body.password, currentUser[0].encryptedPassword))
    currentUser.length = 0;

  if (currentUser.length !== 0) {
    await db.execute(
      sql`insert into sessions(user_id) values(${currentUser[0].userId})`,
    );
    const currentsession = await db
      .select()
      .from(sessions)
      .where(sql`${sessions.userId} = ${currentUser[0].userId}`);

    setCookie(event, "current_session", currentsession[0].sessionId);
    const user = await db.execute(
      sql`select first_name,last_name,user_id,email,role,metadata,phone from users where user_id = (select user_id from sessions where session_id=${currentsession[0].sessionId})`,
    );
    return user[0];
  }

  return undefined;
});

import db from "../../drizzle/db";
import { sessions, users } from "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const session = cookies.Session;
  const user = await db.execute(
    sql`select user_id,email,role from ${users} where ${users.userId} = (select ${sessions.userId} from ${sessions} where ${sessions.sessionId}=${session})`,
  );

  return user;
});

import db from "../../drizzle/db";
import { sessions, users } from "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const session = cookies.current_session;
  if (session) {
    const user = await db.execute(
      sql`select user_id,email,role from ${users} where ${users.userId} = (select ${sessions.userId} from ${sessions} where ${sessions.sessionId}=${session})`,
    );

    return user;
  }

  return undefined;
});

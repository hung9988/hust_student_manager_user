import db from "../../drizzle/db";
import { sessions, users } from "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const session = cookies.current_session;
  await db.delete(sessions).where(sql`${sessions.sessionId}=${session}`);
  deleteCookie(event, "current_session");
});

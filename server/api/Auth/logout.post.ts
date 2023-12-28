import db from "../../../drizzle/db";
import { sessions, users } from "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const session = cookies.session;
  await db.execute(
    sql.raw(`delete from sessions where session_id = '${session}'`),
  );
});

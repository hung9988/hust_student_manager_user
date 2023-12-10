import db from "../../drizzle/db";
import { users } from "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(body.password, salt);

  await db.execute(
    sql`insert into users(email,encrypted_password) values(${body.email},${hashedpassword})`,
  );
});

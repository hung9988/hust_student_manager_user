import db from "../../../drizzle/db";
import { users } from "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const salt = bcrypt.genSaltSync(10);
  const hashedpassword = bcrypt.hashSync(body.password, salt);

  const res = await db.execute(
    sql`insert into users(first_name,last_name,role,email,encrypted_password,metadata) values(${body.first_name},${body.last_name},${body.role},${body.email},${hashedpassword},${body.metadata}) returning *`,
  );
  return { res };
});

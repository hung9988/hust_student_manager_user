import "../../../drizzle/db";
import { sessions, users } from "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db_enterprise, db_student, db_teacher } from "../../../drizzle/db";

export default defineEventHandler(async (event) => {
  const cookies = parseCookies(event);
  const role = cookies.role;
  if (role === "Student") {
    await db_student.execute(
      sql.raw(`
      SET currentUser.id=-1;
      SET currentUser.role='Guest';`),
    );
  } else if (role === "Teacher") {
    await db_teacher.execute(
      sql.raw(`
      SET currentUser.id=-1;
      SET currentUser.role='Guest';`),
    );
  } else if (role === "Enterprise") {
    await db_enterprise.execute(
      sql.raw(`
      SET currentUser.id=-1;
      SET currentUser.role='Guest';`),
    );
  } else {
    return { message: "You are not logged in" };
  }

  return { message: "Logged out" };
});

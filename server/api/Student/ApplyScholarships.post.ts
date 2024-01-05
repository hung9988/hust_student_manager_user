import { db_user as db } from "../../../drizzle/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = db.transaction(async (db) => {
    const res = await db.execute(
      sql.raw(
        `insert into students_scholarships (student_id, scholarship_id) values ('${body.student_id}', '${body.scholarship_id}') returning *`,
      ),
    );
    return res;
  });
  return { result };
});

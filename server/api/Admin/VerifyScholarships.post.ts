import { db_admin as db } from "../../../drizzle/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let scholarship_id = "(";
  for (const element of body.data) {
    scholarship_id += `${element},`;
  }
  scholarship_id = scholarship_id.slice(0, -1);
  scholarship_id += ")";
  const result = await db.execute(
    sql.raw(
      `update scholarships set status='open' where scholarship_id in ${scholarship_id} returning *;`,
    ),
  );
  return { result };
  try {
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
});

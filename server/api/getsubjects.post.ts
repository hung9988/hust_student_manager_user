import db from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  body.query = "%" + body.query + "%";
  console.log(body.query);
  const subjects = await db.execute(
    sql`select * from subjects where subject_id ILIKE ${
      body.query
    } OR subject_name ILIKE '%MI%' OFFSET ${
      (body.page - 1) * body.pageCount
    } LIMIT ${body.pageCount}`,
  );

  return { subjects };
});

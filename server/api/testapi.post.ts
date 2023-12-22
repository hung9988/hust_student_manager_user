import db from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const result = await db.execute(
    sql.raw(`EXPLAIN ANALYZE SELECT * FROM users where first_name='John'`),
  );
  return { result };
});

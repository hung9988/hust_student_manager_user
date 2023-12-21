import db from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const res = await db.execute(sql.raw(`select * from subjects;`));
  return { res };
});

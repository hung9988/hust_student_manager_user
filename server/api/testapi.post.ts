import db from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const result = await db.execute(
    sql.raw(
      `select * from compulsory_completed('0ba4730c-6e00-4df5-9e07-4848b63ad4cf',100);`,
    ),
  );
  return { result };
});

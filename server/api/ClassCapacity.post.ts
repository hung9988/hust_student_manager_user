import db from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const res = await db.execute(
    sql.raw(
      `select count(*) from enrollment where class_id = ${body.class_id}`,
    ),
  );
  const capacity = await db.execute(
    sql.raw(`select capacity from classes where class_id = ${body.class_id}`),
  );

  if (capacity[0]) {
    return {
      result: {
        current_capacity: res[0].count as number,
        max_capacity: capacity[0].capacity,
        remaining: (capacity[0].capacity as number) - (res[0].count as number),
      },
    };
  }
  return { message: "Class not found" };
});

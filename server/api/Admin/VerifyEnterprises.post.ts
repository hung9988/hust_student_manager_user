import { db_admin as db } from "../../../drizzle/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  let enterprise_id = "(";
  for (const element of body.data) {
    enterprise_id += `${element},`;
  }
  enterprise_id = enterprise_id.slice(0, -1);
  enterprise_id += ")";
  const result = await db.execute(
    sql.raw(
      `update enterprises set verified=true where enterprise_id in ${enterprise_id} returning *;`,
    ),
  );
  return { result };
  try {
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
});

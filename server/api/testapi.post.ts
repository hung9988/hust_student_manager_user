import db from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return { res: body };
});

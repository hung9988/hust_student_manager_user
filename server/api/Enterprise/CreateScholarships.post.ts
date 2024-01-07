import { db_user as db } from "../../../drizzle/db";
import { sql } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const session = getCookie(event, "session");
    await db.execute(sql.raw(`CALL set_user_id_and_role('${session}');`));
    let all_scholarship = "";
    for (const element of body.data) {
      all_scholarship += `(${body.enterprise_id},${element.amount},'${element.description}',${element.quantity}),`;
    }
    all_scholarship = all_scholarship.slice(0, -1);

    const res = await db.execute(
      sql.raw(
        `insert into scholarships (enterprise_id,amount,scholarship_description,quantity) values${all_scholarship} returning *;`,
      ),
    );
    return { res };
  } catch (err) {
    const error = err as Error;
    return { error: error.message };
  }
});

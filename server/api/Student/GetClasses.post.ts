import { db_admin as db } from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("THIS IS HEREEEEEE");
  body.query = "'%" + body.query + "%'";
  console.log(body.query);
  const classes = await db.execute(
    sql.raw(
      `
        select * from class_all
      where
        subject_id ILIKE ${body.query}
        OR class_id :: varchar ILIKE ${body.query} OFFSET ${
          (body.page - 1) * body.pageCount
        }
      LIMIT
        ${body.pageCount}`,
    ),
  );
  classes.forEach((element) => {
    element.last_name = element.last_name + " " + element.first_name;
    element.enrolled =
      (element.enrolled ? element.enrolled : "0") + "/" + element.capacity;
  });
  // WORK IN PROGRESS
  console.log(classes + "THIS IS HERE");
  return { classes };
});

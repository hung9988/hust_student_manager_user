import db from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  body.query = "'%" + body.query + "%'";
  console.log(body.query);
  const classes = await db.execute(
    sql.raw(
      `with classes_info as (
        select
          b.*,
          a.subject_id,
          a.capacity,
          a.is_open
        from
          classes as a
          join class_time_location as b on a.class_id = b.class_id
      ),
      class_final as (
        select
          c.class_id,
          c.subject_id,
          c.capacity,
          c.is_open,
          u.first_name,
          u.last_name,
          c.start_time,
          c.end_time,
          c.day_of_week,
          c.location
        from
          classes_info c,
          classes_teachers ct,
          users u
        where
          c.class_id = ct.class_id
          and ct.teacher_id = u.user_id
      ),
      class_capacity as (
        select
          c.class_id,
          count(c.class_id) as enrolled
        from
          class_final c
          join enrollment e on c.class_id = e.class_id
          GROUP BY c.class_id
      )
      crete or replace view class_final_final as(
      select
        c.*,
        b.enrolled
      from
        class_final c left outer join class_capacity b on c.class_id=b.class_id
        )
        select * from class_final_final
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

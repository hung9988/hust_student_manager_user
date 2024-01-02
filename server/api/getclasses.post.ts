import { db_admin as db } from "../../drizzle/db";
import "../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  body.query = "'%" + body.query + "%'";
  console.log(body.query);
  const classes = await db.execute(
    // sql.raw(
    //   `with classes_info as (select b.*,a.subject_id,a.capacity,a.is_open from classes as a join class_time_location as b on a.class_id=b.class_id)
    //   select * from classes_info where subject_id ILIKE ${
    //     body.query
    //   } OR class_id::varchar ILIKE ${body.query}
    //   OFFSET ${(body.page - 1) * body.pageCount} LIMIT ${body.pageCount}`,
    // ),
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
      )
      select
        *
      from
        class_final
      where
        subject_id ILIKE ${body.query}
        OR class_id :: varchar ILIKE ${body.query} OFFSET ${
          (body.page - 1) * body.pageCount
        }
      LIMIT
        ${body.pageCount}`,
    ),
  );
  // WORK IN PROGRESS
  return { classes };
});

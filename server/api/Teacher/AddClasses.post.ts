import { db_admin as db } from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  let values_classes = "values";
  for (const element of body.selected) {
    values_classes += `('${element.subject_id}',${element.capacity}),`;
  }
  values_classes = values_classes.slice(0, -1);
  const res = await db.execute(
    sql.raw(
      `insert into classes(subject_id,teacher_id,capacity) ${values_classes} RETURNING *`,
    ),
  );

  let values_time_location = "values";
  for (let [index1, element] of body.class.entries()) {
    for (const [index2, TimeLocation] of element.location.entries()) {
      values_time_location += `(${res[index1].class_id},'${element.start_time[index2]}','${element.end_time[index2]}','${element.day_of_week[index2]}','${element.location[index2]}'),`;
    }
  }

  values_time_location = values_time_location.slice(0, -1);

  const temp = await db.execute(
    sql.raw(
      `insert into class_time_location(class_id,start_time,end_time,day_of_week,location) ${values_time_location} RETURNING *`,
    ),
  );

  return { result: body.selected };
});

import db from "../../../drizzle/db";
import "../../../drizzle/schema";
import { eq, lt, gte, ne, sql } from "drizzle-orm";
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  ///THIS IS FOR TESTING PURPOSE, DELETE WHEN DEPLOYING
  await db.execute(
    sql.raw(
      `delete from class_time_location;delete from classes_teachers;delete from classes;`,
    ),
  );
  /////////////////// END OF TESTING CODE ///////////////////////
  let values_classes = "values";
  for (const element of body.data) {
    values_classes += `('${element.subject_id}',${element.capacity}),`;
  }
  values_classes = values_classes.slice(0, -1);
  const res = await db.execute(
    sql.raw(
      `insert into classes(subject_id,capacity) ${values_classes} RETURNING *`,
    ),
  );

  let values_teacher = "values";
  let values_time_location = "values";
  for (let [index, element] of body.data.entries()) {
    values_teacher += `(${res[index].class_id},'${element.user_id}'),`;
    values_time_location += `(${res[index].class_id},'${element.start_time}','${element.end_time}','${element.day_of_week}','${element.location}'),`;
  }
  values_teacher = values_teacher.slice(0, -1);
  values_time_location = values_time_location.slice(0, -1);
  console.log(values_teacher);
  console.log(values_time_location);

  const temp = await db.execute(
    sql.raw(
      `insert into classes_teachers(class_id,teacher_id) ${values_teacher} RETURNING *;
      insert into class_time_location(class_id,start_time,end_time,day_of_week,location) ${values_time_location} RETURNING *`,
    ),
  );

  return { result: body.data };
});

import { pgTable, bigint, uuid, integer, time, smallint, text, doublePrecision, char, date, real, primaryKey } from "drizzle-orm/pg-core"

import { sql } from "drizzle-orm"


export const classTeacher = pgTable("class_teacher", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	classId: bigint("class_id", { mode: "number" }).notNull(),
	teacherId: uuid("teacher_id").notNull(),
});

export const classTimeLocation = pgTable("class_time_location", {
	classId: integer("class_id").notNull(),
	startTime: time("start_time").notNull(),
	endTime: time("end_time").notNull(),
	dayOfWeek: smallint("day_of_week").notNull(),
	location: text("location").notNull(),
});

export const classes = pgTable("classes", {
	classId: integer("class_id").notNull(),
	subjectId: text("subject_id"),
	capacity: integer("capacity"),
});

export const conditions = pgTable("conditions", {
	mainSubject: text("main_subject").notNull(),
	supplementSubject: text("supplement_subject").notNull(),
	type: text("type"),
});

export const enrollment = pgTable("enrollment", {
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	classId: bigint("class_id", { mode: "number" }).notNull(),
	studentId: uuid("student_id").notNull(),
	midterm: doublePrecision("midterm"),
	endterm: doublePrecision("endterm"),
	absence: smallint("absence"),
	semester: char("semester", { length: 4 }),
});

export const programs = pgTable("programs", {
	programId: smallint("program_id").notNull(),
	programName: text("program_name"),
	programDescription: text("program_description"),
	schoolId: smallint("school_id").notNull(),
});

export const schools = pgTable("schools", {
	schoolId: smallint("school_id").notNull(),
	schoolName: text("school_name"),
});

export const students = pgTable("students", {
	studentId: uuid("student_id").notNull(),
	dateOfBirth: date("date_of_birth"),
	firstName: text("first_name"),
	lastName: text("last_name"),
	// You can use { mode: "bigint" } if numbers are exceeding js number limitations
	programId: bigint("program_id", { mode: "number" }),
	email: text("email"),
	enrolledYear: smallint("enrolled_year"),
});

export const subjectProgram = pgTable("subject_program", {
	subjectId: text("subject_id").notNull(),
	programId: smallint("program_id").notNull(),
});

export const subjects = pgTable("subjects", {
	subjectId: text("subject_id").notNull(),
	subjectName: text("subject_name"),
	subjectDescription: text("subject_description"),
	credit: real("credit"),
	creditTuition: real("credit_tuition"),
	weight: real("weight"),
	schoolId: smallint("school_id").notNull(),
});

export const teachers = pgTable("teachers", {
	teacherId: uuid("teacher_id").notNull(),
	dateOfBirth: date("date_of_birth"),
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: text("email"),
	degree: text("degree"),
	schoolId: smallint("school_id"),
});

export const users = pgTable("users", {
	name: text("name").notNull(),
	age: integer("age").notNull(),
},
(table) => {
	return {
		usersPkey: primaryKey({ columns: [table.name, table.age], name: "users_pkey"})
	}
});
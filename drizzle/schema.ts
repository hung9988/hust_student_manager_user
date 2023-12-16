import { pgTable, foreignKey, serial, varchar, smallint, uuid, jsonb, unique, smallserial, text, numeric, integer, primaryKey, time } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const classes = pgTable("classes", {
	classId: serial("class_id").primaryKey().notNull(),
	subjectId: varchar("subject_id").references(() => subjects.subjectId),
	capacity: smallint("capacity"),
});

export const users = pgTable("users", {
	userId: uuid("user_id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	firstName: varchar("first_name"),
	lastName: varchar("last_name"),
	email: varchar("email").notNull(),
	phone: varchar("phone"),
	role: varchar("role"),
	encryptedPassword: varchar("encrypted_password").notNull(),
	metadata: jsonb("metadata"),
});

export const sessions = pgTable("sessions", {
	sessionId: uuid("session_id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	userId: uuid("user_id").references(() => users.userId),
},
(table) => {
	return {
		sessionsUserIdKey: unique("sessions_user_id_key").on(table.userId),
	}
});

export const schools = pgTable("schools", {
	schoolId: smallserial("school_id").primaryKey().notNull(),
	schoolName: varchar("school_name"),
});

export const subjects = pgTable("subjects", {
	subjectId: varchar("subject_id").primaryKey().notNull(),
	subjectName: varchar("subject_name"),
	subjectDescription: text("subject_description"),
	credit: numeric("credit"),
	creditTuition: numeric("credit_tuition"),
	weight: numeric("weight"),
	schoolId: integer("school_id").references(() => schools.schoolId),
});

export const programs = pgTable("programs", {
	programId: smallserial("program_id").primaryKey().notNull(),
	schoolId: integer("school_id").references(() => schools.schoolId),
	programName: varchar("program_name"),
	programDescription: varchar("program_description"),
});

export const classesTeachers = pgTable("classes_teachers", {
	classId: integer("class_id").notNull().references(() => classes.classId),
	teacherId: uuid("teacher_id").notNull().references(() => users.userId),
},
(table) => {
	return {
		pk: primaryKey({ columns: [table.classId, table.teacherId], name: "pk"})
	}
});

export const subjectProgram = pgTable("subject_program", {
	subjectId: varchar("subject_id").notNull().references(() => subjects.subjectId),
	programId: integer("program_id").notNull().references(() => programs.programId),
},
(table) => {
	return {
		pkSubjectProgram: primaryKey({ columns: [table.subjectId, table.programId], name: "pk_subject_program"})
	}
});

export const classTimeLocation = pgTable("class_time_location", {
	classId: integer("class_id").references(() => classes.classId),
	startTime: time("start_time").notNull(),
	endTime: time("end_time").notNull(),
	dayOfWeek: varchar("day_of_week").notNull(),
	location: varchar("location").notNull(),
},
(table) => {
	return {
		primaryKey: primaryKey({ columns: [table.startTime, table.endTime, table.dayOfWeek, table.location], name: "primary_key"})
	}
});

export const enrollment = pgTable("enrollment", {
	classId: integer("class_id").notNull().references(() => classes.classId),
	studentId: uuid("student_id").notNull().references(() => users.userId),
	midTerm: numeric("mid_term"),
	endTerm: numeric("end_term"),
	absence: integer("absence"),
	semester: varchar("semester"),
},
(table) => {
	return {
		pkEnrollment: primaryKey({ columns: [table.classId, table.studentId], name: "pk_enrollment"})
	}
});
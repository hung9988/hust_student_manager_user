import {
  pgTable,
  unique,
  pgEnum,
  serial,
  varchar,
  foreignKey,
  integer,
  boolean,
  time,
  numeric,
  text,
  index,
  date,
  primaryKey,
  uuid,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const scholarshipStatus = pgEnum("scholarship_status", [
  "close",
  "open",
  "unverified",
]);
export const weekDays = pgEnum("week_days", [
  "Sunday",
  "Saturday",
  "Friday",
  "Thursday",
  "Wednesday",
  "Tuesday",
  "Monday",
]);
export const roles = pgEnum("roles", [
  "enterprise",
  "admin",
  "student",
  "teacher",
]);

export const schools = pgTable(
  "schools",
  {
    schoolId: serial("school_id").primaryKey().notNull(),
    schoolName: varchar("school_name").notNull(),
  },
  (table) => {
    return {
      schoolsSchoolNameKey: unique("Schools_school_name_key").on(
        table.schoolName,
      ),
    };
  },
);

export const classes = pgTable(
  "classes",
  {
    classId: serial("class_id").primaryKey().notNull(),
    teacherId: integer("teacher_id")
      .notNull()
      .references(() => teachers.teacherId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    subjectId: varchar("subject_id")
      .notNull()
      .references(() => subjects.subjectId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    semester: varchar("semester", { length: 5 }).default("20232").notNull(),
    externalResources: varchar("external_resources"),
    capacity: integer("capacity").notNull(),
    enrolledCount: integer("enrolled_count").default(0).notNull(),
    isOpen: boolean("is_open").default(false).notNull(),
  },
  (table) => {
    return {
      uniqueTeacherSubject: unique("unique_teacher_subject").on(
        table.teacherId,
        table.subjectId,
      ),
    };
  },
);

export const classesTimeLocation = pgTable("classes_time_location", {
  classId: integer("class_id")
    .notNull()
    .references(() => classes.classId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  dayOfWeek: weekDays("day_of_week").notNull(),
  location: varchar("location").notNull(),
  startTime: time("start_time").notNull(),
  endTime: time("end_time").notNull(),
});

export const scholarships = pgTable("scholarships", {
  scholarshipId: serial("scholarship_id").primaryKey().notNull(),
  enterpriseId: integer("enterprise_id").references(
    () => enterprises.enterpriseId,
    { onDelete: "cascade", onUpdate: "cascade" },
  ),
  amount: numeric("amount"),
  scholarshipDescription: text("scholarship_description"),
  status: scholarshipStatus("status").default("unverified"),
  quantity: integer("quantity"),
});

export const users = pgTable(
  "users",
  {
    userId: serial("user_id").primaryKey().notNull(),
    email: varchar("email").notNull(),
    encryptedPassword: varchar("encrypted_password").notNull(),
    role: roles("role"),
    firstName: varchar("first_name"),
    lastName: varchar("last_name"),
    dateOfBirth: date("date_of_birth"),
  },
  (table) => {
    return {
      idxUsersUserId: index("idx_users_user_id").on(table.userId),
      uniqueEmail: unique("unique_email").on(table.email),
    };
  },
);

export const students = pgTable(
  "students",
  {
    studentId: integer("student_id")
      .primaryKey()
      .notNull()
      .references(() => users.userId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    programId: integer("program_id")
      .notNull()
      .references(() => programs.programId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    enrolledYear: integer("enrolled_year").notNull(),
    warningLevel: integer("warning_level").default(0).notNull(),
    semesterCredit: integer("semester_credit").default(28).notNull(),
    graduated: boolean("graduated").default(false).notNull(),
  },
  (table) => {
    return {
      idxStudents: index("idx_students").on(
        table.studentId,
        table.programId,
        table.semesterCredit,
      ),
    };
  },
);

export const subjects = pgTable("subjects", {
  subjectId: varchar("subject_id").primaryKey().notNull(),
  subjectName: varchar("subject_name").notNull(),
  schoolId: integer("school_id")
    .notNull()
    .references(() => schools.schoolId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  credit: numeric("credit").default("0").notNull(),
  weight: numeric("weight").default("0").notNull(),
  subjectDescription: text("subject_description"),
});

export const programs = pgTable(
  "programs",
  {
    programId: serial("program_id").primaryKey().notNull(),
    schoolId: integer("school_id")
      .notNull()
      .references(() => schools.schoolId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    programName: varchar("program_name").notNull(),
    programDescription: text("program_description"),
    totalCredits: numeric("total_credits"),
  },
  (table) => {
    return {
      uniqueProgram: unique("unique_program").on(table.programName),
    };
  },
);

export const tuitions = pgTable("tuitions", {
  studentId: integer("student_id")
    .primaryKey()
    .notNull()
    .references(() => students.studentId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  debt: numeric("debt").notNull(),
});

export const enterprises = pgTable(
  "enterprises",
  {
    enterpriseId: integer("enterprise_id")
      .primaryKey()
      .notNull()
      .references(() => users.userId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    enterpriseName: varchar("enterprise_name").notNull(),
    contact: varchar("contact").notNull(),
    verified: boolean("verified").default(false).notNull(),
  },
  (table) => {
    return {
      uniqueEnterprise: unique("unique_enterprise").on(table.enterpriseName),
    };
  },
);

export const teachers = pgTable("teachers", {
  teacherId: integer("teacher_id")
    .primaryKey()
    .notNull()
    .references(() => users.userId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  schoolId: integer("school_id")
    .notNull()
    .references(() => schools.schoolId, {
      onDelete: "cascade",
      onUpdate: "cascade",
    }),
  hiredYear: integer("hired_year").notNull(),
  qualification: varchar("qualification").notNull(),
});

export const subjectsConditions = pgTable(
  "subjects_conditions",
  {
    mainSubjectId: varchar("main_subject_id")
      .notNull()
      .references(() => subjects.subjectId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    requiredSubjectId: varchar("required_subject_id")
      .notNull()
      .references(() => subjects.subjectId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      subjectsConditionsPkey: primaryKey({
        columns: [table.mainSubjectId, table.requiredSubjectId],
        name: "Subjects_Conditions_pkey",
      }),
    };
  },
);

export const subjectsPrograms = pgTable(
  "subjects_programs",
  {
    programId: integer("program_id")
      .notNull()
      .references(() => programs.programId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    subjectId: varchar("subject_id")
      .notNull()
      .references(() => subjects.subjectId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      subjectsProgramsPkey: primaryKey({
        columns: [table.programId, table.subjectId],
        name: "Subjects_Programs_pkey",
      }),
    };
  },
);

export const studentsScholarships = pgTable(
  "students_scholarships",
  {
    studentId: integer("student_id")
      .notNull()
      .references(() => students.studentId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    scholarshipId: integer("scholarship_id")
      .notNull()
      .references(() => scholarships.scholarshipId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    accepted: boolean("accepted").default(false).notNull(),
  },
  (table) => {
    return {
      studentsScholarshipsPkey: primaryKey({
        columns: [table.studentId, table.scholarshipId],
        name: "Students_Scholarships_pkey",
      }),
    };
  },
);

export const sessions = pgTable(
  "sessions",
  {
    sessionId: uuid("session_id")
      .default(sql`uuid_generate_v4()`)
      .notNull(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.userId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    role: roles("role").notNull(),
  },
  (table) => {
    return {
      idxHashedSession: index("idx_hashed_session").on(table.sessionId),
      sessionsPkey: primaryKey({
        columns: [table.sessionId, table.userId],
        name: "sessions_pkey",
      }),
    };
  },
);

export const enrollments = pgTable(
  "enrollments",
  {
    classId: integer("class_id")
      .notNull()
      .references(() => classes.classId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    studentId: integer("student_id")
      .notNull()
      .references(() => students.studentId, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    absence: integer("absence").default(0).notNull(),
    midTerm: numeric("mid_term"),
    endTerm: numeric("end_term"),
    passed: boolean("passed").default(false).notNull(),
  },
  (table) => {
    return {
      idxStudentClass: index("idx_student_class").on(
        table.classId,
        table.studentId,
      ),
      idxStudentOnly: index("idx_student_only").on(table.studentId),
      enrollmentsPkey: primaryKey({
        columns: [table.classId, table.studentId],
        name: "Enrollments_pkey",
      }),
    };
  },
);

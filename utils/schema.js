import { boolean, pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

// Grades table definition
export const GRADES = pgTable('grades', {
  id: serial('id').primaryKey(),
  grade: varchar('grade', { length: 10 }).notNull(),
});

// Students table definition
export const STUDENTS = pgTable('students', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  grade: varchar('grade', { length: 10 }).notNull(),
  sectionandStream: varchar('sectionandStream', { length: 20 }).notNull(),
  rollnumber: varchar('rollnumber', { length: 10 }).notNull(),
  address: varchar('address', { length: 100 }).notNull(),
  contact: varchar('contact', { length: 15 }).notNull(),
});

// Attendance table definition with foreign key reference
export const ATTENDANCE = pgTable('attendance', {
  id: serial('id').primaryKey(),
  studentId: integer('studentId')
    .notNull()
    .references(() => STUDENTS.id, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }),
  present: boolean('present').default(false),
  day: integer('day').notNull(),
  date: varchar('date', { length: 20 }).notNull(),
});
import { sql } from "drizzle-orm";
import { check, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import {
  createSelectSchema,
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-valibot";
import { maxLength, pipe } from "valibot";

export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    age: integer().notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    phone: varchar({ length: 20 }).notNull(),
  },
  (table) => [check("age_check1", sql`${table.age} < 150`)]
);

export const userSelectSchema = createSelectSchema(usersTable);
export const userInsertSchema = createInsertSchema(usersTable, {
  phone: (schema) => pipe(schema, maxLength(16, "Invalid Phone Number")),
});
export const userUpdateSchema = createUpdateSchema(usersTable);

// src/lib/db/schema.ts

import { pgTable, serial, text } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const userTable = pgTable('users', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	hashedPassword: text('hashed_password').notNull(),
	created_at: text('created_at')
		.notNull()
		.default(sql`now()`),
	updated_at: text('updated_at')
		.notNull()
		.default(sql`now()`)
});

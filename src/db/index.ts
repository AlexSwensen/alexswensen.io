import 'server-only';
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { users } from './schema/users';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle({ client: pool, schema: { users }, casing: 'snake_case' });

// const myUsers = db.select().from(users).where(eq(users.id, 'some-uuid'));
// myUsers.toSQL().sql; // Check that this works without errors

// Example usage (uncomment to test):
// async function getUsers() {
//   const allUsers = await db.select().from(users);
//   console.log(allUsers);
// }

// getUsers();

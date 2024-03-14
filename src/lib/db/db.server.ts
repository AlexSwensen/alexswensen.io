// db/db.server.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private';
import { dev } from '$app/environment';
import { Client } from 'pg';

// const client = dev ? postgres(DATABASE_URL) : postgres(DATABASE_URL, { ssl: 'require' });
// const client = postgres(DATABASE_URL);
// export const db = drizzle(client, {});
// const sql = drizzle(postgres(DATABASE_URL));
const client = postgres(DATABASE_URL);
export const db = drizzle(client);

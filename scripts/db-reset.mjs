#!/usr/bin/env node
/**
 * db-reset.mjs
 *
 * Drops ALL tables in the public schema and the drizzle migration-tracking
 * schema from the database pointed to by DATABASE_URL in .env.
 *
 * Usage:
 *   node scripts/db-reset.mjs
 *   # or via package.json script:
 *   pnpm db:reset
 *
 * ⚠️  THIS IS DESTRUCTIVE — all data will be lost.
 */

import { readFileSync } from 'fs';
import { createInterface } from 'readline';
import pg from 'pg';

// ---------------------------------------------------------------------------
// Load .env manually (no dotenv dependency needed in ESM scripts)
// ---------------------------------------------------------------------------
try {
  const env = readFileSync(new URL('../.env', import.meta.url), 'utf8');
  for (const line of env.split('\n')) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length && !key.startsWith('#')) {
      process.env[key.trim()] ??= rest.join('=').trim();
    }
  }
} catch {
  // .env not found — rely on environment variables already being set
}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not set.');
  process.exit(1);
}

// Mask credentials for display
const displayUrl = DATABASE_URL.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:****@');

// ---------------------------------------------------------------------------
// Prompt for confirmation
// ---------------------------------------------------------------------------
const rl = createInterface({ input: process.stdin, output: process.stdout });
const answer = await new Promise((resolve) =>
  rl.question(
    `\n⚠️  This will DROP ALL TABLES on:\n   ${displayUrl}\n\nType "yes" to confirm: `,
    resolve
  )
);
rl.close();

if (answer.trim() !== 'yes') {
  console.log('Aborted.');
  process.exit(0);
}

// ---------------------------------------------------------------------------
// Connect and drop everything
// ---------------------------------------------------------------------------
const client = new pg.Client({ connectionString: DATABASE_URL });
await client.connect();

try {
  // Drop all tables in the public schema
  const { rows: tables } = await client.query(`
    SELECT tablename
    FROM pg_tables
    WHERE schemaname = 'public'
  `);

  if (tables.length === 0) {
    console.log('No tables found in public schema — nothing to drop.');
  } else {
    const tableList = tables.map((r) => `"public"."${r.tablename}"`).join(', ');
    console.log(`\nDropping tables: ${tables.map((r) => r.tablename).join(', ')}`);
    await client.query(`DROP TABLE IF EXISTS ${tableList} CASCADE`);
    console.log('✓ All public tables dropped.');
  }

  // Drop the drizzle migration-tracking schema if it exists
  await client.query(`DROP SCHEMA IF EXISTS drizzle CASCADE`);
  console.log('✓ Drizzle migration history cleared.');

  console.log('\nDatabase is now empty. Run `pnpm db:migrate` to re-apply migrations.\n');
} finally {
  await client.end();
}

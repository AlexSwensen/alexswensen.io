import 'server-only';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from './schema';

if (process.env.NODE_ENV === 'development') {
  // Route WebSocket connections through the local wsproxy (docker-compose).
  // The proxy (host port 4444) forwards TCP to the db service inside Docker.
  // DATABASE_URL can point to localhost:5432 for drizzle-kit direct connections;
  // the neon driver ignores the host and always proxies through db:5432 here.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  neonConfig.webSocketConstructor = require('ws');
  neonConfig.wsProxy = () => 'localhost:4444/v1?address=db:5432';
  neonConfig.useSecureWebSocket = false;
  neonConfig.pipelineTLS = false;
  neonConfig.pipelineConnect = false;
}

// Singleton pool — prevents multiple connections during Next.js hot reloads
const globalForDb = globalThis as unknown as { pool?: Pool };

const pool = globalForDb.pool ?? new Pool({ connectionString: process.env.DATABASE_URL! });

if (process.env.NODE_ENV !== 'production') {
  globalForDb.pool = pool;
}

export const db = drizzle({ client: pool, schema });

export async function getLastMigration() {
  try {
    const result = await pool.query<{ hash: string; created_at: string }>(
      'SELECT hash, created_at FROM drizzle.__drizzle_migrations ORDER BY created_at DESC LIMIT 1'
    );
    const row = result.rows[0];
    if (!row) return null;
    return {
      hash: row.hash.slice(0, 8),
      appliedAt: new Date(Number(row.created_at)).toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };
  } catch {
    return null;
  }
}

import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema',
  out: './src/db/drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

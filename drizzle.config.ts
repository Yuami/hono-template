import { defineConfig } from 'drizzle-kit';

import env from '@/env';

export default defineConfig({
  schema: './src/db/tasks-schema.ts',
  out: './src/db/migrations',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    databaseId: env?.CLOUDFLARE_DATABASE_ID,
    accountId: env?.CLOUDFLARE_ACCOUNT_ID,
    token: env?.CLOUDFLARE_TOKEN,
  },
  casing: 'snake_case',
});

import type { D1Database } from '@cloudflare/workers-types';

import { drizzle } from 'drizzle-orm/d1';

import type { Environment } from '@/env';

import * as schema from '@/db/schema';

type DBType = ReturnType<typeof drizzle<typeof schema, any>>;

let dbInstance: DBType | null = null;

export function initDb(env: Environment & { DB?: D1Database }) {
  if (!dbInstance) {
    if (!env.DB) {
      throw new Error('Missing D1 binding in environment (expected \'DB\')');
    }

    dbInstance = drizzle(env.DB, { schema, casing: 'snake_case' });
  }

  return { db: dbInstance };
}

export function getDb() {
  if (!dbInstance) {
    throw new Error('Database not initialized. Call initDb first.');
  }

  return { db: dbInstance };
}

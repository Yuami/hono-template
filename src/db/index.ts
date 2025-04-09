import { drizzle } from 'drizzle-orm/d1';

import * as schema from '@/db/schema';
import env from '@/env';

type DBType = ReturnType<typeof drizzle<typeof schema, any>>;

let dbInstance: DBType | null = null;

/**
 * Get database instance with lazy initialization
 */
export function getDb() {
  if (dbInstance) {
    return { db: dbInstance };
  }

  dbInstance = drizzle(env.DB, { schema, casing: 'snake_case' });
  return { db: dbInstance };
}

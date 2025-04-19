import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';

import type { Environment } from '@/env';

import { getDb } from '@/db';
import { stripePlugin } from '@/modules/auth/plugins/auth-stripe-config';

export function getAuth(env: Environment) {
  return betterAuth({
    database: drizzleAdapter(() => getDb().db, {
      provider: 'sqlite',
    }),
    emailAndPassword: {
      enabled: true,
    },
    advanced: {
      defaultCookieAttributes: {
        sameSite: 'none',
        secure: true,
        partitioned: true, // Recommended for new browser standards
      },
    },
    plugins: [
      stripePlugin(env),
      openAPI(),
    ],
  });
}

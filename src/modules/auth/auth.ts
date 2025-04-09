import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';

import { getDb } from '@/db';
import { stripePlugin } from '@/modules/auth/auth-stripe-config';

export const auth = betterAuth({
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
    stripePlugin,
    openAPI(),
  ],
});

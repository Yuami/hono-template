/* eslint-disable node/no-process-env */
import * as process from 'node:process';
import { z } from 'zod';

const EnvSchema = z.object({
  PORT: z.coerce.number().default(9999),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']),

  DB: z.any(),
  CLOUDFLARE_BINDING_NAME: z.string().default('DB'),
  CLOUDFLARE_DATABASE_ID: z.string().default(''),
  CLOUDFLARE_ACCOUNT_ID: z.string().default(''),
  CLOUDFLARE_TOKEN: z.string().default(''),

  STRIPE_SECRET_KEY: z.string().default(''),
  STRIPE_WEBHOOK_SECRET: z.string().default(''),
});

export type Environment = z.infer<typeof EnvSchema>;
const { data: env } = EnvSchema.safeParse(process.env);

export default env as Environment;

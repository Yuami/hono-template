/* eslint-disable node/no-process-env */
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import path from 'node:path';
import * as process from 'node:process';
import { z } from 'zod';

expand(config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  ),
}));

const EnvSchema = z.object({
  ENV: z.enum(['development', 'production']).default('development'),
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

export function parseEnv(data: any) {
  const { data: env, error } = EnvSchema.safeParse(data);

  if (error) {
    const errorMessage = `❌ Invalid env - ${Object.entries(error.flatten().fieldErrors).map(([key, errors]) => `${key}: ${errors.join(',')}`).join(' | ')}`;
    throw new Error(errorMessage);
  }

  return env;
}

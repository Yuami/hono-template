import { stripe } from '@better-auth/stripe';
import { Stripe } from 'stripe';

import type { Environment } from '@/env';

export function stripePlugin(env: Environment) {
  const stripeClient = new Stripe(env.STRIPE_SECRET_KEY!);

  return stripe({
    stripeClient,
    stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET!,
    createCustomerOnSignUp: true,
  });
}

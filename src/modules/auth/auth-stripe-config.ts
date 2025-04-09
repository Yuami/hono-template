import { stripe } from '@better-auth/stripe';
import { Stripe } from 'stripe';

import env from '@/env';

const stripeClient = new Stripe(env.STRIPE_SECRET_KEY!);

export const stripePlugin = stripe({
  stripeClient,
  stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET!,
  createCustomerOnSignUp: true,
});

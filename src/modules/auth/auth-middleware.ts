import type { MiddlewareHandler } from 'hono';

import type { AppBindings } from '@/modules/base/types';

import { getAuth } from './auth';

export const authMiddleware: MiddlewareHandler<AppBindings> = async (c, next) => {
  const auth = getAuth(c.env);
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set('user', null);
    c.set('session', null);
  }
  else {
    c.set('user', session.user);
    c.set('session', session.session);
  }

  await next();
};

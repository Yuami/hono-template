import type { MiddlewareHandler } from 'hono';

import { auth } from './auth';

export const authMiddleware: MiddlewareHandler<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}> = async (c, next) => {
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

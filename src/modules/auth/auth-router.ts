import { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings } from '@/modules/base/types';

import { getAuth } from './auth';

const authRouter = new OpenAPIHono<AppBindings>();

authRouter.on(['GET', 'POST'], '/auth/*', (c) => {
  const auth = getAuth(c.env);
  return auth.handler(c.req.raw);
});

export default authRouter;

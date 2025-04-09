import { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings } from '@/modules/base/types';

import { getAuth } from './auth';

const authRoutes = new OpenAPIHono<AppBindings>();

authRoutes.on(['GET', 'POST'], '/auth/*', (c) => {
  const auth = getAuth(c.env);
  return auth.handler(c.req.raw);
});

export default authRoutes;

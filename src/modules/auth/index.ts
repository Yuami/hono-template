import { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings } from '@/modules/base/types';

import { auth } from './auth';

const authRoutes = new OpenAPIHono<AppBindings>();

authRoutes.on(['GET', 'POST'], '/auth/*', (c) => {
  return auth.handler(c.req.raw);
});

export default authRoutes;

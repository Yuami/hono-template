import type { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings } from '@/modules/base/types';

import authRouter from '@/modules/auth/auth-router';
import indexRouter from '@/modules/index/index-router';
import tasksRouter from '@/modules/tasks/tasks-router';

export const routers = [
  indexRouter,
  authRouter,
  tasksRouter,
] as const;

export function registerRoutes(app: OpenAPIHono<AppBindings>) {
  routers.forEach((router) => {
    app.route('/api/v1', router);
  });
}

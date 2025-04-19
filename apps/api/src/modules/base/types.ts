import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { PinoLogger } from 'hono-pino';

import type { Environment } from '@/env';
import type { getAuth } from '@/modules/auth/auth';

type Auth = ReturnType<typeof getAuth>;

export type AuthUser = Auth['$Infer']['Session']['user'];
export type AuthSession = Auth['$Infer']['Session']['session'];

export interface AppBindings {
  Bindings: Environment;
  Variables: {
    logger: PinoLogger;
    user: AuthUser | null;
    session: AuthSession | null;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

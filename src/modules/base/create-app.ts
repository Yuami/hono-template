import { OpenAPIHono } from '@hono/zod-openapi';

import type { AppBindings, AppOpenAPI } from '@/modules/base/types';

import { initDb } from '@/db';
import { parseEnv } from '@/env';
import notFound from '@/lib/stoker/middlewares/not-found';
import onError from '@/lib/stoker/middlewares/on-error';
import serveEmojiFavicon from '@/lib/stoker/middlewares/serve-emoji-favicon';
import { defaultHook } from '@/lib/stoker/openapi';
import { authMiddleware } from '@/modules/auth/auth-middleware';
import { pinoLogger } from '@/modules/base/middlewares/pino-logger';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}

export default function createApp() {
  const app = createRouter();
  app.use('*', (c, next) => {
    // Parse environment from context
    c.env = parseEnv(c.env);

    initDb(c.env);

    return next();
  });

  app.use('*', authMiddleware);
  app.use(serveEmojiFavicon('🔥'));
  app.use(pinoLogger());

  app.notFound(notFound);
  app.onError(onError);
  return app;
}

export function createTestApp<R extends AppOpenAPI>(router: R) {
  return createApp().route('/', router);
}

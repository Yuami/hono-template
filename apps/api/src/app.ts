import type { routers } from '@/router';

import configureOpenAPI from '@/modules/base/configure-open-api';
import createApp from '@/modules/base/create-app';
import { registerRoutes } from '@/router';

const app = createApp();

configureOpenAPI(app);
registerRoutes(app);

export type AppType = typeof routers[number];

export default app;

export const fetch = app.fetch;

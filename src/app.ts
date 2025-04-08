import authModule from '@/modules/auth';
import configureOpenAPI from '@/modules/base/configure-open-api';
import createApp from '@/modules/base/create-app';
import indexModule from '@/modules/index';
import tasksModule from '@/modules/tasks';

const app = createApp();

configureOpenAPI(app);

const routes = [
  indexModule,
  authModule,
  tasksModule,
] as const;

routes.forEach((route) => {
  app.route('/api', route);
});

export type AppType = typeof routes[number];

export default app;

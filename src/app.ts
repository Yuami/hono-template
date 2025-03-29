import configureOpenAPI from "@/lib/configure-open-api";
import createApp from "@/lib/create-app";
import indexModule from "@/modules/index";
import tasksModule from "@/modules/tasks";

const app = createApp();

configureOpenAPI(app);

const routes = [
  indexModule,
  tasksModule,
] as const;

routes.forEach((route) => {
  app.route("/", route);
});

export type AppType = typeof routes[number];

export default app;

import { createRouter } from '@/modules/base/create-app';

import * as handlers from './tasks-handlers';
import * as routes from './tasks-routes';

const tasksRouter = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.create, handlers.create)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.patch, handlers.patch)
  .openapi(routes.remove, handlers.remove);

export default tasksRouter;

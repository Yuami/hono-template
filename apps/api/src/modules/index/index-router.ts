import { createRoute } from '@hono/zod-openapi';

import { HttpStatusCodes } from '@/lib/hono-helpers/http-status-codes';
import jsonContent from '@/lib/stoker/openapi/helpers/json-content';
import createMessageObjectSchema from '@/lib/stoker/openapi/schemas/create-message-object';
import { createRouter } from '@/modules/base/create-app';

const indexRouter = createRouter()
  .openapi(
    createRoute({
      tags: ['Index'],
      method: 'get',
      path: '/',
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema('Tasks API'),
          'Tasks API Index',
        ),
      },
    }),
    (c) => {
      return c.json({
        message: 'Tasks API on Cloudflare',
      }, HttpStatusCodes.OK);
    },
  );

export default indexRouter;

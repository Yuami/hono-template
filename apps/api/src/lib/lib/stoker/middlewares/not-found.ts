import type { Context, NotFoundHandler } from 'hono';

import type { AppBindings } from '@/modules/base/types';

import { NOT_FOUND } from '../http-status-codes.js';
import { NOT_FOUND as NOT_FOUND_MESSAGE } from '../http-status-phrases.js';

const notFound: NotFoundHandler = (c: Context<AppBindings>) => {
  return c.json({
    message: `${NOT_FOUND_MESSAGE} - ${c.req.path}`,
  }, NOT_FOUND);
};

export default notFound;

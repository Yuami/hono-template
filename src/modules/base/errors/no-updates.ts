import type { Context } from 'hono';

import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants';
import { HttpStatusCodes } from '@/lib/hono-helpers/http-status-codes';

export function noUpdatesErrorResponse(c: Context) {
  return c.json(
    {
      success: false,
      error: {
        issues: [
          {
            code: ZOD_ERROR_CODES.INVALID_UPDATES,
            path: [],
            message: ZOD_ERROR_MESSAGES.NO_UPDATES,
          },
        ],
        name: 'ZodError',
      },
    },
    HttpStatusCodes.UNPROCESSABLE_ENTITY,
  );
}

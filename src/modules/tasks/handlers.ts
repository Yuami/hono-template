import { eq } from 'drizzle-orm';

import type { AppRouteHandler } from '@/lib/types';

import { getDb } from '@/db';
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from '@/lib/constants';
import { HttpStatusCodes } from '@/lib/hono-helpers/http-status-codes';
import notFound from '@/lib/stoker/middlewares/not-found';
import { tasks } from '@/modules/tasks/schema';

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from './routes';

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const { db } = getDb();
  const tasksList = await db.query.tasks.findMany();
  return c.json(tasksList);
};

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const { db } = getDb();
  const task = c.req.valid('json');
  const [inserted] = await db.insert(tasks).values(task).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { db } = getDb();
  const { id } = c.req.valid('param');
  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, id),
  });

  if (!task) {
    return notFound(c);
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { db } = getDb();
  const { id } = c.req.valid('param');
  const updates = c.req.valid('json');

  if (Object.keys(updates).length === 0) {
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

  const [task] = await db.update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning();

  if (!task) {
    return notFound(c);
  }

  return c.json(task, HttpStatusCodes.OK);
};

export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const { db } = getDb();
  const { id } = c.req.valid('param');
  const deleted = await db.delete(tasks)
    .where(eq(tasks.id, id))
    .returning();

  if (deleted.length === 0) {
    return notFound(c);
  }

  return c.body(null, HttpStatusCodes.NO_CONTENT);
};

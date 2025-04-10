import type { RouteConfigToTypedResponse } from '@hono/zod-openapi';

import { eq } from 'drizzle-orm';

import type { AppRouteHandler } from '@/modules/base/types';

import { getDb } from '@/db';
import { HttpStatusCodes } from '@/lib/hono-helpers/http-status-codes';
import notFound from '@/lib/stoker/middlewares/not-found';
import { noUpdatesErrorResponse } from '@/modules/base/errors/no-updates';
import { tasks } from '@/modules/tasks/tasks-schema';

import type { CreateRoute, GetOneRoute, ListRoute, PatchRoute, RemoveRoute } from './tasks-routes';

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
    return notFound(c) as unknown as RouteConfigToTypedResponse<GetOneRoute>;
  }

  return c.json(task) as RouteConfigToTypedResponse<GetOneRoute>;
};

export const patch: AppRouteHandler<PatchRoute> = async (c) => {
  const { db } = getDb();
  const { id } = c.req.valid('param');
  const updates = c.req.valid('json');

  if (Object.keys(updates).length === 0) {
    return noUpdatesErrorResponse(c);
  }

  const [task] = await db.update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning();

  if (!task) {
    return notFound(c);
  }

  return c.json(task) as RouteConfigToTypedResponse<PatchRoute>;
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

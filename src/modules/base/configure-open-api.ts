import { apiReference } from '@scalar/hono-api-reference';

import type { AppOpenAPI } from '@/modules/base/types';

import packageJSON from '../../../package.json';

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/api/v1/doc', {
    openapi: '3.0.0',
    info: {
      version: packageJSON.version,
      title: 'Tasks API',
      description: 'API for managing tasks with authentication support',
    },
  });

  app.get(
    '/api/v1/reference',
    apiReference({
      theme: 'kepler',
      layout: 'classic',
      defaultHttpClient: {
        targetKey: 'javascript',
        clientKey: 'fetch',
      },
      spec: {
        url: '/api/doc',
      },
    }),
  );
}

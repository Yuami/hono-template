# Hono Template Monorepo

A modern monorepo template for building full-stack applications with Hono, React, TanStack Router, and TanStack Query.

- [Hono Template Monorepo](#hono-template-monorepo)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Setup](#setup)
  - [Development](#development)
  - [Building](#building)
  - [Linting and Formatting](#linting-and-formatting)
  - [API Documentation](#api-documentation)
  - [References](#references)

## Features

### Backend (Hono API)
- Structured logging with [pino](https://getpino.io/) / [hono-pino](https://www.npmjs.com/package/hono-pino)
- Documented / type-safe routes with [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- Interactive API documentation with [scalar](https://scalar.com/#api-docs) / [@scalar/hono-api-reference](https://github.com/scalar/scalar/tree/main/packages/hono-api-reference)
- Convenience methods / helpers to reduce boilerplate with [stoker](https://www.npmjs.com/package/stoker)
- Type-safe schemas and environment variables with [zod](https://zod.dev/)
- Single source of truth database schemas with [drizzle](https://orm.drizzle.team/docs/overview) and [drizzle-zod](https://orm.drizzle.team/docs/zod)

### Frontend (React + Vite)
- Modern React application with [Vite](https://vitejs.dev/)
- Type-safe routing with [TanStack Router](https://tanstack.com/router)
- Data fetching and caching with [TanStack Query](https://tanstack.com/query)

### Monorepo
- Monorepo management with [Turborepo](https://turbo.build/)
- Shared TypeScript configurations
- Fast and modern linting and formatting with [Biome](https://biomejs.dev/)
- Git hooks for code quality with [Husky](https://typicode.github.io/husky/)
- Testing with [vitest](https://vitest.dev/)

## Project Structure

```
hono-template/
├── apps/
│   ├── api/           # Hono API backend
│   └── web/           # React frontend
├── packages/
│   └── typescript-config/ # Shared TypeScript configuration
├── package.json       # Root package.json
└── turbo.json         # Turborepo configuration
```

## Setup

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```sh
# Clone the repository
git clone https://github.com/yourusername/hono-template.git
cd hono-template

# Install dependencies
pnpm install

# Create .env file for the API
cp apps/api/.env.sample apps/api/.env

# Create sqlite db / push schema
pnpm --filter api drizzle:push
```

## Development

```sh
# Start both frontend and backend in development mode
pnpm dev

# Start only the backend
pnpm --filter api dev

# Start only the frontend
pnpm --filter web dev
```

## Building

```sh
# Build all packages
pnpm build

# Build specific package
pnpm --filter api build
pnpm --filter web build
```

## Linting and Formatting

```sh
# Lint all packages
pnpm lint

# Format all packages
pnpm format

# Run tests
pnpm test
```

## API Documentation

The API documentation is available at `/api/v1/reference` when the API is running. This provides an interactive documentation of all available endpoints.

### API Endpoints

| Path                    | Description              |
| ----------------------- | ------------------------ |
| GET /api/v1/doc         | Open API Specification   |
| GET /api/v1/reference   | Scalar API Documentation |
| GET /api/v1/tasks       | List all tasks           |
| POST /api/v1/tasks      | Create a task            |
| GET /api/v1/tasks/{id}  | Get one task by id       |
| PATCH /api/v1/tasks/{id}| Patch one task by id     |
| DELETE /api/v1/tasks/{id}| Delete one task by id    |

## Code Tour

### Backend (API)

Base hono app exported from [apps/api/src/app.ts](./apps/api/src/app.ts). Local development uses [@hono/node-server](https://hono.dev/docs/getting-started/nodejs).

Typesafe env defined in [apps/api/src/env.ts](./apps/api/src/env.ts) - add any other required environment variables here. The application will not start if any required environment variables are missing.

The API is organized into modules:

- `auth` - Authentication and authorization
- `base` - Base configuration and middleware
- `index` - Index routes
- `tasks` - Task management

All app routes are grouped together and exported into single type as `AppType` in [apps/api/src/app.ts](./apps/api/src/app.ts) for use in [RPC / hono/client](https://hono.dev/docs/guides/rpc).

### Frontend (Web)

The React frontend is built with Vite and uses TanStack Router for routing and TanStack Query for data fetching.

- Entry point: [apps/web/src/main.tsx](./apps/web/src/main.tsx)
- Routes defined in [apps/web/src/routes/index.ts](./apps/web/src/routes/index.ts)
- Pages in [apps/web/src/pages](./apps/web/src/pages)
- Components in [apps/web/src/components](./apps/web/src/components)

## References

### Backend
- [What is Open API?](https://swagger.io/docs/specification/v3_0/about/)
- [Hono](https://hono.dev/)
  - [Zod OpenAPI Example](https://hono.dev/examples/zod-openapi)
  - [Testing](https://hono.dev/docs/guides/testing)
  - [Testing Helper](https://hono.dev/docs/helpers/testing)
- [@hono/zod-openapi](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)
- [Scalar Documentation](https://github.com/scalar/scalar/tree/main/?tab=readme-ov-file#documentation)
  - [Themes / Layout](https://github.com/scalar/scalar/blob/main/documentation/themes.md)
  - [Configuration](https://github.com/scalar/scalar/blob/main/documentation/configuration.md)

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Query](https://tanstack.com/query/latest)

### Monorepo
- [Turborepo](https://turbo.build/repo)
- [Biome](https://biomejs.dev/)
- [Husky](https://typicode.github.io/husky/)
- [pnpm Workspaces](https://pnpm.io/workspaces)

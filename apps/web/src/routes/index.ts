import { createRootRoute, createRouter } from '@tanstack/react-router';
import { RootLayout } from '@/components/RootLayout';
import { indexRoute } from './root';
import { tasksRoute } from './tasks';

// Create a root route
export const rootRoute = createRootRoute({
  component: RootLayout,
});

// Create the route tree using your routes
export const routeTree = rootRoute.addChildren([
  indexRoute,
  tasksRoute,
]);
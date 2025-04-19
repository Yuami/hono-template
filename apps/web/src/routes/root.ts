import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/pages/HomePage';

export const indexRoute = createFileRoute('/')({
  component: HomePage,
});
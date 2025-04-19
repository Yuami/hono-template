import { createFileRoute } from '@tanstack/react-router';
import { TasksPage } from '@/pages/TasksPage';

export const tasksRoute = createFileRoute('/tasks')({
  component: TasksPage,
});
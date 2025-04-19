import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch('/api/v1/tasks');
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
}

export function TasksPage() {
  const { data: tasks, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {error.message}</div>;
  }

  return (
    <div className="tasks-page">
      <h1>Tasks</h1>
      {tasks && tasks.length > 0 ? (
        <ul className="tasks-list">
          {tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <span>{task.title}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks found. Create one!</p>
      )}
    </div>
  );
}
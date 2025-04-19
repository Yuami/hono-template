import React from 'react';

export function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to Hono Template</h1>
      <p>
        This is a starter template for building applications with Hono, React, TanStack Router, and TanStack Query.
      </p>
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Hono API with OpenAPI support</li>
          <li>React frontend with Vite</li>
          <li>TanStack Router for routing</li>
          <li>TanStack Query for data fetching</li>
          <li>TypeScript for type safety</li>
          <li>Biome for linting and formatting</li>
          <li>Turborepo for monorepo management</li>
        </ul>
      </div>
    </div>
  );
}
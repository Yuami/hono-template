import { Link, Outlet } from '@tanstack/react-router';

export function RootLayout() {
  return (
    <div className="root-layout">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2024 Hono Template</p>
      </footer>
    </div>
  );
}
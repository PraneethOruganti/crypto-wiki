import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

function RootLayout() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/wiki" className="[&.active]:font-bold">
          Wiki
        </Link>
        <Link to="/editor" className="[&.active]:font-bold">
          Editor
        </Link>
        <Link to="/macros" className="[&.active]:font-bold">
          Macros
        </Link>
        <Link to="/account" className="[&.active]:font-bold">
          Account
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({ component: RootLayout });
